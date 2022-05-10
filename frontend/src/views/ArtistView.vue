<script setup>
import { CONFIG } from "../config.js";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { computed } from "vue";
import "viewerjs/dist/viewer.css";
import ArtworkItem from "../components/ArtworkItem.vue";
import ArtistItem from "../components/ArtistItem.vue";

const artist = ref(null);
const artworks = ref(null);
const artistError = ref(null);
const artworkError = ref(null);
const id = computed(() => useRoute().params.id);

const update = () => {
  artist.value = null;
  artistError.value = null;
  artworks.value = null;
  fetch(`${CONFIG.server.ip}:${CONFIG.server.port}/artist/${id.value}`)
    .then((x) => x.json())
    .then((x) => {
      if (x.length === 0) {
        artistError.value = "Автор не найден";
        document.title = `Ошибка — ${CONFIG.appName}`;
      } else {
        artist.value = x[0];
        document.title = `${x[0].first_name} ${x[0].last_name} — ${CONFIG.appName}`;
      }
    })
    .catch((x) => (artistError.value = x));
};
fetch(`${CONFIG.server.ip}:${CONFIG.server.port}/artwork/author/${id.value}`)
  .then((x) => x.json())
  .then((x) => {
    if (x.length === 0) artworkError.value = "Картины не найдены";
    else {
      artworks.value = x;
    }
  });

onMounted(update);
</script>

<template>
  <div class="split">
    <section v-if="artist">
      <div class="grid">
        <div class="author">
          <artist-item :artist="artist" :justText="true" />
          <div v-if="artist.description != ''" class="author-description">
            <h2>Описание</h2>
            <span>{{ artist.description }}</span>
          </div>
        </div>
        <section class="artworks" v-if="artworks">
          <artwork-item
            v-for="artwork in artworks"
            :key="artwork"
            :art="artwork"
          />
        </section>
      </div>
    </section>
    <section v-else-if="artistError">
      <h1>Ошибка</h1>
      <span>
        {{ artistError }}
      </span>
      <br /><br />
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
  </div>
</template>

<style scoped>
section {
  width: 100%;
}

.author-info > img {
  border-radius: 50%;
  width: 128px;
  height: 128px;
}

img:hover {
  transform: scale(1.04);
}

.author {
  padding: 24px 0;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  align-items: center;
  gap: 16px;
}
.author-info {
  border-radius: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  gap: 32px;
  flex-shrink: 0;
}

.author-description {
  margin-left: 8px;
  border-left: 1px solid #666;
  padding-left: 32px;
}

.grid {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  align-items: stretch;
}

.split {
  display: flex;
  gap: 32px;
  width: 100%;
  padding: 0 16px;
  align-items: center;
  justify-content: center;
}

.artworks {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

a {
  color: #fff;
  text-decoration: none;
}

small {
  opacity: 0.75;
  text-transform: uppercase;
  font-size: 0.75rem;
  padding-right: 8px;
  line-height: 2;
}

h2 {
  margin-top: 0;
}

img {
  transition: 0.25s ease;
  cursor: pointer;
}
</style>
