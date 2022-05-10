<script setup>
import { CONFIG } from "../config.js";
import { RouterLink, useRoute } from "vue-router";
import { onMounted, ref, computed, watch } from "vue";
import ArtistItem from "../components/ArtistItem.vue";

const artists = ref(null);
const error = ref(null);

const offset = computed(() => useRoute().query.offset ?? 1);

const update = (offs) => {
  artists.value = null;
  error.value = null;
  fetch(`${CONFIG.server.ip}:${CONFIG.server.port}/artist?offset=${offs}`)
    .then((x) => x.json())
    .then((x) => {
      if (x.length === 0) {
        error.value = "Авторы не найдены";
        document.title = `Ошибка — ${CONFIG.appName}`;
      } else {
        artists.value = x;
        document.title = `Авторы — ${CONFIG.appName}`;
      }
    })
    .catch((x) => (error.value = x));
};

onMounted(() => update(offset.value));
watch(useRoute(), (x, y) => update(y.query.offset ?? 1));
</script>

<template>
  <div class="split">
    <section v-if="artists">
      <h1>
        Авторы <small>страница {{ offset }}</small>
      </h1>
      <div class="grid">
        <artist-item v-for="artist in artists" :key="artist" :artist="artist" />
      </div>
      <div class="button-block">
        <RouterLink
          class="action-button"
          v-if="offset > 1"
          :to="{ path: 'artists', query: { offset: +offset - 1 } }">
          Назад
        </RouterLink>
        <RouterLink
          class="action-button"
          v-if="artists.length == 20"
          :to="{ path: 'artists', query: { offset: +offset + 1 } }">
          Вперед
        </RouterLink>
      </div>
    </section>
    <section v-else-if="error">
      <h1>Ошибка</h1>
      <span>{{ error }}</span>
      <div class="button-block">
        <RouterLink
          class="action-button"
          v-if="offset > 1"
          :to="{ path: 'artists', query: { offset: +offset - 1 } }">
          Назад
        </RouterLink>
        <button class="action-button" @click="update(offset)">Перезагрузить</button>
      </div>
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
.split {
  display: flex;
  gap: 32px;
  width: 100%;
  padding: 0 16px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

small {
  font-weight: 400;
  color: #666;
  padding: 8px;
}

section {
  display: flex;
  flex-direction: column;
}
</style>
