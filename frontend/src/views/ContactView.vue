<script setup>
import { ref } from 'vue'
const loc = ref(location.hostname)
</script>

<template>
  <div class="contact">
    <h1>Наши контакты</h1>
    <p>Наш адрес: Иркутск, Переулок Сударева, 6</p>
    <p>Телефон: +7 (914) 228 13 37</p>
    <p>Почта: admin@{{ loc }}</p>
  </div>
</template>

<style>
</style>
