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
      class="bg-paper-sidebar text-gray-100 pt-7 pb-2 px-2 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition-all duration-300 ease-in-out z-20 h-full shrink-0 flex flex-col justify-between"
    >
      <div>
        <!-- Clique em "Nome do Sistema" recolhe/expande a barra lateral -->
        <div 
          @click="toggleSidebar" 
          title="Clique para recolher / expandir o menu"
          class="cursor-pointer text-white flex items-center space-x-3 px-3 mb-6 hover:opacity-90 transition duration-150 group"
        >
          <CubeTransparentIcon class="h-8 w-8 shrink-0 group-hover:scale-105 transition-transform" />
          <span v-if="!isCollapsed" class="text-xl font-extrabold leading-snug break-words select-none">
            {{ SYSTEM_TITLE }}
          </span>
        </div>

        <div class="px-3 my-4">
          <div class="border-t border-white border-opacity-20"></div>
        </div>

        <!-- Links de Navegação -->
        <!-- Navegação principal do SIGEx-HC -->
        <nav class="space-y-2">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            :title="isCollapsed ? item.label : ''"
            :class="[
              isCollapsed ? 'justify-center px-2' : 'px-4'
            ]"
            class="flex items-center gap-3 py-2.5 rounded-lg
                   text-white/90 transition duration-200
                   hover:bg-paper-active-link hover:text-white"
          >
            <component
              :is="item.icon"
              class="h-6 w-6 shrink-0"
            />
        
            <span v-if="!isCollapsed" class="text-sm leading-snug whitespace-normal break-words">
              {{ item.label }}
            </span>
          </router-link>
        </nav>
      </div>

      <!-- Rodapé de Versão da Sidebar -->
      <div v-if="!isCollapsed" class="px-4 pt-3 pb-1 border-t border-white/10 text-xs text-gray-400 mt-auto truncate transition-opacity duration-200">
        <p class="font-semibold text-gray-200 truncate">{{ APP_NAME }}</p>
        <p class="text-[11px] text-gray-400 truncate">Versão {{ APP_VERSION }} | HC-UFPE</p>
      </div>
      <div v-else class="px-2 pt-3 pb-1 border-t border-white/10 text-[10px] text-center text-gray-400 mt-auto">
        v{{ APP_VERSION }}
      </div>
    </aside>

    <!-- Content -->
    <div class="flex-1 flex flex-col bg-paper-bg overflow-y-auto h-full">
      <header class="flex justify-between items-center
         px-4 py-5 md:px-6
         bg-white/90 backdrop-blur-md
         border-b border-[#E9DCCB]
         sticky top-0 z-10">
        <div>
          <h1 class="text-2xl font-semibold text-paper-text">{{ $route.name }}</h1>
        </div>
        <div>
          <router-link v-if="!authStore.isAuthenticated" to="/login">
            <Button variant="primary">
              <template #icon>
                <ArrowRightOnRectangleIcon class="h-5 w-5" />
              </template>
              Login
            </Button>
          </router-link>
          <ProfileDropdown v-else />
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
  ClockIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  CubeTransparentIcon,
  Bars3Icon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/vue/24/outline';
import ProfileDropdown from '../components/ProfileDropdown.vue';
import Button from '../components/Button.vue';
import { useAuthStore } from '../stores/auth';
import { APP_VERSION, APP_NAME, SYSTEM_TITLE } from '../config/version';

const sidebarOpen = ref(false);
const isCollapsed = ref(false);

const route = useRoute();
const authStore = useAuthStore();

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
    icon: ClockIcon,
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