<template>
  <div class="flex w-full">
    <div class="drawer h-screen bg-white shadow-md z-10 sticky top-0 left-0">
      <div class="mx-5 my-6">
        <base-icon
          icon="logo-bedid-drawer"
          width="168"
          height="42"
          viewBox="0 0 168 42"
        ></base-icon>
      </div>

      <div class="font-light uppercase px-3 pt-5">Management</div>

      <div v-for="(menu, i) in menus" :key="i">
        <nuxt-link
          class="flex items-center px-3 py-3 select-none"
          :class="{
            'bg-blue-50 text-primary border-l-4 border-primary':
              menu.routes.includes(current_route_name),
            'text-gray-300 cursor-not-allowed': !menu.active,
          }"
          :to="menu.active ? menu.link : ''"
          v-if="!menu.children"
        >
          <div>
            <base-icon viewBox="0 0 24 24" :icon="menu.icon"></base-icon>
          </div>
          <div
            class="font-light px-3"
            :class="{ 'font-normal': menu.routes.includes(current_route_name) }"
          >
            {{ menu.title }}
          </div>
        </nuxt-link>
        <div v-if="menu.children">
          <div
            class="flex items-center px-3 py-3 cursor-pointer select-none"
            @click="menu.expand = !menu.expand"
          >
            <div>
              <base-icon viewBox="0 0 24 24" :icon="menu.icon"></base-icon>
            </div>
            <div class="font-light px-3">
              {{ menu.title }}
            </div>
            <div class="ml-auto">
              <base-icon
                class="transform transition duration-150 ease-in"
                :class="{ 'rotate-180': menu.expand }"
                viewBox="0 0 24 24"
                icon="dropdown"
              ></base-icon>
            </div>
          </div>
          <div
            v-if="menu.expand"
            class="transition-transform duration-150 ease-in-out"
          >
            <div
              class="py-3 pl-10 cursor-pointer"
              v-for="(submenu, i) in menu.children"
              :key="i"
              :class="{
                'bg-blue-50 text-primary border-l-4 border-primary':
                  submenu.routes.includes(current_route_name),
                'text-gray-300 cursor-not-allowed': !submenu.active,
              }"
              @click="submenu.active ? $router.push(submenu.link) : null"
            >
              <div
                class="font-light px-2 select-none"
                :class="{
                  'font-normal text-primary':
                    submenu.routes.includes(current_route_name),
                  'bg-blue-50 text-primary':
                    submenu.routes.includes(current_route_name),
                }"
              >
                {{ submenu.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-100 h-full w-full px-6 py-6">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      menus: [
        {
          title: "Users",
          link: "/users",
          icon: "user",
          routes: ["users", "users-id"],
          active: true,
        },
        {
          title: "Authenticator",
          link: "/authenticator",
          icon: "key",
          routes: ["authenticator"],
          active: true,
        },
        {
          title: "Identity Provider",
          link: "",
          icon: "idp",
          routes: [],
          expand: true,
          children: [
            {
              title: "IdP Proxy Client",
              link: "/identity-provider/idp-proxy-client",
              routes: [
                "identity-provider-idp-proxy-client",
                "identity-provider-idp-proxy-client-new-proxy-client",
              ],
              active: false,
            },
            {
              title: "IdP External",
              link: "/identity-provider/idp-external",
              routes: [
                "identity-provider-idp-external",
                "identity-provider-idp-external-new-idp-external",
              ],
              active: false,
            },
            {
              title: "beDID IdP Client",
              link: "/identity-provider/bedid-idp-client",
              routes: ["identity-provider-bedid-idp-client", "identity-provider-bedid-idp-client-new-bedid-client"],
              active: false,
            },
            // {
            //   title: "Fedorate IDP Client",
            //   link: "/identity-provider/fedorate",
            //   routes: ["identity-provider-fedorate"],
            //   active: false,
            // },
            // {
            //   title: "External IDP",
            //   link: "/identity-provider/external",
            //   routes: ["identity-provider-external"],
            //   active: false,
            // },
            // {
            //   title: "Internal IDP",
            //   link: "/identity-provider/internal",
            //   routes: ["identity-provider-internal"],
            //   active: false,
            // },
          ],
        },
        {
          title: "Role and Permission",
          link: "/role-and-permission",
          icon: "lock",
          routes: ["role-and-permission"],
          active: true,
        },
        {
          title: "beDID Settings",
          link: "/settings",
          icon: "setting",
          routes: ["settings"],
          active: true,
        },
        {
          title: "Logout",
          link: "/",
          icon: "setting",
          routes: [""],
          active: true,
        },
      ],
    };
  },
  computed: {
    current_route_name() {
      return this.$route.name;
    },
  },
  methods: {
    logout() {},
  },
};
</script>

<style>
.drawer {
  min-width: 240px;
}
.expand {
  transition: all 1000ms ease;
}
</style>
