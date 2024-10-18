<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'

var email = ref('')
var password = ref('')
var showErrorMsg = ref(false)
var errorMessage = ref('')
const router = useRouter()
const login = async () => {
  if (email.value == '' || password.value == '') {
    errorMessage.value = 'Please enter email and password'
    showErrorMsg.value = true
  } else if (!email.value.endsWith('@kingston.com')) {
    errorMessage.value = 'Email must be Kingston email'
    showErrorMsg.value = true
  } else {
    try {
      const response = await axios.post('/api/Login/Login', {
        Email: email.value,
        Password: password.value
      })
      console.log('Login successfully', response.data)
      errorMessage.value = ''
      showErrorMsg.value = false
      router.push('/home')
    } catch (error) {
      errorMessage.value = 'Incorrect Email or password'
      showErrorMsg.value = true
      console.error('Error logining:', error)
    }
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
      <form class="login-form" @submit.prevent="login">
        <div>
          <label for="email">Email</label>
          <input
            type="text"
            id="email"
            v-model="email"
            placeholder="Enter your Kingston email"
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
        <div class="error-message" v-if="showErrorMsg">
          <a>{{ errorMessage }}</a>
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
  height: 330px;
  border-radius: 15px;
  color: #d8d8d8;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.login-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
  margin-top: auto; /* Pushes the button down */
  align-self: center;
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

.error-message {
  font-size: 12px;
  height: 16px;
  color: #c41320;
}
</style>
