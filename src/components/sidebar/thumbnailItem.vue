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
import htmlToCanvas from 'html2canvas'

// const props = defineProps({
//     templateImages: {type: Array<ItemplateImg>, required: false}
// })

const docStore = useTemplateStore()
const selectTemplateId = docStore.getSelectTemplateId()
const curTemplate = docStore.getTemplate(selectTemplateId)


let domElems = new DOMParser().parseFromString(curTemplate.htmlStr, "text/html")


debugger
//here
let contentDomElem = domElems.querySelector('.ck-content')?.children!

for(let i=0; i<contentDomElem!.length; i++) {
  if(contentDomElem[i].className.indexOf('page-break') > -1) {
    // TODO 썸네일 만들기
    let elemArr = Array.from(contentDomElem)
    let canvas = await htmlToCanvas(elemArr.slice(0, i))
    debugger

  } else {

  }
}


const templateImages: ItemplateImg[] = new Array<ItemplateImg>()
templateImages.push(curTemplate)
</script>

<style scoped>
.thumbnail-img {
  height: 100%;
}
</style>
