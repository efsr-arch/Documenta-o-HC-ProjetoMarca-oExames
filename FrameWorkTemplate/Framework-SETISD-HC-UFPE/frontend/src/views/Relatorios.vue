<template>
  <section class="space-y-4">
    <header class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p class="text-[11px] font-bold uppercase tracking-wider text-paper-primary">
          SIGEX-HC / GESTÃO DE EXAMES
        </p>
        <h1 class="mt-0.5 text-2xl font-bold tracking-tight text-paper-text md:text-3xl">Relatórios</h1>
        <p class="mt-1 text-sm text-[#66615B]">Indicadores operacionais de marcação e acompanhamento dos exames.</p>
      </div>
    </header>

    <form
      class="grid items-end gap-3 rounded-2xl border border-[#E9DCCB] bg-white px-5 py-4 shadow-paper min-[375px]:grid-cols-2 sm:flex sm:flex-wrap"
      aria-label="Filtros do relatório"
      @submit.prevent="aplicarFiltros"
    >
      <span class="hidden self-center pr-1 text-[11px] font-bold uppercase tracking-wide text-[#776A63] xl:block">
        Filtrar por
      </span>
      <label
        v-for="{ campo, rotulo, opcoes, opcaoGeral } in camposFiltro"
        :key="campo"
        class="grid min-w-0 gap-1 text-xs font-semibold text-[#5C534E] sm:min-w-32"
      >
        {{ rotulo }}
        <select
          v-model="filtros[campo]"
          class="w-full rounded-lg border border-[#DECFC0] bg-white px-3 py-2 text-sm font-normal text-paper-text focus-visible:outline-2 focus-visible:outline-paper-primary"
        >
          <option v-if="opcaoGeral" value="">{{ opcaoGeral }}</option>
          <option v-for="opcao in opcoes" :key="opcao.valor" :value="opcao.valor">{{ opcao.rotulo }}</option>
        </select>
      </label>

      <div class="flex flex-wrap items-center gap-2 min-[375px]:col-span-2 sm:ml-auto">
        <button
          v-if="filtrosAlterados"
          type="button"
          class="rounded-lg px-3 py-2 text-xs font-semibold text-paper-primary hover:bg-[#FAF6F0]"
          @click="limparFiltros"
        >
          Limpar filtros
        </button>
        <button
          type="submit"
          class="rounded-lg border border-[#EBD2C4] bg-[#F7E8DF] px-4 py-2 text-xs font-bold text-paper-primary hover:bg-[#F2DDD1]"
        >
          Aplicar filtros
        </button>
      </div>
    </form>

    <p class="text-xs text-[#776A63]" role="status">
      {{ recorteExibido }} · {{ resumo.totais.solicitacoes }}
      {{ resumo.totais.solicitacoes === 1 ? 'solicitação' : 'solicitações' }}
    </p>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5" aria-label="Indicadores do relatório">
      <KpiCard v-for="kpi in indicadores" :key="kpi.id" :kpi="kpi" />
    </div>

    <template v-if="resumo.totais.solicitacoes">
      <div class="grid gap-4 xl:grid-cols-2">
        <StatusDonutChart
          titulo="Desfecho dos exames"
          subtitulo="Distribuição"
          rotulo-total="registros"
          :items="desfechos"
          :total="resumo.totais.solicitacoes"
        />
        <SolicitacoesSemanaChart :semanas="resumo.porSemana" />
      </div>

      <ResumoExamesTable :exames="resumo.porExame" />
    </template>
    <section v-else class="rounded-2xl border border-[#E9DCCB] bg-white p-8 text-center shadow-paper">
      <ChartBarIcon class="mx-auto mb-3 h-8 w-8 text-paper-primary" aria-hidden="true" />
      <h2 class="font-bold text-paper-text">Nenhuma solicitação encontrada</h2>
      <p class="mt-1 text-sm text-[#66615B]">Altere os filtros ou restaure o período inicial para visualizar o relatório.</p>
    </section>

    <footer class="flex flex-col justify-between gap-2 pt-2 text-xs text-[#776A63] sm:flex-row">
      <span>SIGEx-HC · Proposta visual para validação com o HC-UFPE</span>
      <span>Dados fictícios · Regras clínicas não homologadas</span>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ChartBarIcon } from '@heroicons/vue/24/outline';
import ResumoExamesTable from '../components/relatorios/ResumoExamesTable.vue';
import SolicitacoesSemanaChart from '../components/relatorios/SolicitacoesSemanaChart.vue';
import KpiCard from '../components/visao-geral/KpiCard.vue';
import StatusDonutChart from '../components/visao-geral/StatusDonutChart.vue';
import {
  consultarRelatorio,
  filtrosIniciaisRelatorio,
  formatarEspera,
  formatarPeriodo,
  formatarTaxa,
  obterOpcoesRelatorio,
  type FiltrosRelatorio,
} from '../services/relatoriosService';
import type { KpiIndicador } from '../types/visaoGeral';

const opcoes = obterOpcoesRelatorio();
const filtros = ref({ ...filtrosIniciaisRelatorio });
const filtrosAplicados = ref({ ...filtrosIniciaisRelatorio });

const camposFiltro: {
  campo: keyof FiltrosRelatorio;
  rotulo: string;
  opcoes: { valor: string; rotulo: string }[];
  opcaoGeral?: string;
}[] = [
  { campo: 'periodo', rotulo: 'Período', opcoes: opcoes.periodos.map((valor) => ({ valor, rotulo: formatarPeriodo(valor) })) },
  { campo: 'clinica', rotulo: 'Clínica', opcaoGeral: 'Todas', opcoes: opcoes.clinicas.map((valor) => ({ valor, rotulo: valor })) },
  { campo: 'exame', rotulo: 'Exame', opcaoGeral: 'Todos', opcoes: opcoes.exames.map((valor) => ({ valor, rotulo: valor })) },
  { campo: 'marcadora', rotulo: 'Marcadora', opcaoGeral: 'Todas', opcoes: opcoes.marcadoras.map((valor) => ({ valor, rotulo: valor })) },
];

const filtrosAlterados = computed(() => camposFiltro.some(({ campo }) =>
  filtros.value[campo] !== filtrosIniciaisRelatorio[campo]
  || filtrosAplicados.value[campo] !== filtrosIniciaisRelatorio[campo],
));
const resumo = computed(() => consultarRelatorio(filtrosAplicados.value));
const recorteExibido = computed(() => {
  const { periodo, clinica, exame, marcadora } = filtrosAplicados.value;
  return [formatarPeriodo(periodo), clinica, exame, marcadora].filter(Boolean).join(' · ');
});

/** Atualiza os indicadores com os valores selecionados no formulário. */
function aplicarFiltros(): void {
  filtrosAplicados.value = { ...filtros.value };
}

/** Restaura o demonstrativo inicial e aplica o recorte. */
function limparFiltros(): void {
  filtros.value = { ...filtrosIniciaisRelatorio };
  aplicarFiltros();
}

const indicadores = computed<KpiIndicador[]>(() => {
  const { solicitacoes, agendados, realizados, ausencias, esperaMedia, taxaComparecimento, taxaAusencia } = resumo.value.totais;
  return [
    { id: 'solicitacoes', titulo: 'Solicitações', valor: solicitacoes, subtitulo: 'No período', icone: 'total' },
    { id: 'agendados', titulo: 'Agendados', valor: agendados, subtitulo: 'Com agendamento', icone: 'agendados' },
    { id: 'realizados', titulo: 'Realizados', valor: realizados, subtitulo: `${formatarTaxa(taxaComparecimento)} de comparecimento`, icone: 'realizados' },
    { id: 'ausencias', titulo: 'Não compareceram', valor: ausencias, subtitulo: `${formatarTaxa(taxaAusencia)} de ausência`, icone: 'ausencias' },
    { id: 'espera', titulo: 'Tempo médio de espera', valor: esperaMedia === null ? '—' : `${formatarEspera(esperaMedia)} dias`, subtitulo: 'Da solicitação ao exame agendado', icone: 'pendentes' },
  ];
});

const desfechos = computed(() => {
  const { realizados, ausencias, desistencias, outrosPendentes } = resumo.value.totais;
  return [
    { id: 'realizados', label: 'Realizados', quantidade: realizados, cor: '#8F252B' },
    { id: 'ausencias', label: 'Não compareceram', quantidade: ausencias, cor: '#D76548' },
    { id: 'desistencias', label: 'Desistências', quantidade: desistencias, cor: '#DBA66D' },
    { id: 'outros', label: 'Outros / pendentes', quantidade: outrosPendentes, cor: '#E9D6BD' },
  ];
});
</script>
