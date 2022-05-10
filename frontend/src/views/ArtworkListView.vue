<script setup>
import { CONFIG } from "../config.js";
import { onMounted, ref, computed, watch } from "vue";
import ArtworkItem from "../components/ArtworkItem.vue";
import { RouterLink, useRoute } from "vue-router";

const arts = ref(null);
const error = ref(null);

const offset = computed(() => useRoute().query.offset ?? 1);

const update = (offs) => {
  arts.value = null;
  error.value = null;
  fetch(`${CONFIG.apiUrl}/artwork?offset=${offs}`)
    .then((x) => x.json())
    .then((x) => {
      document.title = CONFIG.appName;
      if (x.length === 0) {
        error.value = "Картины не найдены";
      } else {
        arts.value = x;
      }
    })
    .catch((x) => (error.value = x));
};

onMounted(() => update(offset.value));
watch(useRoute(), (x, y) => update(y.query.offset ?? 1));
</script>

<template>
  <div class="split">
    <section v-if="arts?.length == 0">
      <h1>Здесь пусто</h1>
    </section>
    <section v-if="arts">
      <h1>
        Картины <small>страница {{ offset }}</small>
      </h1>
      <div class="grid">
        <artwork-item :art="art" v-for="art in arts" :key="art" />
      </div>
      <div class="button-block">
        <RouterLink
          class="action-button"
          v-if="offset > 1"
          :to="{ path: '/', query: { offset: +offset - 1 } }">
          Назад
        </RouterLink>
        <RouterLink
          class="action-button"
          v-if="arts.length == 20"
          :to="{ path: '/', query: { offset: +offset + 1 } }">
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
          :to="{ path: '/', query: { offset: +offset - 1 } }">
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
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
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
