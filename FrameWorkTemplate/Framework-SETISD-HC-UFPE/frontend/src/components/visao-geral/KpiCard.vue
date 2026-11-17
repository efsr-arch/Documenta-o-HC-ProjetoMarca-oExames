<template>
  <article
    class="rounded-2xl border border-[#E9DCCB] bg-white p-5 shadow-paper transition-shadow duration-200 hover:shadow-md"
  >
    <div class="flex items-start justify-between gap-3">
      <h2 class="text-sm font-semibold text-[#5C534E]">
        {{ kpi.titulo }}
      </h2>

      <div
        :class="badgeClass"
        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        aria-hidden="true"
      >
        <DocumentTextIcon v-if="kpi.icone === 'total'" class="h-4 w-4" />
        <ClockIcon v-else-if="kpi.icone === 'pendentes'" class="h-4 w-4" />
        <MagnifyingGlassIcon v-else-if="kpi.icone === 'analise'" class="h-4 w-4" />
        <!-- Ícone ampulheta em SVG para manter consistência visual com os ícones de linha -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4"
        >
          <path d="M5 4h14" />
          <path d="M5 20h14" />
          <path d="M7 4v3a5 5 0 0 0 10 0V4" />
          <path d="M7 20v-3a5 5 0 0 1 10 0v3" />
        </svg>
      </div>
    </div>

    <p class="mt-2.5 text-3xl font-extrabold tracking-tight text-paper-text tabular-nums">
      {{ kpi.valor }}
    </p>

    <p class="mt-1 text-xs text-[#8A817C]">
      {{ kpi.subtitulo }}
    </p>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  ClockIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline';
import type { KpiIndicador, KpiIconeTipo } from '../../types/visaoGeral';

const props = defineProps<{
  kpi: KpiIndicador;
}>();

const ICON_BADGE_CLASSES: Record<KpiIconeTipo, string> = {
  total: 'bg-[#F9EAE8] text-paper-primary',
  pendentes: 'bg-[#F9EAE8] text-paper-primary',
  analise: 'bg-[#F9EAE8] text-paper-primary',
  aguardando: 'bg-[#F7EFE1] text-[#8E6528]',
};

const badgeClass = computed(() => ICON_BADGE_CLASSES[props.kpi.icone]);
</script>
