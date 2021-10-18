<template>
  <div class="flex text-center text-sm font-light text-gray-500">
    <span class="flex items-center mr-1 ml-auto">
      Page {{ p }} Of {{ total_page }}
    </span>
    <!-- Pagination -->
    <span class="flex sm:mt-auto sm:justify-end">
      <div
        class="border border-gray-300 rounded mr-1 select-none"
        :class="{ 'bg-gray-200 cursor-not-allowed': p == 1, 'hover:bg-cool-200 cursor-pointer': p != 1 }"
        @click="pre"
      >
        <base-icon icon="dropdown" class="transform rotate-90"></base-icon>
      </div>
      <div
        class="border border-gray-300 rounded select-none"
        :class="{
          'bg-gray-200 cursor-not-allowed': p == total_page,
          'hover:bg-cool-200 cursor-pointer': p != total_page,
        }"
        @click="next"
      >
        <base-icon icon="dropdown" class="transform -rotate-90"></base-icon>
      </div>

      <!-- <nav aria-label="Table navigation">
        <ul class="inline-flex items-center">
          <button
            v-if="page > 1"
            @click="next"
            class="px-3 py-1 rounded-sm bg-blue-600 focus:outline-none border mr-2"
          >
            <span class="text-white text-sm">&lsaquo;</span>
          </button>
          <li v-for="p in page_list" :key="`page-${p}`">

            <button
              v-if="p !== page"
              @click="pageChange(p)"
              class="px-3 py-1 rounded-sm focus:outline-none border"
            >
              {{ p }}
            </button>
            <button
              v-else
              @click="pageChange(p)"
              class="px-3 py-1 text-blue-600 border border-blue-100 transition-colors duration-150 bg-blue-100 rounded-sm focus:outline-none"
            >
              {{ p }}
            </button>
          </li>
          <button
            v-if="page < total_pages"
            @click="pre"
            class="px-3 py-1 rounded-sm bg-blue-600 focus:outline-none border ml-2"
          >
            <span class="text-white text-sm">&rsaquo;</span>
          </button>
        </ul>
      </nav> -->
    </span>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    page: {
      type: Number,
      default: 1,
    },
    total_page: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      p: 1
    };
  },
  computed: {
    page_list() {
      var pages = [];
      for (var i = 1; i <= this.total_pages; i++) pages.push(i);
      return pages;
    },
  },
  mounted() {
    this.p = this.page
  },
  methods: {
    pageChange(p) {
      this.$emit("change", p);
    },
    next() {
      if (this.p < this.total_page) {
        this.p++
        this.$emit("change", this.p);
      }
    },
    pre() {
      if (this.p > 1) {
        this.p--
        this.$emit("change", this.p);
      }
    },
  },
};
</script>
