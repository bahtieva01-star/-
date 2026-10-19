
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { items } from '../ticketsStore.js'

const router = useRouter()

const title = ref('')
const description = ref('')
const pumpId = ref(1)

function createTicket() {
  if (!title.value.trim() || !description.value.trim()) {
    alert('Заполни название и описание заявки')
    return
  }

  const nextId = Math.max(0, ...items.value.map(item => item.id)) + 1

  items.value.push({
    id: nextId,
    number: `A-${100 + nextId}`,
    title: title.value.trim(),
    description: description.value.trim(),
    pumpId: Number(pumpId.value),
    status: 'New',
    createdAt: new Date().toLocaleString('ru-RU'),
  })

  router.push('/')
}
</script>

<template>
  <main class="page">
    <h1>Создание заявки</h1>
    <p>Укажи данные о проблеме с насосным оборудованием.</p>

    <form @submit.prevent="createTicket">
      <label for="title">Название проблемы</label>
      <input
        id="title"
        v-model="title"
        type="text"
        placeholder="Например, насос не запускается"
        required
      />

      <label for="description">Описание</label>
      <textarea
        id="description"
        v-model="description"
        placeholder="Опиши проблему"
        rows="4"
        required
      />

      <label for="pumpId">Номер насоса</label>
      <select id="pumpId" v-model="pumpId">
        <option :value="1">Насос № 1</option>
        <option :value="2">Насос № 2</option>
        <option :value="3">Насос № 3</option>
      </select>

      <button type="submit">Создать заявку</button>
    </form>
  </main>
</template>

<style scoped>
.page {
  max-width: 700px;
  margin: 0 auto;
  padding: 32px 20px;
}

h1 {
  color: #183153;
}

p {
  color: #586579;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 24px;
}

label {
  font-weight: 600;
  margin-top: 8px;
}

input,
textarea,
select {
  width: 100%;
  box-sizing: border-box;
  padding: 11px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font: inherit;
}

button {
  margin-top: 12px;
  padding: 12px;
  border: none;
  border-radius: 6px;
  background: #183153;
  color: white;
  font: inherit;
  cursor: pointer;
}

button:hover {
  background: #274b78;
}
</style>
