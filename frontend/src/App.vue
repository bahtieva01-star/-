
<script setup>
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <AppHeader />

  <router-view />
</template>

<style>
body {
  margin: 0;
  min-width: 320px;
  background: #f8fafc;
  color: #263449;
  font-family: Arial, sans-serif;
}

* {
  box-sizing: border-box;
}

button,
input,
textarea,
select {
  font-family: inherit;
}
</style>
