// Dados FICTÍCIOS da tela de Administração (protótipo visual).
// Nenhuma informação aqui vem de backend ou representa regra de negócio definitiva.

export type PerfilUsuario = 'Marcadora' | 'Coordenação' | 'Administrador';
export type StatusUsuario = 'Ativo' | 'Inativo';

export interface UsuarioAdmin {
  id: string;
  nome: string;
  perfil: PerfilUsuario;
  status: StatusUsuario;
  ultimoAcesso: string;
}

export interface FiltrosUsuarios {
  busca: string;
  perfil: string;
  status: string;
}

export interface AbaAdministracao {
  id: 'usuarios' | 'perfis' | 'parametros' | 'fontes';
  label: string;
}

export const abasAdministracao: AbaAdministracao[] = [
  { id: 'usuarios', label: 'Usuários' },
  { id: 'perfis', label: 'Perfis e permissões' },
  { id: 'parametros', label: 'Parâmetros' },
  { id: 'fontes', label: 'Fontes de dados' },
];

export const perfisDisponiveis: PerfilUsuario[] = ['Marcadora', 'Coordenação', 'Administrador'];
export const statusDisponiveis: StatusUsuario[] = ['Ativo', 'Inativo'];

export const usuariosDemonstrativos: UsuarioAdmin[] = [
  { id: 'u1', nome: 'Marcadora A', perfil: 'Marcadora', status: 'Ativo', ultimoAcesso: '—' },
  { id: 'u2', nome: 'Marcadora B', perfil: 'Marcadora', status: 'Ativo', ultimoAcesso: '—' },
  { id: 'u3', nome: 'Coordenadora', perfil: 'Coordenação', status: 'Ativo', ultimoAcesso: '—' },
  { id: 'u4', nome: 'Administrador', perfil: 'Administrador', status: 'Ativo', ultimoAcesso: '—' },
  { id: 'u5', nome: 'Marcadora C', perfil: 'Marcadora', status: 'Inativo', ultimoAcesso: '—' },
];

export const perfisDeAcesso = [
  { perfil: 'Marcadora', descricao: 'consulta e triagem.' },
  { perfil: 'Coordenação', descricao: 'acompanhamento e relatórios.' },
  { perfil: 'Administrador', descricao: 'configurações, fontes e usuários.' },
];

export const textoParametrosPriorizacao =
  'Prazos por exame, faixas visuais e critérios só serão ativados depois de validados com a equipe do HC.';

function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

export function filtrarUsuarios(usuarios: UsuarioAdmin[], filtros: FiltrosUsuarios): UsuarioAdmin[] {
  const termo = normalizar(filtros.busca);
  return usuarios.filter((u) => {
    if (termo && !normalizar(u.nome).includes(termo)) return false;
    if (filtros.perfil && u.perfil !== filtros.perfil) return false;
    if (filtros.status && u.status !== filtros.status) return false;
    return true;
  });
}
