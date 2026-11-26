/** Contagens agregadas pela data de solicitação, sem dados de pacientes. */
export interface RegistroRelatorio {
  data: string;
  clinica: string;
  exame: string;
  marcadora: string;
  solicitacoes: number;
  agendados: number;
  realizados: number;
  ausencias: number;
  desistencias: number;
  diasEsperaAcumulados: number;
}

/** Base fictícia da demonstração, agrupada em lotes de solicitações. */
export const registrosRelatorio: readonly RegistroRelatorio[] = [
  {
    data: '2026-09-04', clinica: 'Oncologia', exame: 'Tomografia', marcadora: 'Marcadora A',
    solicitacoes: 14, agendados: 8, realizados: 6, ausencias: 2, desistencias: 1, diasEsperaAcumulados: 88,
  },
  {
    data: '2026-09-18', clinica: 'Nefrologia', exame: 'Ultrassonografia', marcadora: 'Marcadora B',
    solicitacoes: 11, agendados: 6, realizados: 5, ausencias: 1, desistencias: 2, diasEsperaAcumulados: 54,
  },
  {
    data: '2026-10-03', clinica: 'Oncologia', exame: 'Tomografia', marcadora: 'Marcadora A',
    solicitacoes: 10, agendados: 4, realizados: 4, ausencias: 0, desistencias: 1, diasEsperaAcumulados: 48,
  },
  {
    data: '2026-10-05', clinica: 'Nefrologia', exame: 'Ultrassonografia', marcadora: 'Marcadora B',
    solicitacoes: 6, agendados: 3, realizados: 2, ausencias: 1, desistencias: 0, diasEsperaAcumulados: 27,
  },
  {
    data: '2026-10-10', clinica: 'Transplante', exame: 'Ressonância magnética', marcadora: 'Marcadora A',
    solicitacoes: 12, agendados: 5, realizados: 5, ausencias: 0, desistencias: 2, diasEsperaAcumulados: 90,
  },
  {
    data: '2026-10-13', clinica: 'Pré-operatório', exame: 'Ecocardiograma', marcadora: 'Marcadora B',
    solicitacoes: 7, agendados: 3, realizados: 3, ausencias: 0, desistencias: 0, diasEsperaAcumulados: 21,
  },
  {
    data: '2026-10-16', clinica: 'Oncologia', exame: 'Ressonância magnética', marcadora: 'Marcadora B',
    solicitacoes: 13, agendados: 5, realizados: 4, ausencias: 1, desistencias: 1, diasEsperaAcumulados: 80,
  },
  {
    data: '2026-10-20', clinica: 'Nefrologia', exame: 'Ultrassonografia', marcadora: 'Marcadora A',
    solicitacoes: 8, agendados: 3, realizados: 3, ausencias: 0, desistencias: 1, diasEsperaAcumulados: 24,
  },
  {
    data: '2026-10-23', clinica: 'Oncologia', exame: 'Tomografia', marcadora: 'Marcadora A',
    solicitacoes: 15, agendados: 7, realizados: 6, ausencias: 1, desistencias: 1, diasEsperaAcumulados: 91,
  },
  {
    data: '2026-10-26', clinica: 'Pré-operatório', exame: 'Ecocardiograma', marcadora: 'Marcadora B',
    solicitacoes: 9, agendados: 4, realizados: 4, ausencias: 0, desistencias: 1, diasEsperaAcumulados: 28,
  },
  {
    data: '2026-10-29', clinica: 'Transplante', exame: 'Tomografia', marcadora: 'Marcadora B',
    solicitacoes: 9, agendados: 5, realizados: 4, ausencias: 1, desistencias: 0, diasEsperaAcumulados: 70,
  },
  {
    data: '2026-10-31', clinica: 'Nefrologia', exame: 'Ultrassonografia', marcadora: 'Marcadora A',
    solicitacoes: 6, agendados: 2, realizados: 2, ausencias: 0, desistencias: 1, diasEsperaAcumulados: 20,
  },
  {
    data: '2026-11-07', clinica: 'Pré-operatório', exame: 'Ecocardiograma', marcadora: 'Marcadora B',
    solicitacoes: 8, agendados: 4, realizados: 2, ausencias: 0, desistencias: 0, diasEsperaAcumulados: 32,
  },
  {
    data: '2026-11-17', clinica: 'Transplante', exame: 'Ressonância magnética', marcadora: 'Marcadora A',
    solicitacoes: 12, agendados: 0, realizados: 0, ausencias: 0, desistencias: 1, diasEsperaAcumulados: 0,
  },
];
