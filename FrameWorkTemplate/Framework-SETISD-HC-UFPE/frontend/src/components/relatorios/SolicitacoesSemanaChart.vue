<template>
  <section class="rounded-2xl border border-[#E9DCCB] bg-white p-5 shadow-paper sm:p-6">
    <header class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
      <h2 class="text-base font-bold text-paper-text">Solicitações por semana</h2>
      <span class="text-xs text-[#8A817C]">Evolução simulada</span>
    </header>

    <svg
      viewBox="0 0 400 170"
      class="mx-auto mt-4 w-full max-w-xl"
      role="img"
      :aria-label="descricao"
    >
      <g v-for="valor in marcas" :key="valor">
        <line x1="33" x2="382" :y1="posicaoY(valor)" :y2="posicaoY(valor)" stroke="#E9DCCB" />
        <text x="25" :y="posicaoY(valor)" dominant-baseline="middle" text-anchor="end" class="fill-[#776A63] text-[11px]">
          {{ valor }}
        </text>
      </g>
      <polyline :points="linha" fill="none" stroke="#8F252B" stroke-width="3" stroke-linejoin="round" />
      <g v-for="ponto in pontos" :key="ponto.semana">
        <circle :cx="ponto.x" :cy="ponto.y" r="4" fill="#8F252B">
          <title>Dias {{ ponto.inicio }} a {{ ponto.fim }} · {{ ponto.solicitacoes }} solicitações</title>
        </circle>
        <text :x="ponto.x" y="162" text-anchor="middle" class="fill-[#776A63] text-[11px]">
          Sem {{ ponto.semana }}
        </text>
      </g>
    </svg>

    <p class="mt-3 text-xs text-[#776A63]">Acompanhamento do volume de solicitações no mês selecionado.</p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ResumoRelatorio } from '../../services/relatoriosService';

const props = defineProps<{ semanas: ResumoRelatorio['porSemana'] }>();

const passo = computed(() => {
  const maior = Math.max(...props.semanas.map(({ solicitacoes }) => solicitacoes), 1);
  return Math.ceil(maior / 4);
});
const marcas = computed(() => Array.from({ length: 5 }, (_, indice) => indice * passo.value));

/** Projeta a contagem no eixo vertical, a partir da linha de base zero. */
function posicaoY(valor: number): number {
  return 145 - (valor / (4 * passo.value)) * 128;
}

const pontos = computed(() => props.semanas.map((semana, indice) => ({
  ...semana,
  x: 55 + indice * (305 / Math.max(props.semanas.length - 1, 1)),
  y: posicaoY(semana.solicitacoes),
})));
const linha = computed(() => pontos.value.map(({ x, y }) => `${x},${y}`).join(' '));
const descricao = computed(() => `Solicitações por semana. ${props.semanas.map(
  ({ inicio, fim, solicitacoes }) => `Dias ${inicio} a ${fim}: ${solicitacoes}`,
).join('. ')}.`);
</script>
