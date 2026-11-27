import assert from 'node:assert/strict';
import test from 'node:test';
import { criarCsvRelatorio } from '../src/services/relatoriosExportacao.ts';
import { consultarRelatorio, filtrosIniciaisRelatorio } from '../src/services/relatoriosService.ts';

test('o CSV demonstrativo inclui apenas o recorte aplicado e seus totais', () => {
  const filtros = { ...filtrosIniciaisRelatorio, clinica: 'Oncologia', exame: 'Tomografia' };
  const csv = criarCsvRelatorio(filtros, consultarRelatorio(filtros));

  assert.match(csv, /Relatório demonstrativo SIGEx-HC/);
  assert.match(csv, /"Período";"Outubro\/2026"/);
  assert.match(csv, /"Clínica";"Oncologia"/);
  assert.match(csv, /"Tomografia";"25";"11";"10";"1";"12,6"/);
  assert.match(csv, /"Total";"25";"11";"10";"1";"12,6"$/);
  assert.doesNotMatch(csv, /Ultrassonografia|Ressonância magnética/);
});
