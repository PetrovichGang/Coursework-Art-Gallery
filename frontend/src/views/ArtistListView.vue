<script setup>
    import { RouterLink, useRoute } from "vue-router";
    import { defineComponent, onMounted, ref, computed } from "vue";
    import ArtistItem from "../components/ArtistItem.vue"

    const artists = ref(null);
    const error = ref(null);
    const offset = computed(() => useRoute().query.offset);

    const update = () => {
        artists.value = null;
        error.value = null;
        fetch(`http://localhost:3000/artist?offset=${offset.value}`)
            .then((x) => x.json())
            .then((x) => {
                if (x.length === 0) {
                    error.value = "Авторы не найдены";
                }
                else {
                    artists.value = x;
                }
            })
            .catch((x) => (error.value = x));
    };

    onMounted(update)
</script>


<template>
    <div class="split">
        <section v-if="artists">
        <h1>
            Авторы <small>{{ artists?.length }}</small>
        </h1>
        <div class="grid">
            <artist-item  v-for="artist in artists" :key="artist" :artist="artist"/>
            <!-- <p v-for="artist in artists" :key="artist">{{ artist }}</p> -->
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
.split {
  display: flex;
  gap: 32px;
  width: 100%;
  padding: 0 16px;
}
.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 24px;
}
</style>