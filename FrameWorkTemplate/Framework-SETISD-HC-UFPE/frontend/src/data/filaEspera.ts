import type { SolicitacaoEspera } from '../types/filaEspera';

// Datas e dias corridos representam o cenário demonstrativo de 25/11/2026.
export const solicitacoesEspera: readonly SolicitacaoEspera[] = [
  {
    id: '000201', paciente: 'Paciente 021', exame: 'Tomografia', clinica: 'Oncologia',
    sid: '810021', localizacao: 'Recife – PE', data: '2026-11-07', diasCorridos: 18,
    especialidade: 'Oncologia', correspondeAoExame: true, prioridade: 100,
    situacao: 'Aguardando vaga', observacoes: 'Disponível para comparecer com aviso no mesmo dia.',
  },
  {
    id: '000202', paciente: 'Paciente 022', exame: 'Ressonância', clinica: 'Neurologia',
    sid: '810022', localizacao: 'Olinda – PE', data: '2026-11-10', diasCorridos: 15,
    especialidade: 'Neurologia', correspondeAoExame: true, prioridade: 80,
    situacao: 'Aguardando vaga', observacoes: 'Confirmar disponibilidade antes de oferecer uma vaga.',
  },
  {
    id: '000203', paciente: 'Paciente 023', exame: 'Ultrassonografia', clinica: 'Nefrologia',
    sid: '810023', localizacao: 'Jaboatão dos Guararapes – PE', data: '2026-11-13', diasCorridos: 12,
    especialidade: 'Nefrologia', correspondeAoExame: true, prioridade: 60,
    situacao: 'Aguardando vaga', observacoes: 'Prefere comparecer no período da manhã.',
  },
  {
    id: '000204', paciente: 'Paciente 024', exame: 'Tomografia', clinica: 'Transplante',
    sid: '810024', localizacao: 'Recife – PE', data: '2026-11-16', diasCorridos: 9,
    especialidade: 'Cirurgia Geral', correspondeAoExame: true, prioridade: 80,
    situacao: 'Aguardando vaga', observacoes: 'Sem observações adicionais.',
  },
  {
    id: '000205', paciente: 'Paciente 025', exame: 'Tomografia', clinica: 'Oncologia',
    sid: '810025', localizacao: 'Paulista – PE', data: '2026-11-19', diasCorridos: 6,
    especialidade: 'Clínica Médica', correspondeAoExame: false, prioridade: 40,
    situacao: 'Aguardando vaga', observacoes: 'Precisa de antecedência para organizar o deslocamento.',
  },
  {
    id: '000206', paciente: 'Paciente 026', exame: 'Ecocardiograma', clinica: 'Cardiologia',
    sid: '810026', localizacao: 'Camaragibe – PE', data: '2026-11-20', diasCorridos: 5,
    especialidade: 'Cardiologia', correspondeAoExame: true, prioridade: 60,
    situacao: 'Aguardando vaga', observacoes: 'Disponibilidade no período da tarde.',
  },
  {
    id: '000207', paciente: 'Paciente 027', exame: 'Ressonância', clinica: 'Neurologia',
    sid: '810027', localizacao: 'Igarassu – PE', data: '2026-11-22', diasCorridos: 3,
    especialidade: 'Clínica Médica', correspondeAoExame: false, prioridade: 20,
    situacao: 'Aguardando vaga', observacoes: 'Necessita organizar o transporte com antecedência.',
  },
  {
    id: '000208', paciente: 'Paciente 028', exame: 'Ultrassonografia', clinica: 'Pré-operatório',
    sid: '810028', localizacao: 'Vitória de Santo Antão – PE', data: '2026-11-24', diasCorridos: 1,
    especialidade: 'Clínica Médica', correspondeAoExame: false, prioridade: 0,
    situacao: 'Aguardando vaga', observacoes: 'Sem observações adicionais.',
  },
];
