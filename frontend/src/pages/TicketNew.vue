
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { addItem } from '../ticketsStore.js'

const router = useRouter()

const title = ref('')
const pumpId = ref(1)
const description = ref('')
const errors = ref({})

function createTicket() {
  errors.value = {}

  const cleanTitle = title.value.trim()
  const cleanDescription = description.value.trim()
  const numericPumpId = Number(pumpId.value)

  if (cleanTitle.length < 5 || cleanTitle.length > 80) {
    errors.value.title = 'Название должно содержать от 5 до 80 символов.'
  }

  if (!Number.isInteger(numericPumpId) || numericPumpId <= 0) {
    errors.value.pumpId = 'Укажи целый номер насоса больше нуля.'
  }

  if (cleanDescription.length < 10 || cleanDescription.length > 500) {
    errors.value.description =
      'Описание должно содержать от 10 до 500 символов.'
  }

  if (Object.keys(errors.value).length > 0) {
    return
  }

  addItem({
    title: cleanTitle,
    pumpId: numericPumpId,
    description: cleanDescription,
  })

  title.value = ''
  pumpId.value = 1
  description.value = ''
  errors.value = {}

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
      />
      <p v-if="errors.title" class="error">{{ errors.title }}</p>

      <label for="pumpId">Номер насоса</label>
      <input
        id="pumpId"
        v-model.number="pumpId"
        type="number"
        min="1"
        step="1"
      />
      <p v-if="errors.pumpId" class="error">{{ errors.pumpId }}</p>

      <label for="description">Описание</label>
      <textarea
        id="description"
        v-model="description"
        placeholder="Опиши проблему подробнее"
        rows="4"
      />
      <p v-if="errors.description" class="error">
        {{ errors.description }}
      </p>

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

.page > p {
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
textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 11px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font: inherit;
}

.error {
  margin: 0;
  color: #c62828;
  font-size: 14px;
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
