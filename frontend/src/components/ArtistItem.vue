<script setup>
import { RouterLink } from "vue-router";
import { defineProps } from "vue";

defineProps(["artist", "justText"]);
</script>

<template>
  <RouterLink :to="`/artist/${artist.id}`" :class="{ justText }">
    <img :src="artist.image" />
    <div>
      <h3>
        {{ artist.first_name }} {{ artist.second_name }}
        {{ artist.last_name }}
      </h3>
      <div>
        <small>Дата рождения: </small>
        <span>
          {{ new Date(artist.birth_date).toLocaleDateString() }}
        </span>
      </div>
      <div v-if="artist.death_date">
        <small>Дата смерти: </small>
        <span>
          {{ new Date(artist.death_date).toLocaleDateString() }}
        </span>
      </div>
      <div>
        <small>Страна: </small>
        <span>{{ artist.country }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
a {
  display: flex;
  gap: 32px;
  color: #fff;
  text-decoration: none;
  flex-shrink: 0;
}

a:not(.justText) {
  padding: 24px;
  background: var(--dark-2);
  border-radius: 16px;
  border: 1px solid var(--dark-3);
  cursor: pointer;
  width: 100%;
}

.justText > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

img {
  border-radius: 120px;
  width: 96px;
  height: 96px;
}

small {
  opacity: 0.75;
  text-transform: uppercase;
  font-size: 0.75rem;
  padding-right: 8px;
  line-height: 2;
}

h3 {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 1.25rem;
}
</style>
