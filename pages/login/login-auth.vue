<template>
  <div class="flex justify-center mx-auto">
    <div class="flex justify-center flex-wrap rounded-md shadow-lg">
      <div class="bg-login-auth hidden lg:block h-full">
        <div class="flex justify-center items-center h-full">
          <base-icon
            icon="logo-bedid-white"
            width="185"
            height="135"
            viewBox="0 0 185 135"
          ></base-icon>
        </div>
      </div>
      <div class="content-right rounded-md md:rounded-r-md border border-cool-150">
        <div class="p-16">
          <div class="font-medium text-2xl leading-none text-center md:text-left">เข้าสู่ระบบ</div>
          <div class="text-2xl font-light text-center md:text-left">
            be<span class="font-medium text-second uppercase">digital id</span>
          </div>
          <div class="pt-20">
            <button class="btn-gmail">
              <base-icon icon="gmail" class="mx-3" size="35" viewBox="0 0 48 48"></base-icon>เข้าสู่ระบบด้วย Google
            </button>

            <button class="btn-ddopa">
              <base-icon icon="ddopa" class="mx-3" size="35" viewBox="0 0 48 48"></base-icon>เข้าสู่ระบบด้วย D.DOPA
            </button>

            <button class="btn-line">
              <base-icon icon="line" class="mx-3" size="35" viewBox="0 0 48 48"></base-icon>เข้าสู่ระบบด้วย Google
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "auth",
  mounted() {},
};
</script>

<style>
.bg-login-auth {
  background-image: url("/img-register@3x.png");
  background-size: 414px 498px;
  min-width: 414px;
  height: 498px;

}
.content-right {
  @apply bg-white;
  min-width: 414px;
  height: 498px;
}
.btn-gmail {
  @apply bg-gmail;
  @apply w-full;
  @apply rounded-md;
  @apply text-white;
  @apply flex;
  @apply items-center;
  @apply justify-center;
  @apply py-2;
  @apply my-2;
}

.btn-ddopa {
  @apply bg-ddopa;
  @apply w-full;
  @apply rounded-md;
  @apply text-white;
  @apply flex;
  @apply items-center;
  @apply justify-center;
  @apply py-2;
  @apply my-2;
}

.btn-line {
  @apply bg-line;
  @apply w-full;
  @apply rounded-md;
  @apply text-white;
  @apply flex;
  @apply items-center;
  @apply justify-center;
  @apply py-2;
  @apply my-2;
}
</style>
