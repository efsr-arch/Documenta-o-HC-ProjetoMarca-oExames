import assert from 'node:assert/strict';
import test from 'node:test';
import { filtrarUsuarios, usuariosDemonstrativos } from '../src/data/administracao.ts';

const semFiltros = { busca: '', perfil: '', status: '' };

test('contém os 5 usuários exatamente como no protótipo visual', () => {
  assert.deepEqual(
    usuariosDemonstrativos.map((u) => [u.nome, u.perfil, u.status, u.ultimoAcesso]),
    [
      ['Marcadora A', 'Marcadora', 'Ativo', '—'],
      ['Marcadora B', 'Marcadora', 'Ativo', '—'],
      ['Coordenadora', 'Coordenação', 'Ativo', '—'],
      ['Administrador', 'Administrador', 'Ativo', '—'],
      ['Marcadora C', 'Marcadora', 'Inativo', '—'],
    ],
  );
});

test('sem filtros retorna todos os usuários', () => {
  assert.equal(filtrarUsuarios(usuariosDemonstrativos, semFiltros).length, 5);
});

test('busca ignora acentos e maiúsculas', () => {
  const r = filtrarUsuarios(usuariosDemonstrativos, { ...semFiltros, busca: 'COORDENADORA' });
  assert.equal(r.length, 1);
  assert.equal(r[0].nome, 'Coordenadora');
});

test('filtra por perfil e por status', () => {
  assert.equal(filtrarUsuarios(usuariosDemonstrativos, { ...semFiltros, perfil: 'Marcadora' }).length, 3);
  const inativos = filtrarUsuarios(usuariosDemonstrativos, { ...semFiltros, status: 'Inativo' });
  assert.deepEqual(inativos.map((u) => u.nome), ['Marcadora C']);
});
