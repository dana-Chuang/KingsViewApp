<script setup lang="ts">
const props = defineProps({
  nonAdminList: {
    type: Array
  },
  popupToggle: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['ClosePopup', 'addAdmin'])

function closePopup() {
  emit('ClosePopup', false)
}

function addAdmin(userId) {
  emit('addAdmin', userId)
}
</script>

<template>
  <div class="popup">
    <div class="popup-inner">
      <button class="popup-close" @click="closePopup">X</button>
      <h2>Add Admin</h2>
      <ul>
        <li v-for="user in nonAdminList" :key="user.Id">
          {{ user.firstName }} {{ user.lastName }}
          <button @click="addAdmin(user.Id)">Add Admin</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #f7f9fa;
  width: 600px;
  height: 480px;
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

input[readonly] {
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
}

button {
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

.popup-close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 16px;
  color: black;
}

.submit-button {
  position: absolute; /* Make the submit button absolutely positioned */
  bottom: 25px; /* Distance from the bottom of popup-inner */
  left: 0;
  right: 0;
  width: 90%; /* Ensure the button takes up most of the width */
  margin: 0 auto; /* Center the button horizontally */
  padding: 10px;
  background-color: #007bff;
  border: none;
  color: white;
}

button:hover {
  background-color: #0d4891;
  color: white;
}

.error-message {
  font-size: 12px;
  color: #c41320;
}
</style>
