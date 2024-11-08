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
  closePopup()
}
</script>

<template>
  <div class="popup">
    <div class="popup-inner">
      <button class="popup-close" @click="closePopup">X</button>
      <h2>Add Admin</h2>
      <ul>
        <li v-for="user in nonAdminList" :key="user.Id">
          {{ user.firstName }} {{ user.lastName }} {{ user.employeeNo }}
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

ul {
  list-style-type: none;
  padding: 0;
  margin: 10px 0 0 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

li button {
  padding: 5px 10px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  cursor: pointer;
}

li button:hover {
  background-color: #0056b3;
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
