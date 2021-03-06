<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { CONFIG } from "./config.js";

const routes = computed(() =>
  useRouter()
    .getRoutes()
    .filter((r) => !r?.meta?.hide)
);

const currentRoute = computed(() => useRoute().path);
</script>

<template>
  <div>
    <header>
      <nav>
        <RouterLink to="/" class="logo">
          <img src="@/assets/logo.svg" width="36" height="36" />
          <div>
            <h1>{{ CONFIG.appName }}</h1>
            <span>Картинная галерея</span>
          </div>
        </RouterLink>

        <div class="links">
          <RouterLink
            v-for="route of routes"
            :to="route.path"
            :class="{ active: currentRoute == route.path }"
            :key="route.path">
            {{ route.name }}
          </RouterLink>
        </div>
      </nav>
    </header>
    <div class="main-content">
      <div>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style>
body, input, button {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
body {
  font-size: 15px;
  text-rendering: optimizeLegibility;
  background: var(--dark-0);
  color: #fff;
  overflow: overlay;
}

* {
  box-sizing: border-box;
}

:root {
  --accent: #008dd4;
  --accent-trans: #008dd444;
  --dark-0: #161819;
  --dark-1: #202124;
  --dark-1-trans: #20212488;
  --dark-2: #313235;
  --dark-3: #424346;
  --dark-4: #535457;
}

* {
  box-sizing: border-box;
}

.action-button {
  color: #fff;
  background: var(--accent-trans);
  padding: 16px 24px;
  border-radius: 16px;
  text-decoration: none;
  border: 0;
  font-size: 14px;
  cursor: pointer;
}

.button-block {
  display: flex;
  gap: 16px;
  margin: 32px 0;
}

.loading {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 64px;
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
  background: var(--dark-1-trans);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 4px #000;
  z-index: 10;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #fff;
  margin-inline: 20px;
}

.logo div {
  line-height: 0.9;
}

.logo h1 {
  margin: 0;
  font-size: 1rem;
}

.logo span {
  font-weight: 300;
  font-size: 0.75rem;
}

.logo img {
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

.links a {
  font-size: 1.05rem;
  font-weight: 500;
  text-decoration: none;
  border-radius: 8px;
  padding: 16px;
  color: #fff;
}

.links a.active {
  background: var(--dark-3);
  border-bottom: 1px solid var(--dark-4);
}

header > nav {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: flex-start;
  width: 1400px;
}

.main-content {
  display: flex;
  justify-content: center;
  margin-top: 72px;
}

.main-content > div {
  margin-top: 24px;
  width: 1400px;
  display: flex;
}
</style>
