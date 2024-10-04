<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="top-bar">
    <img class="logo" src="../src/components/icons/logo.png" />
  </div>
  <div class="contentView">
    <div class="navigation-bar">
      <router-link to="/user">Users</router-link> |
      <router-link to="/admin">Admin</router-link>
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
.top-bar {
  display: flex;
  position: sticky;
  background: black;
  padding: 1.25em;
  width: auto;
  height: 76px;
  justify-content: center;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 168px;
  height: auto;
}

.contentView {
  width: 100%;
  padding-top: 15px;
  font-family: Avenir, Arial, Helvetica, sans-serif;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-items: center;
}

.navigation-bar {
  font-size: 25px;
  text-align: center;
}

a {
  text-decoration: none;
  color: #c41320;
  transition: 0.4s;
  padding: 3px;
}

@media (hover: hover) {
  a:hover {
    background-color: #d8d8d8;
  }
}
</style>
