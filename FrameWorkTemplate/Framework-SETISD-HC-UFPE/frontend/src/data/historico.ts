export interface DetalhesAlteracao {
  motivo?: string;
  observacao?: string;
  dadosAnteriores?: Record<string, string | number | boolean | null>;
  dadosNovos?: Record<string, string | number | boolean | null>;
  ipOrigem?: string;
  dispositivo?: string;
}

export interface EventoHistorico {
  id: string;
  dataHora: string;
  dataIso: string;
  protocolo: string;
  paciente: string;
  tipoAcao: string;
  alteracaoRealizada: string;
  responsavel: string;
  categoria: 'NEGOCIO_CLINICO' | 'SEGURANCA' | 'CONFIGURACAO';
  detalhes: DetalhesAlteracao;
}

export interface FiltrosHistorico {
  busca: string;
  tipoAcao: string;
  responsavel: string;
  periodo: string;
}

export interface KpisHistorico {
  eventosRegistrados: number;
  usuariosEmAtividade: number;
  alteracoesHoje: number;
}

export const kpisDemonstrativos: KpisHistorico = {
  eventosRegistrados: 248,
  usuariosEmAtividade: 6,
  alteracoesHoje: 17,
};

export const eventosHistoricoDemonstrativos: EventoHistorico[] = [
  {
    id: 'evt-001',
    dataHora: '27/10/2026 16:42',
    dataIso: '2026-10-27T16:42:00',
    protocolo: '000134',
    paciente: 'Paciente 001 - Maria de Lourdes Silva',
    tipoAcao: 'Status alterado',
    alteracaoRealizada: 'Status → Em análise',
    responsavel: 'Marcadora A',
    categoria: 'NEGOCIO_CLINICO',
    detalhes: {
      motivo: 'Início da conferência de documentação e laudo anterior.',
      dadosAnteriores: { status: 'Pendente', atribuido: 'Não atribuído' },
      dadosNovos: { status: 'Em análise', atribuido: 'Marcadora A' },
      ipOrigem: '10.34.12.87',
      dispositivo: 'Terminal Setor de Regulação (HC-UFPE)',
    },
  },
  {
    id: 'evt-002',
    dataHora: '27/10/2026 15:20',
    dataIso: '2026-10-27T15:20:00',
    protocolo: '000134',
    paciente: 'Paciente 001 - Maria de Lourdes Silva',
    tipoAcao: 'Observação adicionada',
    alteracaoRealizada: 'Observação adicionada',
    responsavel: 'Marcadora A',
    categoria: 'NEGOCIO_CLINICO',
    detalhes: {
      observacao: 'Contato telefônico com o paciente realizado para confirmação do preparo de contraste.',
      dadosAnteriores: { observacao: null },
      dadosNovos: { observacao: 'Contato realizado com sucesso' },
      ipOrigem: '10.34.12.87',
      dispositivo: 'Terminal Setor de Regulação (HC-UFPE)',
    },
  },
  {
    id: 'evt-003',
    dataHora: '27/10/2026 09:18',
    dataIso: '2026-10-27T09:18:00',
    protocolo: '000135',
    paciente: 'Paciente 002 - João Pedro Albuquerque',
    tipoAcao: 'Status alterado',
    alteracaoRealizada: 'Status → Aguardando vaga',
    responsavel: 'Marcadora B',
    categoria: 'NEGOCIO_CLINICO',
    detalhes: {
      motivo: 'Solicitação validada. Aguardando abertura de grade no AGHUx.',
      dadosAnteriores: { status: 'Em análise' },
      dadosNovos: { status: 'Aguardando vaga' },
      ipOrigem: '10.34.12.92',
      dispositivo: 'Terminal Setor de Imagem (HC-UFPE)',
    },
  },
  {
    id: 'evt-004',
    dataHora: '26/10/2026 17:05',
    dataIso: '2026-10-26T17:05:00',
    protocolo: '000134',
    paciente: 'Paciente 001 - Maria de Lourdes Silva',
    tipoAcao: 'Solicitação importada',
    alteracaoRealizada: 'Solicitação importada',
    responsavel: 'Sistema',
    categoria: 'NEGOCIO_CLINICO',
    detalhes: {
      motivo: 'Integração de formulário via rotina automatizada SIGEx-Forms.',
      dadosAnteriores: {},
      dadosNovos: { protocolo: '000134', exame: 'Tomografia', clinica: 'Oncologia' },
      ipOrigem: '127.0.0.1 (Batch System)',
      dispositivo: 'Serviço de Sincronização Automática HC',
    },
  },
  {
    id: 'evt-005',
    dataHora: '26/10/2026 11:43',
    dataIso: '2026-10-26T11:43:00',
    protocolo: '000136',
    paciente: 'Paciente 003 - Ana Clara Bezerra',
    tipoAcao: 'Conferência registrada',
    alteracaoRealizada: 'Conferência registrada',
    responsavel: 'Marcadora B',
    categoria: 'NEGOCIO_CLINICO',
    detalhes: {
      motivo: 'Conferência de critérios clínicos e justificativa médica anexada.',
      dadosAnteriores: { conferencia_realizada: false },
      dadosNovos: { conferencia_realizada: true, conferencia_por: 'Marcadora B' },
      ipOrigem: '10.34.12.92',
      dispositivo: 'Terminal Setor de Imagem (HC-UFPE)',
    },
  },
  {
    id: 'evt-006',
    dataHora: '25/10/2026 14:29',
    dataIso: '2026-10-25T14:29:00',
    protocolo: '000137',
    paciente: 'Paciente 004 - Carlos Eduardo Santos',
    tipoAcao: 'Informação de contato atualizada',
    alteracaoRealizada: 'Informação de contato atualizada',
    responsavel: 'Marcadora A',
    categoria: 'NEGOCIO_CLINICO',
    detalhes: {
      motivo: 'Telefone do acompanhante atualizado a pedido da clínica solicitante.',
      dadosAnteriores: { telefone: '(81) 98888-0000' },
      dadosNovos: { telefone: '(81) 99777-1234' },
      ipOrigem: '10.34.12.87',
      dispositivo: 'Terminal Setor de Regulação (HC-UFPE)',
    },
  },
  {
    id: 'evt-007',
    dataHora: '25/10/2026 10:15',
    dataIso: '2026-10-25T10:15:00',
    protocolo: '000138',
    paciente: 'Paciente 005 - Francisca Antonia Lima',
    tipoAcao: 'Status alterado',
    alteracaoRealizada: 'Status → Agendado',
    responsavel: 'Marcadora B',
    categoria: 'NEGOCIO_CLINICO',
    detalhes: {
      motivo: 'Agendamento confirmado no sistema AGHUx para o dia 04/11/2026 às 08h30.',
      dadosAnteriores: { status: 'Aguardando vaga' },
      dadosNovos: { status: 'Agendado', data_agendada: '2026-11-04 08:30' },
      ipOrigem: '10.34.12.92',
      dispositivo: 'Terminal Setor de Imagem (HC-UFPE)',
    },
  },
  {
    id: 'evt-008',
    dataHora: '24/10/2026 16:50',
    dataIso: '2026-10-24T16:50:00',
    protocolo: '000139',
    paciente: 'Paciente 006 - Roberto Cavalcanti',
    tipoAcao: 'Status alterado',
    alteracaoRealizada: 'Status → Em análise',
    responsavel: 'Marcadora A',
    categoria: 'NEGOCIO_CLINICO',
    detalhes: {
      motivo: 'Iniciada análise de prontuário e indicação de sedação.',
      dadosAnteriores: { status: 'Pendente' },
      dadosNovos: { status: 'Em análise' },
      ipOrigem: '10.34.12.87',
      dispositivo: 'Terminal Setor de Regulação (HC-UFPE)',
    },
  },
  {
    id: 'evt-009',
    dataHora: '24/10/2026 14:30',
    dataIso: '2026-10-24T14:30:00',
    protocolo: '000140',
    paciente: 'Paciente 007 - Mariana Guimarães',
    tipoAcao: 'Observação adicionada',
    alteracaoRealizada: 'Observação adicionada',
    responsavel: 'Marcadora A',
    categoria: 'NEGOCIO_CLINICO',
    detalhes: {
      observacao: 'Paciente necessita de intérprete de Libras no dia do exame.',
      dadosAnteriores: { acessibilidade: null },
      dadosNovos: { acessibilidade: 'Necessita Libras' },
      ipOrigem: '10.34.12.87',
      dispositivo: 'Terminal Setor de Regulação (HC-UFPE)',
    },
  },
  {
    id: 'evt-010',
    dataHora: '23/10/2026 17:10',
    dataIso: '2026-10-23T17:10:00',
    protocolo: '000141',
    paciente: 'Paciente 008 - Sebastião Oliveira',
    tipoAcao: 'Solicitação importada',
    alteracaoRealizada: 'Solicitação importada',
    responsavel: 'Sistema',
    categoria: 'NEGOCIO_CLINICO',
    detalhes: {
      motivo: 'Importação automática via lote de solicitações SUS.',
      dadosAnteriores: {},
      dadosNovos: { protocolo: '000141', exame: 'Tomografia', clinica: 'Neurologia' },
      ipOrigem: '127.0.0.1 (Batch System)',
      dispositivo: 'Serviço de Sincronização Automática HC',
    },
  },
  {
    id: 'evt-011',
    dataHora: '23/10/2026 11:20',
    dataIso: '2026-10-23T11:20:00',
    protocolo: '000142',
    paciente: 'Paciente 009 - Juliana Ramos',
    tipoAcao: 'Conferência registrada',
    alteracaoRealizada: 'Conferência registrada',
    responsavel: 'Marcadora B',
    categoria: 'NEGOCIO_CLINICO',
    detalhes: {
      motivo: 'Verificação de exames prévios no AGHUx concluída.',
      dadosAnteriores: { status_conferencia: 'Pendente' },
      dadosNovos: { status_conferencia: 'Aprovada' },
      ipOrigem: '10.34.12.92',
      dispositivo: 'Terminal Setor de Imagem (HC-UFPE)',
    },
  },
  {
    id: 'evt-012',
    dataHora: '22/10/2026 16:15',
    dataIso: '2026-10-22T16:15:00',
    protocolo: '000143',
    paciente: 'Paciente 010 - Gustavo Meira',
    tipoAcao: 'Status alterado',
    alteracaoRealizada: 'Status → Aguardando vaga',
    responsavel: 'Marcadora A',
    categoria: 'NEGOCIO_CLINICO',
    detalhes: {
      motivo: 'Encaminhado para a fila de espera para agendamento centralizado.',
      dadosAnteriores: { status: 'Em análise' },
      dadosNovos: { status: 'Aguardando vaga' },
      ipOrigem: '10.34.12.87',
      dispositivo: 'Terminal Setor de Regulação (HC-UFPE)',
    },
  },
];

export const tiposAcaoDisponiveis = [
  'Status alterado',
  'Observação adicionada',
  'Solicitação importada',
  'Conferência registrada',
  'Informação de contato atualizada',
];

export const responsaveisDisponiveis = [
  'Marcadora A',
  'Marcadora B',
  'Sistema',
];

export const periodosDisponiveis = [
  { valor: '', label: 'Período' },
  { valor: 'hoje', label: 'Hoje (27/10/2026)' },
  { valor: '7dias', label: 'Últimos 7 dias' },
  { valor: '30dias', label: 'Últimos 30 dias' },
  { valor: 'out2026', label: 'Outubro / 2026' },
];

function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim();
}

export function filtrarHistorico(
  itens: EventoHistorico[],
  filtros: FiltrosHistorico
): EventoHistorico[] {
  const busca = normalizar(filtros.busca).replace(/^#/, '');

  return itens.filter((item) => {
    // 1. Busca textual ampla: Protocolo, Paciente, Responsável, Alteração
    if (busca) {
      const conteudoBusca = normalizar(
        `${item.protocolo} ${item.paciente} ${item.responsavel} ${item.alteracaoRealizada} ${item.tipoAcao}`
      );
      if (!conteudoBusca.includes(busca)) {
        return false;
      }
    }

    // 2. Filtro por Tipo de Ação
    if (filtros.tipoAcao) {
      const tipoNormalizado = normalizar(filtros.tipoAcao);
      const itemTipoNormalizado = normalizar(item.tipoAcao);
      const alteracaoNormalizada = normalizar(item.alteracaoRealizada);

      const coincide =
        itemTipoNormalizado.includes(tipoNormalizado) ||
        alteracaoNormalizada.includes(tipoNormalizado);

      if (!coincide) return false;
    }

    // 3. Filtro por Responsável
    if (filtros.responsavel && item.responsavel !== filtros.responsavel) {
      return false;
    }

    // 4. Filtro por Período
    if (filtros.periodo) {
      if (filtros.periodo === 'hoje') {
        if (!item.dataHora.startsWith('27/10/2026')) return false;
      } else if (filtros.periodo === '7dias') {
        // No contexto do mock de outubro/2026, todos os itens (22 a 27) estão nos últimos 7 dias
        if (!item.dataHora.includes('10/2026')) return false;
      } else if (filtros.periodo === '30dias' || filtros.periodo === 'out2026') {
        if (!item.dataHora.includes('/10/2026')) return false;
      }
    }

    return true;
  });
}
