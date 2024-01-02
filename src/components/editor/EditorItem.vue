<template>
  <div class="flex flex-wrap">
    <div class="w-full h-full mb-12 xl:mb-0 px-4">
      <froala id="edit" :tag="'textarea'" ref="froalaEditorTag" :config="config" v-model:value="props.contents"></froala>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type ItemplateImg } from '@/stores/document'
import htmlToPdf from 'html2pdf.js'
import { useEditorStore } from '@/stores/service'
// import htmlToCanvas from 'html2canvas'

const props = defineProps({
  contents: { type: String, required: false, default: '' }
})

const froalaEditorTag = ref(null)

const config = ref({
  // events: {
  //   initialized: () => {
  //     editorObject = this as any

  //     editorObject.html.set(props.contents ?? '')
  //   }
  // },
  height: 580,
  html2pdf: htmlToPdf
})

const editorStore = useEditorStore()



onMounted(() => {
  editorStore.setEditorObject(froalaEditorTag.value)
})
</script>

<style scoped></style>
