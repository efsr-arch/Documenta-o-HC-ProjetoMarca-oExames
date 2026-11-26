import assert from 'node:assert/strict';
import test from 'node:test';
import { registrosRelatorio } from '../src/data/relatorios.ts';
import {
  consultarRelatorio,
  filtrosIniciaisRelatorio,
  formatarEspera,
  formatarTaxa,
  obterOpcoesRelatorio,
} from '../src/services/relatoriosService.ts';

test('o recorte inicial concilia cards, desfechos, semanas e exames', () => {
  const { totais, porSemana, porExame } = consultarRelatorio(filtrosIniciaisRelatorio);

  assert.equal(totais.solicitacoes, 95);
  assert.equal(totais.agendados, 41);
  assert.equal(totais.realizados, 37);
  assert.equal(totais.ausencias, 4);
  assert.equal(totais.desistencias, 8);
  assert.equal(totais.outrosPendentes, 46);
  assert.equal(totais.esperaMedia, 499 / 41);
  assert.equal(totais.taxaComparecimento, 37 / 41);
  assert.equal(totais.taxaAusencia, 4 / 41);
  assert.deepEqual(porSemana.map((semana) => semana.solicitacoes), [16, 19, 21, 24, 15]);
  assert.equal(porSemana.reduce((soma, semana) => soma + semana.solicitacoes, 0), totais.solicitacoes);
  for (const campo of ['solicitacoes', 'agendados', 'realizados', 'ausencias', 'diasEsperaAcumulados']) {
    assert.equal(porExame.reduce((soma, linha) => soma + linha[campo], 0), totais[campo]);
  }
  for (const registro of registrosRelatorio) {
    assert.ok(registro.realizados + registro.ausencias <= registro.agendados);
    assert.ok(registro.agendados + registro.desistencias <= registro.solicitacoes);
  }
});

test('período, clínica, exame e marcadora são aplicados em conjunto', () => {
  const filtros = {
    ...filtrosIniciaisRelatorio, clinica: 'Oncologia', exame: 'Tomografia', marcadora: 'Marcadora A',
  };
  const { totais, porExame, porSemana } = consultarRelatorio(filtros);
  assert.equal(totais.solicitacoes, 25);
  assert.equal(totais.agendados, 11);
  assert.equal(totais.esperaMedia, 139 / 11);
  assert.deepEqual(porExame.map(({ exame }) => exame), ['Tomografia']);
  assert.deepEqual(porSemana.map(({ solicitacoes }) => solicitacoes), [10, 0, 0, 15, 0]);
  assert.equal(consultarRelatorio({ ...filtros, periodo: '2026-09' }).totais.solicitacoes, 14);
  assert.equal(consultarRelatorio({ ...filtros, marcadora: 'Marcadora B' }).totais.solicitacoes, 0);
  assert.deepEqual(obterOpcoesRelatorio().periodos, ['2026-11', '2026-10', '2026-09']);
});

test('recortes vazios e sem agendamentos têm totais e denominadores coerentes', () => {
  const filtros = { ...filtrosIniciaisRelatorio, periodo: '2026-11', clinica: 'Transplante' };
  const pendente = consultarRelatorio(filtros);
  assert.equal(pendente.totais.solicitacoes, 12);
  assert.equal(pendente.totais.agendados, 0);
  assert.equal(formatarEspera(pendente.totais.esperaMedia), '—');
  assert.equal(formatarTaxa(pendente.totais.taxaComparecimento), '—');
  assert.equal(formatarTaxa(pendente.totais.taxaAusencia), '—');

  const vazio = consultarRelatorio({ ...filtros, exame: 'Ultrassonografia' });
  assert.equal(vazio.totais.solicitacoes, 0);
  assert.deepEqual(vazio.porExame, []);
  assert.ok(vazio.porSemana.every(({ solicitacoes }) => solicitacoes === 0));
});
