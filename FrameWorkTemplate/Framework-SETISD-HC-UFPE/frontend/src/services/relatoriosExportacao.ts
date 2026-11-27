import { formatarEspera, formatarPeriodo, type FiltrosRelatorio, type ResumoRelatorio } from './relatoriosService';

/** Serializa o recorte aplicado em CSV, com separador adequado aos decimais em pt-BR. */
export function criarCsvRelatorio(filtros: FiltrosRelatorio, resumo: ResumoRelatorio): string {
  const linhas = [
    ['Relatório demonstrativo SIGEx-HC'],
    ['Período', formatarPeriodo(filtros.periodo)],
    ['Clínica', filtros.clinica || 'Todas'],
    ['Exame', filtros.exame || 'Todos'],
    ['Marcadora', filtros.marcadora || 'Todas'],
    [],
    ['Exame', 'Solicitações', 'Agendados', 'Realizados', 'Ausências', 'Espera média (dias)'],
    ...resumo.porExame.map((linha) => [
      linha.exame, linha.solicitacoes, linha.agendados, linha.realizados, linha.ausencias,
      formatarEspera(linha.esperaMedia),
    ]),
    [
      'Total', resumo.totais.solicitacoes, resumo.totais.agendados, resumo.totais.realizados,
      resumo.totais.ausencias, formatarEspera(resumo.totais.esperaMedia),
    ],
  ];

  return linhas.map((linha) => linha.map((valor) => `"${String(valor).replaceAll('"', '""')}"`).join(';')).join('\r\n');
}

/** Gera o download da simulação no navegador. */
export function baixarCsvRelatorio(filtros: FiltrosRelatorio, resumo: ResumoRelatorio): void {
  const arquivo = new Blob(['\uFEFF', criarCsvRelatorio(filtros, resumo)], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(arquivo);
  const link = document.createElement('a');
  link.href = url;
  link.download = `sigex-relatorio-demonstrativo-${filtros.periodo}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
