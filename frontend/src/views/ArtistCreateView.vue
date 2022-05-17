<script setup>
import { CONFIG } from "../config.js";
import { useRouter } from "vue-router";
import { ref } from "vue";

const artist = ref({});
const error = ref(null);
const router = useRouter();
const fileInput = ref(null);
let filesCache = null;

const create = () => {
  error.value = null;
  fetch(`${CONFIG.apiUrl}/artist/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(artist.value),
  }).then((x) => x.json())
    .then((x) => {
      if (x.statusCode == undefined)
        router.push('/artist/' + x.id);
      else
        throw new Error(x.message);
    })
    .catch((x) => (error.value = x));
};

const uploadFile = () => {
    if (filesCache == fileInput.value.files[0])
        return create()

    filesCache = fileInput.value.files[0]
    const formData = new FormData();
    formData.append('file', fileInput.value.files[0]);
    fetch(`${CONFIG.apiUrl}/upload`, {method: "POST", body: formData})
        .then(x => x.json())
        .then(x => {
            if (x.statusCode == undefined)
                artist.value.image = x.name
            else
                throw new Error(x.message)
            create()
        })
        .catch((x) => (error.value = x));
}
</script>

<template>
  <div class="wrap">
    <div class="form">
      <h1>Добавить автора</h1>
      <input type="text" placeholder="Имя" v-model="artist.first_name" />
      <input type="text" placeholder="Отчество" v-model="artist.second_name" />
      <input type="text" placeholder="Фамилия" v-model="artist.last_name" />
      <input type="date" placeholder="Дата рождения" v-model="artist.birth_date" />
      <input type="date" placeholder="Дата смерти" v-model="artist.death_date" />
      <input type="text" placeholder="Описание" v-model="artist.description" />
      <input type="text" placeholder="Страна" v-model="artist.country" />
      <input type="file" ref="fileInput" />
      <span v-if="error">{{ error }}</span>
      <button class="action-button" @click="uploadFile">Добавить</button>
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
