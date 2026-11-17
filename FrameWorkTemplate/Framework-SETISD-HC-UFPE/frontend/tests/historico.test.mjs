import assert from 'node:assert/strict';
import test from 'node:test';
import {
  filtrarHistorico,
  eventosHistoricoDemonstrativos,
  kpisDemonstrativos,
} from '../src/data/historico.ts';

const filtrosPadrao = {
  busca: '',
  tipoAcao: '',
  responsavel: '',
  periodo: '',
};

test('mantém KPIs demonstrativos conforme o protótipo visual', () => {
  assert.equal(kpisDemonstrativos.eventosRegistrados, 248);
  assert.equal(kpisDemonstrativos.usuariosEmAtividade, 6);
  assert.equal(kpisDemonstrativos.alteracoesHoje, 17);
});

test('contém os 6 primeiros registros exatamente como no protótipo visual', () => {
  const primeiros = eventosHistoricoDemonstrativos.slice(0, 6);
  
  assert.equal(primeiros[0].dataHora, '27/10/2026 16:42');
  assert.equal(primeiros[0].protocolo, '000134');
  assert.equal(primeiros[0].alteracaoRealizada, 'Status → Em análise');
  assert.equal(primeiros[0].responsavel, 'Marcadora A');

  assert.equal(primeiros[1].dataHora, '27/10/2026 15:20');
  assert.equal(primeiros[1].protocolo, '000134');
  assert.equal(primeiros[1].alteracaoRealizada, 'Observação adicionada');
  assert.equal(primeiros[1].responsavel, 'Marcadora A');

  assert.equal(primeiros[2].dataHora, '27/10/2026 09:18');
  assert.equal(primeiros[2].protocolo, '000135');
  assert.equal(primeiros[2].alteracaoRealizada, 'Status → Aguardando vaga');
  assert.equal(primeiros[2].responsavel, 'Marcadora B');

  assert.equal(primeiros[3].dataHora, '26/10/2026 17:05');
  assert.equal(primeiros[3].protocolo, '000134');
  assert.equal(primeiros[3].alteracaoRealizada, 'Solicitação importada');
  assert.equal(primeiros[3].responsavel, 'Sistema');

  assert.equal(primeiros[4].dataHora, '26/10/2026 11:43');
  assert.equal(primeiros[4].protocolo, '000136');
  assert.equal(primeiros[4].alteracaoRealizada, 'Conferência registrada');
  assert.equal(primeiros[4].responsavel, 'Marcadora B');

  assert.equal(primeiros[5].dataHora, '25/10/2026 14:29');
  assert.equal(primeiros[5].protocolo, '000137');
  assert.equal(primeiros[5].alteracaoRealizada, 'Informação de contato atualizada');
  assert.equal(primeiros[5].responsavel, 'Marcadora A');
});

test('busca por protocolo com e sem cerquilha (#000134 e 000134)', () => {
  const comHash = filtrarHistorico(eventosHistoricoDemonstrativos, {
    ...filtrosPadrao,
    busca: '#000134',
  });
  const semHash = filtrarHistorico(eventosHistoricoDemonstrativos, {
    ...filtrosPadrao,
    busca: '000134',
  });

  assert.equal(comHash.length, 3);
  assert.equal(semHash.length, 3);
  assert.deepEqual(comHash.map(e => e.id), ['evt-001', 'evt-002', 'evt-004']);
});

test('busca sem diferenciar maiúsculas e minúsculas ou acentos', () => {
  const res = filtrarHistorico(eventosHistoricoDemonstrativos, {
    ...filtrosPadrao,
    busca: 'observacao',
  });
  assert.ok(res.length >= 2);
  assert.ok(res.some(e => e.protocolo === '000134'));
});

test('filtra por responsável e tipo de ação conjuntamente', () => {
  const filtrado = filtrarHistorico(eventosHistoricoDemonstrativos, {
    ...filtrosPadrao,
    responsavel: 'Marcadora B',
    tipoAcao: 'Conferência registrada',
  });
  assert.ok(filtrado.length >= 1);
  assert.ok(filtrado.every(e => e.responsavel === 'Marcadora B'));
});

test('filtra por período de hoje (27/10/2026)', () => {
  const hoje = filtrarHistorico(eventosHistoricoDemonstrativos, {
    ...filtrosPadrao,
    periodo: 'hoje',
  });
  assert.equal(hoje.length, 3);
  assert.ok(hoje.every(e => e.dataHora.startsWith('27/10/2026')));
});

test('retorna lista completa ao limpar os filtros', () => {
  const limpo = filtrarHistorico(eventosHistoricoDemonstrativos, filtrosPadrao);
  assert.equal(limpo.length, eventosHistoricoDemonstrativos.length);
});
