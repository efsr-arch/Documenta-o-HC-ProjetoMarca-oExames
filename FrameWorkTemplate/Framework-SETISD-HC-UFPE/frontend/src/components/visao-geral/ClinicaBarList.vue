<template>
  <section class="rounded-2xl border border-[#E9DCCB] bg-white p-6 shadow-paper flex flex-col">
    <header class="flex items-baseline justify-between gap-2">
      <h2 class="text-base font-bold text-paper-text">
        Solicitações por clínica
      </h2>
      <span class="text-xs text-[#8A817C]">
        Último período
      </span>
    </header>

    <ul class="mt-6 flex-1 space-y-4">
      <li
        v-for="item in items"
        :key="item.id"
        class="grid grid-cols-[112px_1fr_32px] items-center gap-3 text-sm"
      >
        <span class="truncate font-medium text-[#5C534E]" :title="item.clinica">
          {{ item.clinica }}
        </span>

        <div
          class="h-2.5 w-full overflow-hidden rounded-full bg-[#F3E9DB]"
          role="progressbar"
          :aria-label="`${item.clinica}: ${item.quantidade} solicitações`"
          :aria-valuenow="item.quantidade"
          aria-valuemin="0"
          :aria-valuemax="escalaMaxima"
        >
          <div
            class="h-full rounded-full bg-[#9E2A2F] transition-all duration-500 ease-out"
            :style="{ width: `${calcularPercentual(item.quantidade)}%` }"
          />
        </div>

        <span class="text-right font-semibold text-paper-text tabular-nums">
          {{ item.quantidade }}
        </span>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ClinicaDistribuicao } from '../../types/visaoGeral';

const props = defineProps<{
  items: ClinicaDistribuicao[];
}>();

/** Margem de respiro na trilha para evitar que a maior barra ocupe 100% visualmente. */
const escalaMaxima = computed(() => {
  const maior = Math.max(...props.items.map((item) => item.quantidade), 0);
  return maior > 0 ? Math.ceil(maior * 1.2) : 1;
});

/**
 * Calcula a largura percentual da barra horizontal com limite mínimo visível.
 * @param quantidade Quantidade de solicitações da clínica.
 */
function calcularPercentual(quantidade: number): number {
  if (quantidade <= 0) return 0;
  return Math.min(100, Math.round((quantidade / escalaMaxima.value) * 100));
}
</script>
