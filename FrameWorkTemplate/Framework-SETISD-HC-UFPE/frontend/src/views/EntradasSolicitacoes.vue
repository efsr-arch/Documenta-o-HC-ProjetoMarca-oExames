<script setup lang="ts">
import {
  ArrowPathIcon,
  ArrowUpTrayIcon,
  CircleStackIcon,
  ClockIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  TableCellsIcon,
} from '@heroicons/vue/24/outline';
import Card from '../components/Card.vue';

const indicadores = [
  { titulo: 'Registros recebidos', valor: 95, legenda: 'Total da última entrada', icone: DocumentTextIcon },
  { titulo: 'Inconsistências', valor: 5, legenda: 'Aguardam conferência', icone: ExclamationTriangleIcon },
  { titulo: 'Duplicatas evitadas', valor: 3, legenda: 'Sinalizadas para revisão', icone: CircleStackIcon },
];
</script>

<template>
  <section class="space-y-5 text-paper-text">
    <header class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p class="text-[11px] font-extrabold tracking-[.12em] text-paper-primary">SIGEX-HC / GESTÃO DE EXAMES</p>
        <h1 class="mt-1 text-[28px] leading-tight font-extrabold">Entradas de Solicitações</h1>
        <p class="mt-1.5 text-sm text-paper-text/70">
          Receba solicitações da planilha conectada ou por envio manual de arquivo.
        </p>
      </div>
      <button type="button" class="acao acao-secundaria" disabled>
        <ClockIcon class="size-4" aria-hidden="true" />
        Ver histórico de entradas
      </button>
    </header>

    <Card class="painel fontes">
      <h2 class="mb-4 border-b border-[#e8d6c6] pb-3 text-sm font-bold text-paper-primary">
        Origem das solicitações
      </h2>
      <div class="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <section class="rounded-xl border border-[#e8d6c6] bg-[#faf7f2] p-5">
          <div class="flex flex-wrap items-center gap-3">
            <span class="grid size-12 shrink-0 place-items-center rounded-xl bg-[#328457] text-white">
              <TableCellsIcon class="size-6" aria-hidden="true" />
            </span>
            <div class="grow">
              <h3 class="text-base font-bold">Google Sheets</h3>
              <p class="mt-0.5 text-xs text-paper-text/70">Planilha de captação de solicitações</p>
            </div>
            <span class="rounded-md bg-[#e0eee3] px-2 py-1 text-xs font-semibold text-[#285f43]">
              Conexão simulada
            </span>
          </div>
          <div class="mt-5 flex flex-wrap items-center justify-between gap-3 border-y border-[#e8d6c6] py-4">
            <div>
              <p class="text-[11px] font-bold tracking-wide text-paper-text/70 uppercase">Última sincronização</p>
              <p class="mt-1 text-sm font-semibold">
                <time datetime="2026-10-27T16:42:00-03:00">27/10/2026 às 16:42</time> (exemplo)
              </p>
            </div>
            <button type="button" class="acao" disabled>
              <ArrowPathIcon class="size-4" aria-hidden="true" />
              Sincronizar agora
            </button>
          </div>
          <p class="mt-3 text-xs text-paper-text/70">
            A integração com o Google Sheets está prevista para uma próxima etapa.
          </p>
        </section>

        <section class="flex min-h-56 flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#d9bbae] bg-[#faf7f2] p-5 text-center">
          <ArrowUpTrayIcon class="mb-4 size-8 text-paper-primary" aria-hidden="true" />
          <h3 class="font-bold">Importar arquivo manualmente</h3>
          <p class="mt-1.5 text-sm text-paper-text/70">Envie uma planilha CSV ou XLSX com as solicitações.</p>
          <button type="button" class="acao mt-4" disabled>Selecionar arquivo</button>
        </section>
      </div>
    </Card>

    <section class="space-y-2.5" aria-labelledby="resumo-entradas">
      <h2 id="resumo-entradas" class="text-sm font-bold">Resumo da última entrada <span class="font-normal text-paper-text/70">· Dados fictícios</span></h2>
      <div class="grid gap-3.5 sm:grid-cols-3">
        <Card v-for="indicador in indicadores" :key="indicador.titulo" class="painel indicador">
          <div class="flex items-center justify-between gap-2">
            <h3 class="text-xs font-bold text-paper-text/75">{{ indicador.titulo }}</h3>
            <span class="grid size-8 shrink-0 place-items-center rounded-lg bg-[#f5e7dd] text-paper-primary">
              <component :is="indicador.icone" class="size-4" aria-hidden="true" />
            </span>
          </div>
          <p class="text-[26px] leading-tight font-extrabold">{{ indicador.valor }}</p>
          <p class="mt-1 text-xs text-paper-text/70">{{ indicador.legenda }}</p>
        </Card>
      </div>
    </section>

    <p class="rounded-xl border border-[#f1ce98] bg-[#fff2dd] px-4 py-3 text-xs leading-relaxed text-[#805724]">
      <strong>Como funciona</strong> · A sincronização deve preservar os estados e o histórico das solicitações.
      Registros repetidos ou inválidos devem ser conferidos pela equipe antes de qualquer alteração.
    </p>
  </section>
</template>

<style scoped>
.painel {
  border: 1px solid #e8d6c6;
  border-radius: 15px;
  background: #fdfbf8;
  box-shadow: 0 5px 18px #643d240a;
}

.fontes :deep(.p-6) {
  padding: clamp(14px, 2vw, 21px);
}

.indicador :deep(.p-6) {
  padding: 16px 18px;
}

.acao {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 36px;
  padding: 7px 13px;
  border: 1px solid var(--color-paper-primary);
  border-radius: 9px;
  background: var(--color-paper-primary);
  color: white;
  font-size: 12px;
  font-weight: 700;
}

.acao-secundaria {
  border-color: #ebd2c4;
  background: #f5e7dd;
  color: var(--color-paper-primary);
}
</style>
