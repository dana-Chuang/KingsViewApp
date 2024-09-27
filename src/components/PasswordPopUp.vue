<script setup lang="ts">
const props = defineProps({
  employeeNo: {
    type: String,
    default: ''
  },
  employeeName: {
    type: String,
    default: ''
  },
  popupToggle: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['ClosePopup'])

function closePopup() {
  emit('ClosePopup', false)
}
</script>

<template>
  <div class="popup">
    <div class="popup-inner">
      <button class="popup-close" @click="closePopup">X</button>
      <h2>Reset Password</h2>
      <form>
        <div>
          <label for="ee-number">Employee No:</label>
          <input type="text" id="ee-no" :value="employeeNo" readonly />
        </div>
        <div>
          <label for="ee-name">Employee Name:</label>
          <input type="text" id="ee-name" :value="employeeName" readonly />
        </div>
        <div>
          <label for="new-password">New Password:</label>
          <input type="password" id="new-password" v-model="newPassword" required />
        </div>
        <div>
          <label for="confirm-password">Confirm Password:</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" required />
        </div>
        <button class="submit-button" type="submit">Submit</button>
      </form>
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
  padding-top: 10px;
  padding-left: 25px;
  padding-right: 25px;
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
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  color: white;
}

button:hover {
  background-color: #0d4891;
  color: white;
}
</style>
