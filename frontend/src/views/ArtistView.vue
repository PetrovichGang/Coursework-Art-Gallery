<script setup>
    import { useRoute } from "vue-router"
    import { onMounted, ref } from "vue"
    import { computed } from "vue"
    import "viewerjs/dist/viewer.css"
    import ArtworkItem from "../components/ArtworkItem.vue"

    const artist = ref(null)
    const artworks = ref(null)
    const artistError = ref(null)
    const artworkError = ref(null)
    const id = computed(() => useRoute().params.id)

    const update = () => {
    artist.value = null
    artistError.value = null
    artworks.value = null
    fetch(`http://localhost:3000/artist/${id.value}`)
        .then((x) => x.json())
        .then((x) => {
            if (x.length === 0) artistError.value = "Автор не найдена"
            else {
                artist.value = x[0]
                document.title = x[0].first_name + " " + x[0].last_name
            }
        })
        .catch((x) => (artistError.value = x))
    }
    fetch(`http://localhost:3000/artwork/author/${id.value}`)
        .then((x) => x.json())
        .then((x) => {
            if (x.length === 0) artworkError.value = "Картины не найдены"
            else {
                artworks.value = x
            }
        })

    onMounted(update); 
</script>

<template>
    <div class="split">
        <section v-if="artist">
        <div class="grid" v-viewer="{ toolbar: false, tooltip: false, button: false, navbar: false, keyboard: false }">
            <div class="author">
                <div class="author-info">
                    <img :src="artist.image" />
                    <div>
                        <h3>
                            {{ artist.first_name }} {{ artist.second_name }}
                            {{ artist.last_name }}
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
                            <small>Страна: </small><span>{{ artist.country }}</span>
                        </div>
                    </div>
                </div>
                <div v-if="artist.description != ''" class="author-description">
                    <h2>Описание</h2>
                    <span>{{ artist.description }}</span>
                </div>
            </div>
            <section class="artworks" v-if="artworks">
              <artwork-item v-for="artwork in artworks" :key="artwork" :art="artwork"/>
            </section>
        </div>
        </section>
        <section v-else-if="artistError">
            <h1>Ошибка</h1>
            <span>
                {{ artistError }}
            </span>
            <br><br>

            <button @click="update()">Перезагрузить</button>
        </section>
        <section v-else class="loading">
            <img
                alt="load logo"
                src="@/assets/logo-load.svg"
                width="72"
                height="72"
            />
        </section>
    </div>
</template>

<style scoped>
  section {
    width: 80%;
  }

  .author-info > img {
    border-radius: 50%;
    width: 128px;
    height: 128px;
  }
  img:hover {
    transform: scale(1.04);
  }

  .author {
    padding: 24px;
    /* background: var(--dark-2); */
    border-radius: 16px;
    /* border: 1px solid var(--dark-3); */
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }
  .author-info{
    /* padding: 24px; */
    /* background: var(--dark-2); */
    border-radius: 16px;
    /* border: 1px solid var(--dark-3); */
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  .author-description{
      width: 20%;
      word-wrap: break-word;
  }

  .grid {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    align-items: stretch;
  }

  .split {
    display: flex;
    gap: 32px;
    width: 100%;
    padding: 0 16px;
    align-items: center;
    justify-content: center;
  }

  .artworks {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 20px;
  }

  a{
      color: #fff;
      text-decoration: none;
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
</style>