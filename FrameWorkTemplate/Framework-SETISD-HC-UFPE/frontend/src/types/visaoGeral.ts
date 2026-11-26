/**
 * Tipos e contratos de dados da tela Visão Geral (SIGEx-HC).
 */

/** Identificadores visuais suportados pelos cards de KPI. */
export type KpiIconeTipo = 'total' | 'pendentes' | 'analise' | 'aguardando' | 'agendados' | 'realizados' | 'ausencias';

/** Card de indicador operacional exibido no topo da Visão Geral. */
export interface KpiIndicador {
  id: string;
  titulo: string;
  valor: number | string;
  subtitulo: string;
  icone: KpiIconeTipo;
}

/** Fatia do gráfico de distribuição de solicitações por status. */
export interface StatusDistribuicao {
  id: string;
  label: string;
  quantidade: number;
  cor: string;
}

/** Item da distribuição quantitativa de solicitações por clínica. */
export interface ClinicaDistribuicao {
  id: string;
  clinica: string;
  quantidade: number;
}

/** Variação visual dos badges de pendências operacionais. */
export type PendenciaVariante = 'alerta' | 'atencao';

/** Badge de pendência operacional exibida no painel inferior. */
export interface PendenciaAtencao {
  id: string;
  texto: string;
  variante: PendenciaVariante;
  rotaDestino: string;
}

/** Conjunto consolidado de dados exibidos na tela Visão Geral. */
export interface VisaoGeralResumo {
  atualizadoEmTexto: string;
  totalSolicitacoes: number;
  kpis: KpiIndicador[];
  porStatus: StatusDistribuicao[];
  porClinica: ClinicaDistribuicao[];
  pendencias: PendenciaAtencao[];
}
