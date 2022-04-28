<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { computed } from "vue";

const art = ref(null);
const error = ref(null);
const id = computed(() => useRoute().params.id);

onMounted(() => {
  fetch(`http://localhost:3000/artwork/${id.value}`)
    .then((x) => x.json())
    .then((x) => (art.value = x[0]))
    .catch((x) => (error.value = x));
});
</script>

<template>
  <div class="split">
    <section v-if="art">
      <div class="grid">
        <img :src="art.image" alt="" />
        <div>
          <h1>{{ art.name }}</h1>
          <div>
            <i>Размер: </i><span>{{ `${art.sizeX}x${art.sizeY}` }}</span>
          </div>
          <div>
            <i>Автор: </i><span class="author">{{ art.Author }}</span>
          </div>
          <div>
            <i>Расположено в: </i><span>{{ art.location }}</span>
          </div>
          <div>
            <i>Создана: </i><span>{{ new Date(art.created_date).toLocaleDateString() }}</span>
          </div>
          <span>{{ art.description }}</span>
        </div>
      </div>
    </section>
    <section v-else-if="error">
      <h1>Ошибка</h1>
      <span>{{ error }}</span>
    </section>
    <section v-else class="loading">
      <img
        alt="load logo"
        src="@/assets/logo-load.svg"
        width="72"
        height="72"
      />
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

img {
  width: 500px;
}

i {
  opacity: 0.75;
  text-transform: uppercase;
  font-size: 0.75rem;
  padding-right: 8px;
  line-height: 2;
}
</style>
