<template>
  <!-- Navbar -->
  <nav
    class="w-full z-10 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4 bg-squarePurple-100"
  >
    <div
      class="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4"
    >
      <!-- Brand -->
      <img class="lg:inline-block" :src="SignSquareLogo" width="130" @click="moveIndexPage" />
      <!-- Form -->
      <!-- <form class="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
        <div class="relative flex w-full flex-wrap items-stretch">
          <span
            class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
          >
            <i class="fas fa-search"></i>
          </span>
          <input
            type="text"
            placeholder="Search here..."
            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
          />
        </div>
      </form> -->
      <!-- User -->
      <ul class="flex-col md:flex-row list-none items-center hidden md:flex">
        <user-dropdown />
      </ul>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script setup lang="ts">
import UserDropdown from '@/components/dropdown/UserDropdown.vue'
import SignSquareLogo from '@/assets/images/signsquare-logo.png'
import router from '@/router';


const moveIndexPage = ()=>{
  router.push({path: '/'})
}
</script>
