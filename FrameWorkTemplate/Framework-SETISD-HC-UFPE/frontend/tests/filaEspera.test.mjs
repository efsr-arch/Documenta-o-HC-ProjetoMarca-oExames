import assert from 'node:assert/strict';
import test from 'node:test';
import { createPinia } from 'pinia';
import { useFilasStore } from '../src/stores/filas.ts';
import { filtrarSolicitacoes } from '../src/data/filaMarcacao.ts';

test('calcula os indicadores da fila e usa somente pontuações da escala demonstrativa', () => {
  const filas = useFilasStore(createPinia());
  assert.deepEqual(filas.resumoEspera, { total: 8, maiorEspera: 18, totalExames: 4 });
  assert.deepEqual(
    [...new Set(filas.espera.map(item => item.prioridade))].sort((a, b) => a - b),
    [0, 20, 40, 60, 80, 100],
  );
});

test('combina busca, exame e clínica nas solicitações em espera', () => {
  const filas = useFilasStore(createPinia());
  const filtros = { busca: ' #000205 ', exame: 'Tomografia', clinica: 'Oncologia', situacao: '' };
  assert.deepEqual(filtrarSolicitacoes(filas.espera, filtros).map(item => item.id), ['000205']);
  assert.deepEqual(filtrarSolicitacoes(filas.espera, { ...filtros, exame: 'Ressonância' }), []);
});

test('encaminha uma vez, preserva a data e atualiza as duas filas e seus indicadores', () => {
  const filas = useFilasStore(createPinia());
  const antes = filas.espera.find(item => item.id === '000201');
  assert.ok(antes);
  assert.equal(filas.encaminhar(antes.id), true);
  assert.equal(filas.encaminhar(antes.id), false);
  assert.equal(filas.espera.some(item => item.id === antes.id), false);
  assert.deepEqual(filas.marcacao[0], { ...antes, situacao: 'Pendente', responsavel: 'Não atribuído' });
  assert.equal(filas.marcacao.length, 13);
  assert.deepEqual(filas.resumoEspera, { total: 7, maiorEspera: 15, totalExames: 4 });
  assert.equal(filas.encaminhar('000206'), true);
  assert.equal(filas.resumoEspera.totalExames, 3);
});

test('mantém o estado vazio coerente quando todas as solicitações são encaminhadas', () => {
  const filas = useFilasStore(createPinia());
  for (const item of filas.espera) assert.equal(filas.encaminhar(item.id), true);

  assert.deepEqual(filas.resumoEspera, { total: 0, maiorEspera: 0, totalExames: 0 });
  assert.equal(filas.marcacao.length, 20);
  assert.equal(useFilasStore(createPinia()).espera.length, 8);
});
