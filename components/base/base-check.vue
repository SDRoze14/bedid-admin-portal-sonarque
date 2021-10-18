<template>
  <div class="flex" @click="click">
    <input
      type="checkbox"
      :name="name"
      class="hidden"
      :value="inputValue ? inputValue : true"
      :checked="isChecked"
      :disabled="disabled"
    />
    <label class="flex items-center cursor-pointer text-sm font-light text-gray-600">
      <span
        class="
          bg-white
          w-5
          h-5
          mr-2
          rounded
          border border-grey-600
          flex
          justify-center
        "
        :class="{'bg-gray-200': disabled}"
      >
        <base-icon
          v-if="isChecked"
          width="20"
          height="20"
          color="#0e64c6"
          viewBox="0 0 24 24"
          icon="check"
        >
        </base-icon>
      </span>
      {{ label }}</label
    >
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  model: {
    event: "update",
  },
  props: {
    value: {
      type: [Array, String, Boolean],
      default: [],
    },
    inputValue: {
      type: String,
      default: "",
    },
    multi: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    isChecked() {
      if (this.multi) {
        return this.value.includes(this.inputValue);
      } else {
        return this.value === this.inputValue || this.value == true
          ? true
          : false;
      }
    },
  },
  mounted() {},
  methods: {
    click() {
      const self = this;
      if (!this.disabled) {
        if (self.multi) {
          var value = this.value.slice();
          if (self.value.includes(self.inputValue)) {
            value = value.filter((e) => e != self.inputValue);
          } else {
            value.push(self.inputValue);
          }
          self.$emit("update", value);
        } else {
          self.$emit(
            "update",
            typeof self.value == "string" ? self.inputValue : !self.value
          );
        }
      } else {

      }
    },
  },
};
</script>

<style>
input[type="checkbox"] + label span {
  transition: background 0.2s, transform 0.2s;
}
input[type="checkbox"] + label span:hover,
input[type="checkbox"] + label:hover span {
  transform: scale(1.1);
}
input[type="checkbox"]:checked + label span {
  /* background-color: #0e64c6; */
  /* box-shadow: 0px 0px 0px 4px white inset; */
  /* border-color: #0e64c6; */
}
</style>
