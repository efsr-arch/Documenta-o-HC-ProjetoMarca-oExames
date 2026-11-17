<template>
  <section class="rounded-2xl border border-[#E9DCCB] bg-white p-6 shadow-paper">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h2 class="text-base font-bold text-paper-text">
        Pendências que merecem atenção
      </h2>

      <router-link
        to="/fila-marcacao"
        class="inline-flex items-center rounded-xl border border-[#D9C7B5] bg-white px-4 py-2 text-xs font-semibold text-paper-text transition-colors hover:border-paper-primary hover:bg-[#FAF5EE] hover:text-paper-primary focus:outline-none focus:ring-2 focus:ring-paper-primary/30"
      >
        Abrir fila de marcação
      </router-link>
    </div>

    <div class="mt-4 flex flex-wrap gap-2.5">
      <router-link
        v-for="pendencia in pendencias"
        :key="pendencia.id"
        :to="pendencia.rotaDestino"
        :class="BADGE_CLASSES[pendencia.variante]"
        class="inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-85"
      >
        {{ pendencia.texto }}
      </router-link>
    </div>

    <p class="mt-4 text-xs text-[#8A817C]">
      O painel destaca pendências operacionais; não toma decisões clínicas ou de agendamento.
    </p>
  </section>
</template>

<script setup lang="ts">
import type { PendenciaAtencao, PendenciaVariante } from '../../types/visaoGeral';

defineProps<{
  pendencias: PendenciaAtencao[];
}>();

const BADGE_CLASSES: Record<PendenciaVariante, string> = {
  alerta: 'bg-[#F9E8E6] text-[#8F252B]',
  atencao: 'bg-[#FDF2D6] text-[#8A6116]',
};
</script>
