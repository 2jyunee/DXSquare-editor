<template>
  <ul class="md:flex-col md:min-w-full flex flex-col list-none thumbnail-container">
    <li class="items-center thumbnail-img-container" v-for="(item, idx) in templateImages" :key="idx">
      <div class="border p-2 thumbnail" v-if="item != 'data:,'">
        <img class="thumbnail-img" :src="item" />
      </div>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { useTemplateStore, type ItemplateImg } from '@/stores/document'
import {useServiceStore} from '@/stores/service'
import htmlToCanvas from 'html2canvas'

const props = defineProps({
    templateId: String
})

const docStore = useTemplateStore()
const serviceStore = useServiceStore()
const selectTemplateId = docStore.getSelectTemplateId()
const curTemplate = docStore.getTemplate(selectTemplateId)
const templateImages = ref(new Array<string>())

if(!props.templateId) {
  templateImages.value = serviceStore.getEditingTemplateImgArr()
}

watch(()=> serviceStore.getEditingTemplateImgArr(), (curValue)=>{
  templateImages.value = curValue
})


onMounted(async ()=>{
  if(props.templateId) {
    let domElems = new DOMParser().parseFromString(curTemplate.htmlStr, "text/html")

    let contentDomElem = Array.from(domElems.querySelector('.ck-content')?.children!)
    let container = document.createElement('div')
    container.style.top = '-99999px'
    container.style.position = 'absolute'

    for (let i = 0; i < contentDomElem!.length; i++) {
      if (contentDomElem[i].className.indexOf('page-break') > -1) {
        // TODO 썸네일 만들기
        document.body.appendChild(container);
        debugger;

        let canvas = await htmlToCanvas(container)

        let image = canvas.toDataURL()
        // console.log(image)
        templateImages.value.push(image)
        document.body.removeChild(container)
        container.remove()
        container = document.createElement('div')
        container.style.top = '-99999px'
        container.style.position = 'absolute'

      } else {
        container.appendChild(contentDomElem[i])
      }
    }

    if (container.innerHTML) {
      document.body.appendChild(container)
      let canvas = await htmlToCanvas(container)

      let image = canvas.toDataURL()
      templateImages.value.push(image)
      // document.body.removeChild(container)
      container.remove()

    }
  }
  

})

onUnmounted(()=>{
  serviceStore.initEditingTemplateImgArr()
})
</script>

<style scoped>
.thumbnail-img {
  height: 100%;
}
.thumbnail-container {
  overflow-y: auto;
  max-height: 690px;
}
.thumbnail-img-container {
  padding:20px;
}
</style>
