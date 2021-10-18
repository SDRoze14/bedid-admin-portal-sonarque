<template>
  <div>
    <toggle-button
      :value="value"
      color="#0e64c6"
      :sync="true"
      :labels="false"
      :height="28"
      :width="54"
      v-on="inputListeners"
      :disabled="disabled"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  model: {
    event: 'update',
  },
  props: {
    value: {
      type: Boolean,
      detault: false,
    },
    disabled: {
      type: Boolean,
      default: false
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
          self.$emit('update', event)
        },
      })
    },
  },
  mounted() {},
  methods: {},
}
</script>
