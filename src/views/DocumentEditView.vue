<template>
  <div>
    <!-- <Sidebar :isShowThumbnail="serviceStore.getCreateBarStatus()" /> -->
    <!-- <div class="ml-52 relative bg-blueGray-100"> -->
    <admin-navbar />
    <div style="text-align: -webkit-center;">
      <div style="width:1200px">
        <DocumentControls></DocumentControls>
        <div class="flex flex-row h-screen">
          <Sidebar />
          <div class="main-container" style="width: 1038px;">
            <!-- <div class="relative bg-squarePurple-100 md:pt-32 pb-32 pt-12"> -->
            <div class="bg-transparent pb-32 pt-2">
              <!-- <div class="px-4 md:px-10 mx-auto w-full"> -->
              <div class="w-full">
                <header-stats :isShow="serviceStore.getCreateBarStatus()" />
              </div>
            </div>
            <div class="px-4 md:px-10 mx-auto w-full -m-24">
              <router-view />
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer-admin />
  </div>
</template>
<script setup lang="ts">
import { useServiceStore } from '@/stores/service'
import AdminNavbar from '@/components/navbar/AdminNavbar.vue'
import Sidebar from '@/components/sidebar/Sidebar.vue'
import HeaderStats from '@/components/header/HeaderStats.vue'
import DocumentControls from '@/components/header/DocumentControls.vue'
import FooterAdmin from '@/components/footer/FooterAdmin.vue'

const props = defineProps({
  mainLayoutClass: { type: String, required: true, default: 'main-container' }
})

const serviceStore = useServiceStore()
</script>
