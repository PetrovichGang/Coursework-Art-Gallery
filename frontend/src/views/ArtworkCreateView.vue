<script setup>
    import { CONFIG } from "../config.js"
    import { RouterLink, useRoute } from "vue-router"
    import { defineComponent, onMounted, ref, computed, onUpdated } from "vue"

    const artwork = ref({authorId: ""})
    const error = ref(null)

    const artists = ref([])

    const getArtists = () => {
        error.value = null
        fetch(`${CONFIG.server.ip}:${CONFIG.server.port}/artist`).then((result) => {
            result.json().then((result) => {
                artists.value = result
            })
        }).catch((err) => error.value = err)
    }

    const create = () => {
        error.value = null
        fetch(`${CONFIG.server.ip}:${CONFIG.server.port}/artwork/create`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artwork.value)
            
        })
            .then(() => this.$router.push("/"))
            .catch((x) => (error.value = x))
    }
    
    onMounted(getArtists)

</script>


<template>
    <div class="wrap">
        <div class="form">
            <h1>Добавить работу</h1>
            <input type="text" placeholder="Название" v-model="artwork.name">
            <input type="date" placeholder="Дата создания" v-model="artwork.created_date">
            <input type="text" placeholder="Описание" v-model="artwork.description">
            <input type="number" placeholder="Высота" v-model="artwork.sizeX">
            <input type="number" placeholder="Ширина" v-model="artwork.sizeY">
            <input type="text" placeholder="Расположение" v-model="artwork.location">
            <select v-model="artwork.authorId">
                <option disabled selected value="">Выберите артиста</option>
                <option v-for="artist in artists" :key="artist" :value="artist.id">{{ `${artist.first_name} ${artist.second_name}` }}</option>
            </select>
            <input type="text" v-model="artwork.image" placeholder="Ссылка на изображение">
            <button class="action-button" @click="create">Добавить</button>
        </div>
    </div>
</template>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    width: 100%;
    gap: 8px;
}
.wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
input, select {
    background: var(--dark-2);
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid var(--dark-3);
    color: #fff;
}
::placeholder {
  color: #aaa;
}

button {
    border-radius: 6px;
    margin-top: 16px;
}
</style>