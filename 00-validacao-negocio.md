# Marcador AGHUx— Documento de Validação e Especificação de Negócio

> **Padrão Oficial SETISD / HC-UFPE (HU Brasil) — Fase 0 (Alinhamento de Negócio)**  
> **Público-alvo:** Profissionais das áreas envolvidas e Equipe de TI.  
> **Objetivo:** Descrever o processo de trabalho em **linguagem pura de negócio** (sem jargões técnicos de programação ou banco de dados) para validação, alinhamento de expectativas e tomada de decisão antes de qualquer codificação.

---

## 1. Identificação do Projeto e Contexto Institucional

| Campo | Descrição |
| :--- | :--- |
| **Nome do Sistema** | [Sistema Marcador de exame] |
| **Área Solicitante / Cliente** | [Gerência, Unidade ou Setor no HC-UFPE] |
| **Instância Superior Competente** | [Gerência à qual a área proponente esteja subordinada ou Superintendência] |
| **Líder Técnico (SETISD)** | [Analista de TI desiginado para prestar suporte técnico] |
| **Objetivo Estratégico HU Brasil** | [Vincular o projeto aos objetivos do HU Brasil] |

---

## 2. O Problema que Queremos Resolver

> **Objetivo:** O hospital enfrenta problema na organização e marcação dos exames, muitas vezes pacientes não conseguem marcar exame ou marcam errado. Quando chega na mão das marcadoras de exames elas tentam marcar o exame do paciente e não dá certo, além disso a planilha usada não demonstra separar nenhum paciente por grau de prioridade, então seria necessário alguma configuração que garantisse essa justiça.

* **A Dor Central:**  
  Pacientes tem dificuldade ou não conseguem marcar exames direito.
 Não há padronização de prioridade, é subjetivo a quem marca o exame na hora.

* **Por que isso não pode continuar (Impactos Reais):**
  - **Sobrecarga de Trabalho:** As chefias e equipes perdem horas redigitando dados e conferindo manualmente tarefas que poderiam ser automáticas.
  - **Falta de Visibilidade:** A gestão não sabe em tempo real quem já entregou, quem está com pendências e onde estão os gargalos.
  - **Risco Institucional e Legal:** Falta de histórico confiável para responder a auditorias, questionamentos de órgãos de controle ou conferências internas.






---

## 3. Como o Processo Funciona Hoje (A Rotina Atual)

> **Objetivo:** hoje o processo funciona através de um forms e planilhas. O paciente se cadastra no forms pra conseguir marcar um exame e as marcadoras de exame com base na planilha tentam marcar o exame no AGHU

* **Meios Utilizados Hoje:**  
 WhatsApp, planilhas, e AGHU

* **A Rotina Prática de Trabalho:**
  1. **Início:** O paciente faz pedido de marcação de exame e a planilha é atualizada, com nome, código da solicitação e etc.
  2. **Preenchimento:** As marcadoras de exames copiam e colam os dados necessários para fazer o agendamento de exame no AGHU, muitas vezes tendo recebido número de solicitação de exame errado, invalidando a marcação.
  3. **Conferência:** - Não foi citado.
  4. **Entrega e Arquivo:** - Ainda não citado, mas deve ter um processo de relatório e chega nas mãos dos superiores.

---

## 4. O Que a Nova Solução Deve Entregar (Resultado Esperado)

> **Objetivo:** Ter uma validação das informações  para não ter problema de não conseguir marcar o exame. Haver uma view com os clientes, cores, e destacar informações cruciais para haver melhor condições para demonstrar mais dados para a escolha de quem vai ser marcado, com um grau de justica. 

* **A Proposta de Valor:** [ Centralizar o processo em um ambiente web simples, onde os dados são validados e categorizados,  só restando as marcadoras de exame copiarem e colarem os dados pro AGHU.*]
* **Ganhos Práticos Imediatos:**
  - Fim da não marcação de exames compulsória.
  - Alerta automático de erros ou inconsistências no momento da digitação.
  - Assinatura eletrônica segura com registro de quem fez, quando aprovou e o que alterou.
  - View de controle para todos poderem ver e consultar exames marcados, pendentes e já feitos.
  - Backup das views para manter um histórico de registro a ser consultado.

---

## 5. Como Será o Trabalho no Novo Sistema (O Novo Fluxo)

> **Objetivo:** Explicar em linguagem direta como o usuário vai interagir com o sistema, resolvendo a dor do processo manual de ponta a ponta.

* **1. Os dados já vêm prontos:** As marcadoras de exames já acessam a view com os dados de todos os pacientes que solicitaram exames.
* **2. Preenchimento rápido com travas contra erros:** O responsável digita ou seleciona os paciente direto na tela. O sistema já usa travas de segurança, não permite o cadastro na planilhas com algumas das métricas citadas (ex: duplicidade de horários ou campos obrigatórios em branco, código de solicitação de exame errado), o próprio sistema avisa antes de salvar.
* **3. Aprovação com um clique:** Quando o exame é marcado. O sistema registra automaticamente quem aprovou, data e hora, travando contra alterações indevidas. A chefia pode acompanhar essa view para gestão e conferência.
* **4. Informação pronta e disponível:** A gestão acompanha em tempo real um painel mostrando quem já entregou e quem está pendente. A versão oficial homologada fica acessível para consulta imediata de quem tem direito, sem necessidade de procurar papéis ou cobrar por telefone.

---

## 6. Quem Participa do Processo (Atores: Como Faz Hoje vs. Como Fará no Sistema)

| Ator / Perfil no Hospital | O que faz HOJE (Rotina Manual) | O que passará a fazer no NOVO SISTEMA | O que NÃO poderá fazer |
| :--- | :--- | :--- | :--- |
| **Área Gestora do Processo** *(Ex: Unidade de Pessoal, Farmácia Central, Regulação)* | Cobra prazos por telefone/e-mail, confere pilhas de papel ou junta dezenas de planilhas dispersas. | Habilita os períodos de trabalho, cadastra regras gerais, publica o resultado final e acompanha o painel geral de pendências em tempo real. | Não preenche dados rotineiros operacionais de setores individuais. |
| **Profissional do Setor / Executante** *(Quem realiza o atendimento ou rotina na ponta)* | . | Marca os exames com base na planilha não validada, além disso a justiça para marcar o exame é subjetiva e não há recursos há eles escolherem. | Não visualiza nem altera dados de setores que não sejam de sua alçada. |
| **Chefia Imediata / Responsável pelo Setor** *(Ex: Chefia de Unidade ou Setor)* | Confere folhas rubricadas à mão na mesa física, assina no papel e leva as pastas fisicamente. | Visualiza em uma tela única o trabalho da sua equipe, faz ajustes rápidos e aprova eletronicamente com um clique. | Não pode enviar lotes parciais ou com pendências em aberto. |
| **Gestão / Coordenação Superior** *(Ex: Chefia de Divisão ou Gerência* | Não tem visão em tempo real das entregas; depende de relatórios manuais solicitados e demorados. | Acompanha indicadores gerais em tempo real (painel executivo com taxas de cumprimento de prazos e pendências). | Acesso estritamente para visualização gerencial (não edita registros operacionais). |
| **Público / Usuário do Serviço** *(Colaboradores do hospital, pacientes ou cidadãos)* | Precisa ligar, chamar no whatsapp, mandar e-mail ou ir presencialmente ao setor para obter uma informação ou comprovante. | Consulta com agilidade pelo portal, pesquisando por nome ou setor, com rapidez e transparência garantida. | Não tem acesso a dados restritos ou confidenciais. |

---

## 7. Regras de Negócio Inegociáveis (RNs)

* **RN-01 (Identificação Funcional Única):** O profissional é identificado exclusivamente pela sua matrícula funcional (SIAPE). Para preservar a privacidade e evitar riscos de vazamento, dados pessoais sensíveis desnecessários (como CPF) não são coletados nem expostos no sistema.
* **RN-02 (Prevenção de Duplicidade e Choques):** O sistema impede e bloqueia que a mesma pessoa seja alocada em dois setores, turnos ou atendimentos conflitantes no mesmo horário, eliminando de raiz o risco das planilhas paralelas manuais.
* **RN-03 (Preservação e Imutabilidade do Histórico):** O fechamento de um período ou a abertura de um novo ciclo nunca apaga, altera ou sobrescreve informações passadas. Registros homologados tornam-se imutáveis para garantir respaldo em auditorias e consultas futuras.
* **RN-04 (Homologação em Bloco / Entrega Completa):** A chefia de unidade só pode homologar e encaminhar para a gestão central o lote 100% completo de todos os seus setores subordinados. O sistema bloqueia entregas parciais ou com pendências não resolvidas.
* **RN-05 (Autenticação Institucional Obrigatória):** O acesso interno para preenchimento, conferência e aprovação exige login institucional com a conta de rede do hospital, vinculando a autoria e data/hora de cada ação realizada.
* **RN-06 (Transparência Ativa com Privacidade):** Na consulta pública ou da equipe, o sistema exibe apenas o nome completo, identificação funcional e a informação oficial aprovada, garantindo publicidade dos atos administrativos em conformidade com as diretrizes de privacidade.

---

## 8. Painel de Gestão e Indicadores Estratégicos (KPIs)

O sistema deve disponibilizar painel gerencial hierárquico (cada chefia enxerga o seu escopo) com os seguintes indicadores de negócio:
1. **Taxa de Cumprimento de Prazos:** Acompanhamento percentual e quantitativo em tempo real de quais setores e unidades já concluíram suas entregas dentro do calendário oficial, eliminando a necessidade de cobranças manuais por telefone.
2. **Mapa de Pendências e Atrasos:** Listagem imediata de unidades ou setores que ainda estão com preenchimento aberto, rascunho pendente ou com prazo vencido, permitindo atuação pontual da liderança.
3. **Detecção de Inconsistências:** Alerta visual automático para profissionais ativos que não possuem alocação ou registro no ciclo vigente, evitando esquecimentos ou desvios de planejamento.







---

## 9. Matriz de Pontos de Decisão (Gabinete / Gestão do Negócio)

> *Itens que dependem de confirmação dos gestores do hospital antes da conclusão:*

| # | Ponto a Decidir | Impacto no Processo | Quem deve decidir? | Status / Definição |
| :-: | :--- | :--- | :--- | :--- |
| **1** | **Data Limite Oficial:** Até qual dia do período os setores devem fechar o preenchimento e assinar? | Define a regra do sistema para disparar alertas preventivos e travar edições intempestivas. | Gestão Central / Chefias | 🟡 Em definição |
| **2** | **Substituição de Chefia:** Qual o critério para assinatura quando a chefia titular estiver de férias ou afastada? | Evita o travamento da homologação em bloco da unidade inteira por ausência de um único responsável. | Gestão da Área | 🟡 Em definição |
| **3** | **Retificação pós-Homologação:** Qual é o rito formal para reabrir e corrigir dados já aprovados oficialmente? | Define se haverá solicitação formal de reabertura com justificativa gravada ou ajuste restrito à gestão central. | Gestão Central | 🟡 Em definição |

---
---

# 📘 GUIA METODOLÓGICO: COMO ESTE DOCUMENTO SE INTERLIGA AOS DEMAIS ARQUIVOS DO PROJETO

> **Apresentação Executiva para a Chefia:**  
> Esta seção explica a lógica de engenharia e governança adotada pelo SETISD para conectar as necessidades de negócio da ponta à construção do software.

### A Linha do Tempo: A Separação entre "Fase de Negócio" e "Fase de Engenharia"

Em qualquer projeto de software hospitalar existem dois mundos que precisam se comunicar com perfeição:
1. **O Mundo do Negócio (Chefias, Áreas Solicitantes, Governança, Direção):** Não devem ser expostos a termos técnicos de TI (bancos de dados, endpoints, JSON, status HTTP, docker, etc.). Eles precisam discutir *processos, dores reais, prazos, responsabilidades e regras*.
2. **O Mundo da Engenharia (Desenvolvedores e Testes):** Precisam de tabelas relacionais, tipos de dados estritos, rotas de API seguras e casos de uso testáveis.

Este documento (`00-validacao-negocio.md`) funciona como a **Ponte Oficial** entre esses dois mundos:

```text
               ┌────────────────────────────────────────────────────────┐
               │         00-VALIDAÇÃO E FLUXO DE NEGÓCIO (ESTE ARQUIVO)  │
FASE 1         │   Linguagem humana, fluxos e regras reais de negócio.  │
(Negócio)      │   Validado e assinado pelas Chefias e Direção do HC.   │
               └───────────────────────────┬────────────────────────────┘
                                           │
                 ┌─────────────────────────┴─────────────────────────┐
                 ▼ (Uma vez aprovado, a TI desdobra tecnicamente)     ▼
               ┌────────────────────────────────────────────────────────┐
FASE 2         │            ARTEFATOS DE ESPECIFICAÇÃO TÉCNICA           │
(Engenharia)   │   01-visao.md  →  02-requisitos.md  →  03-casos-uso.md │
               │   04-modelo-dados.md  →  05-interfaces  →  SPEC.md     │
               └────────────────────────────────────────────────────────┘
```

---

### Como cada seção deste documento alimenta a documentação técnica:

| Seção deste Documento de Negócio | O que ela entrega para a documentação técnica? | Arquivo de Destino |
| :--- | :--- | :--- |
| **Seção 2 (O Problema que Queremos Resolver)** | Define a motivação institucional, os riscos do modelo atual e a justificativa do projeto. | [01-visao.md](01-visao.md) *(Problema e Escopo)* |
| **Seção 3 (Como o Processo Funciona Hoje)** | Serve de base para mapear os processos manuais que serão substituídos e os dados legados. | [01-visao.md](01-visao.md) *(Cenário Atual)* |
| **Seção 4 (O Que a Nova Solução Deve Entregar)** | Define os objetivos do produto e os ganhos práticos que orientam a entrega de valor. | [01-visao.md](01-visao.md) *(Visão de Futuro)* |
| **Seção 5 (Como Será o Trabalho no Novo Sistema)** | Detalha as etapas práticas do usuário na tela, que viram os fluxos e cenários de uso do sistema. | [02-requisitos.md](02-requisitos.md) e [03-casos-uso.md](03-casos-uso.md) *(Casos de Uso e Fluxos)* |
| **Seção 6 (Quem Participa do Processo)** | Define os perfis de acesso, permissões de cada papel e o modelo de autorização local. | [02-requisitos.md](02-requisitos.md) e [03-casos-uso.md](03-casos-uso.md) *(Atores e RBAC)* |
| **Seção 7 (Regras de Negócio Inegociáveis)** | É convertida diretamente em requisitos funcionais estritos e validações de backend. | [02-requisitos.md](02-requisitos.md) *(Requisitos Funcionais - RFs)* |
| **Seção 8 (Painel de Gestão e Indicadores)** | Dá origem às consultas analíticas de acompanhamento, relatórios e telas gerenciais. | [05-interfaces.md](05-interfaces.md) *(Protótipos e Dashboards)* |
| **Seção 9 (Matriz de Pontos de Decisão)** | Orienta os parâmetros de configuração e regras que alimentam as tarefas de implementação. | [SPEC.md](SPEC.md) *(Definições e Tarefas)* |

---

### A Regra de Ouro do Processo no SETISD:

1. **Início do Projeto (Fase de Negócio):** O profissional de TI preenche este documento junto com os responsáveis pela área de negócio em reuniões de alinhamento, validando o problema real, os fluxos práticos e as decisões pendentes.
2. **Desenvolvimento (Fase de Engenharia):** Com este documento aprovado pelas partes envolvidas, a equipe de desenvolvimento tem total clareza técnica para elaborar os artefatos de `01` a `06` e programar a solução com segurança e sem retrabalho.

**Resultado:** O cliente hospitalar participa ativamente sem ser sobrecarregado com termos técnicos, e a equipe de TI constrói exatamente o que o hospital precisa.
