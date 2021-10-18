<template>
  <div class="h-full" :class="{ 'h-screen': lists.length <= 10 }">
    <div class="flex justify-between items-center py-5">
      <div class="text-2xl font-normal">Authenticator</div>
    </div>

    <div class="w-full bg-white rounded-md border border-cool-150 p-4">
      <div class="flex w-full justify-between items-center">
        <div class="w-8/12 flex items-center py-4">
          <div class="w-6/12 relative">
            <base-input
              innerClass="pr-0"
              placeholder="Search by user ID"
              v-model="search"
              v-on:keyup.enter="fetch"
            ></base-input>
            <base-icon
              class="absolute top-0 right-0 mt-2 mr-1 cursor-pointer"
              icon="search"
              viewBox="0 0 20 24"
              @click="fetch"
            ></base-icon>
          </div>

          <div class="w-4/12 px-3">
            <base-dropdown
              :text="`Status: ${$model.statusAuth(status_auth).label}`"
              :dropdownWidthFull="true"
              toggleClass="w-full"
            >
              <base-dropdown-item
                v-for="(s, i) in $model.status_auth"
                :key="`status_auth-${i}`"
                @click="chengeStatus(s)"
                :class="{ 'bg-blue-50': status_auth == s.value }"
              >
                {{ s.label }}
              </base-dropdown-item>
            </base-dropdown>
          </div>
        </div>
        <div class="">
          <base-pages
            :size="size"
            :total_page="last_page"
            :page="page"
            @change="paging"
          ></base-pages>
        </div>
      </div>

      <div class="table-custom">
        <table>
          <thead>
            <th id="user-id" class="text-left">USER ID</th>
            <th id="device" class="text-left">DEVICE</th>
            <th id="ref" class="text-left">REF</th>
            <th id="create_date" class="text-left">CREATE DATE</th>
            <th id="status" class="">STATUS</th>
            <th id="manage" class="text-right"></th>
          </thead>
          <tbody>
            <tr v-for="(list, i) in lists" :key="i">
              <td class="">
                <div class="text-primary">{{ list.user_id }}</div>
              </td>
              <td class="font-light">{{ list.device }}</td>
              <td class="font-light">{{ list.ref }}</td>
              <td class="font-light">
                {{ $model.formDateTime(list.created_at) }}
              </td>
              <td class="text-center">
                <div class="w-full">
                  <div v-if="list.status == 2" class="scaned">scaned</div>
                  <div v-if="list.status == 4" class="revoke">revoke</div>
                  <div v-if="list.status == 1" class="request">request</div>
                  <div v-if="list.status == 3" class="enrolled">enrolled</div>
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
                    class="font-light text-red-800 text-left hover:bg-red-100"
                    >Revoke</base-dropdown-item
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
  data() {
    return {
      search: "",
      status_auth: 0,
      lists: [],
      page: 1,
      last_page: 1,
    };
  },
  computed: {
    size() {
      return this.page * 20;
    },
    total_item() {
      return this.last_page * 20;
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      let self = this;
      let params = {
        page: self.page,
      };
      if (self.status_auth != 0) params.status = self.status_auth
      if (self.search) params.q = self.search
      await self.$api.getListAuth(params).then((response) => {
        self.lists = response.data.entities;
        self.last_page = response.data.page_information.last_page;
      });
    },
    paging(page) {
      this.page = page
      this.fetch()
    },
    chengeStatus(s) {
      this.status_auth = s.value
      this.fetch()
    }
  },
};
</script>

<style>
.scaned {
  @apply text-primary text-xs py-1 bg-blue-100 rounded uppercase;
}
.revoke {
  @apply text-red-800 text-xs py-1 bg-red-100 rounded uppercase;
}
.request {
  @apply text-yellow-400 text-xs py-1 bg-yellow-100 rounded uppercase;
}
.enrolled {
  @apply text-green-800 text-xs py-1 bg-green-100 rounded uppercase;
}
</style>
