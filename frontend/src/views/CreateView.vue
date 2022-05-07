<script setup>
import { RouterLink } from "vue-router";
</script>


<template>
  <div class="wrap">
    <div class="form">
      <h1>Добавить...</h1>
      <RouterLink to="/artwork/create">Работу</RouterLink>
      <RouterLink to="/artist/create">Артиста</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    width: 100%;
    gap: 8px;
}
.wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
a {
  
    background: var(--accent);
    padding: 8px 12px;
    border-radius: 6px;
    color: #fff;
    border: 0;
    text-decoration: none;
}
</style>
