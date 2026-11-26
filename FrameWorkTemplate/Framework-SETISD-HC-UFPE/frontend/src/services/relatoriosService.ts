import { registrosRelatorio, type RegistroRelatorio } from '../data/relatorios';

export interface FiltrosRelatorio {
  periodo: string;
  clinica: string;
  exame: string;
  marcadora: string;
}

interface TotaisRelatorio {
  solicitacoes: number;
  agendados: number;
  realizados: number;
  ausencias: number;
  desistencias: number;
  diasEsperaAcumulados: number;
}

export const filtrosIniciaisRelatorio: Readonly<FiltrosRelatorio> = {
  periodo: '2026-10',
  clinica: '',
  exame: '',
  marcadora: '',
};

const formatadorPeriodo = new Intl.DateTimeFormat('pt-BR', { month: 'long', timeZone: 'UTC' });

/** Exibe o mês da base demonstrativa sem depender do fuso horário local. */
export function formatarPeriodo(periodo: string): string {
  const mes = formatadorPeriodo.format(new Date(`${periodo}-01T00:00:00Z`));
  return `${mes.charAt(0).toUpperCase()}${mes.slice(1)}/${periodo.slice(0, 4)}`;
}

const formatadorDecimal = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 });
const formatadorPercentual = new Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 1 });

/** Formata o tempo médio, mantendo a distinção entre zero e ausência de agendamentos. */
export function formatarEspera(dias: number | null): string {
  return dias === null ? '—' : formatadorDecimal.format(dias);
}

/** Formata taxas sobre exames com comparecimento informado. */
export function formatarTaxa(taxa: number | null): string {
  return taxa === null ? '—' : formatadorPercentual.format(taxa);
}

/** Retorna as opções da base completa, inclusive as que podem resultar em recortes vazios. */
export function obterOpcoesRelatorio(registros: readonly RegistroRelatorio[] = registrosRelatorio) {
  return {
    periodos: [...new Set(registros.map(({ data }) => data.slice(0, 7)))].sort().reverse(),
    clinicas: listarOpcoes(registros, 'clinica'),
    exames: listarOpcoes(registros, 'exame'),
    marcadoras: listarOpcoes(registros, 'marcadora'),
  };
}

/** Lista valores únicos em ordem alfabética. */
function listarOpcoes(registros: readonly RegistroRelatorio[], campo: 'clinica' | 'exame' | 'marcadora'): string[] {
  return [...new Set(registros.map((registro) => registro[campo]))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

/** Soma os lotes e calcula os indicadores com seus respectivos denominadores. */
function consolidar(registros: readonly RegistroRelatorio[]) {
  const totais = registros.reduce<TotaisRelatorio>((soma, registro) => ({
    solicitacoes: soma.solicitacoes + registro.solicitacoes,
    agendados: soma.agendados + registro.agendados,
    realizados: soma.realizados + registro.realizados,
    ausencias: soma.ausencias + registro.ausencias,
    desistencias: soma.desistencias + registro.desistencias,
    diasEsperaAcumulados: soma.diasEsperaAcumulados + registro.diasEsperaAcumulados,
  }), { solicitacoes: 0, agendados: 0, realizados: 0, ausencias: 0, desistencias: 0, diasEsperaAcumulados: 0 });
  const comComparecimentoInformado = totais.realizados + totais.ausencias;

  return {
    ...totais,
    outrosPendentes: totais.solicitacoes - comComparecimentoInformado - totais.desistencias,
    esperaMedia: totais.agendados ? totais.diasEsperaAcumulados / totais.agendados : null,
    taxaComparecimento: comComparecimentoInformado ? totais.realizados / comComparecimentoInformado : null,
    taxaAusencia: comComparecimentoInformado ? totais.ausencias / comComparecimentoInformado : null,
  };
}

/** Consolida o recorte por mês da solicitação, clínica, exame e marcadora. */
export function consultarRelatorio(filtros: FiltrosRelatorio, registros: readonly RegistroRelatorio[] = registrosRelatorio) {
  const filtrados = registros.filter((registro) =>
    registro.data.startsWith(`${filtros.periodo}-`)
    && (!filtros.clinica || registro.clinica === filtros.clinica)
    && (!filtros.exame || registro.exame === filtros.exame)
    && (!filtros.marcadora || registro.marcadora === filtros.marcadora),
  );
  const [ano, mes] = filtros.periodo.split('-').map(Number);
  const diasNoMes = new Date(Date.UTC(ano, mes, 0)).getUTCDate();
  const porSemana = Array.from({ length: Math.ceil(diasNoMes / 7) }, (_, indice) => {
    const inicio = indice * 7 + 1;
    const fim = Math.min(inicio + 6, diasNoMes);
    const solicitacoes = filtrados.reduce((soma, registro) => {
      const dia = Number(registro.data.slice(8, 10));
      return dia >= inicio && dia <= fim ? soma + registro.solicitacoes : soma;
    }, 0);
    return { semana: indice + 1, inicio, fim, solicitacoes };
  });
  const porExame = listarOpcoes(filtrados, 'exame').map((exame) => ({
    exame,
    ...consolidar(filtrados.filter((registro) => registro.exame === exame)),
  })).sort((a, b) => b.solicitacoes - a.solicitacoes);

  return { totais: consolidar(filtrados), porSemana, porExame };
}

export type ResumoRelatorio = ReturnType<typeof consultarRelatorio>;
