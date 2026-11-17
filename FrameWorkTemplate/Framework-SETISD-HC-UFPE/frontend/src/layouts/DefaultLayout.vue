<template>
  <div class="relative h-screen overflow-hidden md:flex">
    <!-- Mobile Menu Header -->
    <div class="bg-paper-sidebar text-gray-100 flex justify-between md:hidden shrink-0">
      <router-link to="/" class="block p-4 text-white font-bold">{{ SYSTEM_TITLE }}</router-link>
      <button @click="sidebarOpen = !sidebarOpen" class="p-4 focus:outline-none focus:bg-paper-active-link">
        <Bars3Icon class="h-6 w-6" />
      </button>
    </div>

    <!-- Sidebar (Expansível / Recolhível) -->
    <aside 
      :class="[
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        isCollapsed ? 'md:w-20' : 'md:w-64'
      ]" 
      class="bg-paper-sidebar text-gray-100 pt-7 pb-2 px-3 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition-all duration-300 ease-in-out z-20 h-full shrink-0 flex flex-col justify-between"
    >
      <div>
        <!-- Clique em "Nome do Sistema" recolhe/expande a barra lateral -->
        <div 
          @click="toggleSidebar" 
          title="Clique para recolher / expandir o menu"
          class="cursor-pointer text-white px-2 mb-6 hover:opacity-95 transition duration-150"
        >
          <div v-if="!isCollapsed" class="select-none">
            <h2 class="text-xl font-extrabold tracking-tight text-white leading-tight">SIGEX-HC</h2>
            <p class="text-[11px] text-white/80 font-medium leading-snug mt-1">
              Sistema de Apoio à Marcação de Exames
            </p>
            <p class="text-[10px] text-white/60 leading-snug mt-0.5">
              Hospital das Clínicas · UFPE
            </p>
          </div>
          <div v-else class="flex justify-center">
            <CubeTransparentIcon class="h-8 w-8 text-white hover:scale-105 transition-transform" />
          </div>
        </div>

        <div class="px-1 my-3">
          <div class="border-t border-white/20"></div>
        </div>

        <!-- Links de Navegação -->
        <!-- Navegação principal do SIGEx-HC -->
        <nav class="space-y-1.5">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            :title="isCollapsed ? item.label : ''"
            :class="[
              isCollapsed ? 'justify-center px-2' : 'px-3.5',
              $route.path === item.path
                ? 'bg-[#FFF7F2] text-[#8F252B] font-bold shadow-sm'
                : 'text-white/90 hover:bg-white/10 hover:text-white'
            ]"
            class="flex items-center gap-3 py-2.5 rounded-xl transition duration-150"
          >
            <component
              :is="item.icon"
              class="h-5 w-5 shrink-0"
              :class="$route.path === item.path ? 'text-[#8F252B]' : 'text-white/80'"
            />
        
            <span v-if="!isCollapsed" class="text-sm leading-snug whitespace-normal break-words">
              {{ item.label }}
            </span>
          </router-link>
        </nav>
      </div>

      <!-- Rodapé de Versão da Sidebar -->
      <div v-if="!isCollapsed" class="px-3 pt-3 pb-2 border-t border-white/10 text-xs text-white/70 mt-auto truncate transition-opacity duration-200">
        <p class="font-semibold text-white/90 truncate">HC-UFPE · Ambiente de demonstração</p>
        <p class="text-[11px] text-white/60 truncate">Proposta visual v{{ APP_VERSION }} - 2026</p>
      </div>
      <div v-else class="px-2 pt-3 pb-1 border-t border-white/10 text-[10px] text-center text-white/60 mt-auto">
        v{{ APP_VERSION }}
      </div>
    </aside>

    <!-- Content -->
    <div class="flex-1 flex flex-col bg-paper-bg overflow-y-auto h-full">
      <header class="flex justify-between items-center
         px-4 py-4 md:px-6
         bg-[#FFFDFB]/95 backdrop-blur-md
         border-b border-[#E9DCCB]
         sticky top-0 z-10">
        <div>
          <h2 class="text-sm font-bold text-[#302D2C] leading-tight">Hospital das Clínicas · UFPE</h2>
          <p class="text-xs text-stone-500 leading-tight">Aplicação interna / Gestão de exames</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider text-[#8F252B] bg-[#F7E8DF] border border-[#EBD2C4]">
            PROTÓTIPO VISUAL
          </span>
          <button
            type="button"
            class="p-2 text-stone-500 hover:text-[#8F252B] hover:bg-[#F7E8DF] rounded-full transition-colors"
            title="Hospital das Clínicas da UFPE / EBSERH"
            aria-label="Atendimento Hospitalar"
          >
            <HeartIcon class="h-5 w-5" />
          </button>
          <ProfileDropdown />
        </div>
      </header>
      <main class="flex-1">
        <div class="w-full max-w-[1600px] mx-auto px-4 py-4 md:px-6 md:py-6">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  CubeTransparentIcon,
  Bars3Icon,
  HeartIcon,
  ArrowPathIcon,
} from '@heroicons/vue/24/outline';
import ProfileDropdown from '../components/ProfileDropdown.vue';
import { APP_VERSION, SYSTEM_TITLE } from '../config/version';

const sidebarOpen = ref(false);
const isCollapsed = ref(false);

const route = useRoute();

const menuItems = [
  {
    label: 'Visão Geral',
    path: '/visao-geral',
    icon: HomeIcon,
  },
  {
    label: 'Fila de Marcação',
    path: '/fila-marcacao',
    icon: ClipboardDocumentListIcon,
  },
  {
    label: 'Fila de Espera',
    path: '/fila-espera',
    icon: UserGroupIcon,
  },
  {
    label: 'Entradas de Solicitações',
    path: '/entradas',
    icon: ArrowUpTrayIcon,
  },
  {
    label: 'Histórico',
    path: '/historico',
    icon: ArrowPathIcon,
  },
  {
    label: 'Relatórios',
    path: '/relatorios',
    icon: ChartBarIcon,
  },
  {
    label: 'Administração',
    path: '/administracao',
    icon: Cog6ToothIcon,
  },
];

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

// Close mobile sidebar on route change
watch(() => route.path, () => {
  sidebarOpen.value = false;
});
</script>
