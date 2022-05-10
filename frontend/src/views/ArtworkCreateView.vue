<script setup>
import { CONFIG } from "../config.js";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const artwork = ref({ authorId: "" });
const error = ref(null);
const fileInput = ref(null)

const artists = ref([]);
const router = useRouter()

const getArtists = () => {
  error.value = null;
  fetch(`${CONFIG.apiUrl}/artist?all=true`)
    .then((result) => {
      result.json().then((result) => {
        artists.value = result;
      });
    })
    .catch((err) => (error.value = err));
};

const create = () => {
  error.value = null;
  fetch(`${CONFIG.apiUrl}/artwork/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(artwork.value),
  })
    .then((x) => x.json())
    .then((x) => {
        if (x.statusCode == undefined)
            router.push('/art/' + x.id);
        else
            throw new Error(x.message)
    })
    .catch((x) => (error.value = x));
};
let filesCache = null
const uploadFile = () => {
    if (filesCache == fileInput.value.files[0]) {
        create()
        return
    }
    filesCache = fileInput.value.files[0]
    const formData = new FormData();
    formData.append('file', fileInput.value.files[0]);
    fetch(`${CONFIG.apiUrl}/upload`, {method: "POST", body: formData})
        .then(x => x.json())
        .then(x => {
            if (x.statusCode == undefined)
                artwork.value.image = x.name
            else
                throw new Error(x.message)
            create()
        })
        .catch((x) => (error.value = x));

}

onMounted(getArtists);
</script>

<template>
  <div class="wrap">
    <div class="form">
      <h1>Добавить работу</h1>
      <input type="text" placeholder="Название" v-model="artwork.name" />
      <input
        type="date"
        placeholder="Дата создания"
        v-model="artwork.created_date"
      />
      <input type="text" placeholder="Описание" v-model="artwork.description" />
      <input type="number" placeholder="Высота" v-model="artwork.sizeX" />
      <input type="number" placeholder="Ширина" v-model="artwork.sizeY" />
      <input
        type="text"
        placeholder="Расположение"
        v-model="artwork.location"
      />
      <select v-model="artwork.authorId">
        <option disabled selected value="">Выберите автора</option>
        <option v-for="artist in artists" :key="artist" :value="artist.id">
          {{ `${artist.first_name} ${artist.second_name}` }}
        </option>
      </select>
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
input,
select {
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
