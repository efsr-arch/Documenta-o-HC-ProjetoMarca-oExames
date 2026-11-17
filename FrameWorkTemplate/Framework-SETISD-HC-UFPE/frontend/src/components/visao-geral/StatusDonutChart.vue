<template>
  <section class="rounded-2xl border border-[#E9DCCB] bg-white p-6 shadow-paper flex flex-col">
    <header class="flex items-baseline justify-between gap-2">
      <h2 class="text-base font-bold text-paper-text">
        Solicitações por status
      </h2>
      <span class="text-xs text-[#8A817C]">
        Distribuição atual
      </span>
    </header>

    <div class="mt-6 flex flex-1 flex-col items-center justify-center gap-8 sm:flex-row sm:justify-around">
      <!-- Gráfico Donut em SVG sem dependências externas -->
      <div class="relative flex h-44 w-44 shrink-0 items-center justify-center">
        <svg
          viewBox="0 0 180 180"
          class="h-full w-full -rotate-90"
          role="img"
          :aria-label="`Distribuição de ${total} solicitações por status`"
        >
          <circle
            cx="90"
            cy="90"
            :r="RADIUS"
            fill="transparent"
            stroke="#F3E9DB"
            :stroke-width="STROKE_WIDTH"
          />

          <circle
            v-for="segmento in segmentos"
            :key="segmento.id"
            cx="90"
            cy="90"
            :r="RADIUS"
            fill="transparent"
            :stroke="segmento.cor"
            :stroke-width="activeId === segmento.id ? STROKE_WIDTH + 3 : STROKE_WIDTH"
            :stroke-dasharray="`${segmento.comprimento} ${CIRCUMFERENCE}`"
            :stroke-dashoffset="-segmento.deslocamento"
            :opacity="activeId && activeId !== segmento.id ? 0.55 : 1"
            class="cursor-pointer transition-all duration-200"
            @mouseenter="activeId = segmento.id"
            @mouseleave="activeId = null"
          />
        </svg>

        <div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span class="text-3xl font-extrabold leading-none text-paper-text tabular-nums">
            {{ segmentoAtivo ? segmentoAtivo.quantidade : total }}
          </span>
          <span class="mt-1 text-xs text-[#8A817C]">
            {{ segmentoAtivo ? `${segmentoAtivo.percentual}%` : 'solicitações' }}
          </span>
        </div>
      </div>

      <!-- Legenda lateral -->
      <ul class="w-full max-w-[210px] space-y-2.5">
        <li
          v-for="segmento in segmentos"
          :key="segmento.id"
          class="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1 text-sm transition-colors"
          :class="activeId === segmento.id ? 'bg-[#F7F2E9]' : 'hover:bg-[#FAF6F0]'"
          @mouseenter="activeId = segmento.id"
          @mouseleave="activeId = null"
        >
          <div class="flex items-center gap-2.5 min-w-0">
            <span
              class="h-2.5 w-2.5 shrink-0 rounded-full"
              :style="{ backgroundColor: segmento.cor }"
            />
            <span class="truncate text-[#5C534E]">
              {{ segmento.label }} · <strong class="font-semibold text-paper-text tabular-nums">{{ segmento.quantidade }}</strong>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { StatusDistribuicao } from '../../types/visaoGeral';

const props = defineProps<{
  items: StatusDistribuicao[];
  total: number;
}>();

const RADIUS = 64;
const STROKE_WIDTH = 28;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const activeId = ref<string | null>(null);

interface SegmentoCalculado extends StatusDistribuicao {
  comprimento: number;
  deslocamento: number;
  percentual: number;
}

/**
 * Converte a lista de status em arcos proporcionais ao total para o círculo SVG.
 */
const segmentos = computed<SegmentoCalculado[]>(() => {
  const somaTotal = props.items.reduce((acc, item) => acc + item.quantidade, 0) || 1;
  let acumulado = 0;

  return props.items.map((item) => {
    const fracao = item.quantidade / somaTotal;
    const comprimento = fracao * CIRCUMFERENCE;
    const deslocamento = acumulado;
    acumulado += comprimento;

    return {
      ...item,
      comprimento,
      deslocamento,
      percentual: Math.round(fracao * 100),
    };
  });
});

const segmentoAtivo = computed(() =>
  segmentos.value.find((segmento) => segmento.id === activeId.value) ?? null,
);
</script>
