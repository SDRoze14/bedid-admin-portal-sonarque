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
        Back to IdP External lists
      </div>
    </div>
    <!-- END BACK -->

    <!-- CONTENT -->
    <div class="bg-white border border-cool-150 rounded-md">
      <!-- TITLE -->
      <div class="px-10 pt-6 flex justify-between">
        <div>
          <div class="text-2xl font-normal">New IdP External</div>
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
        <!-- IDENTITY PROVIDER INFO -->
        <div class="text-xl font-normal py-2">Identity Provider Info</div>

        <div class="py-3 flex flex-wrap">
          <div class="w-5/12 pr-3">
            <base-input label="Name" placeholder="e.g. besure" />
          </div>
          <div class="w-5/12 pl-3">
            <base-input
              label="Description"
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

        <div class="py-3">
          <div class="w-10/12">
            <base-input
              label="Default Scopes"
              placeholder="e.g. read_user"
            ></base-input>
          </div>
        </div>

        <div class="py-3 flex flex-wrap">
          <div class="w-5/12 pr-3">
            <base-input label="IdP Name" placeholder="e.g. google.com" />
          </div>
          <div class="w-5/12 pl-3">
            <base-input label="IdP Short Name" placeholder="e.g. google" />
          </div>
        </div>
        <!-- END IDENTITY PROVIDER INFO -->

        <!-- BUTTON -->
        <div class="text-xl font-normal pt-8 pb-2">Button</div>

        <div class="flex flex-wrap">
          <div class="w-5/12 pr-3">
            <div class="py-3">
              <base-input
                label="Button Name"
                placeholder="e.g. Login with besure"
                v-model="btn_text"
              ></base-input>
            </div>

            <div class="py-3">
              <div class="text-sm text-gray-600">Button Color</div>
              <base-color-select
                v-model="btn_color"
                :color="btn_color"
                :label="btn_color.hex"
              ></base-color-select>
            </div>

            <div class="py-3">
              <div class="text-sm text-gray-600">
                Logo
                <span class="text-gray-400 font-light"
                  >(file PNG on transparent background for best result)</span
                >
              </div>
              <div>
                <input
                  type="file"
                  ref="logoFile"
                  style="display: none"
                  @change="browsAttachFile($event.target.files)"
                />
                <div class="flex w-full my-1 items-center">
                  <div
                    class="
                      py-1
                      w-9/12
                      px-2
                      border border-gray-300
                      rounded
                      border-dashed
                      cursor-pointer
                    "
                    v-cloak
                    @drop.prevent="addFile"
                    @dragover.prevent="overFile"
                    @dragleave.prevent="leaveFile"
                    @click="$refs.logoFile.click()"
                  >
                    <div v-if="!file" class="flex items-center">
                      <base-icon icon="upload" viewBox="0 0 24 24"></base-icon>
                      <div v-if="!isOverFile">
                        <div class="text-sm font-thin text-gray-400">
                          Drag a file here or
                          <span class="text-primary">Browse</span>
                          to upload
                        </div>
                      </div>
                      <div v-else-if="isOverFile">
                        <div class="text-sm font-thin text-gray-400">
                          Release the file ot add file
                        </div>
                      </div>
                    </div>
                    <div v-else class="test-sm text-primary font-thin truncate">
                      {{ file.name }}
                    </div>
                  </div>
                  <div
                    class="cursor-pointer"
                    v-if="file != undefined"
                    @click="file = undefined"
                  >
                    <base-icon icon="x" viewBox="0 0 24 24"></base-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-5/12 pl-3 pt-4 pb-3">
            <!-- PREVIEW -->
            <div class="w-full h-full border border-cool-150 py-14 px-10">
              <div class="h-full flex flex-col justify-between">
                <div class="text-lg">Preview</div>
                <div class="flex">
                  <div class="flex py-3 px-8 bg-primary rounded-md">
                    <img
                      style="height: 31px"
                      v-if="logoBase64"
                      v-bind:src="`${logoBase64}`"
                      alt="logo"
                    />
                    <base-icon
                      v-else
                      icon="ico-logo-preview"
                      viewBox="0 0 27 31"
                    ></base-icon>
                    <div class="pl-3 text-white">{{btn_text ? btn_text : 'Login with besure'}}</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- END PREVIEW -->
          </div>
        </div>
        <!-- END BUTTON -->

        <!-- ENDPOINT -->
        <div class="text-xl font-normal pt-8 pb-2">Endpoint</div>

        <div class="w-5/12 pr-3">
          <base-input
            class="py-3"
            label="Authorization Endpoint"
            placeholder="e.g. www.besure.com/login"
          />
          <base-input
            class="py-3"
            label="Token Endpoint"
            placeholder="e.g. www.besure.com/login"
          />
          <base-input
            class="py-3"
            label="Token Key Endpoint"
            placeholder="e.g. www.besure.com/login"
          />
          <base-input
            class="py-3"
            label="User info Endpoint"
            placeholder="e.g. www.besure.com/login"
          />
          <base-input
            class="py-3"
            label="Revocation Endpoint"
            placeholder="e.g. www.besure.com/login"
          />
        </div>
        <!-- END ENDPOINT -->

        <!-- IDENTITY ASSURANE LEVEL -->
        <div class="text-xl font-normal pt-8 pb-2">
          Identity Assurance Level
        </div>
        <div class="py-2">
          <div class="flex items-center">
            <div
              class="identity mr-1"
              @click="identity = 1"
              :class="{
                'bg-blue-50 text-primary': identity == 1,
              }"
            >
              <base-icon
                icon="check"
                viewBox="0 0 24 24"
                size="22"
                class="absolute left-1 top-1.5"
                v-if="identity == 1"
              ></base-icon>
              <div class="">1</div>
            </div>

            <div
              class="identity mr-1"
              @click="identity = 2.1"
              :class="{
                'bg-blue-50 text-primary': identity == 2.1,
              }"
            >
              <base-icon
                icon="check"
                viewBox="0 0 24 24"
                size="22"
                class="absolute left-1 top-1.5"
                v-if="identity == 2.1"
              ></base-icon>
              <div class="">2.1</div>
            </div>
            <div
              class="identity mr-1"
              @click="identity = 2.2"
              :class="{
                'bg-blue-50 text-primary': identity == 2.2,
              }"
            >
              <base-icon
                icon="check"
                viewBox="0 0 24 24"
                size="22"
                class="absolute left-1 top-1.5"
                v-if="identity == 2.2"
              ></base-icon>
              <div class="">2.2</div>
            </div>
            <div
              class="identity mr-1"
              @click="identity = 2.3"
              :class="{
                'bg-blue-50 text-primary': identity == 2.3,
              }"
            >
              <base-icon
                icon="check"
                viewBox="0 0 24 24"
                size="22"
                class="absolute left-1 top-1.5"
                v-if="identity == 2.3"
              ></base-icon>
              <div class="">2.3</div>
            </div>
            <div
              class="identity mr-1"
              @click="identity = '3'"
              :class="{
                'bg-blue-50 text-primary': identity == 3,
              }"
            >
              <base-icon
                icon="check"
                viewBox="0 0 24 24"
                size="22"
                class="absolute left-1 top-1.5"
                v-if="identity == 3"
              ></base-icon>
              <div class="">3</div>
            </div>
          </div>
        </div>
        <!-- END IDENTITY ASSURANE LEVEL -->

        <!-- AUTHENTICATOR ASSURANCE LEVEL -->
        <div class="text-xl font-normal pt-8 pb-2">
          Authenticator Assurance Level
        </div>
        <div class="py-2">
          <div class="flex items-center">
            <div
              class="identity mr-1"
              @click="authenticator_level = 1"
              :class="{
                'bg-blue-50 text-primary': authenticator_level == 1,
              }"
            >
              <base-icon
                icon="check"
                viewBox="0 0 24 24"
                size="22"
                class="absolute left-1 top-1.5"
                v-if="authenticator_level == 1"
              ></base-icon>
              <div class="">1</div>
            </div>

            <div
              class="identity mr-1"
              @click="authenticator_level = 2.1"
              :class="{
                'bg-blue-50 text-primary': authenticator_level == 2.1,
              }"
            >
              <base-icon
                icon="check"
                viewBox="0 0 24 24"
                size="22"
                class="absolute left-1 top-1.5"
                v-if="authenticator_level == 2.1"
              ></base-icon>
              <div class="">2.1</div>
            </div>
            <div
              class="identity mr-1"
              @click="authenticator_level = 2.2"
              :class="{
                'bg-blue-50 text-primary': authenticator_level == 2.2,
              }"
            >
              <base-icon
                icon="check"
                viewBox="0 0 24 24"
                size="22"
                class="absolute left-1 top-1.5"
                v-if="authenticator_level == 2.2"
              ></base-icon>
              <div class="">2.2</div>
            </div>
            <div
              class="identity mr-1"
              @click="authenticator_level = 2.3"
              :class="{
                'bg-blue-50 text-primary': authenticator_level == 2.3,
              }"
            >
              <base-icon
                icon="check"
                viewBox="0 0 24 24"
                size="22"
                class="absolute left-1 top-1.5"
                v-if="authenticator_level == 2.3"
              ></base-icon>
              <div class="">2.3</div>
            </div>
            <div
              class="identity mr-1"
              @click="authenticator_level = '3'"
              :class="{
                'bg-blue-50 text-primary': authenticator_level == 3,
              }"
            >
              <base-icon
                icon="check"
                viewBox="0 0 24 24"
                size="22"
                class="absolute left-1 top-1.5"
                v-if="authenticator_level == 3"
              ></base-icon>
              <div class="">3</div>
            </div>
          </div>
        </div>
        <!-- END AUTHENTICATOR ASSURANCE LEVEL -->

        <div class="pb-3 pt-10">
          <div class="flex items-center justify-between w-5/12 pr-3">
            <div class="text-sm">Enabled</div>
            <base-toggle v-model="enable"></base-toggle>
          </div>
          <div class="pr-3 w-5/12 mt-3">
            <div class="text-sm font-light text-gray-400">
              Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries.
            </div>
          </div>
        </div>

        <div class="py-3 flex">
          <base-input label="Order" v-model="order"></base-input>
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
      btn_color: {
        hex8: "#1269CB",
        hex: "#1269CB",
      },
      btn_text: '',
      file: undefined,
      logoBase64: "",
      isOverFile: false,
      identity: 1,
      authenticator_level: 1,
      enable: true,
      order: 1
    };
  },
  mounted() {},
  methods: {
    browsAttachFile(files) {
      let self = this;

      let re = /(\.png)$/i;
      if (!re.test(files[0].name)) {
        self.$toast.open({
          message: "The file must be of type png.",
          type: "error",
          duration: 6000,
        });
        return;
      } else if (files[0].size > 20480) {
        self.$toast.open({
          message: "The file size must not exceed 20 KB.",
          type: "error",
          duration: 6000,
        });
        return;
      }
      self.file = files[0];

      var reader = new FileReader();
      reader.onload = function (e) {
        self.logoBase64 = e.target.result;
      };

      reader.readAsDataURL(self.file);

      self.$refs.logoFile.type = "text";
      self.$refs.logoFile.type = "file";
    },
    addFile() {
      let self = this;
      let droppedFiles = e.dataTransfer.files;
      if (!droppedFiles) return;

      let file = droppedFiles[0];
      let re = /(\.png)$/i;
      if (!re.test(file.name)) {
        self.$toast.open({
          message: "The file must be of type png.",
          type: "error",
          duration: 6000,
        });
        self.isOverFile = false;
        return;
      } else if (files[0].size > 20480) {
        self.$toast.open({
          message: "The file size must not exceed 20 KB.",
          type: "error",
          duration: 6000,
        });
        return;
      }

      self.file = droppedFiles[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        self.logoBase64 = e.target.result;
      };

      reader.readAsDataURL(self.logo);
    },
    overFile(e) {
      this.isOverFile = false;
    },
    leaveFile(e) {
      this.isOverFile = true;
    },
  },
};
</script>
