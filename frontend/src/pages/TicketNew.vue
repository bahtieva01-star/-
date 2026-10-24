<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { items } from '../ticketsStore.js'
import { createTicket as sendTicket } from '../api/tickets.js'

const router = useRouter()

const title = ref('')
const pumpId = ref(1)
const description = ref('')
const errors = ref({})
const isSubmitting = ref(false)
const serverError = ref('')

async function createTicket() {
  if (isSubmitting.value) return

  errors.value = {}
  serverError.value = ''

  const cleanTitle = title.value.trim()
  const cleanDescription = description.value.trim()
  const numericPumpId = Number(pumpId.value)

  if (cleanTitle.length < 5 || cleanTitle.length > 80) {
    errors.value.title = 'Название должно содержать от 5 до 80 символов.'
  }

  if (!Number.isInteger(numericPumpId) || numericPumpId <= 0) {
    errors.value.pumpId = 'Укажи целый номер насоса больше нуля.'
  }

  if (
    cleanDescription.length < 10 ||
    cleanDescription.length > 500
  ) {
    errors.value.description =
      'Описание должно содержать от 10 до 500 символов.'
  }

  if (Object.keys(errors.value).length > 0) return

  isSubmitting.value = true

  try {
    const newTicket = await sendTicket({
      title: cleanTitle,
      pumpId: numericPumpId,
      description: cleanDescription,
    })


    const existingIndex = items.value.findIndex(
      (item) => item.id === newTicket.id,
    )

    if (existingIndex === -1) {
      items.value.push(newTicket)
    } else {
      items.value[existingIndex] = newTicket
    }

    title.value = ''
    pumpId.value = 1
    description.value = ''
    errors.value = {}

    await router.push('/')
  } catch (error) {
    if (error.status === 400) {
      serverError.value =
        error.message || 'Проверь правильность заполнения полей.'
    } else if (error.status === 500) {
      serverError.value =
        'Ошибка сервера. Попробуй отправить заявку позже.'
    } else {
      serverError.value =
        'Не удалось отправить заявку. Проверь соединение и попробуй снова.'
    }
  } finally {
    isSubmitting.value = false
  }
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
        maxlength="100"
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
        maxlength="500"
        placeholder="Опиши проблему подробнее"
        rows="4"
      />
      <p v-if="errors.description" class="error">
        {{ errors.description }}
      </p>

      <p v-if="serverError" class="error server-error" role="alert">
        {{ serverError }}
      </p>

      
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Отправка...' : 'Создать заявку' }}
      </button>
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

.server-error {
  padding: 10px;
  background: #fef2f2;
  border-radius: 6px;
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

button:hover:not(:disabled) {
  background: #274b78;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>