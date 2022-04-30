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
          <div class="author grid">
            <img :src="art.artist.image">
            <div>
              <h2>{{ `${art.artist.first_name} ${art.artist.second_name} ${art.artist.last_name}` }}</h2>
              <div><i>Дата рождения: </i><span>{{ new Date(art.artist.birth_date).toLocaleDateString() }}</span></div>
              <div v-if="art.artist.death_date">
                <i>Дата смерти: </i><span>{{ new Date(art.artist.death_date).toLocaleDateString() }}</span>
              </div>
              <div><i>Страна: </i><span>{{ art.artist.country }}</span></div>
            </div>
          </div>
          <div>
            <i>Размер: </i><span>{{ `${art.sizeX}x${art.sizeY}` }}</span>
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
.author > img {
  width: 120px;
  height: 120px
}

.author {
  padding: 24px;
  background: var(--dark-2);
  border-radius: 16px;
  border: 1px solid var(--dark-3);
}

.grid {
  display: flex;
  gap: 32px;
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
