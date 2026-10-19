
<template>
  <header class="header">
    <div class="header-inner">
      <div class="logo">
        Учёт заявок
      </div>

      <nav>
        <router-link to="/">Список заявок</router-link>
        <router-link to="/new">Создать заявку</router-link>
        <router-link to="/login">Вход</router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: #183153;
  color: white;
  padding: 18px 24px;
}

.header-inner {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

nav {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
}

nav a {
  color: white;
  text-decoration: none;
}

nav a:hover,
nav a.router-link-active {
  text-decoration: underline;
  font-weight: bold;
}
</style>
