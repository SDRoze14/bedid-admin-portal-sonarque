<template>
  <div class="h-full">
    <div class="flex justify-between items-center py-5">
      <div class="text-2xl font-normal">Users</div>
      <base-button
        color="primary"
        class="flex items-center font-thin text-sm"
        @click="addUserClick()"
      >
        <base-icon icon="add" size="20" viewBox="0 0 24 24"></base-icon>
        Add User
      </base-button>
    </div>

    <div class="w-full bg-white rounded-md border border-cool-150 p-4">
      <div class="flex items-center py-4">
        <div class="w-4/12 relative">
          <base-input
            innerClass="pr-8"
            placeholder="Search by email, first name, lase name"
          ></base-input>
          <base-icon
            class="absolute top-0 right-0 mt-2 mr-1 cursor-pointer"
            icon="search"
            viewBox="0 0 20 24"
          ></base-icon>
        </div>

        <div class="pl-6 pr-3">
          <base-dropdown
            :text="`IAL: ${$model.filterIal(filter_ial).label}`"
            :dropdownWidthFull="true"
          >
            <base-dropdown-item
              v-for="(f, i) in $model.filter_ial"
              :key="`filter_ial-${i}`"
              @click="filter_ial = f.value"
              :class="{ 'bg-blue-50': filter_ial == f.value }"
            >
              {{ f.label }}
            </base-dropdown-item>
          </base-dropdown>
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
            <th class="text-left">ID</th>
            <th class="text-left">IAL</th>
            <th class="text-left">EMAIL</th>
            <th class="text-left">FIRST NAME</th>
            <th class="text-left">LAST NAME</th>
            <th>STATUS</th>
            <th></th>
          </thead>
          <tbody>
            <tr v-for="(list, i) in lists" :key="i">
              <td class="text-primary">{{ list.uuid }}</td>
              <td class="font-light">{{ list.ial }}</td>
              <td class="font-light">{{ list.email }}</td>
              <td class="font-light">{{ list.first_name }}</td>
              <td class="font-light">{{ list.last_name }}</td>
              <td class="text-center">
                <div
                  class="w-full leading-6 rounded uppercase font-normal"
                  :class="{
                    'bg-green-100 text-green-500': list.status == 'Active',
                    'bg-gray-100 text-gray-400': list.status == 'Inactive',
                  }"
                >
                  {{ list.status }}
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
                    @click="editUser(list.id)"
                    >Detail</base-dropdown-item
                  >
                  <base-dropdown-item
                    class="font-light text-left"
                    @click="
                      setActive(list.id, list.status == 'Active' ? true : false)
                    "
                    >Set Active</base-dropdown-item
                  >
                  <base-dropdown-item class="font-light text-left text-red-500" @click="deleteUser(list.id)"
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
      filter_ial: "All",
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
    addUserClick() {
      this.$router.push("/users/new-user");
    },

    editUser(id) {
      this.$router.push("/users/" + id);
    },

    deleteUser(id){
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

    setActive(id, status) {
      var data = {
        active: {
          value: !status,
          classification: "C",
          source: 5,
        },
      };
      console.log(data);
      this.$axios
        .patch("/bedid-api/v1/users/" + id, data, {
          headers: {
            Authorization: `Bearer ${this.token.access_token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
          this.$toast.open({
            message: "Set Active Success",
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

    getUsersAll() {
      this.$api.getListUsers()
      // this.$axios
      //   .get("/bedid-api/v1/users", {
      //     headers: {
      //       Authorization: `Bearer ${this.token.access_token}`,
      //     },
      //   })
        .then((res) => {
          this.lists = [];
          res.data.entities.forEach((e) => {
            var entities = {
              id: e.id,
              uuid: e.uuid,
              ial: e.ial.value,
              email: e.internet_address.email.value,
              first_name: e.name_en.first_name.value,
              last_name: e.name_en.last_name.value,
              status: e.active.value ? "Active" : "Inactive",
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
  },
};
</script>
