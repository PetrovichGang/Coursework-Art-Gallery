<script setup>
    import { CONFIG } from "../config.js"
    import { RouterLink, useRoute, useRouter } from "vue-router"
    import { defineComponent, onMounted, ref, computed, watch } from "vue"
    import ArtistItem from "../components/ArtistItem.vue"

    const artists = ref(null)
    const error = ref(null)
    const router = useRouter()
    const route = useRoute()
    const offset = route.query.offset  ?? 1
    console.log(offset)

    const update = (offs) => {
        artists.value = null;
        error.value = null;
        fetch(`${CONFIG.server.ip}:${CONFIG.server.port}/artist?offset=${offs}`)
            .then((x) => x.json())
            .then((x) => {
                if (x.length === 0) {
                    error.value = "Авторы не найдены"
                }
                else {
                    artists.value = x
                }
            })
            .catch((x) => (error.value = x))
    }

    onMounted(() => update(offset))
    watch(useRoute(), (x, y) => {
        console.log(useRoute().query.offset  ?? 1)
    })
</script>


<template>
    <div class="split">
        <section v-if="artists">
            <h1>
                Авторы <small>{{ artists?.length }}</small>
            </h1>
            <div class="grid">
                <artist-item  v-for="artist in artists" :key="artist" :artist="artist"/>
            </div>
            <button @click="router.push({ path: 'artists', query: { offset: +offset+1 }})">ио</button>
        </section>
        <section v-else-if="error">
            <h1>Ошибка</h1>
            <span>{{ error }}</span><br><br>
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
    small {
    font-weight: 400;
    color: #666;
    padding: 8px;
    }
</style>