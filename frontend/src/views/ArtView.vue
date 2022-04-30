<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { computed } from "vue";

const art = ref(null);
const error = ref(null);
const id = computed(() => useRoute().params.id);

const update = () => {
  art.value = null;
  error.value = null;
  fetch(`http://localhost:3000/artwork/${id.value}`)
    .then((x) => x.json())
    .then((x) => {
      if (x.length === 0) {
        error.value = "Картина не найдена";
      } else {
        art.value = x[0];
      }
    })
    .catch((x) => (error.value = x));
};

onMounted(update);
</script>

<template>
  <div class="split">
    <section v-if="art">
      <div class="grid">
        <img :src="art.image" class="artwork" />
        <div>
          <h2>«{{ art.name }}»</h2>
          <div>
            <small>Размер: </small><span>{{ art.sizeX }}x{{ art.sizeY }}</span>
          </div>
          <div>
            <small>Расположено в: </small><span>{{ art.location }}</span>
          </div>
          <div>
            <small>Создана: </small
            ><span>{{ new Date(art.created_date).toLocaleDateString() }}</span>
          </div>
          <h2 v-if="art.description != ''">Описание</h2>
          <span v-if="art.description != ''">{{ art.description }}</span>
          <h2>Автор</h2>
          <div class="author grid">
            <img :src="art.artist.image" />
            <div>
              <h3>
                {{ `${art.artist.first_name} ${art.artist.second_name} ${art.artist.last_name}` }}
              </h3>
              <div>
                <small>Дата рождения: </small><span>{{
                  new Date(art.artist.birth_date).toLocaleDateString()
                }}</span>
              </div>
              <div v-if="art.artist.death_date">
                <small>Дата смерти: </small><span>{{
                  new Date(art.artist.death_date).toLocaleDateString()
                }}</span>
              </div>
              <div>
                <small>Страна: </small><span>{{ art.artist.country }}</span>
              </div>
            </div>
          </div>
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

.author > img {
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

.grid > div {
  flex-grow: 1;
}

.title {
  font-weight: 600;
  font-size: 1.25rem;
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

.artwork {
  height: 500px;
  object-fit: contain;
  object-position: top;
  width: 500px;
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
</style>
