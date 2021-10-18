<template>
  <textarea
    class="w-full text-sm form-textarea overflow-y-hidden focus:border-primary focus:outline-none focus:shadow-outline-primary disabled:bg-gray-100"
    name=""
    id=""
    v-bind="$attrs"
    rows="1"
    @input="resize($event)"
    v-on="inputListeners"
  ></textarea>
</template>

<script>
export default {
  inheritAttrs: false,
  model: {
    event: 'update',
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
  methods: {
    resize(e) {
      e.target.style.height = 'auto'
      e.target.style.height = `${e.target.scrollHeight}px`
    },
  },
}
</script>

<style>
.textarea {
  width: 100%;
  outline: none;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
