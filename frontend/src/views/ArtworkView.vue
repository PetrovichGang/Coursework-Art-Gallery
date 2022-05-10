<script setup>
import { CONFIG } from "../config.js";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { computed } from "vue";
import "viewerjs/dist/viewer.css";
import ArtistItem from "../components/ArtistItem.vue";
import ArtworkEditDialog from "../components/ArtworkEditDialog.vue";

const art = ref(null);
const error = ref(null);
const open = ref(false);
const id = computed(() => useRoute().params.id);
const router = useRouter();

const update = () => {
  art.value = null;
  error.value = null;
  fetch(`${CONFIG.apiUrl}/artwork/${id.value}`)
    .then((x) => x.json())
    .then((x) => {
      if (x.length === 0) {
        error.value = "Картина не найдена";
        document.title = `Ошибка — ${CONFIG.appName}`;
      } else {
        art.value = x[0];
        document.title = `${x[0].name} — ${CONFIG.appName}`;
      }
    })
    .catch((x) => (error.value = x));
};

const deleteArt = () => {
  fetch(`${CONFIG.apiUrl}/artwork/delete/${id.value}`)
    .then((x) => {
      if (x.ok) {
        router.push('/');
      } else 
      throw new Error(x.statusText)
    })
    .catch((x) => (error.value = x));
};

onMounted(update);
</script>

<template>
  <div class="split">
    <section v-if="art">
      <div
        class="grid"
        v-viewer="{
          toolbar: false,
          tooltip: false,
          button: false,
          navbar: false,
          keyboard: false,
        }"
      >
        <div
          class="img"
          :style="{ backgroundImage: `url(${art.image})` }"
          style="background-repeat: no-repeat"
        >
          <img :src="art.image" class="artwork" />
        </div>
        <div class="info">
          <h2>«{{ art.name }}»</h2>
          <div>
            <small>Размер: </small><span>{{ art.sizeX }}x{{ art.sizeY }}</span>
          </div>
          <div>
            <small>Расположение: </small><span>{{ art.location }}</span>
          </div>
          <div>
            <small>Написана: </small
            ><span>{{ new Date(art.created_date).toLocaleDateString() }}</span>
          </div>
          <h2 v-if="art.description != ''">Описание</h2>
          <span v-if="art.description != ''">{{ art.description }}</span>
          <h2>Автор</h2>
          <artist-item :artist="art.artist" />
          <div class="button-block">
            <button @click="open=true" class="action-button">Редактировать описание</button>
            <button @click="deleteArt()" class="action-button">Удалить</button>
          </div>
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
        alt="load logo"
        src="@/assets/logo-load.svg"
        width="72"
        height="72"
      />
    </section>
    <ArtworkEditDialog v-if="art" :open="open" :artwork="art" @closeModal="open=false;update()" />
  </div>
</template>

<style scoped>
section {
  width: 100%;
}

.img {
  height: 500px
}

a > img {
  border-radius: 120px;
  width: 96px;
  height: 96px;
}

.author {
  padding: 24px;
  background: var(--dark-2);
  border-radius: 16px;
  border: 1px solid var(--dark-3);
  margin-bottom: 16px;
}

.grid {
  display: flex;
  gap: 32px;
}

.grid > .info {
  flex-grow: 1;
}

a {
  color: #fff;
  text-decoration: none;
}
.title {
  font-weight: 600;
  font-size: 1.25rem;
}

.split {
  display: flex;
  gap: 32px;
  width: 100%;
  padding: 0 16px;
}

.artwork {
  height: 500px;
  object-fit: contain;
  backdrop-filter: blur(8px);
  width: 500px;
  margin-bottom: -4px;
}

small {
  opacity: 0.75;
  text-transform: uppercase;
  font-size: 0.75rem;
  padding-right: 8px;
  line-height: 2;
}

h2:first-child {
  margin-top: 0;
}

h3 {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 1.25rem;
}

img {
  transition: 0.25s ease;
  cursor: pointer;
}

.author img:hover {
  transform: scale(1.025);
}
</style>
