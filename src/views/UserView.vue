<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import type { Users } from '../models/user'
import PasswordPopUp from '../components/PasswordPopUp.vue'

var allUsersList = ref<Users[]>([])
var passwordWindowToggle = ref(false)
var targetedEmployeeId = ref(0)
var targetedEmployeeNo = ref('')
var targetedEmployeeName = ref('')

onMounted(async () => {
  getAllUsersList()
})

const togglePopup = (toggle: boolean) => {
  passwordWindowToggle.value = toggle
}

const resetPassword = (toggle: boolean, user: Users) => {
  togglePopup(toggle)
  targetedEmployeeId.value = user.Id
  targetedEmployeeNo.value = user.employeeNo
  targetedEmployeeName.value = `${user.firstName} ${user.lastName}`
}

const submitNewPassword = async (newPw: string) => {
  try {
    const payload = {
      id: targetedEmployeeId.value,
      newPassword: newPw,
      updatedBy: 'AdminUser'
    }

    const response = await axios.post('/api/Users/UpdatePassword', payload)

    console.log('Password updated successfully', response.data)
  } catch (error) {
    console.error('Error updating password:', error)
  }
}

async function getAllUsersList() {
  const response = await axios.get('/api/Users/GetAllUsers')
  allUsersList.value = response.data.map((user) => ({
    Id: user.id,
    companyCode: user.companyCode,
    employeeNo: user.employeeNo,
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password,
    status: user.status == 1 ? true : false
  }))
}
</script>

<template>
  <div class="userView">
    <table id="userTable">
      <tr>
        <th>Employee Number</th>
        <th>Company Code</th>
        <th>Code Name</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Status</th>
        <th>Password</th>
        <th>Action</th>
      </tr>
      <tr v-for="user in allUsersList" :key="user.Id">
        <td>{{ user.employeeNo }}</td>
        <td>{{ user.companyCode }}</td>
        <td>US</td>
        <td>{{ user.firstName }}</td>
        <td>{{ user.lastName }}</td>
        <td>{{ user.status ? 'Active' : 'Inactive' }}</td>
        <td>{{ user.password }}</td>
        <td>
          <input type="button" value="Change Password" @click="resetPassword(true, user)" />
        </td>
      </tr>
    </table>
    <PasswordPopUp
      v-if="passwordWindowToggle"
      :employeeNo="targetedEmployeeNo"
      :employeeName="targetedEmployeeName"
      @ClosePopup="togglePopup"
      @submitNewPassword="submitNewPassword"
    >
    </PasswordPopUp>
  </div>
</template>

<style scoped>
.userView {
  padding-top: 15px;
}

#userTable {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#userTable td,
#userTable th {
  border: 1px solid #ddd;
  padding: 8px;
}

#userTable tr:nth-child(even) {
  background-color: #f2f2f2;
}

#userTable tr:hover {
  background-color: #ddd;
}

#userTable th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #696969;
  color: white;
}
</style>
