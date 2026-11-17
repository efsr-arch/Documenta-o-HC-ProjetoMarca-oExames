<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center gap-2.5 text-left focus:outline-none transition-opacity hover:opacity-90 active:scale-98"
      aria-label="Menu do perfil de usuário"
    >
      <div class="h-9 w-9 rounded-full bg-[#8F252B] text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm shrink-0">
        {{ userInitials }}
      </div>
      <div class="hidden sm:block">
        <div class="flex items-center gap-1">
          <span class="text-xs font-bold text-[#302D2C] leading-tight">
            {{ userName }}
          </span>
          <ChevronDownIcon class="h-3 w-3 text-stone-400" />
        </div>
        <p class="text-[10px] text-stone-400 leading-tight">
          {{ userSubtitle }}
        </p>
      </div>
    </button>

    <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0 h-full w-full z-10"></div>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl z-20 border border-gray-100 overflow-hidden transform origin-top-right transition-all"
    >
      <div class="p-5">
        <div class="flex items-center space-x-4">
          <div class="flex-shrink-0">
            <div class="h-12 w-12 rounded-full bg-[#F7E8DF] text-[#8F252B] flex items-center justify-center font-bold text-sm border border-[#EBD2C4]">
              {{ userInitials }}
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-base font-bold text-gray-900 leading-tight break-words">
              {{ userName }}
            </p>
            <p class="text-xs text-gray-500 break-all mt-0.5">
              {{ authStore.user?.userPrincipalName?.[0] || authStore.user?.username || 'marcadora.a@hc.ufpe.br' }}
            </p>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-100 bg-gray-50/50">
        <div class="p-4 space-y-3 text-xs">
          <div class="flex items-start">
            <BriefcaseIcon class="h-4 w-4 mr-2.5 text-gray-400 shrink-0 mt-0.5" />
            <div class="flex-1">
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Função</p>
              <p class="text-gray-800 font-medium leading-snug">{{ userSubtitle }}</p>
            </div>
          </div>
          <div class="flex items-start">
            <BuildingOffice2Icon class="h-4 w-4 mr-2.5 text-gray-400 shrink-0 mt-0.5" />
            <div class="flex-1">
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Setor</p>
              <p class="text-gray-800 font-medium leading-snug">{{ authStore.user?.department?.[0] || 'Central de Regulação e Marcação' }}</p>
            </div>
          </div>
          <div class="flex items-start">
            <IdentificationIcon class="h-4 w-4 mr-2.5 text-gray-400 shrink-0 mt-0.5" />
            <div class="flex-1">
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Lotação</p>
              <p class="text-gray-800 font-medium leading-snug">Hospital das Clínicas · UFPE</p>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-100 bg-gray-100/50">
        <a
          href="#"
          @click.prevent="handleLogout"
          class="flex items-center justify-center px-4 py-3 text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition duration-150 ease-in-out"
        >
          <ArrowLeftOnRectangleIcon class="h-4 w-4 mr-2" />
          <span>Sair da Sessão</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  ArrowLeftOnRectangleIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  IdentificationIcon,
  ChevronDownIcon,
} from '@heroicons/vue/24/outline';
import { useAuthStore } from '../stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const isOpen = ref(false);

const userName = computed(() => {
  return (
    authStore.user?.givenName?.[0] ||
    authStore.user?.username ||
    'Marcadora A'
  );
});

const userSubtitle = computed(() => {
  return (
    authStore.user?.title?.[0] ||
    'Usuária de demonstração'
  );
});

const userInitials = computed(() => {
  const nome = userName.value;
  if (!nome) return 'MA';
  const partes = nome.trim().split(/\s+/);
  if (partes.length >= 2) {
    return (partes[0][0] + partes[1][0]).toUpperCase();
  }
  return nome.slice(0, 2).toUpperCase();
});

const handleLogout = async () => {
  await authStore.logout(router);
};

// Close dropdown on navigation
watch(() => route.path, () => {
  isOpen.value = false;
});
</script>
