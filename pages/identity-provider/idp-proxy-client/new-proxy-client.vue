<template>
  <div class="h-full">
    <!-- BACK -->
    <div class="flex">
      <div
        class="text-back"
        @click="$router.push('/identity-provider/idp-proxy-client')"
      >
        <base-icon
          viewBox="0 0 24 24"
          class="transform rotate-90"
          icon="dropdown"
        ></base-icon>
        Back to IdP Proxy Client lists
      </div>
    </div>
    <!-- END BACK -->

    <!-- CONTENT -->
    <div class="bg-white border border-cool-150 rounded-md">
      <!-- TITLE -->
      <div class="px-10 pt-6 flex justify-between">
        <div>
          <div class="text-2xl font-normal">New IdP Proxy Client</div>
          <div class="text-gray-400 text-sm font-light">
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for previewing layouts and visual mockups.
          </div>
        </div>
      </div>
      <!-- END TITLE -->

      <!-- DIVIDER -->
      <div class="px-5">
        <div class="divider-bottom my-5"></div>
      </div>
      <!-- END DIVIDER -->

      <!-- FORM -->
      <div class="py-5 px-10">
        <div class="text-xl font-normal py-2">Identity Provider</div>

        <div class="py-3 flex flex-wrap">
          <div class="w-5/12 pr-3">
            <base-input label="Name" placeholder="e.g. besure" />
          </div>
          <div class="w-5/12 pl-3">
            <base-input
              label="Display Name"
              placeholder="e.g. open id connect"
            />
          </div>
        </div>

        <div class="py-3 flex flex-wrap">
          <div class="w-5/12 pr-3">
            <base-input label="Client ID" placeholder="e.g. facebook" />
          </div>
          <div class="w-5/12 pl-3 relative">
            <base-input
              label="Client Secret"
              v-model="client_secret"
              disabled
            ></base-input>
            <div class="text-xs absolute btn-reset right-0">
              <button
                class="
                  font-light
                  bg-white
                  px-4
                  py-1
                  border border-gray-100
                  rounded
                "
              >
                Resest
              </button>
            </div>
          </div>
        </div>

        <div class="py-3 w-10/12">
          <base-input label="Default Scopes" placeholder="e.g. read_user" />
        </div>

        <div class="py-3">
          <div class="w-5/12 pr-3">
            <base-input label="Callback URL" placeholder="e.g. www.besure.com/login" />
          </div>
        </div>

        <div class="py-3">
          <div class="flex items-center justify-between w-5/12 pr-3">
            <div class="text-sm">Enabled</div>
            <base-toggle></base-toggle>
          </div>
          <div class="pr-3 w-5/12 mt-3">
            <div class="text-sm font-light text-gray-400">
              Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries.
            </div>
          </div>
        </div>
      </div>
      <!-- END FORM -->

      <!-- DIVIDER -->
      <div class="px-5">
        <div class="divider-bottom my-2"></div>
      </div>
      <!-- END DIVIDER -->

      <!-- BTN -->
      <div class="flex px-5 justify-end items-center mb-6 mt-5">
        <base-button color="gray" class="py-1 px-7 mx-3 font-light">Cancel</base-button>
        <base-button color="primary" class="py-1 px-8 font-light">Add</base-button>
      </div>
      <!-- END BTN -->

    </div>
    <!-- END CONTENT -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      client_secret: "n7QwZypgC5ruTKCFsXCGB7tJ32tVXkt",
    };
  },
};
</script>
