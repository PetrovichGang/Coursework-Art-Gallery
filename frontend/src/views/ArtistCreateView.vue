<script setup>
    import { RouterLink, useRoute } from "vue-router"
    import { defineComponent, onMounted, ref, computed, onUpdated } from "vue"

    const artist = ref({})
    const error = ref(null)

    const countries = ref([])

    const getCountries = () => {
        error.value = null
        fetch("https://restcountries.com/v3.1/all").then((result) => {
            result.json().then((result) => {
                countries.value = result
            })
        }).catch((err) => error.value = err)
    }

    const create = () => {
        error.value = null
        fetch("http://localhost:3000/artist/create", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artist.value)
            
        })
            .then(() => this.$router.push("/artists"))
            .catch((x) => (error.value = x))
    }
    
    onMounted(getCountries)

</script>


<template>
    <div>
        <input type="text" placeholder="Имя" v-model="artist.first_name">
        <input type="text" placeholder="Отчество" v-model="artist.second_name">
        <input type="text" placeholder="Фамилия" v-model="artist.last_name">
        <input type="date" placeholder="Дата рождения" v-model="artist.birth_date">
        <input type="date" placeholder="Дата смерти" v-model="artist.death_date">
        <input type="text" placeholder="Описание" v-model="artist.description">
        <select v-model="artist.country">
            <option disabled>Выберите страну</option>
            <option v-for="country in countries" :key="country" :value="country.name.common">{{ country.name.common }}</option>
        </select>
        <input type="url" v-model="artist.image">
        <button @click="create">Добавить</button>
    </div>
</template>
