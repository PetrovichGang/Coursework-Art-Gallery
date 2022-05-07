<script setup>
    import { RouterLink, useRoute } from "vue-router"
    import { defineComponent, onMounted, ref, computed, onUpdated } from "vue"

    const artwork = ref({})
    const error = ref(null)

    const artists = ref([])

    const getArtists = () => {
        error.value = null
        fetch("http://localhost:3000/artist").then((result) => {
            result.json().then((result) => {
                artists.value = result
            })
        }).catch((err) => error.value = err)
    }

    const create = () => {
        error.value = null
        fetch("http://localhost:3000/artwork/create", {
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
    <div>
        <input type="text" placeholder="Имя" v-model="artwork.name">
        <input type="date" placeholder="Отчество" v-model="artwork.created_date">
        <input type="text" placeholder="Фамилия" v-model="artwork.description">
        <input type="number" placeholder="Дата рождения" v-model="artwork.sizeX">
        <input type="number" placeholder="Дата смерти" v-model="artwork.sizeY">
        <input type="text" placeholder="Описание" v-model="artwork.location">
        <select v-model="artwork.authorId">
            <option disabled>Выберите автора</option>
            <option v-for="artist in artists" :key="artist" :value="artist.id">{{ `${artist.first_name} ${artist.second_name}` }}</option>
        </select>
        <input type="url" v-model="artwork.image">
        <button @click="create">Добавить</button>
    </div>
</template>
