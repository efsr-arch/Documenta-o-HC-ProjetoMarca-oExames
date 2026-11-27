<template>
  <section class="admin space-y-[18px]">
    <!-- Cabeçalho da Página -->
    <header class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="eyebrow">SIGEX-HC / GESTÃO DE EXAMES</p>
        <h1>Administração</h1>
        <p class="subtitulo">Gestão de usuários, perfis e parâmetros do sistema.</p>
      </div>

      <button type="button" class="btn-novo" @click="abrirNovo">
        <span class="btn-novo-mais" aria-hidden="true">+</span>
        <span>Novo usuário</span>
      </button>
    </header>

    <!-- Card principal com abas -->
    <div class="painel painel-principal">
      <div class="abas" role="tablist" aria-label="Seções da administração">
        <button
          v-for="aba in abasAdministracao"
          :key="aba.id"
          type="button"
          role="tab"
          class="aba"
          :class="{ ativa: abaAtiva === aba.id }"
          :aria-selected="abaAtiva === aba.id"
          @click="abaAtiva = aba.id"
        >
          {{ aba.label }}
        </button>
      </div>

      <!-- Aba: Usuários -->
      <div v-if="abaAtiva === 'usuarios'" role="tabpanel">
        <form class="filtros" @submit.prevent>
          <label class="busca">
            <span class="sr-only">Buscar usuários</span>
            <div class="busca-input-wrap">
              <MagnifyingGlassIcon class="busca-icone" aria-hidden="true" />
              <input
                v-model="filtros.busca"
                type="search"
                placeholder="Buscar usuários"
                aria-label="Buscar usuários"
              />
            </div>
          </label>

          <label class="filtro-select">
            <span class="sr-only">Perfil</span>
            <select v-model="filtros.perfil" aria-label="Filtrar por perfil">
              <option value="">Perfil</option>
              <option v-for="p in perfisDisponiveis" :key="p" :value="p">{{ p }}</option>
            </select>
            <ChevronDownIcon class="select-seta" aria-hidden="true" />
          </label>

          <label class="filtro-select">
            <span class="sr-only">Status</span>
            <select v-model="filtros.status" aria-label="Filtrar por status">
              <option value="">Status</option>
              <option v-for="s in statusDisponiveis" :key="s" :value="s">{{ s }}</option>
            </select>
            <ChevronDownIcon class="select-seta" aria-hidden="true" />
          </label>
        </form>

        <div class="tabela-container">
          <table>
            <caption class="sr-only">Tabela de usuários do sistema</caption>
            <colgroup>
              <col style="width: 23.2%" />
              <col style="width: 21.5%" />
              <col style="width: 16.3%" />
              <col style="width: 21.6%" />
              <col style="width: 17.4%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Perfil</th>
                <th scope="col">Status</th>
                <th scope="col">Último acesso</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="u in filtrados" :key="u.id">
                <td class="td-nome">{{ u.nome }}</td>
                <td>{{ u.perfil }}</td>
                <td>
                  <span class="badge-status" :class="u.status === 'Ativo' ? 'ativo' : 'inativo'">
                    {{ u.status }}
                  </span>
                </td>
                <td>{{ u.ultimoAcesso }}</td>
                <td>
                  <button
                    type="button"
                    class="btn-editar"
                    :aria-label="'Editar ' + u.nome"
                    @click="abrirEdicao(u)"
                  >
                    Editar
                  </button>
                </td>
              </tr>

              <tr v-if="!filtrados.length">
                <td colspan="5" class="estado-vazio">
                  <strong>Nenhum usuário encontrado</strong>
                  <p>Ajuste os termos de busca ou os filtros para visualizar os usuários.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="rodape-tabela">
          <p role="status">Mostrando {{ filtrados.length }} de {{ usuarios.length }} solicitações</p>

          <!-- Paginação apenas visual (protótipo) -->
          <nav aria-label="Paginação de usuários" class="paginacao">
            <button
              type="button"
              class="btn-pag"
              :disabled="paginaVisual === 1"
              aria-label="Página anterior"
              @click="paginaVisual--"
            >
              ‹
            </button>
            <button
              v-for="n in [1, 2, 3]"
              :key="n"
              type="button"
              class="btn-pag"
              :class="{ atual: paginaVisual === n }"
              :aria-current="paginaVisual === n ? 'page' : undefined"
              :aria-label="'Página ' + n"
              @click="paginaVisual = n"
            >
              {{ n }}
            </button>
            <button type="button" class="btn-pag" aria-label="Mais páginas" tabindex="-1">…</button>
            <button type="button" class="btn-pag" aria-label="Próxima página" @click="proximaVisual">›</button>
          </nav>
        </div>
      </div>

      <!-- Demais abas: conteúdo ainda não definido na referência visual -->
      <div v-else role="tabpanel" class="aba-vazia">
        <strong>{{ abaAtualLabel }}</strong>
        <p>Esta seção será detalhada após a validação com a equipe do HC.</p>
      </div>
    </div>

    <!-- Cards inferiores -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div class="painel painel-info">
        <div class="painel-info-topo">
          <h2>Perfis de acesso</h2>
          <span class="badge badge-permissoes">Permissões</span>
        </div>
        <p class="painel-info-texto">
          <template v-for="(p, i) in perfisDeAcesso" :key="p.perfil">
            <span v-if="i > 0"><br /></span>{{ p.perfil }}: {{ p.descricao }}
          </template>
        </p>
      </div>

      <div class="painel painel-info">
        <div class="painel-info-topo">
          <h2>Parâmetros de priorização</h2>
          <span class="badge badge-validar">A validar</span>
        </div>
        <p class="painel-info-texto">{{ textoParametrosPriorizacao }}</p>
      </div>
    </div>

    <!-- Modal: novo usuário / edição (somente visual, sem persistência) -->
    <Modal :show="modalAberto" @close="fecharModal">
      <template #header>{{ editandoId ? 'Editar usuário' : 'Novo usuário' }}</template>

      <form id="form-usuario" class="space-y-4" @submit.prevent="salvar">
        <div>
          <label class="campo-rotulo" for="usr-nome">Nome</label>
          <input id="usr-nome" v-model="formulario.nome" class="campo" type="text" required />
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label class="campo-rotulo" for="usr-perfil">Perfil</label>
            <select id="usr-perfil" v-model="formulario.perfil" class="campo">
              <option v-for="p in perfisDisponiveis" :key="p" :value="p">{{ p }}</option>
            </select>
          </div>
          <div>
            <label class="campo-rotulo" for="usr-status">Status</label>
            <select id="usr-status" v-model="formulario.status" class="campo">
              <option v-for="s in statusDisponiveis" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
        </div>
        <p class="aviso-prototipo">
          Protótipo visual: as alterações valem apenas nesta sessão e não são salvas.
        </p>
      </form>

      <template #footer>
        <button type="button" class="btn-secundario" @click="fecharModal">Cancelar</button>
        <button type="submit" form="form-usuario" class="btn-novo btn-salvar">Salvar</button>
      </template>
    </Modal>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import Modal from '../components/Modal.vue';
import {
  abasAdministracao,
  filtrarUsuarios,
  perfisDeAcesso,
  perfisDisponiveis,
  statusDisponiveis,
  textoParametrosPriorizacao,
  usuariosDemonstrativos,
  type AbaAdministracao,
  type FiltrosUsuarios,
  type PerfilUsuario,
  type StatusUsuario,
  type UsuarioAdmin,
} from '../data/administracao';

const abaAtiva = ref<AbaAdministracao['id']>('usuarios');
const abaAtualLabel = computed(
  () => abasAdministracao.find((a) => a.id === abaAtiva.value)?.label ?? '',
);

// Estado local (cópia dos dados fictícios; nada é persistido)
const usuarios = ref<UsuarioAdmin[]>(usuariosDemonstrativos.map((u) => ({ ...u })));
const filtros = reactive<FiltrosUsuarios>({ busca: '', perfil: '', status: '' });
const filtrados = computed(() => filtrarUsuarios(usuarios.value, filtros));

// Paginação apenas visual
const paginaVisual = ref(1);
const proximaVisual = () => {
  paginaVisual.value = Math.min(3, paginaVisual.value + 1);
};

// Modal
const modalAberto = ref(false);
const editandoId = ref<string | null>(null);
const formulario = reactive<{ nome: string; perfil: PerfilUsuario; status: StatusUsuario }>({
  nome: '',
  perfil: 'Marcadora',
  status: 'Ativo',
});

function abrirNovo() {
  editandoId.value = null;
  Object.assign(formulario, { nome: '', perfil: 'Marcadora', status: 'Ativo' });
  modalAberto.value = true;
}

function abrirEdicao(u: UsuarioAdmin) {
  editandoId.value = u.id;
  Object.assign(formulario, { nome: u.nome, perfil: u.perfil, status: u.status });
  modalAberto.value = true;
}

function fecharModal() {
  modalAberto.value = false;
}

function salvar() {
  const nome = formulario.nome.trim();
  if (!nome) return;
  if (editandoId.value) {
    const alvo = usuarios.value.find((u) => u.id === editandoId.value);
    if (alvo) Object.assign(alvo, { nome, perfil: formulario.perfil, status: formulario.status });
  } else {
    usuarios.value.push({
      id: `u${Date.now()}`,
      nome,
      perfil: formulario.perfil,
      status: formulario.status,
      ultimoAcesso: '—',
    });
  }
  fecharModal();
}
</script>

<style scoped>
.admin {
  color: #482225;
}

/* Tipografia */
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

/* Botão "+ Novo usuário" */
.btn-novo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 18px;
  border: 0;
  border-radius: 8px;
  background-color: #8f252b;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(143, 37, 43, 0.25);
  transition: background-color 0.15s ease;
}

.btn-novo:hover {
  background-color: #741e23;
}

.btn-novo-mais {
  font-size: 13px;
  line-height: 1;
}

/* Painéis */
.painel {
  border: 1px solid #e9dccb;
  border-radius: 16px;
  background: #fffdfb;
  box-shadow: 0 4px 16px rgba(100, 61, 36, 0.04);
}

.painel-principal {
  padding: 21px 22px 20px;
}

/* Abas */
.abas {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding-top: 0;
  margin-bottom: 14px;
  border-bottom: 1px solid #e9dccb;
}

.aba {
  position: relative;
  padding: 11px 10px 14px;
  margin: 0 5px 0 0;
  font-size: 12px;
  font-weight: 700;
  color: #7d736d;
  background: none;
  border: 0;
  cursor: pointer;
}

.aba:hover {
  color: #8f252b;
}

.aba.ativa {
  color: #8f252b;
}

.aba.ativa::after {
  content: '';
  position: absolute;
  left: 3px;
  right: 3px;
  bottom: -1px;
  height: 2px;
  border-radius: 2px;
  background: #8f252b;
}

/* Filtros */
.filtros {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 16px;
}

.filtros .busca {
  flex: 1 1 280px;
}

.busca-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.busca-icone {
  position: absolute;
  left: 12px;
  height: 13px;
  width: 13px;
  color: #a89f91;
  pointer-events: none;
}

.filtros input[type='search'] {
  width: 100%;
  height: 40px;
  border: 1px solid #ded5ce;
  border-radius: 8px;
  background: #fffdfb;
  padding: 0 12px 0 30px;
  color: #514843;
  font-size: 12px;
}

.filtros input[type='search']::placeholder {
  color: #8a817c;
}

.filtro-select {
  position: relative;
  flex: 0 0 148px;
}

.filtro-select select {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 40px;
  border: 1px solid #ded5ce;
  border-radius: 8px;
  background-color: #fffdfb;
  padding: 0 32px 0 12px;
  color: #514843;
  font-size: 12px;
  cursor: pointer;
}

.select-seta {
  position: absolute;
  right: 12px;
  top: 50%;
  height: 11px;
  width: 11px;
  transform: translateY(-50%);
  color: #514843;
  pointer-events: none;
  stroke-width: 2.5;
}

:where(input, select):focus {
  outline: none;
  border-color: #8f252b;
  box-shadow: 0 0 0 1px #8f252b;
}

/* Tabela */
.tabela-container {
  overflow-x: auto;
}

table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  text-align: left;
  white-space: nowrap;
}

thead tr {
  background-color: #f5e8dc;
}

th {
  padding: 12px;
  height: 36px;
  font-size: 11px;
  font-weight: 700;
  color: #62463d;
}

th:first-child {
  border-top-left-radius: 8px;
}

th:last-child {
  border-top-right-radius: 8px;
}

td {
  height: 59px;
  padding: 0 12px;
  border-bottom: 1px solid #eee4db;
  font-size: 12px;
  color: #5a504b;
}

tbody tr:last-child td {
  border-bottom: 0;
}

tbody tr:hover {
  background-color: #fdfaf6;
}

.td-nome {
  font-weight: 800;
  color: #302d2c;
}

/* Badges de status */
.badge-status {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 10.5px;
  font-weight: 700;
  line-height: 1.2;
}

.badge-status.ativo {
  background-color: #e0eee2;
  color: #2d6a4f;
}

.badge-status.inativo {
  background-color: #efedeb;
  color: #6f6a66;
}

/* Botão Editar */
.btn-editar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 0 11px;
  border: 1px solid #9b555a;
  border-radius: 8px;
  background-color: #ffffff;
  color: #8f252b;
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-editar:hover {
  background-color: #f9ede7;
  border-color: #8f252b;
}

/* Estado vazio */
.estado-vazio {
  text-align: center;
  padding: 40px 16px;
  white-space: normal;
  height: auto;
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

/* Rodapé da tabela e paginação */
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
  min-width: 27px;
  height: 27px;
  padding: 0 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ded5ce;
  border-radius: 6px;
  background-color: #fffdfb;
  color: #514843;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-pag:hover:not(:disabled) {
  background-color: #f5ebe2;
}

.btn-pag:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-pag.atual {
  background-color: #8f252b;
  border-color: #8f252b;
  color: #ffffff;
}

/* Abas sem conteúdo definido */
.aba-vazia {
  padding: 56px 16px 48px;
  text-align: center;
}

.aba-vazia strong {
  display: block;
  font-size: 14px;
  color: #482225;
}

.aba-vazia p {
  margin-top: 6px;
  font-size: 12px;
  color: #8a817c;
}

/* Cards inferiores */
.painel-info {
  padding: 22px;
  min-height: 166px;
}

.painel-info-topo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.painel-info h2 {
  font-size: 15px;
  font-weight: 800;
  color: #3b1c1d;
}

.painel-info-texto {
  margin-top: 22px;
  font-size: 12px;
  line-height: 1.7;
  color: #6f655f;
}

.badge {
  display: inline-block;
  padding: 5px 9px;
  border-radius: 6px;
  font-size: 10.5px;
  font-weight: 700;
  line-height: 1.2;
}

.badge-permissoes {
  background-color: #f6dde0;
  color: #8f252b;
}

.badge-validar {
  background-color: #fdefd3;
  color: #8a5a00;
}

/* Modal */
.campo-rotulo {
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
  font-weight: 700;
  color: #62463d;
}

.campo {
  width: 100%;
  height: 40px;
  border: 1px solid #ded5ce;
  border-radius: 8px;
  background: #ffffff;
  padding: 0 12px;
  font-size: 13px;
  color: #514843;
}

.aviso-prototipo {
  font-size: 11px;
  color: #8a817c;
}

.btn-secundario {
  height: 36px;
  padding: 0 16px;
  border: 1px solid #ded5ce;
  border-radius: 8px;
  background: #ffffff;
  color: #62463d;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.btn-secundario:hover {
  background: #f5ebe2;
}

.btn-salvar {
  box-shadow: none;
}
</style>
