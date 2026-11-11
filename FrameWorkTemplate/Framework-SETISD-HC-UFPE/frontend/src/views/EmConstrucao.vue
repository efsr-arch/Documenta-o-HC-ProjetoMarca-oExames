<script setup lang="ts">
import { useRoute } from 'vue-router'

// Recupera informações da rota atual.
const route = useRoute()
</script>

<template>
  <section class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-paper-text">
        {{ route.name }}
      </h2>

      <p class="mt-2 text-paper-text/70">
        Esta funcionalidade está sendo desenvolvida
        pela equipe SIGEx-HC.
      </p>
    </div>

    <div class="rounded-xl border border-[#E9DCCB] bg-white p-8 shadow-sm">
      <div class="flex flex-col items-center gap-3 py-8">
        <h3 class="text-lg font-semibold text-paper-primary">
          SIGEx-HC
        </h3>

        <p class="text-center text-paper-text/70">
          Em breve, esta tela estará disponível.
        </p>
      </div>
    </div>
  </section>
</template>