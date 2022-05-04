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
    <section v-if="arts">
      <h1>
        Картины <small>{{ arts?.length }}</small>
      </h1>
      <div class="grid">
        <div v-for="art of arts" :key="art" class="item">
          <RouterLink :to="`/art/${art.id}`">
            <div class="img" :style="{ backgroundImage: `url(${art.image})` }">
              <img :src="art.image" />
            </div>
          </RouterLink>
          <RouterLink :to="`/art/${art.id}`" class="title">
            {{ art.name }}
          </RouterLink>
          <RouterLink :to="`/artist/${art.artist.id}`">
            <span class="author">
            <img class="avatar" :src="art.artist.image">
              {{ art.artist.first_name }} {{ art.artist.second_name }}
              {{ art.artist.last_name }}
            </span>
          </RouterLink>
        </div>
      </div>
    </section>
    <section v-else-if="error">
      <h1>Ошибка</h1>
      <span>{{ error }}</span
      ><br /><br />
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
.item {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: #303234;
  padding: 0px;
  color: #fff;
  border: 1px solid #555;
  gap: 10px;
  text-decoration: none;
  overflow: hidden;
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
  text-overflow: ellipsis;
  width: 280px;
  white-space: nowrap;
  overflow: hidden;
}
a{
  color: #fff;
  text-decoration: none;
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

.img {
  background-size: contain;
}

.img img {
  margin-bottom: -4px;
  width: 320px;
  object-fit: contain;
  height: 250px;
  backdrop-filter: blur(8px);
}

.author {
  margin: 0 18px 16px;
  opacity: 0.75;
  text-transform: uppercase;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.avatar {
  margin-right: 8px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
</style>
