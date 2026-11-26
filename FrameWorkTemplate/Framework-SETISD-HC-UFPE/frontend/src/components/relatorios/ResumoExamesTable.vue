<template>
  <section class="min-w-0 rounded-2xl border border-[#E9DCCB] bg-white shadow-paper">
    <h2 class="px-5 py-4 text-base font-bold text-paper-text sm:px-6">Resumo por exame</h2>
    <div
      class="overflow-x-auto focus-visible:outline-2 focus-visible:outline-paper-primary"
      role="region"
      aria-label="Dados do resumo por exame"
      tabindex="0"
    >
      <table class="w-full border-collapse text-left text-sm text-[#5C534E]">
        <thead class="border-y border-[#E9DCCB] bg-[#FAF6F0] text-xs font-semibold text-[#776A63]">
          <tr>
            <th scope="col" class="px-5 py-3 sm:px-6">Exame</th>
            <th scope="col" class="px-3 py-3 text-right">Solicitações</th>
            <th scope="col" class="px-3 py-3 text-right">Agendados</th>
            <th scope="col" class="px-3 py-3 text-right">Realizados</th>
            <th scope="col" class="px-3 py-3 text-right">Ausências</th>
            <th scope="col" class="px-5 py-3 text-right whitespace-nowrap sm:px-6">Espera média (dias)</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#F0E7DC]">
          <tr v-for="linha in exames" :key="linha.exame" class="hover:bg-[#FAF6F0]">
            <th scope="row" class="px-5 py-3 font-medium sm:px-6">{{ linha.exame }}</th>
            <td class="px-3 py-3 text-right tabular-nums">{{ linha.solicitacoes }}</td>
            <td class="px-3 py-3 text-right tabular-nums">{{ linha.agendados }}</td>
            <td class="px-3 py-3 text-right tabular-nums">{{ linha.realizados }}</td>
            <td class="px-3 py-3 text-right tabular-nums">{{ linha.ausencias }}</td>
            <td class="px-5 py-3 text-right tabular-nums sm:px-6">{{ formatarEspera(linha.esperaMedia) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { formatarEspera, type ResumoRelatorio } from '../../services/relatoriosService';

defineProps<{ exames: ResumoRelatorio['porExame'] }>();
</script>
