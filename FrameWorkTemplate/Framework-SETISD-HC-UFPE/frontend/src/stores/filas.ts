import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { solicitacoesEspera } from '../data/filaEspera';
import { solicitacoesDemonstrativas, type SolicitacaoDemonstrativa } from '../data/filaMarcacao';

export const useFilasStore = defineStore('filas', () => {
  const encaminhadas = ref<SolicitacaoDemonstrativa[]>([]);
  const espera = computed(() => {
    const idsEncaminhados = new Set(encaminhadas.value.map(item => item.id));
    return solicitacoesEspera.filter(item => !idsEncaminhados.has(item.id));
  });
  const resumoEspera = computed(() => ({
    total: espera.value.length,
    maiorEspera: espera.value.reduce((maior, item) => Math.max(maior, item.diasCorridos), 0),
    totalExames: new Set(espera.value.map(item => item.exame)).size,
  }));
  const marcacao = computed(() => [...encaminhadas.value, ...solicitacoesDemonstrativas]);

  function encaminhar(id: string): boolean {
    const item = espera.value.find(solicitacao => solicitacao.id === id);
    if (!item) return false;

    encaminhadas.value.unshift({
      ...item,
      situacao: 'Pendente',
      responsavel: 'Não atribuído',
    });
    return true;
  }

  return { encaminhadas, espera, resumoEspera, marcacao, encaminhar };
});
