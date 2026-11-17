import type { VisaoGeralResumo } from '../types/visaoGeral';

/**
 * Conjunto demonstrativo de indicadores da Visão Geral para validação visual.
 * Estruturado para futura substituição por chamada HTTP autenticada via `api.get`.
 */
const DADOS_SIMULACAO_VISAO_GERAL: VisaoGeralResumo = {
  atualizadoEmTexto: 'Atualizado: há 5 min (simulação)',
  totalSolicitacoes: 95,
  kpis: [
    {
      id: 'total',
      titulo: 'Total de solicitações',
      valor: 95,
      subtitulo: 'Base demonstrativa',
      icone: 'total',
    },
    {
      id: 'pendentes',
      titulo: 'Pendentes',
      valor: 52,
      subtitulo: 'Aguardando análise',
      icone: 'pendentes',
    },
    {
      id: 'analise',
      titulo: 'Em análise',
      valor: 19,
      subtitulo: 'Em conferência',
      icone: 'analise',
    },
    {
      id: 'aguardando',
      titulo: 'Aguardando vaga',
      valor: 8,
      subtitulo: 'Fila de espera',
      icone: 'aguardando',
    },
  ],
  porStatus: [
    {
      id: 'pendentes',
      label: 'Pendentes',
      quantidade: 52,
      cor: '#8B2329',
    },
    {
      id: 'analise',
      label: 'Em análise',
      quantidade: 19,
      cor: '#D86E43',
    },
    {
      id: 'aguardando',
      label: 'Aguardando vaga',
      quantidade: 8,
      cor: '#DBAA62',
    },
    {
      id: 'outras',
      label: 'Outras',
      quantidade: 16,
      cor: '#E6D9C6',
    },
  ],
  porClinica: [
    { id: 'oncologia', clinica: 'Oncologia', quantidade: 28 },
    { id: 'nefrologia', clinica: 'Nefrologia', quantidade: 20 },
    { id: 'transplante', clinica: 'Transplante', quantidade: 18 },
    { id: 'pre-operatorio', clinica: 'Pré-operatório', quantidade: 12 },
    { id: 'outras', clinica: 'Outras', quantidade: 17 },
  ],
  pendencias: [
    {
      id: 'dados-inconsistentes',
      texto: '5 solicitações com dados inconsistentes',
      variante: 'alerta',
      rotaDestino: '/fila-marcacao',
    },
    {
      id: 'aguardando-vaga',
      texto: '8 aguardando vaga',
      variante: 'atencao',
      rotaDestino: '/fila-espera',
    },
    {
      id: 'indicador-elevado',
      texto: '14 com indicador elevado (simulação)',
      variante: 'alerta',
      rotaDestino: '/fila-marcacao',
    },
  ],
};

/**
 * Obtém os dados consolidados da tela Visão Geral.
 * @returns Cópia tipada do resumo operacional em modo demonstrativo.
 */
export async function obterResumoVisaoGeral(): Promise<VisaoGeralResumo> {
  try {
    // Retorna cópia isolada para evitar mutação acidental do objeto de referência
    return structuredClone(DADOS_SIMULACAO_VISAO_GERAL);
  } catch (error) {
    console.error('[visaoGeralService] Erro ao carregar resumo da Visão Geral:', error);
    throw new Error('Não foi possível carregar os indicadores da Visão Geral.');
  }
}
