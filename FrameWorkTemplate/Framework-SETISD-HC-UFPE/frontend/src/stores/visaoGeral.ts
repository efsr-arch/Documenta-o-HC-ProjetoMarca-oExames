import { defineStore } from 'pinia';
import { ref } from 'vue';
import { obterResumoVisaoGeral } from '../services/visaoGeralService';
import type { VisaoGeralResumo } from '../types/visaoGeral';

/**
 * Store Pinia responsável pelo estado e carregamento dos indicadores da tela Visão Geral.
 */
export const useVisaoGeralStore = defineStore('visaoGeral', () => {
  const resumo = ref<VisaoGeralResumo | null>(null);
  const loading = ref(false);
  const errorMessage = ref<string | null>(null);

  /**
   * Carrega os dados consolidados da Visão Geral a partir do serviço.
   */
  async function carregarResumo(): Promise<void> {
    loading.value = true;
    errorMessage.value = null;
    try {
      resumo.value = await obterResumoVisaoGeral();
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Falha ao carregar os dados.';
      errorMessage.value = mensagem;
      console.error('[useVisaoGeralStore] Falha ao carregar resumo:', error);
    } finally {
      loading.value = false;
    }
  }

  /**
   * Simula atualização manual do painel demonstrativo mantendo consistência visual.
   */
  async function atualizarSimulacao(): Promise<void> {
    await carregarResumo();
    if (resumo.value) {
      resumo.value.atualizadoEmTexto = 'Atualizado: agora mesmo (simulação)';
    }
  }

  return {
    resumo,
    loading,
    errorMessage,
    carregarResumo,
    atualizarSimulacao,
  };
});
