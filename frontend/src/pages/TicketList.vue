
<script setup>
import { items } from '../ticketsStore.js'
import TicketTable from '../components/TicketTable.vue'
</script>

<template>
  <main class="page">
    <h1>Заявки на устранение простоев</h1>
    <p>Учёт и обработка заявок на устранение простоев насосного оборудования.</p>

    <TicketTable :items="items" />
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
</style>
