export type PrioridadeDemonstrativa = 0 | 20 | 40 | 60 | 80 | 100;

export interface SolicitacaoEspera {
  id: string;
  paciente: string;
  exame: string;
  clinica: string;
  sid: string;
  localizacao: string;
  data: string;
  diasCorridos: number;
  especialidade: string;
  correspondeAoExame: boolean;
  prioridade: PrioridadeDemonstrativa;
  situacao: 'Aguardando vaga';
  observacoes: string;
}
