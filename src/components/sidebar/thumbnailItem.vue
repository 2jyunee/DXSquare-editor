<template>
  <ul class="md:flex-col md:min-w-full flex flex-col list-none">
    <li class="items-center" v-for="(item, idx) of templateImages" :key="idx">
      <div class="border p-2 thumbnail">
        <img class="thumbnail-img" :src="item.imgDataStr" />
      </div>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { useTemplateStore, type ItemplateImg } from '@/stores/document'
// const props = defineProps({
//     templateImages: {type: Array<ItemplateImg>, required: false}
// })
// console.log(props.templateImages)

const docStore = useTemplateStore()
const selectTemplateId = docStore.getSelectTemplateId()
const curTemplate = docStore.getTemplate(selectTemplateId)
const templateImages: ItemplateImg[] = new Array<ItemplateImg>()
templateImages.push(curTemplate)
</script>
<style scoped>
.thumbnail {
  width: 120px;
  height: 150px;
}
.thumbnail-img {
  height: 100%;
}
</style>
