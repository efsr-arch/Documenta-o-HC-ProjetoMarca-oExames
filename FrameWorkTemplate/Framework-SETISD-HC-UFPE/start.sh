#!/bin/bash

# Cores para o output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}==================================================${NC}"
echo -e "${BLUE}   🚀 Iniciando Aplicação                         ${NC}"
echo -e "${BLUE}==================================================${NC}"

# 0. Limpeza de processos anteriores
echo -e "${YELLOW}🧹 Limpando processos anteriores...${NC}"
pkill -f "uvicorn src.main:app" || true

# 1. Verificação das ferramentas necessárias
echo -e "\n${YELLOW}[1/6] Verificando ferramentas do sistema...${NC}"
tools=("node" "python3" "pip" "uv" "npm")
for tool in "${tools[@]}"; do
    if ! command -v "$tool" &> /dev/null; then
        echo -e "${RED}❌ Erro: '$tool' não foi encontrado.${NC}"
        echo -e "Certifique-se de que o ambiente está configurado corretamente."
        exit 1
    else
        version=$($tool --version 2>&1 | head -n 1)
        echo -e "  ✅ $tool: ${GREEN}$version${NC}"
    fi
done

# 2. Criação do venv e 3. Instalação de pacotes Python (via uv)
echo -e "\n${YELLOW}[2-3/6] Sincronizando ambiente Python (uv)...${NC}"
if [ ! -d ".venv" ]; then
    echo -e "  ⚙️  Criando novo ambiente virtual (.venv)..."
fi

# uv sync já lida com criação de venv e instalação de dependências de forma otimizada
if uv sync; then
    echo -e "  ✅ Dependências Python sincronizadas."
else
    echo -e "${RED}❌ Erro ao sincronizar dependências Python.${NC}"
    exit 1
fi

# 4. Instalação das dependências do frontend
echo -e "\n${YELLOW}[4/6] Verificando dependências do frontend...${NC}"
if [ -d "frontend" ]; then
    cd frontend
    if npm install; then
        echo -e "  ✅ Dependências do frontend instaladas."
    else
        echo -e "${RED}❌ Erro ao instalar dependências do frontend.${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ Diretório 'frontend' não encontrado.${NC}"
    exit 1
fi

# 5. Build do frontend
echo -e "\n${YELLOW}[5/6] Gerando build do frontend...${NC}"
if npm run build; then
    echo -e "  ✅ Build finalizado com sucesso."
else
    echo -e "${RED}❌ Erro no build do frontend.${NC}"
    exit 1
fi
cd ..

# 6. Execução da aplicação em foreground
IP="0.0.0.0"
PORT="8000"
LOCAL_IP=$(hostname -I | awk '{print $1}')

echo -e "\n${BLUE}==================================================${NC}"
echo -e "${GREEN}✨ Aplicação pronta para iniciar!${NC}"
echo -e "${BLUE}--------------------------------------------------${NC}"
echo -e "📍 ${BLUE}IP Bind:${NC}    $IP"
echo -e "🔌 ${BLUE}Porta:${NC}      $PORT"
echo -e "🔗 ${BLUE}Local:${NC}      http://localhost:$PORT"
echo -e "🌐 ${BLUE}Rede:${NC}       http://$LOCAL_IP:$PORT"
echo -e "${BLUE}==================================================${NC}\n"

# Executa em foreground
uv run uvicorn src.main:app --host $IP --port $PORT --reload
