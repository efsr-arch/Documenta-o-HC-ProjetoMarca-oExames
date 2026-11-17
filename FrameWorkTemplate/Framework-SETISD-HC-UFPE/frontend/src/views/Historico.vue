<template>
  <section class="historico space-y-6">
    <!-- Cabeçalho da Página -->
    <header class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="eyebrow">SIGEX-HC / GESTÃO DE EXAMES</p>
        <h1>Histórico de Alterações</h1>
        <p class="subtitulo">Rastreabilidade das ações realizadas na gestão das solicitações.</p>
      </div>

      <div class="flex items-center gap-3">
        <button
          type="button"
          @click="exportarHistorico"
          class="btn-exportar"
          title="Exportar registros filtrados para arquivo CSV"
        >
          <ArrowDownTrayIcon class="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Exportar histórico</span>
        </button>
      </div>
    </header>

    <!-- Notificação de Exportação / Feedback -->
    <transition name="fade">
      <div
        v-if="mensagemFeedback"
        class="flex items-center justify-between gap-3 rounded-xl border border-[#D5E6D8] bg-[#EAF5EC] px-4 py-3 text-xs font-semibold text-[#2D6A4F]"
        role="status"
      >
        <div class="flex items-center gap-2">
          <CheckCircleIcon class="h-4 w-4 shrink-0 text-[#2D6A4F]" />
          <span>{{ mensagemFeedback }}</span>
        </div>
        <button
          type="button"
          @click="mensagemFeedback = ''"
          class="text-[#2D6A4F] hover:opacity-75"
          aria-label="Fechar mensagem"
        >
          ×
        </button>
      </div>
    </transition>

    <!-- Cards de Indicadores (KPIs) -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <!-- Card 1: Eventos registrados -->
      <Card class="painel">
        <div class="flex items-center justify-between gap-3">
          <span class="rotulo">Eventos registrados</span>
          <div class="icone-circulo" aria-hidden="true">
            <ArrowPathIcon class="h-4 w-4" />
          </div>
        </div>
        <p class="numero">{{ kpisDemonstrativos.eventosRegistrados }}</p>
        <p class="legenda">Exemplo fictício</p>
      </Card>

      <!-- Card 2: Usuários em atividade -->
      <Card class="painel">
        <div class="flex items-center justify-between gap-3">
          <span class="rotulo">Usuários em atividade</span>
          <div class="icone-circulo" aria-hidden="true">
            <UserGroupIcon class="h-4 w-4" />
          </div>
        </div>
        <p class="numero">{{ kpisDemonstrativos.usuariosEmAtividade }}</p>
        <p class="legenda">Equipe autorizada</p>
      </Card>

      <!-- Card 3: Alterações hoje -->
      <Card class="painel">
        <div class="flex items-center justify-between gap-3">
          <span class="rotulo">Alterações hoje</span>
          <div class="icone-circulo" aria-hidden="true">
            <ClockIcon class="h-4 w-4" />
          </div>
        </div>
        <p class="numero">{{ kpisDemonstrativos.alteracoesHoje }}</p>
        <p class="legenda">Operações internas</p>
      </Card>
    </div>

    <!-- Painel Principal: Filtros e Tabela de Histórico -->
    <Card class="painel">
      <!-- Barra de Filtros -->
      <form class="filtros" @submit.prevent>
        <!-- Busca por texto -->
        <label class="busca">
          <span class="sr-only">Buscar por protocolo, paciente ou usuário</span>
          <div class="busca-input-wrap">
            <MagnifyingGlassIcon class="busca-icone" aria-hidden="true" />
            <input
              v-model="filtros.busca"
              type="search"
              placeholder="Buscar por protocolo, paciente ou usuário"
              aria-label="Buscar por protocolo, paciente ou usuário"
            />
          </div>
        </label>

        <!-- Dropdown: Tipo de ação -->
        <label class="filtro-select">
          <span class="sr-only">Tipo de ação</span>
          <select v-model="filtros.tipoAcao" aria-label="Filtrar por tipo de ação">
            <option value="">Tipo de ação</option>
            <option v-for="tipo in tiposAcaoDisponiveis" :key="tipo" :value="tipo">
              {{ tipo }}
            </option>
          </select>
        </label>

        <!-- Dropdown: Responsável -->
        <label class="filtro-select">
          <span class="sr-only">Responsável</span>
          <select v-model="filtros.responsavel" aria-label="Filtrar por responsável">
            <option value="">Responsável</option>
            <option v-for="resp in responsaveisDisponiveis" :key="resp" :value="resp">
              {{ resp }}
            </option>
          </select>
        </label>

        <!-- Dropdown: Período -->
        <label class="filtro-select">
          <span class="sr-only">Período</span>
          <select v-model="filtros.periodo" aria-label="Filtrar por período">
            <option v-for="periodo in periodosDisponiveis" :key="periodo.valor" :value="periodo.valor">
              {{ periodo.label }}
            </option>
          </select>
        </label>

        <!-- Limpar Filtros -->
        <button
          v-if="temFiltrosAtivos"
          type="button"
          class="btn-limpar"
          @click="limparFiltros"
          title="Limpar todos os filtros aplicados"
        >
          Limpar filtros
        </button>
      </form>

      <!-- Tabela de Histórico -->
      <div class="tabela-container">
        <table>
          <caption class="sr-only">Tabela de histórico de alterações e rastreabilidade</caption>
          <thead>
            <tr>
              <th scope="col" class="th-data">Data e hora</th>
              <th scope="col" class="th-protocolo">Protocolo</th>
              <th scope="col" class="th-alteracao">Alteração realizada</th>
              <th scope="col" class="th-responsavel">Responsável</th>
              <th scope="col" class="th-detalhes text-center">Detalhes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in itensPagina" :key="item.id">
              <td class="td-data">{{ item.dataHora }}</td>
              <td class="td-protocolo">#{{ item.protocolo }}</td>
              <td class="td-alteracao">
                <span :class="obterClasseAlteracao(item.alteracaoRealizada)">
                  {{ item.alteracaoRealizada }}
                </span>
              </td>
              <td class="td-responsavel">{{ item.responsavel }}</td>
              <td class="td-detalhes text-center">
                <button
                  type="button"
                  class="btn-ver-registro"
                  @click="abrirDetalhes(item)"
                  :aria-label="'Ver registro do protocolo #' + item.protocolo"
                >
                  Ver registro
                </button>
              </td>
            </tr>

            <!-- Estado Vazio -->
            <tr v-if="!filtrados.length">
              <td colspan="5" class="estado-vazio">
                <strong>Nenhum registro encontrado</strong>
                <p>Ajuste os termos de busca ou limpe os filtros para visualizar os eventos.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Rodapé da Tabela & Paginação -->
      <div class="rodape-tabela">
        <p role="status">
          Mostrando {{ inicio }} de {{ kpisDemonstrativos.eventosRegistrados }} solicitações
        </p>

        <nav aria-label="Paginação do histórico" class="paginacao">
          <button
            class="btn-pag"
            :disabled="paginaAtual === 1"
            @click="paginaAtual--"
            aria-label="Página anterior"
          >
            ‹
          </button>

          <button
            v-for="numero in paginasVisiveis"
            :key="numero"
            class="btn-pag"
            :class="{ atual: paginaAtual === numero }"
            :aria-current="paginaAtual === numero ? 'page' : undefined"
            :aria-label="'Página ' + numero"
            @click="paginaAtual = numero"
          >
            {{ numero }}
          </button>

          <span v-if="totalPaginas > 3 && paginaAtual < totalPaginas - 1" class="ellipsis">...</span>

          <button
            class="btn-pag"
            :disabled="paginaAtual === totalPaginas || totalPaginas === 0"
            @click="paginaAtual++"
            aria-label="Próxima página"
          >
            ›
          </button>
        </nav>
      </div>
    </Card>

    <!-- Modal: Detalhes do Registro de Histórico (Auditoria) -->
    <Modal :show="modalAberto" @close="modalAberto = false">
      <template #header>
        <div class="flex items-center gap-2">
          <span>Detalhes da Alteração</span>
          <span v-if="registroSelecionado" class="badge-protocolo">
            #{{ registroSelecionado.protocolo }}
          </span>
        </div>
      </template>

      <div v-if="registroSelecionado" class="space-y-4">
        <!-- Cabeçalho do Evento no Modal -->
        <div class="rounded-xl border border-[#EDE5DA] bg-[#FAF7F2] p-4 text-xs space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-stone-500 font-semibold">Data e Hora:</span>
            <span class="font-bold text-stone-800">{{ registroSelecionado.dataHora }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-stone-500 font-semibold">Responsável:</span>
            <span class="font-bold text-[#8F252B]">{{ registroSelecionado.responsavel }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-stone-500 font-semibold">Paciente:</span>
            <span class="font-bold text-stone-800">{{ registroSelecionado.paciente }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-stone-500 font-semibold">Tipo de Ação:</span>
            <span class="font-semibold text-stone-700">{{ registroSelecionado.tipoAcao }}</span>
          </div>
        </div>

        <!-- Alteração Realizada -->
        <div>
          <h3 class="text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Alteração Realizada
          </h3>
          <div class="rounded-lg border border-[#EADBCE] bg-white p-3 text-sm font-semibold text-stone-900">
            {{ registroSelecionado.alteracaoRealizada }}
          </div>
        </div>

        <!-- Motivo / Observação -->
        <div v-if="registroSelecionado.detalhes.motivo || registroSelecionado.detalhes.observacao">
          <h3 class="text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Justificativa / Observação
          </h3>
          <p class="rounded-lg bg-[#FAF7F2] border border-[#EDE5DA] p-3 text-xs text-stone-700 leading-relaxed">
            {{ registroSelecionado.detalhes.motivo || registroSelecionado.detalhes.observacao }}
          </p>
        </div>

        <!-- Trilha de Mudanças: Antes vs Depois (Audit Trail) -->
        <div v-if="temDadosComparativos(registroSelecionado)">
          <h3 class="text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Trilha de Mudanças (Estado Anterior vs Novo)
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div class="rounded-lg border border-red-200 bg-red-50/60 p-3">
              <span class="font-bold text-red-800 block mb-1">Estado Anterior:</span>
              <pre class="text-[11px] text-red-900 whitespace-pre-wrap font-mono">{{ formatarJson(registroSelecionado.detalhes.dadosAnteriores) }}</pre>
            </div>
            <div class="rounded-lg border border-emerald-200 bg-emerald-50/60 p-3">
              <span class="font-bold text-emerald-800 block mb-1">Novo Estado:</span>
              <pre class="text-[11px] text-emerald-900 whitespace-pre-wrap font-mono">{{ formatarJson(registroSelecionado.detalhes.dadosNovos) }}</pre>
            </div>
          </div>
        </div>

        <!-- Metadados de Auditoria & Segurança -->
        <div class="border-t border-stone-200 pt-3 text-[11px] text-stone-500 space-y-1">
          <p>
            <strong class="text-stone-600">IP de Origem:</strong>
            {{ registroSelecionado.detalhes.ipOrigem || 'Não informado' }}
          </p>
          <p>
            <strong class="text-stone-600">Dispositivo:</strong>
            {{ registroSelecionado.detalhes.dispositivo || 'Terminal Hospitalar HC-UFPE' }}
          </p>
          <p>
            <strong class="text-stone-600">Categoria de Auditoria:</strong>
            <span class="ml-1 inline-block px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-mono text-[10px]">
              {{ registroSelecionado.categoria }}
            </span>
          </p>
        </div>
      </div>

      <template #footer>
        <button
          type="button"
          @click="modalAberto = false"
          class="rounded-lg bg-stone-200 hover:bg-stone-300 px-4 py-2 text-xs font-bold text-stone-700 transition-colors"
        >
          Fechar
        </button>
      </template>
    </Modal>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ClockIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
} from '@heroicons/vue/24/outline';
import Card from '../components/Card.vue';
import Modal from '../components/Modal.vue';
import {
  eventosHistoricoDemonstrativos,
  kpisDemonstrativos,
  tiposAcaoDisponiveis,
  responsaveisDisponiveis,
  periodosDisponiveis,
  filtrarHistorico,
  EventoHistorico,
  FiltrosHistorico,
} from '../data/historico';

const route = useRoute();
const router = useRouter();

// Filtros sincronizados com a URL
const filtros = reactive<FiltrosHistorico>({
  busca: String(route.query.busca || ''),
  tipoAcao: String(route.query.tipoAcao || ''),
  responsavel: String(route.query.responsavel || ''),
  periodo: String(route.query.periodo || ''),
});

// Paginação: 6 itens por página (como na imagem)
const tamanhoPagina = 6;
const paginaAtual = ref(Math.max(1, Number(route.query.pagina) || 1));

// Modal e Seleção
const modalAberto = ref(false);
const registroSelecionado = ref<EventoHistorico | null>(null);
const mensagemFeedback = ref('');

// Computed
const temFiltrosAtivos = computed(() => {
  return Boolean(filtros.busca || filtros.tipoAcao || filtros.responsavel || filtros.periodo);
});

const filtrados = computed(() => {
  return filtrarHistorico(eventosHistoricoDemonstrativos, filtros);
});

const totalPaginas = computed(() => {
  return Math.max(1, Math.ceil(filtrados.value.length / tamanhoPagina));
});

// Garante que a página atual não ultrapasse o total
watch(totalPaginas, (novoTotal) => {
  if (paginaAtual.value > novoTotal) {
    paginaAtual.value = novoTotal;
  }
});

const itensPagina = computed(() => {
  const inicioIdx = (paginaAtual.value - 1) * tamanhoPagina;
  return filtrados.value.slice(inicioIdx, inicioIdx + tamanhoPagina);
});

const inicio = computed(() => {
  if (!filtrados.value.length) return 0;
  return itensPagina.value.length;
});

const paginasVisiveis = computed(() => {
  const paginas: number[] = [];
  const max = Math.min(totalPaginas.value, 3);
  for (let i = 1; i <= max; i++) {
    paginas.push(i);
  }
  return paginas;
});

// Funções de Interação
function limparFiltros(): void {
  filtros.busca = '';
  filtros.tipoAcao = '';
  filtros.responsavel = '';
  filtros.periodo = '';
  paginaAtual.value = 1;
}

function abrirDetalhes(item: EventoHistorico): void {
  registroSelecionado.value = item;
  modalAberto.value = true;
}

function obterClasseAlteracao(texto: string): string {
  if (texto.includes('Status')) return 'alteracao-status';
  if (texto.includes('Observação')) return 'alteracao-observacao';
  if (texto.includes('Conferência')) return 'alteracao-conferencia';
  return 'alteracao-padrao';
}

function temDadosComparativos(item: EventoHistorico): boolean {
  const antes = item.detalhes.dadosAnteriores;
  const novos = item.detalhes.dadosNovos;
  return Boolean(
    (antes && Object.keys(antes).length > 0) ||
    (novos && Object.keys(novos).length > 0)
  );
}

function formatarJson(dados?: Record<string, any>): string {
  if (!dados || Object.keys(dados).length === 0) return '(Nenhum dado registrado)';
  return JSON.stringify(dados, null, 2);
}

function exportarHistorico(): void {
  const colunas = ['Data e Hora', 'Protocolo', 'Alteração Realizada', 'Responsável', 'Paciente'];
  const linhas = filtrados.value.map((item) => [
    `"${item.dataHora}"`,
    `"#${item.protocolo}"`,
    `"${item.alteracaoRealizada}"`,
    `"${item.responsavel}"`,
    `"${item.paciente}"`,
  ]);

  const conteudoCsv = [colunas.join(','), ...linhas.map((l) => l.join(','))].join('\n');
  const blob = new Blob([conteudoCsv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `historico_sigex_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  mensagemFeedback.value = `Histórico exportado com sucesso! (${filtrados.value.length} registros)`;
  setTimeout(() => {
    mensagemFeedback.value = '';
  }, 4000);
}

// Watchers para Sincronização com a URL
watch(filtros, () => {
  paginaAtual.value = 1;
});

watch(
  [filtros, paginaAtual],
  () => {
    const query: Record<string, string> = {};
    if (filtros.busca) query.busca = filtros.busca;
    if (filtros.tipoAcao) query.tipoAcao = filtros.tipoAcao;
    if (filtros.responsavel) query.responsavel = filtros.responsavel;
    if (filtros.periodo) query.periodo = filtros.periodo;
    if (paginaAtual.value > 1) query.pagina = String(paginaAtual.value);

    void router.replace({ query });
  },
  { deep: true }
);
</script>

<style scoped>
.historico {
  color: #482225;
}

/* Tipografia e Títulos */
.eyebrow {
  color: #8f252b;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

h1 {
  font-size: clamp(25px, 3vw, 30px);
  font-weight: 800;
  margin-top: 4px;
  line-height: 1.25;
  color: #3b1c1d;
}

.subtitulo {
  margin-top: 6px;
  font-size: 13px;
  color: #7d736d;
}

/* Botão Exportar Superior */
.btn-exportar {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #ebd2c4;
  border-radius: 9px;
  background-color: #faf4ee;
  padding: 8px 14px;
  color: #8f252b;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.btn-exportar:hover {
  background-color: #f3e5d7;
  border-color: #dfc2b1;
}

/* Painéis e Cards */
.painel {
  border: 1px solid #e6dace;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 4px 16px rgba(100, 61, 36, 0.05);
}

.rotulo {
  font-size: 13px;
  font-weight: 700;
  color: #776b65;
}

.icone-circulo {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  color: #8f252b;
  background-color: #fcecee;
}

.numero {
  font-size: 34px;
  font-weight: 800;
  color: #302d2c;
  margin: 10px 0 2px;
  line-height: 1.1;
}

.legenda {
  font-size: 12px;
  color: #8a817c;
}

/* Formulário de Filtros */
.filtros {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 20px;
}

.filtros .busca {
  flex: 2 1 280px;
}

.busca-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.busca-icone {
  position: absolute;
  left: 12px;
  height: 16px;
  width: 16px;
  color: #a89f91;
  pointer-events: none;
}

.filtros input[type='search'] {
  width: 100%;
  height: 42px;
  border: 1px solid #ded5ce;
  border-radius: 10px;
  background: #ffffff;
  padding: 0 12px 0 36px;
  color: #514843;
  font-size: 12px;
  transition: border-color 0.15s ease;
}

.filtro-select {
  flex: 1 1 150px;
}

select {
  width: 100%;
  height: 42px;
  border: 1px solid #ded5ce;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 0 12px;
  color: #514843;
  font-size: 12px;
  cursor: pointer;
  transition: border-color 0.15s ease;
}

:where(input, select):focus {
  outline: none;
  border-color: #8f252b;
  box-shadow: 0 0 0 1px #8f252b;
}

.btn-limpar {
  height: 42px;
  padding: 0 14px;
  border: 1px solid #ded5ce;
  border-radius: 10px;
  background-color: #faf7f2;
  color: #8f252b;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.btn-limpar:hover {
  background-color: #f2e8de;
}

/* Tabela */
.tabela-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  white-space: nowrap;
}

thead tr {
  background-color: #f5e8dc;
}

th {
  padding: 13px 16px;
  font-size: 11px;
  font-weight: 700;
  color: #62463d;
}

th:first-child {
  border-top-left-radius: 10px;
}

th:last-child {
  border-top-right-radius: 10px;
}

td {
  padding: 16px 16px;
  border-bottom: 1px solid #eee4db;
  font-size: 12px;
  color: #443b37;
}

tbody tr:hover {
  background-color: #fdfaf6;
}

.td-data {
  color: #514843;
}

.td-protocolo {
  font-weight: 800;
  color: #302d2c;
}

.td-responsavel {
  color: #514843;
}

/* Badges e Textos da Alteração Realizada */
.alteracao-status {
  font-weight: 500;
  color: #3b1c1d;
}

.alteracao-observacao {
  color: #514843;
}

.alteracao-conferencia {
  color: #514843;
}

.alteracao-padrao {
  color: #514843;
}

/* Botão "Ver registro" */
.btn-ver-registro {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #9b555a;
  border-radius: 9px;
  padding: 6px 14px;
  color: #8f252b;
  background-color: #ffffff;
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-ver-registro:hover {
  background-color: #f9ede7;
  border-color: #8f252b;
}

/* Estado Vazio */
.estado-vazio {
  text-align: center;
  padding: 40px 16px;
  white-space: normal;
}

.estado-vazio strong {
  display: block;
  font-size: 14px;
  color: #482225;
}

.estado-vazio p {
  margin-top: 6px;
  color: #8a817c;
}

/* Rodapé e Paginação */
.rodape-tabela {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding-top: 20px;
  font-size: 11px;
  color: #8a817c;
  flex-wrap: wrap;
}

.paginacao {
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-pag {
  min-width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ded5ce;
  border-radius: 8px;
  background-color: #ffffff;
  color: #514843;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-pag:hover:not(:disabled) {
  background-color: #f5ebe2;
}

.btn-pag:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-pag.atual {
  background-color: #8f252b;
  border-color: #8f252b;
  color: #ffffff;
}

.btn-pag.atual:hover {
  background-color: #741e23;
}

.ellipsis {
  padding: 0 4px;
  color: #8a817c;
}

/* Modal Helper Badges */
.badge-protocolo {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 6px;
  background-color: #f7e8df;
  color: #8f252b;
  font-size: 12px;
  font-weight: 800;
}

/* Transições */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
