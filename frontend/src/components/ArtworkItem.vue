<script setup>
import { RouterLink } from "vue-router";
import { defineProps } from "vue";

defineProps(["art"]);
</script>

<template>
  <div class="item">
    <RouterLink :to="`/art/${art.id}`">
      <div class="img" :style="{ backgroundImage: `url(${art.image})` }">
        <img :src="art.image" />
      </div>
      <h3 :class="{ standalone: !art.artist }">{{ art.name }}</h3>
    </RouterLink>
    <RouterLink :to="`/artist/${art.artist.id}`" v-if="art.artist">
      <span class="author">
        <img class="avatar" :src="art.artist.image" />
        {{ art.artist.first_name }} {{ art.artist.second_name }}
        {{ art.artist.last_name }}
      </span>
    </RouterLink>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: #303234;
  padding: 0;
  gap: 16px;
  color: #fff;
  border: 1px solid #555;
  text-decoration: none;
  overflow: hidden;
}

h3 {
  margin: 16px 18px 0;
  font-weight: 600;
  font-size: 1.25rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

a {
  color: #fff;
  text-decoration: none;
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
  width: 100%;
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
.standalone {
  margin-bottom: 16px
}
</style>
