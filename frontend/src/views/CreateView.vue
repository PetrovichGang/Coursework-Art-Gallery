<script setup>
  import { RouterLink } from "vue-router";
</script>


<template>
  <div class="wrap">
    <div class="form">
      <h1>Добавить...</h1>
      <RouterLink class="action-button" to="/artwork/create">Работу</RouterLink>
      <RouterLink class="action-button" to="/artist/create">Автора</RouterLink>
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
</style>
