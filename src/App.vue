<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <div class="navigation-bar">
      <router-link to="/user">Users</router-link> |
      <router-link to="/admin">Admin</router-link>
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
.app {
  width: 100%;
  font-family: Avenir, Arial, Helvetica, sans-serif;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.navigation-bar {
  font-size: 25px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  .app {
    display: flex;
    align-items: flex-start;
  }
}
</style>
