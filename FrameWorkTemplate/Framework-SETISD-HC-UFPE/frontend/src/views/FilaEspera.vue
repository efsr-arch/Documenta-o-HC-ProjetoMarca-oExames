<template>
  <section class="fila-espera">
    <header class="cabecalho">
      <div>
        <p class="eyebrow">SIGEX-HC / GESTÃO DE EXAMES</p>
        <h1>Fila de Espera</h1>
        <p class="subtitulo">Acompanhe as solicitações recebidas quando não há vaga disponível.</p>
      </div>
      <button type="button" class="acao exportar" :disabled="!filtradas.length" @click="exportarLista">
        <ArrowDownTrayIcon class="h-4 w-4" aria-hidden="true" />
        Exportar lista
      </button>
    </header>

    <div class="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
      <Card v-for="indicador in indicadores" :key="indicador.titulo" class="painel indicador">
        <div class="flex items-center justify-between gap-3">
          <h2>{{ indicador.titulo }}</h2>
          <span class="icone-kpi" aria-hidden="true">
            <component :is="indicador.icone" v-if="indicador.icone" class="h-4 w-4" />
            <template v-else>⌛</template>
          </span>
        </div>
        <p class="valor">{{ indicador.valor }}</p>
        <p class="legenda">{{ indicador.legenda }}</p>
      </Card>
    </div>

    <p class="aviso">
      <strong>Como funciona</strong> · A equipe verifica a disponibilidade de vagas e encaminha as solicitações para a Fila de Marcação.
      O agendamento oficial é feito manualmente no AGHU.
    </p>

    <Card class="painel painel-tabela">
      <form class="filtros" @submit.prevent>
        <label class="busca">
          <span class="sr-only">Buscar paciente ou protocolo</span>
          <MagnifyingGlassIcon class="icone-busca" aria-hidden="true" />
          <input ref="campoBusca" v-model="filtros.busca" type="search" placeholder="Buscar paciente ou protocolo" />
        </label>
        <label class="filtro">
          <span class="sr-only">Filtrar por exame</span>
          <select v-model="filtros.exame">
            <option value="">Exame</option>
            <option v-for="exame in exames" :key="exame">{{ exame }}</option>
          </select>
        </label>
        <label class="filtro">
          <span class="sr-only">Filtrar por clínica</span>
          <select v-model="filtros.clinica">
            <option value="">Clínica</option>
            <option v-for="clinica in clinicas" :key="clinica">{{ clinica }}</option>
          </select>
        </label>
        <label class="filtro">
          <span class="sr-only">Filtrar por tempo de espera</span>
          <select v-model="faixaEspera">
            <option value="">Tempo de espera</option>
            <option v-for="faixa in faixasEspera" :key="faixa.rotulo" :value="faixa">{{ faixa.rotulo }}</option>
          </select>
        </label>
        <button v-if="filtrosAtivos" type="button" class="acao limpar" @click="limparFiltros">Limpar filtros</button>
      </form>

      <div class="tabela" role="region" aria-label="Lista de espera" tabindex="0">
        <table>
          <caption class="sr-only">Solicitações que aguardam disponibilidade de vaga</caption>
          <thead>
            <tr>
              <th scope="col">Protocolo</th>
              <th scope="col">Paciente</th>
              <th scope="col">Exame</th>
              <th scope="col" :aria-sort="menorPrimeiro ? 'ascending' : 'descending'">
                <button
                  type="button"
                  class="ordenar"
                  :aria-label="menorPrimeiro ? 'Ordenar por maior espera' : 'Ordenar por menor espera'"
                  @click="menorPrimeiro = !menorPrimeiro"
                >
                  Tempo de espera
                  <ChevronDownIcon class="h-3 w-3" :class="{ 'rotate-180': menorPrimeiro }" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">Indicador</th>
              <th scope="col">Situação</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in itensPagina" :key="item.id">
              <td class="protocolo">#{{ item.id }}</td>
              <td>{{ item.paciente }}</td>
              <td>{{ item.exame }}</td>
              <td>{{ formatarDias(item.diasCorridos) }}</td>
              <td>
                <div class="pontuacao">
                  <div class="trilho" aria-hidden="true"><span :style="{ width: (item.prioridade + '%') }"></span></div>
                  <strong>{{ item.prioridade }}/100</strong>
                </div>
              </td>
              <td><span class="situacao">{{ item.situacao }}</span></td>
              <td>
                <button type="button" class="acao detalhes" :aria-label="'Ver detalhes do protocolo ' + item.id" @click="abrirDetalhes(item)">
                  Ver detalhes
                </button>
              </td>
            </tr>
            <tr v-if="!filtradas.length">
              <td colspan="7" class="vazio">
                <strong>{{ solicitacoesEspera.length ? 'Nenhuma solicitação encontrada' : 'Fila de espera vazia' }}</strong>
                <p>{{ solicitacoesEspera.length ? 'Ajuste a busca ou limpe os filtros.' : 'No momento, nenhuma solicitação aguarda vaga.' }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="rodape-tabela">
        <p role="status">Mostrando {{ itensPagina.length }} de {{ filtradas.length }} solicitações</p>
        <nav v-if="filtradas.length" aria-label="Paginação da fila de espera" class="paginacao">
          <button type="button" class="acao" :disabled="pagina === 1" aria-label="Página anterior" @click="pagina--">‹</button>
          <button
            v-for="numero in totalPaginas"
            :key="numero"
            type="button"
            class="acao"
            :aria-current="pagina === numero ? 'page' : undefined"
            :aria-label="'Página ' + numero"
            @click="pagina = numero"
          >{{ numero }}</button>
          <button type="button" class="acao" :disabled="pagina === totalPaginas" aria-label="Próxima página" @click="pagina++">›</button>
        </nav>
      </div>
    </Card>

    <dialog ref="dialogo" class="dialogo" aria-labelledby="titulo-dialogo" @close="fecharDetalhes">
      <template v-if="selecionada">
        <header>
          <h2 id="titulo-dialogo">Detalhes da Solicitação</h2>
          <button type="button" class="acao fechar" aria-label="Fechar modal" autofocus @click="dialogo?.close()">
            <XMarkIcon class="h-4 w-4" aria-hidden="true" />
          </button>
        </header>
        <DetalhesEspera :item="selecionada" />
      </template>
    </dialog>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from 'vue';
import { ArrowDownTrayIcon, ChevronDownIcon, ClipboardDocumentListIcon, ClockIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { useToast } from 'vue-toastification';
import Card from '../components/Card.vue';
import DetalhesEspera from '../components/fila-espera/DetalhesEspera.vue';
import { filtrarSolicitacoes } from '../data/filaMarcacao';
import { solicitacoesEspera } from '../data/filaEspera';
import type { SolicitacaoEspera } from '../types/filaEspera';

const toast = useToast();
const filtrosIniciais = { busca: '', exame: '', clinica: '', situacao: '' };
const filtros = reactive({ ...filtrosIniciais });
const faixasEspera = [
  { rotulo: 'Até 7 dias', inicio: 0, fim: 7 },
  { rotulo: '8 a 14 dias', inicio: 8, fim: 14 },
  { rotulo: '15 dias ou mais', inicio: 15, fim: Infinity },
];
const faixaEspera = ref<(typeof faixasEspera)[number] | ''>('');
const menorPrimeiro = ref(false);
const pagina = ref(1);
const tamanhoPagina = 5;
const dialogo = ref<HTMLDialogElement>();
const campoBusca = ref<HTMLInputElement>();
const selecionada = ref<SolicitacaoEspera>();

const exames = computed(() => [...new Set(solicitacoesEspera.map(item => item.exame))].sort());
const clinicas = computed(() => [...new Set(solicitacoesEspera.map(item => item.clinica))].sort());
const filtrosAtivos = computed(() => filtros.busca || filtros.exame || filtros.clinica || faixaEspera.value);
const filtradas = computed(() => {
  const faixa = faixaEspera.value;
  const itens = filtrarSolicitacoes(solicitacoesEspera, filtros);
  const resultado = faixa
    ? itens.filter(item => item.diasCorridos >= faixa.inicio && item.diasCorridos <= faixa.fim)
    : itens;
  return resultado.sort((a, b) => menorPrimeiro.value
    ? a.diasCorridos - b.diasCorridos
    : b.diasCorridos - a.diasCorridos);
});
const totalPaginas = computed(() => Math.max(1, Math.ceil(filtradas.value.length / tamanhoPagina)));
const itensPagina = computed(() => filtradas.value.slice((pagina.value - 1) * tamanhoPagina, pagina.value * tamanhoPagina));
const indicadores = computed(() => [
  { titulo: 'Aguardando vaga', valor: solicitacoesEspera.length, legenda: 'Solicitações na espera' },
  { titulo: 'Maior tempo de espera', valor: formatarDias(Math.max(0, ...solicitacoesEspera.map(item => item.diasCorridos))), legenda: 'Dado ilustrativo', icone: ClockIcon },
  { titulo: 'Exames monitorados', valor: exames.value.length, legenda: 'Tipos distintos', icone: ClipboardDocumentListIcon },
]);

watch([filtros, faixaEspera, menorPrimeiro], () => { pagina.value = 1; });
watch(totalPaginas, total => { pagina.value = Math.min(pagina.value, total); });

function formatarDias(dias: number): string {
  return dias + (dias === 1 ? ' dia' : ' dias');
}

function limparFiltros(): void {
  Object.assign(filtros, filtrosIniciais);
  faixaEspera.value = '';
  campoBusca.value?.focus();
}

async function abrirDetalhes(item: SolicitacaoEspera): Promise<void> {
  selecionada.value = item;
  await nextTick();
  dialogo.value?.showModal();
}

function fecharDetalhes(): void {
  selecionada.value = undefined;
}

function exportarLista(): void {
  const colunas = ['Protocolo', 'Paciente', 'Exame', 'Clínica', 'Data original', 'Dias corridos', 'Indicador (0–100)', 'Situação'];
  const linhas = filtradas.value.map(item => [
    '#' + item.id, item.paciente, item.exame, item.clinica, item.data, item.diasCorridos, item.prioridade, item.situacao,
  ]);
  const csv = [colunas, ...linhas].map(linha =>
    linha.map(campo => '"' + String(campo).replaceAll('"', '""') + '"').join(',')
  ).join('\r\n');
  const url = URL.createObjectURL(new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'fila_de_espera_sigex.csv';
  link.click();
  URL.revokeObjectURL(url);
  toast.success('Lista da Fila de Espera exportada.');
}
</script>

<style scoped>
.fila-espera {
  --gradiente-prioridade: linear-gradient(90deg, #eab66f, #d35137 52%, #a71f2a);
  display: grid;
  min-width: 0;
  gap: 17px;
  color: #482225;
}
.cabecalho { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; }
.eyebrow { color: var(--color-paper-primary); font-size: 11px; font-weight: 800; letter-spacing: .12em; }
h1 { margin-top: 3px; font-size: clamp(25px, 3vw, 28px); font-weight: 800; line-height: 1.25; }
.subtitulo { margin-top: 5px; color: #7d736d; font-size: 13px; }
.painel { border: 1px solid #e8d6c6; border-radius: 15px; background: #fdfbf8; box-shadow: 0 5px 18px #643d240a; }
.indicador :deep(.p-6) { padding: 19px 18px 17px; }
.indicador h2 { color: #76625d; font-size: 12px; font-weight: 700; }
.icone-kpi { width: 32px; height: 32px; flex-shrink: 0; display: grid; place-items: center; font-size: 17px; border-radius: 10px; background: #f0dddc; color: var(--color-paper-primary); }
.valor { margin: 8px 0 5px; color: #501d24; font-size: 32px; font-weight: 800; line-height: 1.2; }
.legenda, .rodape-tabela { color: #826f65; font-size: 11px; }
.aviso { padding: 13px 15px; border: 1px solid #f1ce98; border-radius: 11px; background: #fff2dd; color: #805724; font-size: 12px; }
.painel-tabela { min-width: 0; }
.painel-tabela :deep(.p-6) { padding: 21px; }
.filtros { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 17px; }
.busca { position: relative; flex: 2 1 240px; }
.icone-busca { position: absolute; top: 14px; left: 12px; width: 12px; height: 12px; color: #8a7c75; pointer-events: none; }
.filtro { flex: 0 1 119px; min-width: 0; }
.filtro:last-of-type { flex-basis: 138px; }
input, select { width: 100%; height: 40px; border: 1px solid #dfd0c4; border-radius: 9px; background: #fffdfc; padding: 0 12px; color: #514843; font-size: 12px; }
input { padding-left: 30px; }
input::placeholder { color: #827770; }
select { cursor: pointer; }
.acao { display: inline-flex; align-items: center; justify-content: center; gap: 5px; padding: 6px 11px; border: 1px solid var(--color-paper-primary); border-radius: 9px; background: #fffdfc; color: var(--color-paper-primary); font-size: 11px; font-weight: 700; cursor: pointer; }
.acao:hover:not(:disabled) { background: #f7e8df; }
.acao:disabled { opacity: .55; cursor: default; }
.exportar { padding: 8px 14px; border-color: #ebd2c4; background: #f5e7dd; font-size: 12px; }
.limpar { border-color: #dfd0c4; min-height: 40px; }
:where(input, select, button, .tabela):focus-visible { outline: 2px solid var(--color-paper-primary); outline-offset: 2px; }
.tabela { overflow-x: auto; border-radius: 8px 8px 0 0; }
table { width: 100%; border-collapse: collapse; text-align: left; white-space: nowrap; }
th { padding: 10px 12px; background: #f5e8db; border-bottom: 1px solid #ebd4c3; color: #593d37; font-size: 11px; }
.ordenar { display: inline-flex; align-items: center; gap: 4px; cursor: pointer; }
.ordenar:hover { color: var(--color-paper-primary); }
td { height: 59px; padding: 10px 12px; border-bottom: 1px solid #eee2d7; color: #403533; font-size: 12px; }
tbody tr:last-child td { border-bottom: 0; }
tbody tr:hover { background: #fcf7f0; }
.protocolo { font-weight: 800; }
.pontuacao { display: flex; align-items: center; gap: 8px; color: #743638; font-size: 11px; }
.trilho { width: 93px; height: 9px; overflow: hidden; border-radius: 10px; background: #efe2d8; }
.trilho span { display: block; height: 100%; border-radius: inherit; background: var(--gradiente-prioridade); }
.situacao { display: inline-block; padding: 4px 9px; border-radius: 7px; background: #ffeed6; color: #89511a; font-size: 10px; font-weight: 800; }
.rodape-tabela { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; padding-top: 17px; }
.paginacao { display: flex; gap: 6px; }
.paginacao .acao { width: 27px; height: 27px; padding: 0; border-color: #e5d1c3; border-radius: 8px; }
.paginacao .acao[aria-current='page'] { background: var(--color-paper-primary); border-color: var(--color-paper-primary); color: white; }
.paginacao .acao[aria-current='page']:hover { background: var(--color-paper-primary-hover); }
.vazio { text-align: center; padding: 36px 16px; white-space: normal; }
.vazio p { margin-top: 6px; color: #796963; }
.dialogo { width: min(580px, calc(100% - 32px)); max-height: calc(100% - 24px); margin: auto; padding: 20px; overflow: auto; border: 1px solid #e8d6c6; border-radius: 15px; background: #fdfbf8; color: #482225; box-shadow: 0 10px 36px #48222533; }
.dialogo::backdrop { background: #39222380; }
.dialogo header { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 16px; }
.dialogo h2 { font-size: 18px; font-weight: 800; }
.fechar { padding: 6px; }
@media (max-width: 900px) {
  .busca { flex-basis: 100%; }
  .filtro, .filtro:last-of-type { flex: 1 1 115px; }
}
@media (max-width: 480px) {
  .painel-tabela :deep(.p-6) { padding: 14px; }
}
</style>
