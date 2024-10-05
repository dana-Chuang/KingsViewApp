<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
function logout() {
  router.push('/login')
}
</script>

<template>
  <div class="top-bar">
    <img class="logo" src="../../src/components/icons/logo.png" />
    <button class="logout-btn" @click="logout">Log Out</button>
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
  align-items: center;
  position: relative;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 168px;
  height: auto;
}

.logout-btn {
  background-color: black;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  position: relative;
  transition: border-bottom 0.3s ease;
  position: absolute; /* Absolute positioning */
  top: 50%; /* Align vertically */
  right: 20px; /* Place on the right */
  transform: translateY(-50%);
}

.logout-btn::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background-color: white; /* White underline */
  transition: width 0.3s ease;
}

.logout-btn:hover::after {
  width: 100%; /* Full width on hover */
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
