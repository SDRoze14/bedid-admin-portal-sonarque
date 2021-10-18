<template>
  <div class="h-full">
    <div class="flex justify-between items-center py-5">
      <div class="text-2xl font-normal">beDID Settings</div>
    </div>

    <div class="w-full bg-white rounded-md border border-cool-150 p-4">
      <div class="flex items-center py-4 px-4">
        <div
          class="
            mx-2
            py-1
            px-2
            text-sm text-primary
            border border-primary
            rounded
            bg-blue-50
          "
        >
          IdP Proxy Settings
        </div>
      </div>

      <div class="mx-2">
        <div class="divider-bottom mt-2 mb-5"></div>
      </div>

      <div class="text-xl font-normal px-6">IdP Proxy Settings</div>
      <div class="text-sm font-light px-5 text-gray-400">
        Lorem ipsum is placeholder text commonly used in the graphic, print, and
        publishing industries for previewing layouts and visual mockups.
      </div>

      <div class="py-10 mx-2">
        <div class="w-full">
          <div class="w-1/2 my-5 bg-gray-50 px-4 py-5 rounded">
            <div class="text-xl">Expired Time of Access Token</div>

            <div class="flex items-center flex-wrap pt-3">
              <div class="pr-2">
                <base-input
                  label="Expire time"
                  v-model="token_expiry"
                  type="number"
                ></base-input>
              </div>
              <div class="pl-2 pb-5">
                <div class="text-sm text-gray-600 pt-5">Type</div>
                <base-dropdown
                  dropdownClass="w-full"
                  toggleClass="w-full bg-white"
                  :dropdownMaxWidthAuto="true"
                  :text="$model.timeType(token_expiry_type).label"
                >
                  <base-dropdown-item
                    v-for="(item, i) in $model.time_type"
                    :key="i"
                    @click="token_expiry_type = item.value"
                    :class="{ 'bg-blue-50': token_expiry_type == item.value }"
                  >
                    {{ item.label }}
                  </base-dropdown-item>
                </base-dropdown>
              </div>
            </div>
          </div>

          <div class="w-1/2 bg-gray-50 px-4 py-5 rounded">
            <div class="text-xl">Expired Time of Refresh Token</div>

            <div class="flex items-center flex-wrap pt-3">
              <div class="pr-2">
                <base-input
                  label="Expire time"
                  v-model="refresh_expiry"
                  type="number"
                ></base-input>
              </div>
              <div class="pl-2 pb-5">
                <div class="text-sm text-gray-600 pt-5">Type</div>
                <base-dropdown
                  dropdownClass="w-full"
                  toggleClass="w-full bg-white"
                  :dropdownMaxWidthAuto="true"
                  :text="$model.timeType(refresh_expiry_type).label"
                >
                  <base-dropdown-item
                    v-for="(item, i) in $model.time_type"
                    :key="i"
                    @click="refresh_expiry_type = item.value"
                    :class="{ 'bg-blue-50': refresh_expiry_type == item.value }"
                  >
                    {{ item.label }}
                  </base-dropdown-item>
                </base-dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="px-5">
        <div class="divider-bottom my-5"></div>
      </div>

      <div class="flex justify-end items-center px-5 py-5">
        <base-button
          color="gray"
          class="mx-3 text-sm font-light px-3"
          @click="$router.push('/users')"
          >Back</base-button
        >
        <base-button
          color="primary"
          @click="submit"
          class="px-3 text-sm font-light"
          >Submit</base-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token_expiry: 1,
      token_expiry_type: "day",
      refresh_expiry: 1,
      refresh_expiry_type: "month",
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
    this.getAccessTime();
    this.getRefreshTime();
  },

  methods: {
    getAccessTime() {
      this.$axios
        .get("/bedid-api/v1/settings/token_time", {
          headers: {
            Authorization: `Bearer ${this.token.access_token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          var accestime = res.data.value_int;

          if (accestime < 60) {
            this.token_expiry = accestime;
            this.token_expiry_type = "second";
          } else if (accestime < 3600) {
            this.token_expiry = accestime / 60;
            this.token_expiry_type = "minute";
          } else if (accestime < 86400) {
            this.token_expiry = accestime / 3600;
            this.token_expiry_type = "hour";
          } else {
            this.token_expiry = accestime / 86400;
            this.token_expiry_type = "day";
          }
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
    getRefreshTime() {
      this.$axios
        .get("/bedid-api/v1/settings/refresh_token_time", {
          headers: {
            Authorization: `Bearer ${this.token.access_token}`,
          },
        })
        .then((res) => {
          console.log(res.data);

          var refreshtime = res.data.value_int;

          if (refreshtime < 60) {
            this.refresh_expiry = refreshtime;
            this.refresh_expiry_type = "second";
          } else if (refreshtime < 3600) {
            this.refresh_expiry = refreshtime / 60;
            this.refresh_expiry_type = "minute";
          } else if (refreshtime < 86400) {
            this.refresh_expiry = refreshtime / 3600;
            this.refresh_expiry_type = "hour";
          } else {
            this.refresh_expiry = refreshtime / 86400;
            this.refresh_expiry_type = "day";
          }
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
    async submit() {
      if (this.token_expiry <= 0) {
        this.$toast.open({
          message: "Please fill out the Access Token.",
          type: "error",
          duration: 6000,
        });
        return;
      }

      if (this.refresh_expiry <= 0) {
        this.$toast.open({
          message: "Please fill out the Refresh Token.",
          type: "error",
          duration: 6000,
        });
        return;
      }

      var token_expiry_value = 0;
      if (this.token_expiry_type === "second")
        token_expiry_value = this.formatTime(this.token_expiry, 0);
      else if (this.token_expiry_type === "minute")
        token_expiry_value = this.formatTime(this.token_expiry, 1);
      else if (this.token_expiry_type === "hour")
        token_expiry_value = this.formatTime(this.token_expiry, 2);
      else if (this.token_expiry_type === "day")
        token_expiry_value = this.formatTime(this.token_expiry, 3);

      var config = {
        method: "post",
        url: "/bedid-api/v1/settings/token_time",
        headers: {
          Authorization: "Bearer " + this.token.access_token,
          "Content-Type": "application/json",
        },
        data: { value: token_expiry_value },
      };

      await this.$axios(config).catch((err) => {
        this.$toast.open({
          message: err.response.data.message,
          type: "error",
          duration: 6000,
        });
        return;
      });

      token_expiry_value = 0;
      if (this.refresh_expiry_type === "second")
        token_expiry_value = this.formatTime(this.refresh_expiry, 0);
      else if (this.refresh_expiry_type === "minute")
        token_expiry_value = this.formatTime(this.refresh_expiry, 1);
      else if (this.refresh_expiry_type === "hour")
        token_expiry_value = this.formatTime(this.refresh_expiry, 2);
      else if (this.refresh_expiry_type === "day")
        token_expiry_value = this.formatTime(this.refresh_expiry, 3);

      config.url = "/bedid-api/v1/settings/refresh_token_time";
      config.data = { value: token_expiry_value };

      await this.$axios(config).catch((err) => {
        this.$toast.open({
          message: err.response.data.message,
          type: "error",
          duration: 6000,
        });
        return;
      });

      this.$toast.open({
        message: "Update new token.",
        duration: 6000,
      });
      
    },

    formatTime(time, type) {
      if (type == 0) return time;

      if (type == 1) return time * 60;
      else if (type == 2) return time * 3600;
      else if (type == 3) return time * 86400;
    },
  },
};
</script>
