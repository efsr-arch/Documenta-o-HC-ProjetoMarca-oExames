export interface SolicitacaoDemonstrativa {
  id: string;
  paciente: string;
  exame: string;
  clinica: string;
  data: string;
  situacao: string;
  responsavel: string;
}

export const solicitacoesDemonstrativas: SolicitacaoDemonstrativa[] = [
  { id: '000134', paciente: 'Paciente 001', exame: 'Tomografia', clinica: 'Oncologia', data: '2026-10-22', situacao: 'Em análise', responsavel: 'Marcadora A' },
  { id: '000135', paciente: 'Paciente 002', exame: 'Ressonância', clinica: 'Neurologia', data: '2026-10-22', situacao: 'Pendente', responsavel: 'Não atribuído' },
  { id: '000136', paciente: 'Paciente 003', exame: 'Ultrassonografia', clinica: 'Nefrologia', data: '2026-10-23', situacao: 'Pendente', responsavel: 'Marcadora B' },
  { id: '000137', paciente: 'Paciente 004', exame: 'Tomografia', clinica: 'Transplante', data: '2026-10-23', situacao: 'Em análise', responsavel: 'Marcadora B' },
  { id: '000138', paciente: 'Paciente 005', exame: 'Ecocardiograma', clinica: 'Cardiologia', data: '2026-10-24', situacao: 'Pendente', responsavel: 'Não atribuído' },
  { id: '000139', paciente: 'Paciente 006', exame: 'Ressonância', clinica: 'Oncologia', data: '2026-10-24', situacao: 'Em análise', responsavel: 'Marcadora A' },
  { id: '000140', paciente: 'Paciente 007', exame: 'Ultrassonografia', clinica: 'Pré-operatório', data: '2026-10-25', situacao: 'Pendente', responsavel: 'Marcadora A' },
  { id: '000141', paciente: 'Paciente 008', exame: 'Tomografia', clinica: 'Neurologia', data: '2026-10-25', situacao: 'Pendente', responsavel: 'Não atribuído' },
  { id: '000142', paciente: 'Paciente 009', exame: 'Ecocardiograma', clinica: 'Cardiologia', data: '2026-10-26', situacao: 'Em análise', responsavel: 'Marcadora B' },
  { id: '000143', paciente: 'Paciente 010', exame: 'Ressonância', clinica: 'Transplante', data: '2026-10-26', situacao: 'Pendente', responsavel: 'Marcadora A' },
  { id: '000144', paciente: 'Paciente 011', exame: 'Ultrassonografia', clinica: 'Nefrologia', data: '2026-10-27', situacao: 'Pendente', responsavel: 'Não atribuído' },
  { id: '000145', paciente: 'Paciente 012', exame: 'Tomografia', clinica: 'Oncologia', data: '2026-10-27', situacao: 'Em análise', responsavel: 'Marcadora A' },
];

export interface FiltrosFila {
  busca: string;
  exame: string;
  clinica: string;
  situacao: string;
}

function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();
}

export function filtrarSolicitacoes(itens: SolicitacaoDemonstrativa[], filtros: FiltrosFila): SolicitacaoDemonstrativa[] {
  const busca = normalizar(filtros.busca).replace(/^#/, '');
  return itens.filter((item) =>
    normalizar(item.paciente + ' ' + item.id).includes(busca)
    && (!filtros.exame || item.exame === filtros.exame)
    && (!filtros.clinica || item.clinica === filtros.clinica)
    && (!filtros.situacao || item.situacao === filtros.situacao)
  );
}
