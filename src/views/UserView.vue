<script setup lang="ts">
function ChangePassword() {
  alert('change password')
}
</script>

<template>
  <div>
    <table id="users">
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
      <tr>
        <td>CS001</td>
        <td>001</td>
        <td>US</td>
        <td>David</td>
        <td>Sun</td>
        <td>Active</td>
        <td>1234qwer</td>
        <td>
          <input type="button" value="Change Password" @click="ChangePassword" />
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
#users {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#users td,
#users th {
  border: 1px solid #ddd;
  padding: 8px;
}

#users tr:nth-child(even) {
  background-color: #f2f2f2;
}

#users tr:hover {
  background-color: #ddd;
}

#users th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #696969;
  color: white;
}
</style>
