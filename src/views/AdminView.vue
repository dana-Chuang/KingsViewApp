<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import type { Users } from '../models/user'
import AddAdminPopUp from '../components/AddAdminPopUp.vue'

var allAdminsList = ref<Users[]>([])
var allNonAdminsList = ref<Users[]>([])
var addAdminWindowToggle = ref(false)
const loginName = localStorage.getItem('login_name') || 'Guest'
const loginEmplNo = localStorage.getItem('emp_no') || '000'

onMounted(async () => {
  fetchUsersByAdminStatus()
})

const togglePopup = (toggle: boolean) => {
  addAdminWindowToggle.value = toggle
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
      adminStatus: user.adminStatus == 1 ? true : false
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
      adminStatus: user.adminStatus == 1 ? true : false
    }))
}

const submitNewAdmin = async (userId: number) => {
  console.log('Add admin for user:', userId)
  // Logic to add the user as admin
  try {
    const response = await axios.post('/api/Users/AddAdmin', {
      Id: userId,
      UpdatedBy: `${loginName} ${loginEmplNo}`
    })
    console.log('Add Admin successfully', response.data)
    window.location.reload()
  } catch (error) {
    console.error('Error Adding Admin:', error)
  }
}

const toggleStatus = async (userId: number, orginalStatus: boolean) => {
  console.log('Change admin status:', userId, orginalStatus)
  //Logic to change admin status\
  try {
    const response = await axios.post('/api/Users/ChangeAdminStatus', {
      Id: userId,
      OriginalStatus: orginalStatus,
      UpdatedBy: `${loginName} ${loginEmplNo}`
    })
    console.log('Change Admin Status successfully', response.data)
    window.location.reload()
  } catch (error) {
    console.error('Error Changing Admin Status:', error)
  }
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
        <th>Admin Status</th>
        <th>Password</th>
        <th>Status Action</th>
      </tr>
      <tr v-for="admin in allAdminsList" :key="admin.Id">
        <td>{{ admin.employeeNo }}</td>
        <td>{{ admin.companyCode }}</td>
        <td>US</td>
        <td>{{ admin.firstName }}</td>
        <td>{{ admin.lastName }}</td>
        <td>{{ admin.email }}</td>
        <td :class="{ 'active-status': admin.adminStatus, 'inactive-status': !admin.adminStatus }">
          {{ admin.adminStatus ? 'Active' : 'Inactive' }}
        </td>
        <td>{{ admin.password }}</td>
        <td>
          <label class="switch">
            <input
              type="checkbox"
              :checked="admin.adminStatus"
              @change="toggleStatus(admin.Id, admin.adminStatus)"
            />
            <span class="slider"></span>
          </label>
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

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 20px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4caf50;
}

input:checked + .slider:before {
  transform: translateX(20px);
}
</style>
