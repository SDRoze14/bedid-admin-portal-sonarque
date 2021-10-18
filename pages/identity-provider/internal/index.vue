<template>
  <div class="h-screen">
    <div class="flex justify-between items-center py-5">
      <div class="text-2xl font-normal">Internal IDP</div>
      <base-button
        color="primary"
        class="flex items-center font-thin text-sm"
        @click="$router.push('/identity-provider/internal/add-internal')"
      >
        <base-icon icon="add" size="20" viewBox="0 0 24 24"></base-icon>
        Add Identity
      </base-button>
    </div>

    <div class="w-full bg-white rounded-md border border-cool-150 p-4">
      <div class="flex items-center py-4">
        <div class="w-4/12 relative">
          <base-input
            innerClass="pr-8"
            placeholder="Search by Client ID"
          ></base-input>
          <base-icon
            class="absolute top-0 right-0 mt-2 mr-1 cursor-pointer"
            icon="search"
            viewBox="0 0 20 24"
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
            <th class="text-left">CLINET ID</th>
            <th class="text-left">DEFAULT SCROPE</th>
            <th>CREATE DATE</th>
            <th>STATUS</th>
            <th></th>
          </thead>
          <tbody>
            
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
      filter_status: 'All',
      lists: [
        {
          name: 'beDID',
          client_id: 'Facebbook',
          default_scropt: 'read_register',
          created_at: '05 Aug 2021',
          status: '1'
        }
      ]
    }
  }
}
</script>