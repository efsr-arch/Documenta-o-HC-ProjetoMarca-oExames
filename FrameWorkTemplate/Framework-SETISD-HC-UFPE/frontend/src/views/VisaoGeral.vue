<template>
  <section class="space-y-6">
    <!-- Cabeçalho da Seção -->
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-[11px] font-bold uppercase tracking-wider text-paper-primary">
          SIGEX-HC / GESTÃO DE EXAMES
        </p>
        <h2 class="mt-0.5 text-2xl font-bold tracking-tight text-paper-text md:text-3xl">
          Visão geral
        </h2>
        <p class="mt-1 text-sm text-[#66615B]">
          Panorama das solicitações, prioridades e indicadores operacionais.
        </p>
      </div>

      <button
        type="button"
        @click="visaoGeralStore.atualizarSimulacao()"
        :disabled="visaoGeralStore.loading"
        class="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#EBD2C4] bg-[#F7E8DF] px-3.5 py-1.5 text-xs font-semibold text-paper-primary transition-colors hover:bg-[#F2DDD1] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <ArrowPathIcon
          class="h-3.5 w-3.5 shrink-0"
          :class="{ 'animate-spin': visaoGeralStore.loading }"
        />
        <span>{{ visaoGeralStore.resumo?.atualizadoEmTexto || 'Atualizado: há 5 min (simulação)' }}</span>
      </button>
    </div>

    <!-- Estado de Erro -->
    <div
      v-if="visaoGeralStore.errorMessage"
      class="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#F2C8C4] bg-[#F9E8E6] p-4 text-sm text-[#8F252B]"
      role="alert"
    >
      <span>{{ visaoGeralStore.errorMessage }}</span>
      <button
        type="button"
        @click="visaoGeralStore.carregarResumo()"
        class="rounded-lg border border-[#8F252B]/30 bg-white px-3 py-1.5 text-xs font-semibold text-[#8F252B] hover:bg-[#FAF5EE]"
      >
        Tentar novamente
      </button>
    </div>

    <!-- Estado de Carregamento Inicial -->
    <div
      v-else-if="visaoGeralStore.loading && !visaoGeralStore.resumo"
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      aria-busy="true"
    >
      <div
        v-for="indice in 4"
        :key="indice"
        class="h-32 animate-pulse rounded-2xl border border-[#E9DCCB] bg-white/80 p-5"
      />
    </div>

    <!-- Conteúdo Principal do Painel -->
    <template v-else-if="visaoGeralStore.resumo">
      <!-- Linha 1: 4 Cards de KPI -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          v-for="kpi in visaoGeralStore.resumo.kpis"
          :key="kpi.id"
          :kpi="kpi"
        />
      </div>

      <!-- Linha 2: Gráficos de Status e Clínicas -->
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <StatusDonutChart
          :items="visaoGeralStore.resumo.porStatus"
          :total="visaoGeralStore.resumo.totalSolicitacoes"
        />
        <ClinicaBarList :items="visaoGeralStore.resumo.porClinica" />
      </div>

      <!-- Linha 3: Pendências que Merecem Atenção -->
      <PendenciasCard :pendencias="visaoGeralStore.resumo.pendencias" />
    </template>

    <!-- Rodapé da Proposta Visual -->
    <footer class="flex flex-col items-start justify-between gap-2 pt-2 text-xs text-[#8A817C] sm:flex-row sm:items-center">
      <span>SIGEx-HC · Proposta visual para validação com o HC-UFPE</span>
      <span>Dados fictícios · Regras clínicas não homologadas</span>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ArrowPathIcon } from '@heroicons/vue/24/outline';
import KpiCard from '../components/visao-geral/KpiCard.vue';
import StatusDonutChart from '../components/visao-geral/StatusDonutChart.vue';
import ClinicaBarList from '../components/visao-geral/ClinicaBarList.vue';
import PendenciasCard from '../components/visao-geral/PendenciasCard.vue';
import { useVisaoGeralStore } from '../stores/visaoGeral';

const visaoGeralStore = useVisaoGeralStore();

onMounted(() => {
  if (!visaoGeralStore.resumo) {
    visaoGeralStore.carregarResumo();
  }
});
</script>
