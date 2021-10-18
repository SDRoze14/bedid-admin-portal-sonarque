<template>
  <div class="h-full" :class="{ 'h-screen': lists.length <= 10 }">
    <div class="flex justify-between items-center py-5">
      <div class="text-2xl font-normal">beDID IdP Client</div>
      <base-button
        color="primary"
        class="flex items-center font-thin text-sm"
        @click="
          $router.push('/identity-provider/bedid-idp-client/new-bedid-client')
        "
      >
        <base-icon icon="add" size="20" viewBox="0 0 24 24" />
        Add Identity
      </base-button>
    </div>

    <!-- CONTENT CONTENT -->
    <div class="w-full bg-white rounded-md border border-cool-150 p-4">
      <div class="flex items-center py-4">
        <!-- SEARCH -->
        <div class="w-4/12 relative">
          <base-input innerClass="pr-8" placeholder="Search by Client ID" />
          <base-icon
            class="absolute top-0 right-0 mt-2 mr-1 cursor-pointer"
            icon="search"
            viewBox="0 0 24 24"
          />
        </div>
        <!-- END SEARCH -->

        <!-- FILTER -->
        <div class="px-3">
          <base-dropdown
            :text="`Status: ${$model.filterStatus(filter_status).label}`"
            :dropdownWidthFull="true"
          >
            <base-dropdown-item
              v-for="(f, i) in $model.filter_status"
              :key="`filter-status-${i}`"
              @click="filter_status = f.value"
              :class="{ 'bg-blue-50': filter_status == f.value }"
            >
              {{ f.label }}
            </base-dropdown-item>
          </base-dropdown>
        </div>
        <!-- END FILTER -->
      </div>

      <!-- TABLE -->
      <div class="table-custom">
        <table>
          <thead>
            <th class="text-left">NAME</th>
            <th class="text-left">Display name</th>
            <th>Client ID</th>
            <th>Create date</th>
            <th>Status</th>
            <th></th>
          </thead>
          <tbody>
            <tr v-for="(item, i) in lists" :key="i">
              <td>
                <div class="text-primary text-sm">{{ item.name }}</div>
              </td>
              <td>{{ item.display_name }}</td>
              <td class="text-center">{{ item.client_id }}</td>
              <td class="text-center">
                {{ $model.formatShortMonth(item.created_at) }}
              </td>
              <td class="text-center">
                <div
                  class="w-full leading-6 rounded uppercase font-normal"
                  :class="{
                    'bg-green-100 text-green-500': item.status == 1,
                    'bg-gray-100 text-gray-400': item.status == 0,
                  }"
                >
                  {{ item.status == 0 ? "inactive" : "active" }}
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
                </base-dropdown>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- END TABLE -->
    </div>
    <!-- END CONTENT CONTENT -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: [
        {
          name: "beDID",
          display_name: "OpenIDConnect",
          client_id: "Facebook",
          created_at: "2021-08-05",
          status: 1,
        },
      ],
      filter_status: "All",
    };
  },
};
</script>
