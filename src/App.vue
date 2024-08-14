<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="contentView">
    <div class="navigation-bar">
      <router-link to="/user">Users</router-link> |
      <router-link to="/admin">Admin</router-link>
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
.contentView {
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
</style>
