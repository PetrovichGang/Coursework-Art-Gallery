<script setup>
import { CONFIG } from "../config.js";
import { onMounted, ref, defineProps, defineEmits } from "vue";

const props = defineProps(["artwork", "open"]);
const emit = defineEmits(["closeModal"]);

const error = ref(null);

const artists = ref([]);

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

const update = () => {
  error.value = null;
  fetch(`${CONFIG.apiUrl}/artwork/update/${props.artwork.id}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props.artwork),
    }
  )
    .then((x) => x.json())
    .then((x) => {
      if (x.statusCode == undefined) emit('closeModal')
      else throw new Error(x.message);
    })
    .catch((x) => (error.value = x));
};

onMounted(getArtists);
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div class="backdrop" v-if="open" @click.self="$emit('closeModal')" />
    </Transition>
    <div class="modalWrap">
      <Transition>
        <div class="modal" v-if="open">
          <h1>Изменить работу</h1>
          <input type="text" placeholder="Название" v-model="artwork.name" />
          <input type="date" placeholder="Дата создания" v-model="artwork.created_date" />
          <input type="text" placeholder="Описание" v-model="artwork.description" />
          <input type="number" placeholder="Высота" v-model="artwork.sizeX" />
          <input type="number" placeholder="Ширина" v-model="artwork.sizeY" />
          <input type="text" placeholder="Расположение" v-model="artwork.location" />
          <select v-model="artwork.authorId">
            <option disabled selected value="">Выберите автора</option>
            <option v-for="artist in artists" :key="artist" :value="artist.id">
              {{ `${artist.first_name} ${artist.second_name}` }}
            </option>
          </select>
          <span v-if="error">{{ error }}</span>
          <button class="action-button" @click="update">Изменить</button>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style scoped>
.modalWrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: var(--dark-1);
  width: 400px;
  display: flex;
  gap: 8px;
  flex-direction: column;
  box-shadow: 0px 0px 2px #0004;
  padding: 32px;
  border-radius: 14px;
}
.modalWrap {
  perspective: 1000px;
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0008;
}
.modal {
  transform-origin: top;
  pointer-events: all;
  overflow: hidden;
}
.modalWrap {
  pointer-events: none;
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

h1 {
  margin-top :0
}
</style>
