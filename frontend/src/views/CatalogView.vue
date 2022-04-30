<script setup>
import { RouterLink } from "vue-router";
import { onMounted, ref } from "vue";

const arts = ref(null);
const error = ref(null);

const update = () => {
  arts.value = null;
  error.value = null;
  fetch("http://localhost:3000/artwork")
    .then((x) => x.json())
    .then((x) => {
      if (x.length === 0) {
        error.value = "Картины не найдены";
      } else {
        arts.value = x;
      }
    })
    .catch((x) => (error.value = x));
};

onMounted(update);
</script>

<template>
  <div class="split">
    <section>
      <h1></h1>
      <div>
        <input />
      </div>
    </section>
    <section v-if="arts">
      <h1>
        Картины <small>{{ arts?.length }}</small>
      </h1>
      <div class="grid">
        <div v-for="art of arts" :key="art" class="item">
          <RouterLink :to="`/art/${art.id}`">
            <img :src="art.image" alt="" srcset="" />
            <span class="title">{{ art.name }}</span>
            <span class="author">{{ art.Author }}</span>
          </RouterLink>
        </div>
      </div>
    </section>
    <section v-else-if="error">
      <h1>Ошибка</h1>
      <span>{{ error }}</span><br><br>
      <button @click="update()">Перезагрузить</button>
    </section>
    <section v-else class="loading">
      <img
        alt="loading logo"
        src="@/assets/logo-load.svg"
        width="72"
        height="72"
      />
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
  text-decoration: none;
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

img {
  width: 320px;
  object-fit: contain;
  height: 250px;
}
</style>
