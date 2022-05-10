<script setup>
    import { RouterLink } from "vue-router"
    import { onMounted, ref } from "vue"

    defineProps(["artist"])
</script>


<template>
    <div class="author grid">
        <RouterLink :to="`/artist/${artist.id}`">
            <img :src="artist.image" />
        </RouterLink>
        <div>
            <h3>
            <RouterLink :to="`/artist/${artist.id}`">
                {{ artist.first_name }} {{ artist.second_name }}
                {{ artist.last_name }}
            </RouterLink>
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
        </div>
</template>

<style scoped>
  section {
    width: 100%;
  }

  a > img {
    border-radius: 120px;
    width: 96px;
    height: 96px;
  }

  .author {
      width: 30%;
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

  a{
    color: #fff;
    text-decoration: none;
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

  img:hover {
    transform: scale(1.025);
  }
</style>