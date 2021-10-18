<template>
  <div class="h-full">
    <div class="flex justify-between items-center py-5">
      <div class="text-2xl font-normal">Role and Permission</div>
      <base-button
        color="primary"
        class="flex items-center font-thin text-sm"
        @click="$router.push('/role-and-permission/add-role')"
      >
        <base-icon icon="add" size="20" viewBox="0 0 24 24"></base-icon>
        Add Role
      </base-button>
    </div>

    <div class="w-full bg-white rounded-md border border-cool-150 p-4">
      <div class="flex items-center py-4">
        <div class="w-4/12 relative">
          <base-input
            innerClass="pr-8"
            placeholder="Search by Name, Email, Phone No."
            v-model="search"
            v-on:keyup.enter="searchUser(search)"
          ></base-input>
          <base-icon
            class="absolute top-0 right-0 mt-2 mr-1 cursor-pointer"
            icon="search"
            viewBox="0 0 20 24"
            @click="searchUser(search)"
          ></base-icon>
        </div>

        <div class="px-3">
          <base-dropdown
            :text="`Status: ${$model.filterStatus(filter_status).label}`"
            :dropdownWidthFull="true"
          >
            <base-dropdown-item
              v-for="(f, i) in $model.filter_status"
              :key="`filter_status-${i}`"
              @click="filter_status = f.value"
              :class="{ 'bg-blue-50': filter_status == f.value }"
            >
              {{ f.label }}
            </base-dropdown-item>
          </base-dropdown>
        </div>
      </div>

      <div class="table-custom">
        <table>
          <thead>
            <th class="text-left">NAME</th>
            <th class="text-left">EMAIL</th>
            <th>PHONE NUMBER</th>
            <th class="text-left">ROLE</th>
            <th class="text-left">LAST ACCESS</th>
            <th>STATUS</th>
            <th></th>
          </thead>
          <tbody>
            <tr v-for="(l, i) in lists" :key="i">
              <td>
                <div class="text-primary text-sm">{{ l.name }}</div>
              </td>
              <td>{{ l.email }}</td>
              <td class="text-center">{{ l.phone }}</td>
              <td>{{ role(l.role) }}</td>
              <td>{{ l.last_access }}</td>
              <td class="text-center">
                <div
                  class="w-full leading-6 rounded uppercase font-normal"
                  :class="{
                    'bg-green-100 text-green-500': l.status == 1,
                    'bg-gray-100 text-gray-400': l.status == 0,
                  }"
                >
                  {{ l.status == 1 ? "ACTIVE" : "INACTIVE" }}
                </div>
              </td>
              <td class="text-right">
                <base-dropdown
                  dropdownClass="w-28 text-gray-700"
                  :dropdownMaxWidthAuto="true"
                >
                  <div
                    slot="toggle"
                    class="px-2 py-1 border border-gray-200 rounded-md text-xs"
                  >
                    &#8226;&#8239;&#8226;&#8239;&#8226;
                  </div>
                  <base-dropdown-item
                    class="font-light text-left"
                    @click="
                      $router.push({
                        path: `/role-and-permission/add-role?uuid=${l.uuid}`,
                      })
                    "
                    >Edit Role</base-dropdown-item
                  >
                  <!-- <base-dropdown-item class="font-light text-left">Set Active</base-dropdown-item> -->
                  <base-dropdown-item
                    class="font-light text-left text-red-500"
                    @click="deleteUser(l.id)"
                    >Delete</base-dropdown-item
                  >
                </base-dropdown>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      search: "",
      filter_status: "All",
      lists: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    token() {
      return this.$store.state.user.token;
    },
  },
  mounted() {
    this.getUsersAll();
  },
  methods: {
    searchUser(search) {
      var url = "/bedid-api/v1/users";

      if (search === "") {
        this.getUsersAll();
        return;
      }

      if (this.checkEmail(search)) url = url + "?email=" + search;
      else if (this.checkUUID(search)) url = url + "?user_id=" + search;
      else url = url + "?citizen_id=" + search;

      this.$axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.token.access_token}`,
          },
        })
        .then((res) => {
          this.lists = [];
          res.data.entities.forEach((e) => {
            var entities = {
              id: e.id,
              uuid: e.uuid,
              email: e.internet_address.email.value,
              last_access: new Date(e.updated_at)
                .toISOString()
                .replace(/T/, " ")
                .replace(/\..+/, ""),
              role: e.permission,
              phone: e.phone.nbr.value,
              name:
                e.name_en.first_name.value + " " + e.name_en.last_name.value,
              status: e.active.value ? "1" : "0",
            };
            this.lists.push(entities);
          });
        })
        .catch((err) => {
          console.log(err.response);
          this.checked = false;
          this.$toast.open({
            message: err.response.data.message,
            type: "error",
            duration: 6000,
          });
        });
    },

    getUsersAll() {
      this.$axios
        .get("/bedid-api/v1/users", {
          headers: {
            Authorization: `Bearer ${this.token.access_token}`,
          },
        })
        .then((res) => {
          this.lists = [];
          res.data.entities.forEach((e) => {
            var entities = {
              id: e.id,
              uuid: e.uuid,
              email: e.internet_address.email.value,
              last_access: new Date(e.updated_at)
                .toISOString()
                .replace(/T/, " ")
                .replace(/\..+/, ""),
              role: e.permission,
              phone: e.phone.nbr.value,
              name:
                e.name_en.first_name.value + " " + e.name_en.last_name.value,
              status: e.active.value ? "1" : "0",
            };
            this.lists.push(entities);
          });
        })
        .catch((err) => {
          console.log(err.response);
          this.$toast.open({
            message: err.response.data.message,
            type: "error",
            duration: 6000,
          });
        });
    },
    role(r) {
      if (r == 100) return "Admin";
      else if (r == 1000) return "Super Admin";
      else return "User";
    },

    checkEmail(value) {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value);
    },

    checkUUID(value) {
      const pattern =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      return pattern.test(value);
    },

    deleteUser(id) {
      this.$axios
        .delete("/bedid-api/v1/users/" + id, {
          headers: {
            Authorization: `Bearer ${this.token.access_token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.$toast.open({
            message: "Delete Success",
            duration: 6000,
          });
          this.getUsersAll();
        })
        .catch((err) => {
          console.log(err.response.data.message);
          this.$toast.open({
            message: err.response.data.message,
            type: "error",
            duration: 6000,
          });
        });
    },
  },
};
</script>
