<template>
  <section class="fila space-y-6">
    <header class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="eyebrow">SIGEX-HC / GESTÃO DE EXAMES</p>
        <h1>{{ route.params.id ? 'Detalhes da Solicitação' : 'Fila de Marcação' }}</h1>
        <p class="subtitulo">{{ route.params.id ? 'Consulta demonstrativa dos dados e do acompanhamento.' : 'Confira as solicitações e acompanhe a preparação para o agendamento.' }}</p>
      </div>
      <RouterLink v-if="route.params.id" :to="{ path: '/fila-marcacao', query: route.query }" class="acao">← Voltar à fila</RouterLink>
      <span v-else class="demo">Dados demonstrativos</span>
    </header>

    <template v-if="!route.params.id">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card v-for="indicador in indicadores" :key="indicador.titulo" class="painel">
          <div class="flex items-center justify-between gap-3">
            <span class="rotulo">{{ indicador.titulo }}</span>
            <component :is="indicador.icone" class="icone" aria-hidden="true" />
          </div>
          <p class="numero">{{ indicador.valor }}</p>
          <p class="legenda">{{ indicador.legenda }}</p>
        </Card>
      </div>

      <Card class="painel">
        <form class="filtros" @submit.prevent>
          <label class="busca">
            <span>Paciente ou protocolo</span>
            <input v-model="filtros.busca" type="search" placeholder="Buscar paciente ou protocolo" />
          </label>
          <label><span>Exame</span><select v-model="filtros.exame"><option value="">Todos os exames</option><option v-for="exame in exames" :key="exame">{{ exame }}</option></select></label>
          <label><span>Clínica</span><select v-model="filtros.clinica"><option value="">Todas as clínicas</option><option v-for="clinica in clinicas" :key="clinica">{{ clinica }}</option></select></label>
          <label><span>Situação</span><select v-model="filtros.situacao"><option value="">Todas as situações</option><option>Pendente</option><option>Em análise</option></select></label>
          <button type="button" class="acao limpar" @click="limparFiltros">Limpar filtros</button>
        </form>

        <div class="tabela">
          <table>
            <caption class="sr-only">Solicitações demonstrativas para marcação de exames</caption>
            <thead><tr><th scope="col">Protocolo</th><th scope="col">Paciente</th><th scope="col">Exame / clínica</th><th scope="col">Solicitação</th><th scope="col">Situação</th><th scope="col">Responsável</th><th scope="col">Ações</th></tr></thead>
            <tbody>
              <tr v-for="item in itensPagina" :key="item.id">
                <td class="protocolo">#{{ item.id }}</td><td>{{ item.paciente }}</td>
                <td>{{ item.exame }}<span class="clinica">{{ item.clinica }}</span></td>
                <td>{{ formatarData(item.data) }}</td>
                <td><span class="situacao" :class="{ analise: item.situacao === 'Em análise' }">{{ item.situacao }}</span></td>
                <td>{{ item.responsavel }}</td>
                <td><RouterLink :to="{ path: '/solicitacoes/' + item.id, query: route.query }" class="acao" :aria-label="'Ver detalhes do protocolo ' + item.id">Ver detalhes</RouterLink></td>
              </tr>
              <tr v-if="!filtradas.length"><td colspan="7" class="vazio"><strong>Nenhuma solicitação encontrada</strong><p>Ajuste a busca ou limpe os filtros para visualizar a fila.</p></td></tr>
            </tbody>
          </table>
        </div>
        <div class="rodape-tabela">
          <p role="status">Mostrando {{ inicio }}–{{ fim }} de {{ filtradas.length }} solicitações</p>
          <nav aria-label="Paginação da fila" class="paginacao">
            <button class="acao" :disabled="pagina === 1" @click="pagina--" aria-label="Página anterior">‹</button>
            <button v-for="numero in totalPaginas" :key="numero" class="acao" :class="{ atual: pagina === numero }" :aria-current="pagina === numero ? 'page' : undefined" :aria-label="'Página ' + numero" @click="pagina = numero">{{ numero }}</button>
            <button class="acao" :disabled="pagina === totalPaginas" @click="pagina++" aria-label="Próxima página">›</button>
          </nav>
        </div>
      </Card>
    </template>

    <template v-else-if="selecionada">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card class="painel">
          <div class="flex items-center justify-between gap-3"><h2>Dados da solicitação</h2><span class="situacao" :class="{ analise: selecionada.situacao === 'Em análise' }">{{ selecionada.situacao }}</span></div>
          <dl class="dados">
            <div><dt>Protocolo</dt><dd>#{{ selecionada.id }}</dd></div>
            <div><dt>Paciente</dt><dd>{{ selecionada.paciente }}</dd></div>
            <div><dt>Exame solicitado</dt><dd>{{ selecionada.exame }}</dd></div>
            <div><dt>Clínica solicitante</dt><dd>{{ selecionada.clinica }}</dd></div>
            <div><dt>Data da solicitação</dt><dd>{{ formatarData(selecionada.data) }}</dd></div>
            <div><dt>Origem</dt><dd>Microsoft Forms / Excel</dd></div>
          </dl>
        </Card>
        <Card class="painel">
          <h2>Acompanhamento do exame</h2>
          <dl class="dados">
            <div><dt>Situação</dt><dd>{{ selecionada.situacao }}</dd></div>
            <div><dt>Responsável</dt><dd>{{ selecionada.responsavel }}</dd></div>
            <div><dt>Agendamento no AGHUx</dt><dd>Não informado</dd></div>
            <div><dt>Comunicação ao paciente</dt><dd>Pendente</dd></div>
          </dl>
          <p class="aviso">Consulta para validação visual. Os dados desta solicitação são fictícios.</p>
        </Card>
      </div>
    </template>
    <Card v-else class="painel"><h2>Solicitação não encontrada</h2><p class="subtitulo">O protocolo informado não está na base demonstrativa. Volte à fila para selecionar uma solicitação.</p></Card>

    <footer> SIGEx-HC · Validação visual com dados fictícios <span>Critérios clínicos sujeitos à validação do HC-UFPE</span></footer>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { ClipboardDocumentListIcon, ClockIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import Card from '../components/Card.vue';
import { solicitacoesDemonstrativas, filtrarSolicitacoes } from '../data/filaMarcacao';

const route = useRoute();
const router = useRouter();
const filtros = reactive({ busca: String(route.query.busca || ''), exame: String(route.query.exame || ''), clinica: String(route.query.clinica || ''), situacao: String(route.query.situacao || '') });
const pagina = ref(Math.max(1, Number(route.query.pagina) || 1));
const tamanhoPagina = 6;
const exames = [...new Set(solicitacoesDemonstrativas.map(item => item.exame))].sort();
const clinicas = [...new Set(solicitacoesDemonstrativas.map(item => item.clinica))].sort();
const filtradas = computed(() => filtrarSolicitacoes(solicitacoesDemonstrativas, filtros));
const totalPaginas = computed(() => Math.max(1, Math.ceil(filtradas.value.length / tamanhoPagina)));
pagina.value = Math.min(Math.floor(pagina.value), totalPaginas.value);
const itensPagina = computed(() => filtradas.value.slice((pagina.value - 1) * tamanhoPagina, pagina.value * tamanhoPagina));
const inicio = computed(() => filtradas.value.length ? (pagina.value - 1) * tamanhoPagina + 1 : 0);
const fim = computed(() => Math.min(pagina.value * tamanhoPagina, filtradas.value.length));
const selecionada = computed(() => solicitacoesDemonstrativas.find(item => item.id === route.params.id));
const indicadores = computed(() => [
  { titulo: 'Solicitações na fila', valor: filtradas.value.length, legenda: 'Conforme os filtros selecionados', icone: ClipboardDocumentListIcon },
  { titulo: 'Pendentes', valor: filtradas.value.filter(item => item.situacao === 'Pendente').length, legenda: 'Aguardando conferência', icone: ClockIcon },
  { titulo: 'Em análise', valor: filtradas.value.filter(item => item.situacao === 'Em análise').length, legenda: 'Em acompanhamento pela equipe', icone: MagnifyingGlassIcon },
]);

function formatarData(data: string): string {
  return data.split('-').reverse().join('/');
}
function limparFiltros(): void {
  Object.assign(filtros, { busca: '', exame: '', clinica: '', situacao: '' });
}
watch(filtros, () => { pagina.value = 1; });
watch([filtros, pagina], () => {
  if (!route.params.id) {
    void router.replace({ query: { ...filtros, pagina: String(pagina.value) } });
  }
}, { deep: true });
</script>

<style scoped>
.fila { color: #482225; }
.eyebrow { color: #8f252b; font-size: 11px; font-weight: 800; letter-spacing: .12em; }
h1 { font-size: clamp(25px, 3vw, 30px); font-weight: 800; margin-top: 4px; line-height: 1.25; }
h2 { font-size: 16px; font-weight: 800; }
.subtitulo { margin-top: 7px; font-size: 13px; color: #7d736d; }
.painel { border: 1px solid #e6dace; border-radius: 16px; background: #fffdfa; box-shadow: 0 5px 18px #643d2410; }
.rotulo { font-size: 13px; font-weight: 700; color: #776b65; }
.icone { width: 34px; height: 34px; padding: 8px; border-radius: 9px; color: #8f252b; background: #f2dfe0; }
.numero { font-size: 32px; font-weight: 800; margin: 8px 0 3px; }
.legenda { font-size: 12px; color: #8a817c; }
.demo { color: #8f252b; background: #f5e7dd; border: 1px solid #e8d3c4; border-radius: 20px; padding: 7px 13px; font-size: 11px; font-weight: 700; }
.filtros { display: flex; flex-wrap: wrap; gap: 12px; align-items: end; margin-bottom: 20px; }
.filtros label { flex: 1 1 140px; }
.filtros .busca { flex: 2 1 240px; }
.filtros label span { display: block; font-size: 11px; color: #776b65; margin-bottom: 6px; font-weight: 700; }
input, select { width: 100%; height: 42px; border: 1px solid #ded5ce; border-radius: 9px; background: white; padding: 0 12px; color: #514843; font: inherit; font-size: 12px; }
:where(input, select, button, a):focus-visible { outline: 3px solid #b6686d; outline-offset: 3px; }
.acao { display: inline-flex; align-items: center; justify-content: center; border: 1px solid #9b555a; border-radius: 9px; padding: 8px 11px; color: #8f252b; background: #fffdfa; font-size: 11px; font-weight: 800; text-decoration: none; white-space: nowrap; cursor: pointer; }
.acao:hover { background: #f7e8df; }
.acao:disabled { opacity: .4; cursor: default; }
.limpar { height: 42px; border-color: #e6dace; }
.tabela { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; text-align: left; white-space: nowrap; }
th { background: #f5e8dc; padding: 13px 12px; font-size: 11px; color: #62463d; }
th:first-child { border-radius: 8px 0 0 0; }
th:last-child { border-radius: 0 8px 0 0; }
td { padding: 18px 12px; border-bottom: 1px solid #eee4db; font-size: 12px; color: #443b37; }
tbody tr:hover { background: #fcf7f0; }
.protocolo { font-weight: 800; }
.clinica { display: block; font-size: 11px; color: #8a817c; margin-top: 4px; }
.situacao { display: inline-block; padding: 5px 8px; border-radius: 7px; background: #fff0d9; color: #956022; font-size: 11px; font-weight: 700; }
.situacao.analise { background: #e5edf7; color: #3d6585; }
.rodape-tabela { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding-top: 22px; font-size: 11px; color: #8a817c; flex-wrap: wrap; }
.paginacao { display: flex; gap: 6px; }
.atual { background: #8f252b; color: white; }
.atual:hover { background: #741e23; }
.vazio { text-align: center; padding: 50px 16px; white-space: normal; }
.vazio p { margin-top: 8px; color: #8a817c; }
.dados { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-top: 22px; }
.dados div { background: #faf7f2; padding: 14px; border: 1px solid #eee4db; border-radius: 9px; }
dt { font-size: 11px; color: #8a817c; }
dd { margin-top: 6px; font-size: 13px; font-weight: 700; overflow-wrap: anywhere; }
.aviso { margin-top: 20px; padding: 12px; background: #fff3dd; color: #806139; font-size: 12px; border-radius: 8px; }
footer { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; font-size: 11px; color: #938780; }
@media (max-width: 480px) { .dados { grid-template-columns: 1fr; } }
</style>
