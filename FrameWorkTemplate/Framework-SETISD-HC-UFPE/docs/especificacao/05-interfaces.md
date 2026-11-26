# Interfaces e Integrações

## 1. Protótipos
* Links para Figma ou diretório /assets.

## 2. Hardware
* Impressoras térmicas e leitores de código de barras.

## 3. Software
* Integração com AGHU. 

### [SCHEMA] Interface de Integração (TypeScript)
```typescript
interface IHospitalApi {
  getPatientData(id: string): Promise<PatientRecord>;
  syncProntuario(data: ProntuarioUpdate): Promise<SyncResponse>;
  checkLdapAuth(credentials: AuthInfo): Promise<AuthStatus>;
}
```

## 4. Relatórios do SIGEx-HC

A tela demonstrativa fica em `/relatorios`, no menu **Relatórios**. O recorte inicial mostra outubro de 2026, conforme o protótipo. Selecione período, clínica, exame ou marcadora e use **Aplicar filtros** para atualizar os indicadores, os gráficos e a tabela. **Limpar filtros** restaura o recorte inicial. Combinações sem solicitações exibem uma mensagem e desabilitam a exportação.

O período usa a data da solicitação. O gráfico semanal agrupa os dias do mês em blocos de até sete dias, incluindo semanas com contagem zero. Os agendados incluem exames já realizados, ausências e agendamentos ainda sem desfecho registrado. As taxas dividem cada contagem pelo total de realizados e ausências. A espera média divide os dias acumulados entre solicitação e data marcada pelo total de agendamentos. Quando falta o denominador, a tela exibe um travessão.

**Exportar relatório** gera no navegador um CSV demonstrativo com o recorte aplicado, as linhas por exame e os totais. A massa fictícia fica em `frontend/src/data/relatorios.ts` e as opções, os filtros e as agregações ficam em `frontend/src/services/relatoriosService.ts`. O serviço é o ponto de integração previsto para uma futura API.

Para verificar a tela, execute `npm test` e `npm run build` em `frontend/`.
