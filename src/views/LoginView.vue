<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'

var username = ref('')
var password = ref('')
const router = useRouter()
const login = async () => {
  try {
    const response = await axios.put('/api/Users/UpdatePassword', {
      UserName: username.value,
      Password: password.value
    })
    console.log('Login successfully', response.data)
    router.push('/home')
  } catch (error) {
    console.error('Error logining:', error)
  }
}
</script>

<template>
  <div class="top-bar">
    <img class="logo" src="../../src/components/icons/logo.png" />
  </div>
  <div class="login-container">
    <div class="login-box">
      <div class="login-word">
        <h2>Login</h2>
      </div>
      <form class="loginForm" @submit.prevent="login">
        <div>
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" class="login-btn" @click="login">Log In</button>
      </form>
    </div>
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

.login-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 96px;
}

.login-box {
  background-color: #353535;
  width: 450px;
  height: 300px;
  border-radius: 15px;
  color: #d8d8d8;
  padding: 25px;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type='text'],
input[type='password'] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.login-word {
  display: flex;
  justify-content: center;
}

.login-btn {
  display: flex;
  justify-content: center;
  width: 99%;
}

button {
  cursor: pointer;
  border: none;
  border-radius: 5px;
  width: 210px;
  height: 30px;
  margin-top: 20px;
  font-size: 15px;
  padding-top: 7.5px;
}

button:hover {
  background-color: #d8d8d8;
}
</style>
