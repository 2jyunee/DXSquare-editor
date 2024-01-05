<template>
  <nav
    class="bg-white border"
  >
    <div
      class="" style="width: 162px"
    >
      <!-- Toggler -->
      <button
        class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
        type="button"
        v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')"
      >
        <i class="fas fa-bars"></i>
      </button>
      <!-- Brand -->
      <!-- <router-link
        class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
        to="/"
      >
        DXSquare
      </router-link> -->
      <!-- User -->
      <ul class="md:hidden items-center flex flex-wrap list-none">
        <li class="inline-block relative">
          <notification-dropdown />
        </li>
        <li class="inline-block relative">
          <user-dropdown />
        </li>
      </ul>
      <!-- Collapse -->
      <div>
        <!-- Collapse header -->
        <div
          class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200"
        >
          <div class="flex flex-wrap">
            <div class="w-6/12">
              <router-link
                class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                to="/"
              >
                Vue Notus
              </router-link>
            </div>
            <div class="w-6/12 flex justify-end">
              <button
                type="button"
                class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                v-on:click="toggleCollapseShow('hidden')"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
        <!-- Form -->
        <!-- <form class="mt-6 mb-4 md:hidden">
          <div class="mb-3 pt-0">
            <input
              type="text"
              placeholder="Search"
              class="border-0 px-3 py-2 h-12 border border-solid border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
            />
          </div>
        </form> -->

        <!-- Divider -->
        <div class="ml-auto">
          <button @click="uploadFile"><i class="fa-solid fa-file-circle-plus"></i></button>
          <UploadItem class="hidden" :isExec="isExecFileUpload" @exit="(endFlag)=>{isExecFileUpload=endFlag; isExecFileUpload=false;}" />
        </div>
        <hr class="my-4 md:min-w-full" />
        <!-- Heading -->
        <h6
          class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
        >
          {{ `1 / ${templateImages.length} 페이지` }}
        </h6>
        <!-- Navigation -->
        <ThumbnailItem :templateId="imageStore.getSelectTemplateId()"></ThumbnailItem>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTemplateStore, type ItemplateImg } from '@/stores/document'
import ThumbnailItem from './thumbnailItem.vue'
import UploadItem from '@/components/upload/UploadItem.vue'

const props = defineProps({
  isShowThumbnail: { type: Boolean, required: false, default: false }
})

const collapseShow = ref('hidden')
const isExecFileUpload = ref(false)

const toggleCollapseShow = (classes: string) => {
  collapseShow.value = classes
}

const uploadFile = () => {
  isExecFileUpload.value = true
}

const imageStore = useTemplateStore()
const selectTemplateId = imageStore.getSelectTemplateId()
const curTemplate = imageStore.getTemplate(selectTemplateId)
const templateImages: ItemplateImg[] = new Array<ItemplateImg>()
templateImages.push(curTemplate)

onMounted(() => {
  console.log(props.isShowThumbnail)
})
</script>
<style scoped></style>
@/stores/document
