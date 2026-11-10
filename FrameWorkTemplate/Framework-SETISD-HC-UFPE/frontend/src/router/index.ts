import { createRouter, createWebHistory, NavigationGuardNext } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Configuracoes from '../views/Configuracoes.vue';
import EmConstrucao from '../views/EmConstrucao.vue';

import Exemplos from '../views/Exemplos.vue';
import Pacientes from '../views/Pacientes.vue';

const routes = [
  {
    path: '/',
    redirect: '/visao-geral',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: 'LoginLayout' },
  },
  {
    path: '/visao-geral',
    name: 'Visão Geral',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/fila-marcacao',
    name: 'Fila de Marcação',
    component: EmConstrucao,
    meta: { requiresAuth: true },
  },
  {
    path: '/fila-espera',
    name: 'Fila de Espera',
    component: EmConstrucao,
    meta: { requiresAuth: true },
  },
  {
    path: '/solicitacoes/:id',
    name: 'Detalhes da Solicitação',
    component: EmConstrucao,
    meta: { requiresAuth: true },
  },
  {
    path: '/entradas',
    name: 'Entradas de Solicitações',
    component: EmConstrucao,
    meta: { requiresAuth: true },
  },
  {
    path: '/historico',
    name: 'Histórico',
    component: EmConstrucao,
    meta: { requiresAuth: true },
  },
  {
    path: '/relatorios',
    name: 'Relatórios',
    component: EmConstrucao,
    meta: { requiresAuth: true },
  },
  {
    path: '/administracao',
    name: 'Administração',
    component: EmConstrucao,
    meta: { requiresAuth: true },
  },

  // Rotas originais do framework, preservadas.
  {
    path: '/componentes',
    name: 'Componentes',
    component: Exemplos,
  },
  {
    path: '/exemplo',
    name: 'Exemplo',
    component: Pacientes,
    meta: { requiresAuth: true },
  },
  {
    path: '/configuracoes',
    name: 'Configurações',
    component: Configuracoes,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'bg-paper-active-link',
  linkExactActiveClass: 'bg-paper-active-link',
});

router.beforeEach((to, _from, next: NavigationGuardNext) => {
  // Pinia store must be used inside a function to ensure it's initialized
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
