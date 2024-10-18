<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import type { Users } from '../models/user'
import AddAdminPopUp from '../components/AddAdminPopUp.vue'

var allAdminsList = ref<Users[]>([])
var allNonAdminsList = ref<Users[]>([])
var addAdminWindowToggle = ref(false)
var targetedEmployeeNo = ref('')
var targetedEmployeeName = ref('')

onMounted(async () => {
  fetchUsersByAdminStatus()
})

const togglePopup = (toggle: boolean) => {
  addAdminWindowToggle.value = toggle
}

const submitNewPassword = async (newPw: string) => {
  try {
    const response = await axios.put('/api/Users/UpdatePassword', {
      Id: 1,
      NewPassword: newPw,
      UpdatedBy: 'AdminUser'
    })

    console.log('Password updated successfully', response.data)
    window.location.reload()
  } catch (error) {
    console.error('Error updating password:', error)
  }
}

async function fetchUsersByAdminStatus() {
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

  allNonAdminsList.value = response.data
    .filter((user) => user.isAdmin == 0) // filter users where isAdmin is false
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

function submitNewAdmin(userId) {
  console.log('Add admin for user:', userId)
  // Logic to add the user as admin
}
</script>

<template>
  <div class="add-admin-view">
    <button class="add-admin-button" @click="togglePopup(true)">Add Admin</button>
    <AddAdminPopUp
      v-if="addAdminWindowToggle"
      :nonAdminList="allNonAdminsList"
      @ClosePopup="togglePopup"
      @addAdmin="submitNewAdmin"
    >
    </AddAdminPopUp>
  </div>
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
.add-admin-view {
  display: flex;
  width: 100%;
  padding-left: 150px;
}
.add-admin-button {
  color: #fff;
  background-color: #c8102e;
  border-color: #c8102e;
  cursor: pointer;
  text-align: center;
  border: none;
  padding: 15px 32px;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;
  display: inline-flex;
  font-family: myriad-pro, sans-serif;
  font-size: 1em;
  font-weight: 600;
}

.add-admin-button:hover {
  background-color: #c41320; /* Kigngston red */
}

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
