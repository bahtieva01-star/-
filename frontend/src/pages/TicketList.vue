<script setup>
import { onMounted } from 'vue'
import { items, isLoading, errorMessage, loadItems } from '../ticketsStore.js'
import { getTickets } from '../api/tickets.js'
import TicketTable from '../components/TicketTable.vue'

onMounted(() => {
  loadItems(getTickets)
})
</script>

<template>
  <main class="page">
    <h1>Заявки на устранение простоев</h1>

    <p>
      Учёт и обработка заявок на устранение простоев насосного оборудования.
    </p>

    <p v-if="isLoading" class="message">
      Загрузка заявок...
    </p>

    <p v-else-if="errorMessage" class="error">
      {{ errorMessage }}
    </p>

    <p v-else-if="items.length === 0" class="message">
      Заявок пока нет.
    </p>

    <TicketTable v-else :items="items" />
  </main>
</template>

<style scoped>
.page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 32px 20px;
}

h1 {
  color: #183153;
}

p {
  color: #586579;
  line-height: 1.5;
}

.message {
  padding: 16px;
  background: #f1f5f9;
  border-radius: 8px;
}

.error {
  padding: 16px;
  color: #b91c1c;
  background: #fef2f2;
  border-radius: 8px;
}
</style>