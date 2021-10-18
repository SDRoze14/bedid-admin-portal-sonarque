<template>
  <div class="h-full">
    <div class="flex">
      <div class="text-back" @click="$router.push('/role-and-permission')">
        <base-icon
          viewBox="0 0 24 24"
          class="transform rotate-90"
          icon="dropdown"
        ></base-icon>
        Back to role and permission lists
      </div>
    </div>

    <div class="bg-white border border-cool-150 rounded-md">
      <div class="px-10 pt-6 flex justify-between">
        <div class="">
          <div class="text-2xl font-normal">Role and Permission</div>
          <div class="text-gray-400 text-sm font-light">
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for previewing layouts and visual mockups.
          </div>
        </div>
      </div>
      <div class="px-5">
        <div class="divider-bottom my-5"></div>
      </div>

      <!-- Add Administrator -->
      <div class="py-5 px-10">
        <div class="text-xl font-normal py-2">Add Administrator</div>

        <div class="py-3">
          <div class="w-5/12 relative">
            <base-input
              label="Search user"
              placeholder="Search by name, email, phone no."
              v-model="search"
              v-on:keyup.enter="searchUser(search)"
            ></base-input>
            <base-icon
              v-if="!checked"
              class="absolute top-5 right-0 mt-2 mr-1 cursor-pointer"
              icon="search"
              viewBox="0 0 20 24"
            ></base-icon>
            <base-icon
              v-if="checked"
              class="absolute top-5 right-0 mt-2 mr-1 cursor-pointer"
              icon="check-green"
              viewBox="0 0 20 24"
              @click="searchUser(search)"
            ></base-icon>
          </div>
        </div>

        <div class="py-2">
          <div class="text-sm text-gray-600">Name</div>
          <div class="w-5/12">
            <base-dropdown
              dropdownClass="w-full"
              toggleClass="w-full"
              :dropdownMaxWidthAuto="true"
              :required="true"
              :text="entitie != null ? name : 'Select'"
              :disabled="entities.length == 0"
            >
              <base-dropdown-item
                v-for="(t, i) in entities"
                :key="i"
                @click="setEntitie(t)"
                :class="{ 'bg-blue-50': entitie == t.name_en.first_name.value }"
              >
                <div
                  v-if="
                    t.name_en.first_name.value !== '' &&
                    t.name_en.last_name.value !== ''
                  "
                >
                  {{ t.name_en.first_name.value }}
                  {{ t.name_en.last_name.value }}
                </div>
                <div v-else>
                  {{ t.internet_address.email.value }}
                </div>
              </base-dropdown-item>
            </base-dropdown>
          </div>
        </div>

        <!-- <div class="py-2">
          <div class="w-5/12">
            <base-input
              label="Name"
              placeholder=""
              disabled
              v-model="name"
            ></base-input>
          </div>
        </div> -->

        <div class="py-2">
          <div class="w-5/12">
            <base-input
              label="Email"
              placeholder=""
              disabled
              v-model="email"
            ></base-input>
          </div>
        </div>

        <div class="py-2">
          <div class="w-5/12">
            <base-input
              label="Phone"
              placeholder=""
              disabled
              v-model="phone"
            ></base-input>
          </div>
        </div>

        <div class="py-5">
          <div class="text-sm text-gray-600">Role</div>
          <div class="flex">
            <div
              class="role"
              :class="{ 'bg-blue-100': role == 1000 }"
              @click="role = 1000"
            >
              <base-icon
                icon="check"
                viewBox="0 0 24 24"
                v-if="role == 1000"
              ></base-icon>
              <div
                class="text-sm"
                :class="role == 1000 ? 'text-primary' : 'text-gray-400'"
              >
                Super Admin
              </div>
            </div>

            <div
              class="role mx-3"
              :class="{ 'bg-blue-100': role == 100 }"
              @click="role = 100"
            >
              <base-icon
                icon="check"
                viewBox="0 0 24 24"
                v-if="role == 100"
              ></base-icon>
              <div
                class="text-sm"
                :class="role == 100 ? 'text-primary' : 'text-gray-400'"
              >
                Admin
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Add Administrator -->
      <div class="px-5">
        <div class="divider-bottom my-5"></div>
      </div>

      <div class="flex justify-end items-center px-5 py-5">
        <base-button
          color="gray"
          @click="$router.push('/role-and-permission')"
          class="mx-3 text-sm font-light px-8"
          >Cancel</base-button
        >
        <base-button
          color="primary"
          @click="changePermission"
          class="px-10 text-sm font-light"
          >Add</base-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      entities: [],
      entitie: null,

      name: "",
      email: "",
      phone: "",

      checked: false,
      role: 0,
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
    if (this.$route.query.uuid) {
      this.search = this.$route.query.uuid;
      this.searchUser(this.search);
    }
  },

  methods: {
    setEntitie(entitie) {
      this.entitie = entitie;
      this.name =
        entitie.name_en.first_name.value +
        " " +
        entitie.name_en.last_name.value;
      this.email = entitie.internet_address.email.value;
      this.phone = entitie.phone.nbr.value;
      this.role = entitie.permission;

      if (entitie.name_en.first_name.value === "") {
        this.email = entitie.internet_address.email.value;
        this.name = this.email;
      }

      console.log(entitie);
    },

    changePermission() {
      //https://proxy.beid.tech/api/v1/users/6113e10440de28913d3a1fd7/permissions

      if (this.entitie == null) {
        this.$toast.open({
          message: "Entitie Not Found",
          type: "error",
          duration: 6000,
        });
        return;
      }

      if (this.role < 100) {
        this.$toast.open({
          message: "Select permission role",
          type: "error",
          duration: 6000,
        });
        return;
      }

      this.$axios
        .patch(
          "/bedid-api/v1/users/uuid/" + this.entitie.uuid + "/permissions",
          { permission: this.role },
          {
            headers: {
              Authorization: `Bearer ${this.token.access_token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          this.$toast.open({
            message: "Change Permissions Success",
            duration: 6000,
          });
          this.$router.push("/role-and-permission");
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

    searchUser(search) {
      var url = "/bedid-api/v1/users";

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
          console.log(res.data);
          this.checked = true;
          this.entities = res.data.entities;
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
  },
};
</script>

<style>
.role {
  @apply py-2 w-36 border border-gray-200 rounded flex justify-center items-center cursor-pointer;
}
</style>
