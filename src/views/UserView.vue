<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import type { Users } from '../models/user'

var allUsersList = ref<Users[]>([])

onMounted(async () => {
  getAllUsersList()
})

function ChangePassword() {
  alert('change password')
}

async function getAllUsersList() {
  const response = await axios.get('/api/WeatherForecast')
  allUsersList.value = response.data.map((user) => ({
    Id: user.Id,
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
          <input type="button" value="Change Password" @click="ChangePassword" />
        </td>
      </tr>
    </table>
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
