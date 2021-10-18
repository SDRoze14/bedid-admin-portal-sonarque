<template>
  <div class="h-full">
    <div class="flex">
      <div class="text-back" @click="$router.push('/users')">
        <base-icon
          viewBox="0 0 24 24"
          class="transform rotate-90"
          icon="dropdown"
        ></base-icon>
        Back to user list
      </div>
    </div>

    <div class="bg-white border border-cool-150 rounded-md">
      <div class="px-10 pt-6 flex justify-between">
        <div class="">
          <div class="text-2xl font-normal" v-if="isAddUser">New User</div>
          <div class="text-2xl font-normal" v-if="!isAddUser && !edit">
            User Detail
          </div>
          <div class="text-2xl font-normal" v-if="!isAddUser && edit">
            Edit User
          </div>
          <div class="text-gray-400 text-sm font-light">
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for previewing layouts and visual mockups.
          </div>
        </div>
        <div class="" v-if="!edit && !isAddUser">
          <base-button
            color="border-primary"
            class="px-4 text-sm font-light"
            @click="edit = true"
            >Edit</base-button
          >
        </div>
      </div>
      <div class="px-5">
        <div class="divider-bottom my-5"></div>
      </div>

      <!-- Personal Information -->
      <div class="py-3 px-10">
        <div class="text-xl font-normal py-2">Personal Information</div>
        <div class="flex flex-wrap py-2" v-if="isAddUser || edit">
          <base-radio
            v-model="personal_info.number_type"
            inputValue="1"
            label="Identification Number"
          ></base-radio>
          <base-radio
            class="px-4"
            v-model="personal_info.number_type"
            inputValue="2"
            label="Passport Number"
          ></base-radio>
        </div>
        <div class="" v-else-if="!isAddUser || !edit">
          <base-radio
            v-model="personal_info.number_type"
            v-if="personal_info.number_type == '1'"
            inputValue="1"
            label="Identification Number"
          ></base-radio>
          <base-radio
            class="px-4"
            v-model="personal_info.number_type"
            v-if="personal_info.number_type == '2'"
            inputValue="2"
            label="Passport Number"
          ></base-radio>
        </div>

        <div class="flex py-2">
          <base-input
            class="number"
            type="number"
            v-model="personal_info.number"
            :required="true"
            :label="
              personal_info.number_type == 1
                ? 'Identification Number'
                : 'Passport Number'
            "
            :placeholder="
              personal_info.number_type == 1
                ? 'Fill in Identification Number number 13 digit'
                : 'Fill in Passport Number'
            "
            :disabled="!isAddUser && !edit"
          ></base-input>
        </div>

        <div class="py-3">
          <!-- En -->
          <div class="flex flex-wrap py-2 items-center">
            <div class="w-2/12 flex items-center">
              <div class="w-full pr-2">
                <div class="text-sm text-gray-600">
                  Title - EN<span class="text-red-600">*</span>
                </div>
                <base-dropdown
                  dropdownClass="w-full"
                  toggleClass="w-full"
                  :disabled="!isAddUser && !edit"
                  :dropdownMaxWidthAuto="true"
                  :required="true"
                  :text="
                    personal_info.title_en
                      ? $model.titleEn(personal_info.title_en).label
                      : 'Select'
                  "
                >
                  <base-dropdown-item
                    v-for="(t, i) in $model.title_en"
                    :key="`title_en-${i}`"
                    @click="personal_info.title_en = t.value"
                    :class="{ 'bg-blue-50': personal_info.title_en == t.value }"
                  >
                    {{ t.label }}
                  </base-dropdown-item>
                </base-dropdown>
              </div>
            </div>
            <div class="w-10/12 flex items-center">
              <div class="w-1/3 px-2">
                <base-input
                  v-model="personal_info.first_en"
                  label="First Name - EN"
                  placeholder="e.g. Jonh"
                  :disabled="!isAddUser && !edit"
                  :required="true"
                ></base-input>
              </div>
              <div class="w-1/3 px-2">
                <div class="text-sm text-gray-600">
                  Middle Name - EN
                  <span class="text-gray-400 font-light">(Optioanl)</span>
                </div>
                <base-input
                  v-model="personal_info.middle_en"
                  placeholder="Optioanl"
                  :disabled="!isAddUser && !edit"
                ></base-input>
              </div>
              <div class="w-1/3 pl-2">
                <base-input
                  v-model="personal_info.last_en"
                  label="Last Name - EN"
                  placeholder="e.g. Donard"
                  :disabled="!isAddUser && !edit"
                  :required="true"
                ></base-input>
              </div>
            </div>
          </div>
          <!-- End En -->

          <!-- Th -->
          <div class="flex flex-wrap py-2 items-center">
            <div class="w-2/12 flex items-center">
              <div class="w-full pr-2">
                <div class="text-sm text-gray-600">Title - TH</div>
                <base-dropdown
                  dropdownClass="w-full"
                  toggleClass="w-full"
                  :disabled="!isAddUser && !edit"
                  :dropdownMaxWidthAuto="true"
                  :text="
                    personal_info.title_th
                      ? $model.titleTh(personal_info.title_th).label
                      : 'Select'
                  "
                >
                  <base-dropdown-item
                    v-for="(t, i) in $model.title_th"
                    :key="`title_th-${i}`"
                    @click="personal_info.title_th = t.value"
                    :class="{ 'bg-blue-50': personal_info.title_th == t.value }"
                  >
                    {{ t.label }}
                  </base-dropdown-item>
                </base-dropdown>
              </div>
            </div>
            <div class="w-10/12 flex items-center">
              <div class="w-1/3 px-2">
                <base-input
                  v-model="personal_info.first_th"
                  label="First Name - TH"
                  placeholder="e.g. Jonh"
                  :disabled="!isAddUser && !edit"
                ></base-input>
              </div>
              <div class="w-1/3 px-2">
                <div class="text-sm text-gray-600">
                  Middle Name - TH
                  <span class="text-gray-400 font-light">(Optioanl)</span>
                </div>
                <base-input
                  v-model="personal_info.middle_th"
                  placeholder="Optioanl"
                  :disabled="!isAddUser && !edit"
                ></base-input>
              </div>
              <div class="w-1/3 pl-2">
                <base-input
                  v-model="personal_info.last_th"
                  label="Last Name - TH"
                  placeholder="e.g. Donard"
                  :disabled="!isAddUser && !edit"
                ></base-input>
              </div>
            </div>
          </div>
          <!-- End TH -->
        </div>

        <!-- Birthdate -->
        <div class="py-3">
          <div class="text-sm text-gray-600">
            Brithdate<span class="text-red-600">*</span>
          </div>
          <input
            type="date"
            class="date"
            v-model="personal_info.birth"
            :max="max_birth"
            :disabled="!isAddUser && !edit"
          />
        </div>
        <!-- End Birthdate -->

        <!-- Gender -->
        <div class="py-3">
          <div class="text-sm text-gray-600">
            Gender<span class="text-red-600">*</span>
          </div>
          <div class="flex items-center">
            <div
              v-if="isAddUser || edit || personal_info.gender == 'Male'"
              class="gender relative cursor-pointer"
              :class="{
                'border border-primary text-primary bg-blue-50':
                  personal_info.gender == 'Male',
              }"
              @click="personal_info.gender = 'Male'"
            >
              <base-icon
                v-if="personal_info.gender == 'Male'"
                class="absolute left-0 ml-2"
                icon="check"
                size="20"
                viewBox="0 0 24 24"
              ></base-icon>
              Male
            </div>
            <div
              v-if="isAddUser || edit || personal_info.gender == 'Female'"
              class="gender mx-3 relative cursor-pointer"
              :class="{
                'border border-primary text-primary bg-blue-50':
                  personal_info.gender == 'Female',
              }"
              @click="personal_info.gender = 'Female'"
            >
              <base-icon
                v-if="personal_info.gender == 'Female'"
                class="absolute left-0 ml-1"
                icon="check"
                size="20"
                viewBox="0 0 24 24"
              ></base-icon>
              Female
            </div>
          </div>
        </div>
        <!-- End Gender -->

        <!-- Nationality -->
        <div class="py-3">
          <div class="w-3/12">
            <div class="text-sm text-gray-600">
              Nationality<span class="text-red-600">*</span>
            </div>
            <base-dropdown
              dropdownClass="w-full h-48 max-h-screen overflow-y-scroll"
              toggleClass="w-full"
              :disabled="!isAddUser && !edit"
              :dropdownMaxWidthAuto="true"
              :text="
                personal_info.nationality
                  ? $model.nationalitity(personal_info.nationality)
                  : 'Select'
              "
            >
              <base-dropdown-item
                v-for="(n, i) in $model.nationalities"
                :key="`nationality-${i}`"
                @click="personal_info.nationality = n"
                :class="{ 'bg-blue-50': personal_info.nationality == n }"
              >
                {{ n }}
              </base-dropdown-item>
            </base-dropdown>
          </div>
        </div>
        <!-- End Nationality -->

        <!-- Phone -->
        <div class="py-3">
          <div class="text-sm text-gray-600">
            Phone Number<span class="text-red-600">*</span>
          </div>
          <div class="w-5/12">
            <vue-tel-input
              v-model="personal_info.phone"
              styleClasses="text-sm font-light"
              :disabled="!isAddUser && !edit"
              :required="true"
            ></vue-tel-input>
          </div>
        </div>
        <!-- End Phone -->

        <!-- Email -->
        <div class="py-3">
          <div class="w-5/12">
            <base-input
              label="Email"
              placeholder="e.g. beman@besure.com"
              type="email"
              v-model="personal_info.email"
              :disabled="!isAddUser && !edit"
              :required="true"
            ></base-input>
          </div>
        </div>
        <!-- End Email -->
      </div>
      <!-- End Personal Information -->

      <!-- Address Information -->
      <div class="py-5">
        <div class="text-xl font-normal py-2 px-10">Address Information</div>
        <div class="flex w-full pb-2 pt-5 px-10">
          <div class="w-2/12 pr-2">
            <base-input
              label="Number"
              placeholder="e.g.99"
              v-model="address_info.number"
              class="w-full"
              :disabled="!isAddUser && !edit"
              :required="true"
            ></base-input>
          </div>

          <div class="w-1/12 px-2">
            <base-input
              label="Moo"
              placeholder="e.g.3"
              v-model="address_info.moo"
              class="w-full"
              :disabled="!isAddUser && !edit"
            ></base-input>
          </div>

          <div class="w-3/12 px-2">
            <base-input
              label="Alley"
              placeholder="e.g.สีลม"
              v-model="address_info.alley"
              class="w-full"
              :disabled="!isAddUser && !edit"
            ></base-input>
          </div>

          <div class="w-3/12 px-2">
            <base-input
              label="Soi"
              placeholder="e.g.คอนแวน"
              v-model="address_info.soi"
              class="w-full"
              :disabled="!isAddUser && !edit"
            ></base-input>
          </div>

          <div class="w-3/12 px-2">
            <base-input
              label="Road"
              placeholder="e.g.สีลม"
              v-model="address_info.road"
              class="w-full"
              :disabled="!isAddUser && !edit"
            ></base-input>
          </div>
        </div>

        <div class="flex w-full py-2 px-10">
          <!-- Province -->
          <div class="w-3/12 pr-2">
            <div class="text-sm text-gray-600">
              Province<span class="text-red-600">*</span>
            </div>
            <base-dropdown
              dropdownClass="w-full max-h-32 overflow-y-scroll"
              toggleClass="w-full"
              :disabled="!isAddUser && !edit"
              :dropdownMaxWidthAuto="true"
            >
              <div class="" slot="toggle">
                <base-input
                  v-model="address_info.province"
                  placeholder="Fill or select province"
                  :disabled="!isAddUser && !edit"
                ></base-input>
              </div>
              <base-dropdown-item
                v-for="(p, i) in $province.searchProvince(
                  address_info.province
                )"
                :key="`province-${i}`"
                @click="selectAddrProvince(p)"
                :class="{
                  'bg-blue-50': address_info.province == p.province_name,
                }"
              >
                {{ p.province_name }}
              </base-dropdown-item>
            </base-dropdown>
          </div>

          <!-- District -->
          <div class="w-3/12 px-2">
            <div class="text-sm text-gray-600">
              District<span class="text-red-600">*</span>
            </div>
            <base-dropdown
              dropdownClass="w-full max-h-32 overflow-y-scroll"
              toggleClass="w-full"
              :disabled="!isAddUser && !edit"
              :dropdownMaxWidthAuto="true"
            >
              <div class="" slot="toggle">
                <base-input
                  v-model="address_info.district"
                  placeholder="Fill or select district"
                  :disabled="!isAddUser && !edit"
                ></base-input>
              </div>
              <base-dropdown-item
                v-for="(d, i) in $district.searchDistrict(
                  address_info.district,
                  addr_province_id
                )"
                :key="`district-${i}`"
                @click="selectAddrDistrict(d)"
                :class="{
                  'bg-blue-50': address_info.district == d.district_name,
                }"
              >
                {{ d.district_name }}
              </base-dropdown-item>
            </base-dropdown>
          </div>

          <!-- Subdsitricr -->
          <div class="w-3/12 px-2">
            <div class="text-sm text-gray-600">
              Sub District<span class="text-red-600">*</span>
            </div>
            <base-dropdown
              dropdownClass="w-full max-h-32 overflow-y-scroll"
              toggleClass="w-full"
              :disabled="!isAddUser && !edit"
              :dropdownMaxWidthAuto="true"
            >
              <div class="" slot="toggle">
                <base-input
                  v-model="address_info.subdistrict"
                  placeholder="Fill or select sub district"
                  :disabled="!isAddUser && !edit"
                ></base-input>
              </div>
              <base-dropdown-item
                v-for="(s, i) in $subdistrict.searchSubdistrict(
                  address_info.subdistrict,
                  addr_province_id,
                  addr_district_id
                )"
                :key="`subdistrict-${i}`"
                @click="selectAddrSubdistrict(s)"
                :class="{
                  'bg-blue-50': address_info.subdistrict == s.subdistrict_name,
                }"
              >
                {{ s.subdistrict_name }}
              </base-dropdown-item>
            </base-dropdown>
          </div>

          <div class="w-2/12 px-2">
            <div class="text-sm text-gray-600">
              Postcode<span class="text-red-600">*</span>
            </div>
            <base-input
              v-model="address_info.zip"
              :disabled="!isAddUser && !edit"
            ></base-input>
          </div>
        </div>

        <div class="px-5 py-2">
          <div class="py-3 bg-gray-50 rounded flex px-5 items-center">
            <base-check
              v-model="address_info.residential"
              :disabled="!isAddUser && !edit"
            ></base-check>
            <div class="text-sm text-gray-600 font-light">
              Residential Address
            </div>
          </div>
        </div>

        <!-- Biiling Address -->
        <div class="px-5 py-2">
          <div class="py-3 bg-gray-100 rounded px-5">
            <div class="flex items-center">
              <base-check
                v-model="bill_address.check"
                :disabled="!isAddUser && !edit"
              ></base-check>
              <div class="text-sm text-gray-600 font-light">
                Billing Address
              </div>
            </div>

            <div v-if="bill_address.check">
              <div class="text-xl font-normal py-3">Billing Address</div>

              <div class="py-4 flex items-center">
                <div class="flex items-center" @click="isAddressInfo()">
                  <base-check
                    v-model="bill_address.is_address_info"
                    :disabled="!isAddUser && !edit"
                    label="Use the same address information as full billing address."
                  ></base-check>
                </div>
              </div>
              <div v-if="!bill_address.is_address_info">
                <div class="py-2 flex items-center w-full">
                  <div class="w-2/12 pr-2">
                    <base-input
                      label="Number"
                      placeholder="e.g.99"
                      v-model="bill_address.number"
                      class="w-full"
                      :disabled="!isAddUser && !edit"
                      required
                    ></base-input>
                  </div>

                  <div class="w-1/12 px-2">
                    <base-input
                      label="Moo"
                      placeholder="e.g.3"
                      v-model="bill_address.moo"
                      class="w-full"
                      :disabled="!isAddUser && !edit"
                    ></base-input>
                  </div>

                  <div class="w-3/12 px-2">
                    <base-input
                      label="Alley"
                      placeholder="e.g.สีลม"
                      v-model="bill_address.alley"
                      class="w-full"
                      :disabled="!isAddUser && !edit"
                    ></base-input>
                  </div>

                  <div class="w-3/12 px-2">
                    <base-input
                      label="Soi"
                      placeholder="e.g.คอนแวน"
                      v-model="bill_address.soi"
                      class="w-full"
                      :disabled="!isAddUser && !edit"
                    ></base-input>
                  </div>

                  <div class="w-3/12 px-2">
                    <base-input
                      label="Road"
                      placeholder="e.g.สีลม"
                      v-model="bill_address.road"
                      class="w-full"
                      :disabled="!isAddUser && !edit"
                    ></base-input>
                  </div>
                </div>

                <div class="flex w-full py-2">
                  <!-- Province -->
                  <div class="w-3/12 pr-2">
                    <div class="text-sm text-gray-600">
                      Province<span class="text-red-600">*</span>
                    </div>
                    <base-dropdown
                      dropdownClass="w-full max-h-32 overflow-y-scroll"
                      toggleClass="w-full"
                      :disabled="!isAddUser && !edit"
                      :dropdownMaxWidthAuto="true"
                    >
                      <div class="" slot="toggle">
                        <base-input
                          v-model="bill_address.province"
                          placeholder="Fill or select province"
                          :disabled="!isAddUser && !edit"
                        ></base-input>
                      </div>
                      <base-dropdown-item
                        v-for="(p, i) in $province.searchProvince(
                          bill_address.province
                        )"
                        :key="`province-${i}`"
                        @click="selectBillProvince(p)"
                        :class="{
                          'bg-blue-50':
                            bill_address.province == p.province_name,
                        }"
                      >
                        {{ p.province_name }}
                      </base-dropdown-item>
                    </base-dropdown>
                  </div>

                  <!-- District -->
                  <div class="w-3/12 px-2">
                    <div class="text-sm text-gray-600">
                      District<span class="text-red-600">*</span>
                    </div>
                    <base-dropdown
                      dropdownClass="w-full max-h-32 overflow-y-scroll"
                      toggleClass="w-full"
                      :disabled="!isAddUser && !edit"
                      :dropdownMaxWidthAuto="true"
                    >
                      <div class="" slot="toggle">
                        <base-input
                          v-model="bill_address.district"
                          placeholder="Fill or select district"
                          :disabled="!isAddUser && !edit"
                        ></base-input>
                      </div>
                      <base-dropdown-item
                        v-for="(d, i) in $district.searchDistrict(
                          bill_address.district,
                          addr_province_id
                        )"
                        :key="`district-${i}`"
                        @click="selectBillDistrict(d)"
                        :class="{
                          'bg-blue-50':
                            bill_address.district == d.district_name,
                        }"
                      >
                        {{ d.district_name }}
                      </base-dropdown-item>
                    </base-dropdown>
                  </div>

                  <!-- Subdsitricr -->
                  <div class="w-3/12 px-2">
                    <div class="text-sm text-gray-600">
                      Sub District<span class="text-red-600">*</span>
                    </div>
                    <base-dropdown
                      dropdownClass="w-full max-h-32 overflow-y-scroll"
                      toggleClass="w-full"
                      :disabled="!isAddUser && !edit"
                      :dropdownMaxWidthAuto="true"
                    >
                      <div class="" slot="toggle">
                        <base-input
                          v-model="bill_address.subdistrict"
                          placeholder="Fill or select sub district"
                          :disabled="!isAddUser && !edit"
                        ></base-input>
                      </div>
                      <base-dropdown-item
                        v-for="(s, i) in $subdistrict.searchSubdistrict(
                          bill_address.subdistrict,
                          addr_province_id,
                          addr_district_id
                        )"
                        :key="`subdistrict-${i}`"
                        @click="selectBillSubdistrict(s)"
                        :class="{
                          'bg-blue-50':
                            bill_address.subdistrict == s.subdistrict_name,
                        }"
                      >
                        {{ s.subdistrict_name }}
                      </base-dropdown-item>
                    </base-dropdown>
                  </div>

                  <div class="w-2/12 px-2">
                    <div class="text-sm text-gray-600">
                      Postcode<span class="text-red-600">*</span>
                    </div>
                    <base-input
                      v-model="bill_address.zip"
                      :disabled="!isAddUser && !edit"
                    ></base-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End Biiling Address -->
      </div>
      <!-- End Address Information -->

      <!-- Identity Assurance Level -->
      <div class="pb-5 px-10">
        <div class="text-xl font-normal py-3">Identity Assurance Level</div>

        <div class="flex items-center">
          <div
            class="identity mr-1"
            @click="identity = '1'"
            :class="{
              'bg-blue-50 text-primary': identity == '1',
            }"
            v-if="isAddUser || edit || identity == '1'"
          >
            <base-icon
              icon="check"
              viewBox="0 0 24 24"
              size="22"
              class="absolute left-1 top-2"
              v-if="identity == '1'"
            ></base-icon>
            <div class="">1</div>
          </div>

          <div
            class="identity mr-1"
            @click="identity = '2.1'"
            :class="{
              'bg-blue-50 text-primary': identity == '2.1',
            }"
            v-if="isAddUser || edit || identity == '2.1'"
          >
            <base-icon
              icon="check"
              viewBox="0 0 24 24"
              size="22"
              class="absolute left-1 top-2"
              v-if="identity == '2.1'"
            ></base-icon>
            <div class="">2.1</div>
          </div>
          <div
            class="identity mr-1"
            @click="identity = '2.2'"
            :class="{
              'bg-blue-50 text-primary': identity == '2.2',
            }"
            v-if="isAddUser || edit || identity == '2.2'"
          >
            <base-icon
              icon="check"
              viewBox="0 0 24 24"
              size="22"
              class="absolute left-1 top-2"
              v-if="identity == '2.2'"
            ></base-icon>
            <div class="">2.2</div>
          </div>
          <div
            class="identity mr-1"
            @click="identity = '2.3'"
            :class="{
              'bg-blue-50 text-primary': identity == '2.3',
            }"
            v-if="isAddUser || edit || identity == '2.3'"
          >
            <base-icon
              icon="check"
              viewBox="0 0 24 24"
              size="22"
              class="absolute left-1 top-2"
              v-if="identity == '2.3'"
            ></base-icon>
            <div class="">2.3</div>
          </div>
          <div
            class="identity mr-1"
            @click="identity = '3'"
            :class="{
              'bg-blue-50 text-primary': identity == '3',
            }"
            v-if="isAddUser || edit || identity == '3'"
          >
            <base-icon
              icon="check"
              viewBox="0 0 24 24"
              size="22"
              class="absolute left-1 top-2"
              v-if="identity == '3'"
            ></base-icon>
            <div class="">3</div>
          </div>
        </div>
      </div>
      <!-- End Identity Assurance Level -->

      <div class="px-5">
        <div class="divider-bottom my-5"></div>
      </div>

      <div
        class="flex justify-end items-center px-5 py-5"
        v-if="edit || isAddUser"
      >
        <base-button
          color="gray"
          class="mx-3 text-sm font-light px-3"
          @click="$router.push('/users')"
          >Cancel</base-button
        >
        <base-button
          color="primary"
          @click="submit"
          class="px-3 text-sm font-light"
          >Add User</base-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import zip from "~/plugins/zip";
const user_model = require("@/model/user_info");

export default {
  asyncData({ params }) {
    return {
      id: params.id,
    };
  },
  components: {},
  data() {
    return {
      uuid: null,
      edit: false,
      personal_info: {
        number_type: "1",
        number: "",

        birth: "2021-08-10",
        gender: "male",
        nationality: "Thai",
        phone: "",

        title_en: "",
        first_en: "",
        middle_en: "",
        last_en: "",

        title_th: "",
        first_th: "",
        middle_th: "",
        last_th: "",

        email: "",
      },
      address_info: {
        number: "",
        road: "",
        moo: "",
        alley: "",
        soi: "",

        province: "เชียงราย",
        district: "",
        subdistrict: "",
        zip: "",

        residential: false,
      },
      bill_address: {
        check: true,
        is_address_info: false,

        number: "",
        road: "",
        moo: "",
        alley: "",
        soi: "",

        province: "",
        district: "",
        subdistrict: "",
        zip: "",
      },
      identity: "1",
      max_birth: "",
      translations: {
        countrySelectorLabel: "",
        countrySelectorError: "",
        phoneNumberLabel: "",
      },

      addr_province_id: 0,
      addr_district_id: 0,
      addr_subdistrict_id: 0,

      bill_province_id: 0,
      bill_district_id: 0,
      bill_subdistrict_id: 0,
      zip_id: 0,
    };
  },
  computed: {
    isAddUser() {
      if (this.id == "new-user") return true;
      else return false;
    },
    user() {
      return this.$store.state.user.user;
    },
    token() {
      return this.$store.state.user.token;
    },
  },
  mounted() {
    if (this.isAddUser) {
      // this.personal_info.birth = new Date()
      let date = new Date();
      this.max_birth = this.$model.formatInputDate(date);
    } else {
      this.$api
        .getListUser(this.id)
        .then((res) => {
          // console.log(res.data);
          this.uuid = res.data.id; //uuid

          this.personal_info.number_type =
            res.data.person_id.citizen_id.value == "" ? "2" : "1";

          this.personal_info.number =
            res.data.person_id.citizen_id.value == ""
              ? res.data.person_id.passport_no.value
              : res.data.person_id.citizen_id.value;
          this.personal_info.birth = res.data.dob.value;
          this.personal_info.gender = res.data.sex.desc;
          this.personal_info.nationality = res.data.nationality.desc;
          this.personal_info.phone = res.data.phone.nbr.value;

          this.personal_info.email = res.data.internet_address.email.value;

          this.personal_info.title_en = res.data.name_en.prefix.value;
          this.personal_info.first_en = res.data.name_en.first_name.value;
          this.personal_info.middle_en = res.data.name_en.middle_name.value;
          this.personal_info.last_en = res.data.name_en.last_name.value;

          this.personal_info.title_th = res.data.name_th.prefix.value;
          this.personal_info.first_th = res.data.name_th.first_name.value;
          this.personal_info.middle_th = res.data.name_th.middle_name.value;
          this.personal_info.last_th = res.data.name_th.last_name.value;

          this.address_info.number = res.data.register_address.no.value;
          this.address_info.road = res.data.register_address.road.value;
          this.address_info.moo = res.data.register_address.moo.value;
          this.address_info.alley = res.data.register_address.alley.value;
          this.address_info.soi = res.data.register_address.soi.value;

          this.address_info.district = res.data.register_address.amphur.value;
          this.address_info.subdistrict =
            res.data.register_address.tumbol.value;
          this.address_info.zip = res.data.register_address.zipcode.value;
          this.address_info.province = res.data.register_address.province.value;
          this.setAddrInfo();

          this.bill_address.number = res.data.billing_address.no.value;
          this.bill_address.road = res.data.billing_address.road.value;
          this.bill_address.moo = res.data.billing_address.moo.value;
          this.bill_address.alley = res.data.billing_address.alley.value;
          this.bill_address.soi = res.data.billing_address.soi.value;

          this.bill_address.province = res.data.billing_address.province.value;
          this.bill_address.district = res.data.billing_address.amphur.value;
          this.bill_address.subdistrict = res.data.billing_address.tumbol.value;
          this.bill_address.zip = res.data.billing_address.zipcode.value;
          this.setAddrBill();

          this.identity = res.data.ial.value;
        })
        .catch((err) => {
          console.log(err.response);
          this.$toast.open({
            message: err.response.data.message,
            type: "error",
            duration: 6000,
          });
        });
    }
  },
  methods: {
    async submit() {
      if (this.personal_info.number == "") {
        this.$toast.open({
          message: "Please fill out the Citizen ID or passport ID",
          type: "error",
          duration: 6000,
        });
        return;
      }

      if (this.personal_info.title_en == "") {
        this.$toast.open({
          message: "Please select title name.",
          type: "error",
          duration: 6000,
        });
        return;
      }

      if (this.personal_info.first_en == "") {
        this.$toast.open({
          message: "Please fill out firstname.",
          type: "error",
          duration: 6000,
        });
        return;
      }

      if (this.personal_info.last_en == "") {
        this.$toast.open({
          message: "Please fill out lastname.",
          type: "error",
          duration: 6000,
        });
        return;
      }

      if (this.personal_info.gender == "") {
        this.$toast.open({
          message: "Please select gender.",
          type: "error",
          duration: 6000,
        });
        return;
      }

      if (this.personal_info.phone == "") {
        this.$toast.open({
          message: "Please fill out phone number.",
          type: "error",
          duration: 6000,
        });
        return;
      }

      if (this.personal_info.email == "") {
        this.$toast.open({
          message: "Please fill out email.",
          type: "error",
          duration: 6000,
        });
        return;
      }

      if (
        this.address_info.number == "" ||
        this.address_info.province == "" ||
        this.address_info.district == "" ||
        this.address_info.subdistrict == "" ||
        this.address_info.zip == ""
      ) {
        this.$toast.open({
          message: "Please fill out the address information.",
          type: "error",
          duration: 6000,
        });
        return;
      }

      if (this.bill_address.check && !this.bill_address.is_address_info) {
        if (
          this.bill_address.number == "" ||
          this.bill_address.province == "" ||
          this.bill_address.district == "" ||
          this.bill_address.subdistrict == "" ||
          this.bill_address.zip == ""
        ) {
          this.$toast.open({
            message: "Please fill out the billing address.",
            type: "error",
            duration: 6000,
          });
          return;
        }
      }

      user_model.set_user_id(this.user.sub);

      user_model.set_email(this.personal_info.email);

      user_model.set_person_id(
        this.personal_info.number_type,
        this.personal_info.number
      );

      user_model.set_name_en(
        this.personal_info.title_en,
        this.personal_info.first_en,
        this.personal_info.middle_en,
        this.personal_info.last_en
      );

      user_model.set_name_th(
        this.personal_info.title_th,
        this.personal_info.first_th,
        this.personal_info.middle_th,
        this.personal_info.last_th
      );

      user_model.set_gender(this.personal_info.gender);

      user_model.set_birth_day(this.personal_info.birth);

      user_model.set_nationality("", this.personal_info.nationality);

      user_model.set_register_address(
        "TH",
        this.address_info.number,
        this.address_info.moo,
        this.address_info.alley,
        this.address_info.soi,
        this.address_info.road,
        this.address_info.province,
        this.address_info.district,
        this.address_info.subdistrict,
        this.address_info.zip
      );

      user_model.set_residential_address(this.address_info.residential);

      if (!this.address_info.residential) {
        //no data
      }

      if (this.bill_address.check) {
        user_model.set_billing_address_is_register(
          this.bill_address.is_address_info
        );

        if (!this.bill_address.is_address_info) {
          user_model.set_billing_address(
            "TH",
            this.address_info.number,
            this.address_info.moo,
            this.address_info.alley,
            this.address_info.soi,
            this.address_info.road,
            this.address_info.province,
            this.address_info.district,
            this.address_info.subdistrict,
            this.address_info.zip
          );
        }
      }

      user_model.set_phone(this.personal_info.phone);

      user_model.set_IAL(this.identity);

      console.log(user_model.get_model());

      if (this.uuid == null) {
        this.$axios
          .post("/bedid-api/v1/users", user_model.get_model(), {
            headers: {
              Authorization: `Bearer ${this.token.access_token}`,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            this.$toast.open({
              message: "Add User Success",
              duration: 6000,
            });
            this.$router.push("/users");
          })
          .catch((err) => {
            console.log(err.response.data);
            this.$toast.open({
              message: err.response.data.message,
              type: "error",
              duration: 6000,
            });
          });
      } else {
        this.$axios
          .patch("/bedid-api/v1/users/" + this.uuid, user_model.get_model(), {
            headers: {
              Authorization: `Bearer ${this.token.access_token}`,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            this.$toast.open({
              message: "Edit User Success",
              duration: 6000,
            });
            this.$router.push("/users");
          })
          .catch((err) => {
            console.log(err.response.data.message);
            this.$toast.open({
              message: err.response.data.message,
              type: "error",
              duration: 6000,
            });
          });
      }
    },
    selectAddrProvince(p) {
      this.address_info.province = p.province_name;
      this.addr_province_id = p.province_id;
    },
    selectAddrDistrict(d) {
      this.address_info.district = d.district_name;
      this.addr_district_id = d.district_id;
    },
    selectAddrSubdistrict(s) {
      this.address_info.subdistrict = s.subdistrict_name;
      this.addr_subdistrict_id = s.subdistrict_id;
      this.selectAddrZip(
        this.addr_province_id,
        this.addr_district_id,
        this.addr_subdistrict_id
      );
    },
    selectAddrZip(p, d, s) {
      let zip = this.$zip.searchZip(p, d, s);
      this.address_info.zip = zip.zipcode;
    },
    selectBillProvince(p) {
      this.bill_address.province = p.province_name;
      this.bill_province_id = p.province_id;
    },
    selectBillDistrict(d) {
      this.bill_address.district = d.district_name;
      this.bill_district_id = d.district_id;
    },
    selectBillSubdistrict(s) {
      this.bill_address.subdistrict = s.subdistrict_name;
      this.bill_subdistrict_id = s.subdistrict_id;
      this.selectBillZip(
        this.bill_province_id,
        this.bill_district_id,
        this.bill_subdistrict_id
      );
    },
    selectBillZip(p, d, s) {
      let zip = this.$zip.searchZip(p, d, s);
      this.bill_address.zip = zip.zipcode;
    },
    setAddrInfo() {
      let p = this.$province.setProvince(this.address_info.province);
      this.addr_province_id = p.province_id;

      let d = this.$district.setDistrict(
        this.address_info.district,
        this.addr_province_id
      );
      this.addr_district_id = d.district_id;

      let s = this.$subdistrict.setSubdistrict(
        this.address_info.subdistrict,
        this.addr_province_id,
        this.addr_district_id
      );
      this.addr_subdistrict_id = s.subdistrict_id;

      this.selectAddrZip(
        this.addr_province_id,
        this.addr_district_id,
        this.addr_subdistrict_id
      );
    },
    setAddrBill() {
      let p = this.$province.setProvince(this.bill_address.province);
      this.bill_province_id = p.province_id;

      let d = this.$district.setDistrict(
        this.bill_address.district,
        this.bill_province_id
      );
      this.bill_district_id = d.district_id;

      let s = this.$subdistrict.setSubdistrict(
        this.bill_address.subdistrict,
        this.bill_province_id,
        this.bill_district_id
      );
      this.bill_subdistrict_id = s.subdistrict_id;

      this.selectBillZip(
        this.bill_province_id,
        this.bill_district_id,
        this.bill_subdistrict_id
      );
    },
    isAddressInfo() {
      // if (this.bill_address.is_address_info) {
      //   this.bill_address.province = this.address_info.province
      // }
    },
  },
};
</script>

<style>
.number {
  /* width: 372px; */
  @apply w-5/12;
}
.date {
  /* width: 372px; */
  @apply w-5/12 font-light text-sm border border-gray-200 rounded focus:border-primary focus:outline-none focus:shadow-outline-primary form-input disabled:bg-gray-50;
}
.gender {
  @apply py-2 px-3 w-24 border border-gray-200 rounded text-sm text-gray-500 text-center;
}
.text-back {
  @apply flex py-3 items-center text-sm font-extralight select-none cursor-pointer;
}
.vti__input {
  @apply text-sm font-light rounded;
}
.vue-tel-input {
  height: 40px;
  @apply border border-gray-200 rounded focus:border-primary focus:outline-none focus:shadow-outline-primary disabled:bg-gray-50;
}
</style>
