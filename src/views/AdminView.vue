<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import type { Users } from '../models/user'

var allAdminsList = ref<Users[]>([])

onMounted(async () => {
  getAllAdminsList()
})

async function getAllAdminsList() {
  const response = await axios.get('/api/Users/GetAllUsers')
  allAdminsList.value = response.data
    .filter((user) => user.isAdmin == 1) // filter users where isAdmin is true
    .map((user) => ({
      Id: user.id,
      companyCode: user.companyCode,
      employeeNo: user.employeeNo,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      status: user.status == 1 ? true : false
    }))
}
</script>

<template>
  <div class="adminView">
    <table id="adminTable">
      <tr>
        <th>Employee Number</th>
        <th>Company Code</th>
        <th>Code Name</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Status</th>
        <th>Password</th>
        <th>Action</th>
      </tr>
      <tr v-for="admin in allAdminsList" :key="admin.Id">
        <td>{{ admin.employeeNo }}</td>
        <td>{{ admin.companyCode }}</td>
        <td>US</td>
        <td>{{ admin.firstName }}</td>
        <td>{{ admin.lastName }}</td>
        <td>{{ admin.email }}</td>
        <td :class="{ 'active-status': admin.status, 'inactive-status': !admin.status }">
          {{ admin.status ? 'Active' : 'Inactive' }}
        </td>
        <td>{{ admin.password }}</td>
        <td>
          <input type="button" value="Change Password" />
        </td>
      </tr>
    </table>
  </div>
</template>
<style scoped>
.adminView {
  padding-top: 15px;
}

#adminTable {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#adminTable td,
#adminTable th {
  border: 1px solid #ddd;
  padding: 8px;
}

#adminTable tr:nth-child(even) {
  background-color: #f2f2f2;
}

#adminTable tr:hover {
  background-color: #ddd;
}

#adminTable th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #696969;
  color: white;
}
.active-status {
  color: green;
}

.inactive-status {
  color: #c41320;
}
</style>
