import assert from 'node:assert/strict';
import test from 'node:test';
import { filtrarSolicitacoes, solicitacoesDemonstrativas } from '../src/data/filaMarcacao.ts';

const vazio = { busca: '', exame: '', clinica: '', situacao: '' };
test('combina filtros e preserva a base demonstrativa', () => {
  const resultado = filtrarSolicitacoes(solicitacoesDemonstrativas, { ...vazio, exame: 'Tomografia', clinica: 'Oncologia', situacao: 'Em análise' });
  assert.deepEqual(resultado.map(item => item.id), ['000134', '000145']);
  assert.equal(solicitacoesDemonstrativas.length, 12);
});
test('aceita protocolo com cerquilha e busca sem diferenciar maiúsculas', () => {
  assert.equal(filtrarSolicitacoes(solicitacoesDemonstrativas, { ...vazio, busca: '#000134' })[0].id, '000134');
  assert.equal(filtrarSolicitacoes(solicitacoesDemonstrativas, { ...vazio, busca: ' PACIENTE 002 ' })[0].id, '000135');
});
test('retorna vazio para filtros incompatíveis e recupera todos ao limpar', () => {
  assert.equal(filtrarSolicitacoes(solicitacoesDemonstrativas, { ...vazio, exame: 'Tomografia', clinica: 'Cardiologia' }).length, 0);
  assert.equal(filtrarSolicitacoes(solicitacoesDemonstrativas, vazio).length, 12);
});
