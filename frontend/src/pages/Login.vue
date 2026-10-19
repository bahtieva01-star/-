
<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

function login() {
  alert(`Демонстрационная форма входа. Пользователь: ${username.value}`)
}
</script>

<template>
  <main class="page">
    <h1>Вход в систему</h1>
    <p>Введи данные пользователя для демонстрации интерфейса.</p>

    <form @submit.prevent="login">
      <label for="username">Логин</label>
      <input
        id="username"
        v-model="username"
        type="text"
        placeholder="Введи логин"
        required
      />

      <label for="password">Пароль</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Введи пароль"
        required
      />

      <button type="submit">Войти</button>
    </form>
  </main>
</template>

<style scoped>
.page {
  max-width: 500px;
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

input {
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
</style>
