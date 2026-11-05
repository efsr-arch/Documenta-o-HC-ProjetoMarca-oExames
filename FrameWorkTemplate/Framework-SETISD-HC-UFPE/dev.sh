#!/bin/bash

# Cores para o output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}==================================================${NC}"
echo -e "${BLUE}   🛠️  Modo Desenvolvimento: Portal de Dados      ${NC}"
echo -e "${BLUE}==================================================${NC}"

# Função para limpar processos ao sair
cleanup() {
    echo -e "\n${YELLOW}🛑 Encerrando servidores...${NC}"
    pkill -P $$ # Mata todos os processos filhos deste script
    pkill -f "uvicorn src.main:app" || true
    pkill -f "vite" || true
    exit
}

# Captura sinais de interrupção (Ctrl+C)
trap cleanup SIGINT SIGTERM

# 0. Limpeza inicial
pkill -f "uvicorn src.main:app" || true
pkill -f "vite" || true

# 1. Verificação das ferramentas necessárias
echo -e "${YELLOW}[1/4] Verificando ferramentas...${NC}"
tools=("node" "python3" "uv" "npm")
for tool in "${tools[@]}"; do
    if ! command -v "$tool" &> /dev/null; then
        echo -e "${RED}❌ Erro: '$tool' não encontrado.${NC}"
        exit 1
    fi
done

# 2. Sincronizando Backend
echo -e "\n${YELLOW}[2/4] Sincronizando Backend (Python)...${NC}"
uv sync

# 3. Sincronizando Frontend
echo -e "\n${YELLOW}[3/4] Sincronizando Frontend (Node)...${NC}"
cd frontend
npm install
cd ..

# 4. Iniciando servidores
echo -e "\n${BLUE}==================================================${NC}"
echo -e "${GREEN}🚀 Iniciando servidores em paralelo...${NC}"
echo -e "📡 Backend: http://127.0.0.1:8000"
echo -e "🎨 Frontend: http://localhost:5173 (com Proxy para /api)"
echo -e "${BLUE}==================================================${NC}\n"

# Inicia o Backend em background
uv run uvicorn src.main:app --host 127.0.0.1 --port 8000 --reload > backend.log 2>&1 &
BACKEND_PID=$!

echo -e "${GREEN}✅ Backend iniciado (PID: $BACKEND_PID). Logs em backend.log${NC}"

# Inicia o Frontend em foreground (Vite dev server)
echo -e "${YELLOW}Iniciando Vite Dev Server...${NC}\n"
cd frontend
npm run dev
