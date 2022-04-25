<script setup>
import { RouterLink } from "vue-router"
import { onMounted, ref } from "vue";

const tvs = ref(null)
const error = ref(null)

onMounted(() => {
  fetch("http://localhost:8000/tv")
    .then(x => x.json())
    .then(x => tvs.value = x)
    .catch(x => error.value = x)
})
</script>

<template>
<div class="split">
  <section>
    <h1>Фильтры</h1>
    <div>
      <input>
    </div>
  </section>
  <section v-if="tvs">
    <h1>Картины <small>{{ tvs.data?.length }} из {{ tvs.count }}</small></h1>
    <div class="grid">
      <div v-for="tv of tvs.data" :key="tv" class="item">
        <RouterLink :to="`/product/${tv.id}`">
        <img :src="`http://localhost:8000${tv.photo}`" alt="" srcset="">
        <span class="title">{{ `${tv.manufacter} ${tv.model}` }}</span>
        <span class="price">{{ `${tv.price} ₽` }}</span>
        </RouterLink>
      </div>
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
.item a {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: #303234;
  padding: 0px;
  color: #fff;
  border: 1px solid #555;
  gap: 10px;
  text-decoration: none
}

.grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 24px;
}

.title {
  margin: 8px 18px 0;
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