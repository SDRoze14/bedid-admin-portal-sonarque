<template>
  <div class="flex justify-center">
    <div
      class="flex items-center bg-white md:mx-auto mx-10  p-16 rounded-md border border-cool-150"
    >
      <div class="flex flex-wrap items-center w-full">
        <base-icon
          class="md:mr-10 mx-auto mb-16 md:mb-0"
          icon="logo-bedid"
          width="185"
          height="135"
          viewBox="0 0 185 135"
        ></base-icon>
        <div class="divider-right hidden md:block"></div>
        <div class="divider-bottom md:hidden block"></div>
        <div class="mx-auto md:ml-16 mt-10 md:mt-0">
          <div class="font-medium text-2xl leading-none text-center md:text-left">Login</div>
          <div class="text-2xl font-light text-center md:text-left">
            be<span class="font-medium text-second uppercase">digital id</span>
          </div>
          <base-button class="mt-8">
            <div @click="loginClick" class="px-5 py-1 text-lg">Login Mobile Certificate</div>
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "auth",
  mounted() {},
  async created() {
    console.log("mounted");

    let self = this;
    if (self.$route.query.preload) {

      const data = Buffer.from(
        self.$route.query.preload.replace(/\s/g, "+"),
        "base64"
      ).toString("utf8");

      const dataJson = JSON.parse(data);

      console.log(dataJson);

      if (dataJson) {
        if (dataJson.token.access_token && dataJson.token.refresh_token) {
          self.$store.commit('user/setUser', dataJson)
          self.$router.push("/users");
        } else {
          self.error = dataJson.message;
          self.$router.push("/login");
        }
      }
    }
  },
  methods: {
    loginClick() {
      window.location = "/api/v1/oauth2";
    },
  },
};
</script>
