<script setup>
import { RouterView, useRoute, useRouter } from "vue-router"
import { RouterLink } from "vue-router"
import { onMounted, ref } from "vue";
import { computed } from 'vue'

const tv = ref(null)
const error = ref(null)
const id = computed(() => useRoute().params.id)

onMounted(() => {
  fetch("http://localhost:8000/tv/"+id.value)
    .then(x => x.json())
    .then(x => tv.value = x)
    .catch(x => error.value = x)
})
</script>

<template>
<div class="split">
  <section v-if="tv">
    <h1>{{ `${tv.manufacter} ${tv.model}` }}</h1>
    <div class="grid">
        <img :src="`http://localhost:8000${tv.photo}`" alt="" srcset="">
        <span class="title">{{ `${tv.manufacter} ${tv.model}` }}</span>
        <span class="price">{{ `${tv.price} ₽` }}</span>
    </div>
  </section>
  <section v-else-if="error">
    <h1>Ошибка</h1>
    <span>{{ error }}</span>
  </section>
  <section v-else class="loading">
      <img alt="TV logo" src="@/assets/logo-load.svg" width="72" height="72" />
  </section>
</div>
</template>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: #fff;
  padding: 24px;
  border: 1px solid #ddd;
  gap: 10px;
}

.grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 24px;
}

.title {
  font-weight: 600;
  font-size: 1.25rem;
}

.goto {
  font-weight: 600;
  text-decoration: none;
  width: 100%;
  background: var(--accent);
  color: #000;
  padding: 8px;
  text-align: center;
  border-radius: 4px;
  margin-top: 8px;
}

.loading {
  display: flex;
  width: 100%;
    align-items: center;
    justify-content: center;
}

.split {
  display: flex;
  gap: 32px;
  width: 100%;
  padding: 0 16px;
}

small {
  font-weight: 400;
  color: #666;
  padding: 8px;
}
</style>