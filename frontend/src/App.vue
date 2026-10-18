
<script setup>
import { ref } from 'vue'

const screen = ref('list')

const requests = ref([
  {
    id: 1,
    number: 'A-101',
    title: 'Насос не запускается',
    pumpId: 2,
    status: 'New',
  },
  {
    id: 2,
    number: 'A-102',
    title: 'Проверить вентиль',
    pumpId: 1,
    status: 'InProgress',
  },
])

const title = ref('')
const pumpId = ref('')
const description = ref('')
const login = ref('')
const password = ref('')
const message = ref('')

const statusNames = {
  New: 'Новая',
  InProgress: 'В работе',
  Closed: 'Закрыта',
  Cancelled: 'Отменена',
}

function createRequest() {
  if (
    title.value.trim().length < 5 ||
    title.value.trim().length > 80 ||
    !pumpId.value ||
    description.value.trim().length < 10 ||
    description.value.trim().length > 500
  ) {
    message.value =
      'Проверьте данные: название — 5–80 символов, описание — 10–500 символов, укажите ID насоса.'
    return
  }

  const nextId = Math.max(...requests.value.map((item) => item.id)) + 1

  requests.value.push({
    id: nextId,
    number: `A-${100 + nextId}`,
    title: title.value.trim(),
    pumpId: Number(pumpId.value),
    description: description.value.trim(),
    status: 'New',
  })

  title.value = ''
  pumpId.value = ''
  description.value = ''
  message.value = 'Заявка добавлена в список.'
  screen.value = 'list'
}

function signIn() {
  if (!login.value.trim() || !password.value) {
    message.value = 'Введите логин и пароль.'
    return
  }

  message.value = 'Демонстрационный экран: настоящая авторизация пока не подключена.'
}
</script>

<template>
  <main class="app">
    <header class="header">
      <div>
        <p class="eyebrow">ПАО «Сургутнефтегаз»</p>
        <h1>Учёт заявок на простой насосного оборудования</h1>
      </div>
      <span class="tag">Учебный проект</span>
    </header>

    <nav class="navigation" aria-label="Основная навигация">
      <button
        type="button"
        :class="{ active: screen === 'list' }"
        @click="screen = 'list'; message = ''"
      >
        Список заявок
      </button>
      <button
        type="button"
        :class="{ active: screen === 'new' }"
        @click="screen = 'new'; message = ''"
      >
        Создать заявку
      </button>
      <button
        type="button"
        :class="{ active: screen === 'login' }"
        @click="screen = 'login'; message = ''"
      >
        Вход
      </button>
    </nav>

    <p v-if="message" class="message" role="status">{{ message }}</p>

    <section v-if="screen === 'list'" class="panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Мониторинг</p>
          <h2>Заявки на устранение простоев</h2>
        </div>
        <span class="counter">{{ requests.length }} шт.</span>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Номер</th>
              <th>Название</th>
              <th>ID насоса</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in requests" :key="item.id">
              <td class="request-number">{{ item.number }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.pumpId }}</td>
              <td>
                <span class="status">{{ statusNames[item.status] }}</span>
              </td>
            </tr>
            <tr v-if="requests.length === 0">
              <td colspan="4" class="empty">Заявок пока нет.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="hint">
        Демонстрационные данные. Пока заявки хранятся только в памяти страницы.
      </p>
    </section>

    <section v-else-if="screen === 'new'" class="panel form-panel">
      <p class="eyebrow">Новая запись</p>
      <h2>Создание заявки</h2>
      <p class="subtitle">
        Заполните сведения о неисправности насосного оборудования.
      </p>

      <form @submit.prevent="createRequest">
        <div class="field">
          <label for="title">Название заявки (5–80 символов)</label>
          <input
            id="title"
            v-model="title"
            type="text"
            minlength="5"
            maxlength="80"
            required
            autofocus
            placeholder="Например, насос не запускается"
          />
        </div>

        <div class="field">
          <label for="pumpId">ID насоса</label>
          <input
            id="pumpId"
            v-model="pumpId"
            type="number"
            min="1"
            step="1"
            required
            placeholder="Введите ID насоса"
          />
        </div>

        <div class="field">
          <label for="description">Описание (10–500 символов)</label>
          <textarea
            id="description"
            v-model="description"
            minlength="10"
            maxlength="500"
            rows="4"
            required
            placeholder="Опишите неисправность и обстоятельства простоя"
          ></textarea>
        </div>

        <button class="primary" type="submit">Создать заявку</button>
      </form>
    </section>

    <section v-else-if="screen === 'login'" class="panel form-panel">
      <p class="eyebrow">Для сотрудников</p>
      <h2>Вход в систему</h2>
      <p class="subtitle">
        Демонстрационная форма для сменного мастера, механика и руководителя участка.
      </p>

      <form @submit.prevent="signIn">
        <div class="field">
          <label for="login">Логин</label>
          <input
            id="login"
            v-model="login"
            type="text"
            autocomplete="username"
            required
            placeholder="Введите логин"
          />
        </div>

        <div class="field">
          <label for="password">Пароль</label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
            placeholder="Введите пароль"
          />
        </div>

        <button class="primary" type="submit">Войти</button>
      </form>

      <p class="hint">
        Настоящая проверка логина и пароля будет добавлена позже.
      </p>
    </section>

    <footer class="footer">
      Лабораторная работа № 3 · Vue 3 · JavaScript
    </footer>
  </main>
</template>

<style>
:root {
  font-family: Inter, "Segoe UI", Arial, sans-serif;
  color: #1f2937;
  background: #f3f5f8;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

button,
input,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

.app {
  width: min(1100px, calc(100% - 32px));
  margin: 0 auto;
  padding: 36px 0;
}

.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 28px;
}

h1,
h2,
p {
  margin-top: 0;
}

h1 {
  max-width: 720px;
  margin-bottom: 0;
  font-size: clamp(26px, 4vw, 38px);
  line-height: 1.2;
  letter-spacing: -0.7px;
}

h2 {
  margin-bottom: 8px;
  font-size: 23px;
}

.eyebrow {
  margin-bottom: 9px;
  color: #536b91;
  font-size: 12px;
  font-weight: 750;
  letter-spacing: 1.3px;
  text-transform: uppercase;
}

.tag,
.counter {
  flex-shrink: 0;
  padding: 8px 12px;
  border-radius: 9px;
  background: #e4eaf3;
  color: #344967;
  font-size: 13px;
  font-weight: 650;
}

.navigation {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
  padding: 7px;
  border: 1px solid #e1e6ee;
  border-radius: 13px;
  background: #fff;
}

.navigation button {
  padding: 11px 16px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #536174;
}

.navigation button:hover {
  background: #f0f3f8;
}

.navigation button.active {
  background: #243e66;
  color: white;
}

.panel {
  padding: 26px;
  border: 1px solid #e1e6ee;
  border-radius: 16px;
  background: white;
  box-shadow: 0 8px 24px rgb(31 41 55 / 4%);
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 22px;
}

.section-heading h2 {
  margin-bottom: 0;
}

.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th,
td {
  padding: 15px 12px;
  border-bottom: 1px solid #e9edf3;
}

th {
  background: #f7f9fc;
  color: #536174;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.3px;
}

td {
  font-size: 14px;
}

.request-number {
  color: #38577f;
  font-weight: 750;
}

.status {
  display: inline-block;
  padding: 5px 9px;
  border-radius: 7px;
  background: #edf2f8;
  color: #344967;
  font-size: 12px;
  font-weight: 650;
}

.empty {
  padding: 28px;
  color: #69778a;
  text-align: center;
}

.hint {
  margin: 18px 0 0;
  color: #718096;
  font-size: 13px;
  line-height: 1.5;
}

.form-panel {
  max-width: 700px;
}

.subtitle {
  margin-bottom: 25px;
  color: #69778a;
  line-height: 1.6;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.field label {
  font-size: 14px;
  font-weight: 650;
}

.field input,
.field textarea {
  width: 100%;
  padding: 12px 13px;
  border: 1px solid #cbd4e0;
  border-radius: 9px;
  outline: none;
  background: #fff;
  color: #1f2937;
}

.field input:focus,
.field textarea:focus {
  border-color: #486a9b;
  box-shadow: 0 0 0 3px rgb(72 106 155 / 13%);
}

.field textarea {
  resize: vertical;
}

.primary {
  padding: 12px 20px;
  border: 0;
  border-radius: 9px;
  background: #243e66;
  color: #fff;
  font-weight: 650;
}

.primary:hover {
  background: #304f7d;
}

.message {
  margin-bottom: 18px;
  padding: 12px 15px;
  border-radius: 9px;
  background: #e9f1fb;
  color: #29496f;
  font-size: 14px;
  line-height: 1.5;
}

.footer {
  padding: 24px 0 0;
  color: #8993a2;
  font-size: 12px;
  text-align: center;
}

@media (max-width: 650px) {
  .app {
    padding-top: 22px;
  }

  .header {
    flex-direction: column;
  }

  .panel {
    padding: 18px;
  }

  th,
  td {
    padding: 12px 9px;
  }
}
</style>
