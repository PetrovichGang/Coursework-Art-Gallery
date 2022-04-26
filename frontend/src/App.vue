<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router"
import { computed } from 'vue'

const routes = computed(() => useRouter().getRoutes().filter(r => !r?.meta?.hide))
const currentRoute = computed(() => useRoute().path)
</script>

<template>
  <header>
    <nav>
      <div class="logo-text">
        <img alt="TV logo" class="logo" src="@/assets/logo.svg" width="36" height="36" />
        <div :style="{ lineHeight: 0.9 }">
          <span>ArtStoichev</span><br>
          <span :style="{ fontWeight: 300, fontSize: '0.75rem' }">Картинная галерея</span>
        </div>
      </div>

      <div class="search">
        <img  src="@/assets/search.svg" width="24" height="24" />
        <input type="text" />
      </div>

      <div class="links">
        <RouterLink
          v-for="route of routes"
          :class="{ active: currentRoute == route.path }"
          :to="route.path"
        >{{ route.name }}</RouterLink>
      </div>
    </nav>
  </header>
  <div class="main-content">
    <div>
      <RouterView />
    </div>
  </div>
</template>

<style>
body,
input {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
}
body {
  font-size: 15px;
  text-rendering: optimizeLegibility;
  background: #161819;
  color: #fff
}

* {
  box-sizing: border-box;
}

:root {
  --accent: #008dd4
}
</style>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: center;
  background: #202124;/*
  border-bottom: 1px solid #ddd;*/
  backdrop-filter: blur(10px);
  color: #fff;
  box-shadow: 0 0 4px #0002;
}
.logo-text {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 20px;
  gap: 14px;
}
.links {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}
.search {
  background: #303234;
  color: #fff;
  box-shadow: 0 2px 8px #0002;
  margin: 0 12px;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  gap: 8px;
  max-width: 600px;
  width: 100%;
}

.search input {
  background: inherit;
  color: #fff;
  font-size: 16px;
  border: 0;
  outline: none;
  width: 100%;
}

.links a {
  font-size: 1.05rem;
  font-weight: 500;
  text-decoration: none;
  border-radius: 8px;
  padding: 16px;
  color: #fff;
}

.links a.active {
  background: #404449;
  border-bottom: 1px solid #555;
}

header > nav {
  display: flex;
  align-items: center;
  width: 1600px;
  height: 100%;
  justify-content: space-between;
  padding: 0 8px 0 16px;
}

.main-content {
  display: flex;
  justify-content: center;
  margin-top: 72px
}

.main-content > div {
  margin-top: 24px;
  width: 1600px;
  display: flex;
}
</style>
