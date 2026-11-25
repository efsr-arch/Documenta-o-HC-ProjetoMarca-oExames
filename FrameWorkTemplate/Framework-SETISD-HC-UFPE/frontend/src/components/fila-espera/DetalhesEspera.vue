<template>
  <dl class="dados">
    <div v-for="campo in campos" :key="campo.rotulo" :class="{ amplo: campo.amplo }">
      <dt>{{ campo.rotulo }}</dt>
      <dd>{{ campo.valor }}</dd>
    </div>
  </dl>
  <section class="prioridade" aria-label="Indicador de prioridade">
    <p>Prioridade demonstrativa <strong>{{ item.prioridade }}/100</strong></p>
    <div class="trilho" aria-hidden="true">
      <span :style="{ width: (item.prioridade + '%') }"></span>
    </div>
    <div class="escala" aria-hidden="true">
      <span v-for="valor in [0, 20, 40, 60, 80, 100]" :key="valor">{{ valor }}</span>
    </div>
    <p class="legenda">O tempo de espera é informativo. Os pesos dos critérios serão definidos pela equipe.</p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { SolicitacaoEspera } from '../../types/filaEspera';

const props = defineProps<{ item: SolicitacaoEspera }>();
const campos = computed(() => {
  const item = props.item;
  return [
    { rotulo: 'Paciente', valor: item.paciente },
    { rotulo: 'Protocolo', valor: '#' + item.id },
    { rotulo: 'Exame solicitado', valor: item.exame },
    { rotulo: 'Clínica solicitante', valor: item.clinica },
    { rotulo: 'SID', valor: item.sid },
    { rotulo: 'Localização', valor: item.localizacao },
    { rotulo: 'Data original da solicitação', valor: item.data.split('-').reverse().join('/') },
    { rotulo: 'Tempo de espera', valor: item.diasCorridos + (item.diasCorridos === 1 ? ' dia corrido' : ' dias corridos') },
    { rotulo: 'Especialidade do solicitante', valor: item.especialidade },
    { rotulo: 'Correspondência com a área do exame', valor: item.correspondeAoExame ? 'Sim' : 'Não' },
    { rotulo: 'Situação', valor: item.situacao },
    { rotulo: 'Observações', valor: item.observacoes, amplo: true },
  ];
});
</script>

<style scoped>
.dados { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.dados div { padding: 10px 12px; border: 1px solid #eee4db; border-radius: 9px; background: #faf7f2; }
.dados .amplo { grid-column: 1 / -1; }
dt, .legenda, .escala { color: #796963; font-size: 11px; }
dd { margin-top: 4px; font-size: 13px; font-weight: 700; overflow-wrap: anywhere; }
.prioridade { border-top: 1px solid #eee4db; margin-top: 16px; padding-top: 12px; font-size: 13px; }
.prioridade strong { float: right; color: var(--color-paper-primary); }
.trilho { height: 9px; margin-top: 8px; overflow: hidden; border-radius: 10px; background: #efe2d8; }
.trilho span { display: block; height: 100%; border-radius: inherit; background: var(--gradiente-prioridade); }
.escala { display: flex; justify-content: space-between; margin-top: 4px; }
.legenda { margin-top: 6px; }
</style>
