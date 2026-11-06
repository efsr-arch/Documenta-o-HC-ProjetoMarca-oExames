# Documento de Visão

## 1. Problema e Oportunidade

### O Problema

**Processos Manuais e Desconectados:** O agendamento de exames é realizado por meio de formulários genéricos (*Microsoft Forms*), exigindo o controle e o encerramento manual de vagas em planilhas à medida que o limite de capacidade é atingido.

**Ausência de Triagem e Priorização Clínica:** Inexistência de regras de negócio ou algoritmos que permitam classificar os pedidos por nível de urgência ou gravidade.

**Falha na Governança e Regras de Acesso:** Inconsistência nos fluxos do sistema AGHU, permitindo que profissionais médicos realizem agendamentos diretos à margem do fluxo oficial, burlando a fila e a cota de vagas.

**Falta de Comunicação com o Paciente:** Ausência de canais automatizados para o envio de lembretes de consulta e coleta de confirmação ou cancelamento prévio por parte do paciente.

### Impacto

**Sobrecarga Operacional e Erro Humano:** A dependência do manejo manual de planilhas gera retrabalho constante, risco de *overbooking* e divergência nos dados de capacidade.

**Risco Assistencial:** Pacientes com quadros clínicos graves ou urgentes aguardam no mesmo fluxo de solicitações eletivas, atrasando diagnósticos críticos.

**Comprometimento da Equidade e Transparência:** Agendamentos paralelos no AGHU desequilibram a oferta de vagas, prejudicam a fila oficial e retiram o controle institucional sobre a alocação de recursos.

**Índice de Absenteísmo e Ociosidade:** A ausência de lembretes resulta no não comparecimento dos pacientes sem aviso prévio, impedindo a reoferta tempestiva das vagas desmarcadas e gerando ociosidade em equipamentos e equipes médicas.

### Solução Proposta

**Desenvolvimento de Solução Integrada ao AGHU da UFPE:** Criação de uma camada de software/módulo de integração conectado diretamente à infraestrutura e base de dados do AGHU da UFPE, centralizando a captação e regulação das solicitações de exames sem a necessidade de planilhas paralelas ou formulários externos.

**Gestão Dinâmica de Vagas e Capacidade no AGHU:** Sincronização e controle de cotas em tempo real junto ao AGHU, promovendo o encerramento automático da oferta de exames no portal de agendamento no momento exato em que o teto de vagas for atingido.

**Motor de Triagem e Priorização Clínica Integrado:** Implementação de protocolo parametrizado de triagem na camada de integração, que classifica e ordena automaticamente os pedidos no AGHU com base no nível de prioridade e urgência clínica.

**Reforço de Governança e Regras de Permissão no AGHU:** Restrição do acesso direto à criação de agendas informais no AGHU, canalizando todas as reservas obrigatoriamente através do fluxo oficial e auditável de regulação.

**Módulo de Notificação e Confirmação Ativa (SMS/WhatsApp):** Integração das agendas de exames do AGHU a um serviço automatizado de mensageria para envio de lembretes aos pacientes. Em caso de cancelamento confirmado via mensagem, a vaga é liberada no AGHU e reoferta automaticamente ao próximo paciente da fila priorizada.

## 2. Partes Interessadas (Stakeholders)

### Usuários Finais

Os usuários finais da solução compreendem a equipe administrativa de regulação e agendamento, além do corpo médico e assistencial do hospital. Para os profissionais administrativos, a ferramenta elimina a necessidade de controle manual em planilhas e formulários externos, integrando as rotinas operacionais diretamente ao fluxo do AGHU da UFPE. Para a equipe médica, o sistema proporciona previsibilidade, transparência e critérios clínicos parametrizados para a solicitação de exames, garantindo que a ordenação das vagas ocorra de forma justa e padronizada, ao mesmo tempo em que estabelece travas de segurança que impedem agendamentos informais fora da regulação oficial.

### Patrocinadores

Representados pela alta gestão do hospital (Superintendência, Diretorias Assistenciais e Governança de TI do HC-UFPE / Ebserh), os patrocinadores buscam a otimização dos recursos públicos, o ganho de eficiência operacional e o fortalecimento da governança institucional. O principal interesse desse grupo reside na maximização do uso dos equipamentos e salas de exames, na redução dos custos decorrentes do absenteísmo, na garantia de auditoria e conformidade dos processos e na plena alinhamento da infraestrutura tecnológica com as diretrizes do sistema AGHU.

### Pacientes

Sendo o foco central da prestação dos serviços de saúde, os pacientes são diretamente beneficiados pela modernização e humanização do atendimento. Com a introdução de canais ativos e acessíveis de comunicação (como mensagens automatizadas via WhatsApp ou SMS), os pacientes passam a receber lembretes claros sobre data, horário e orientações de preparo dos exames, dispondo de um meio simples para confirmar ou cancelar sua presença. Além disso, a aplicação de critérios de priorização clínica assegura que os indivíduos com quadros de maior urgência tenham acesso tempestivo aos diagnósticos necessários.

## 3. Escopo do Produto

- O Hospital das Clínicas da UFPE enfrenta gargalos críticos na gestão de exames decorrentes do uso de processos manuais (*Microsoft Forms* e planilhas), ausência de triagem clínica parametrizada, burla de vagas por agendamentos informais no AGHU e absenteísmo por falta de confirmação dos pacientes. Esse cenário compromete a equidade no acesso, sobrecarrega as equipes e gera ociosidade nos recursos hospitalares.

- Para solucionar o problema, o projeto prevê o desenvolvimento de um módulo integrado ao AGHU da UFPE. O escopo abrange a gestão automática de capacidade em tempo real, um motor de priorização clínica por critérios de urgência, travas de governança e permissão no AGHU, e um sistema de mensageria (WhatsApp/SMS) para envio de lembretes e reoferta automática de vagas canceladas.

- A iniciativa alinha os interesses da gestão hospitalar (otimização de recursos e governança), simplifica o fluxo de trabalho das equipes médica e administrativa (previsibilidade e eliminação do retrabalho) e garante aos pacientes um atendimento mais ágil, justo e transparente.

## 4. Metas e Objetivos de Negócio

### Redução da Taxa de Absenteísmo

**Objetivo:** Diminuir o índice de pacientes que faltam aos exames sem aviso prévio.

**Métrica:** Percentual de absenteísmo mensal em relação ao total de exames agendados.

### Taxa de Reoferta e Aproveitamento de Vagas Canceladas

**Objetivo:** Garantir que vagas disponibilizadas por cancelamentos prévios sejam reaproveitadas.

**Métrica:** Percentual de vagas canceladas com antecedência que foram automaticamente reatribuídas a outros pacientes da fila.

### Redução do Tempo de Atendimento de Casos Prioritários (Lead Time Clínico)

**Objetivo:** Acelerar o diagnóstico de pacientes com quadros graves ou urgentes.

**Métrica:** Tempo médio decorrido entre a solicitação do exame e a realização do procedimento para pacientes classificados como prioridade alta/urgente.

### Conformidade do Fluxo de Agendamento (Taxa de Agendamentos Regulados)

**Objetivo:** Eliminar o bypass e agendamentos informais realizados diretamente no AGHU fora das regras operacionais.

**Métrica:** Percentual de exames agendados que passaram obrigatoriamente pela camada de regulação e triagem oficial do sistema.

### Eliminação do Processamento Manual de Dados

**Objetivo:** Reduzir a carga de trabalho administrativo com inserção e atualização de planilhas.

**Métrica:** Horas/homem dedicadas semanalmente à gestão manual de formulários, planilhas de controle de vagas e conferência de agendas.