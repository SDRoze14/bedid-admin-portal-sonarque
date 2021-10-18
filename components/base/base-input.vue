<template>
  <div>
    <label class="block text-sm">
      <span class="text-gray-600">{{ label }}</span><span v-if="required" class="text-red-500">*</span>
      <textarea
        v-if="type == 'textarea'"
        class="block w-full text-sm form-textarea focus:border-primary focus:outline-none focus:shadow-outline-primary disabled:bg-gray-200"
        :class="innerClass"
        v-bind="$attrs"
        :placeholder="placeholder"
        v-on="inputListeners"
        :name="name"
        :disabled="disabled"
        :rows="rows"
      ></textarea>
      <input
        v-else
        class="block w-full font-light text-sm border border-gray-200 rounded focus:border-primary focus:outline-none focus:shadow-outline-primary form-input disabled:bg-gray-200"
        :class="innerClass"
        v-bind="$attrs"
        :type="type"
        :placeholder="placeholder"
        v-on="inputListeners"
        :name="name"
        :disabled="disabled"
        @keypress="isNumber($event)"
        :maxlength="type == 'phone' ? 10 : null"
      />
    </label>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  model: {
    event: 'update',
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    innerClass: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
      validator(value) {
        return [
          'email',
          'number',
          'password',
          'text',
          'textarea',
          'search',
          'phone',
        ].includes(value)
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    iconPosition: {
      type: String,
      default: 'left',
    },
    rows: {
      type: String,
      default: '5',
    },
    required: {
      type: Boolean,
      defualt: false
    }
  },
  data() {
    return {}
  },
  computed: {
    inputListeners() {
      const self = this
      return Object.assign({}, this.$listeners, {
        input: function (event) {
          self.$emit('update', event.target.value)
        },
        change: function (event) {
          self.$emit('change', event.target.value)
        },
      })
    },
  },
  mounted() {},
  methods: {
    isNumber(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if (((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) && this.type == 'phone') {
        evt.preventDefault();;
      } else {
        return true;
      }
    }
  },
}
</script>
