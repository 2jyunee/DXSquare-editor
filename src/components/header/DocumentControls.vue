<template>
  <div class="bg-white pt-2 pb-2 pl-5 pr-5 border">
    <div class="flex flex-nowrap justify-between md:px-10 px-4">
      <div class="title space-x-3">
        <span>{{ documentTitle || '무제' }}</span>
      </div>
      <div class="doc-control-1 space-x-3">
        <select class="pt-0.5 pr-10 pb-0.5 pl-2.5" name="zoom-value">
          <option value="50">50%</option>
          <option value="75">75%</option>
          <option value="90">90%</option>
          <option value="100" selected>100%</option>
          <option value="125">125%</option>
          <option value="150">150%</option>
          <option value="200">200%</option>
        </select>
        <button><i class="fa-solid fa-pause"></i></button>
        <button><i class="fa-regular fa-images"></i></button>
        <button><i class="fa-solid fa-rotate-left"></i></button>
        <button><i class="fa-solid fa-rotate-right"></i></button>
        <button @click="showTemplateEditor"><i :class="toggleIconClass"></i></button>
      </div>
      <div class="doc-control-2 space-x-5">
        <button @click="showSaveModal"><i class="fa-regular fa-floppy-disk"></i></button>
        <button @click="goBackDocumentEditor">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </div>
    </div>
  </div>
  <saveModal
    v-if="isShowSaveModal"
    :title="'템플릿 저장'"
    @cancel="hideSaveModal"
    @confirm="
      (title) => {
        saveTemplate(title)
      }
    "
  ></saveModal>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useTemplateStore, useDocStore, type ItemplateImg } from '@/stores/document'
import { useServiceStore } from '@/stores/service'
import saveModal from '@/components/modal/TemplateSaveModal.vue'
import htmlToCanvas from 'html2canvas'
import router from '@/router'

const serviceStore = useServiceStore()
const templateStore = useTemplateStore()
const documentStore = useDocStore()

const isShowSaveModal = ref(false)
const toggleIconClass = ref('fa-regular fa-hand-pointer')
const documentTitle = templateStore.getSelectTemplateName()

const showSaveModal = () => {
  let isShowCreateBar = serviceStore.getCreateBarStatus()
  if (isShowCreateBar) {
    saveDocToHtml()
  } else {
    isShowSaveModal.value = true
  }
}

const hideSaveModal = () => {
  isShowSaveModal.value = false
}

const saveDocToHtml = () => {
  const name = document.getElementById('doc-container')

  let bodyStr = name.parentElement.innerHTML
  let htmlStr = '<html lang="en">'
  htmlStr += '<head>'
  htmlStr += '<meta charset="UTF-8">'
  htmlStr += '<meta charset="UTF-8">'
  htmlStr += '<meta name="viewport" content="width=device-width, inital-scale=1.0">'
  htmlStr += '<title>Document</title>'
  htmlStr += '</head>'
  htmlStr += '<body>'
  htmlStr += bodyStr.replace(/(data-v-\w*\=\"\"\s)/gi, '')
  htmlStr += '</body>'
  htmlStr += '</html>'

  // const parser = new DOMParser()
  // const doc = parser.parseFromString(htmlStr, 'text/html')

  let fileName = `${documentTitle}.html`

  const blob = new Blob([htmlStr], { type: 'text/html' })
  const path = window.URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = path
  link.download = fileName
  link.click()
  link.remove() // IE 미지원

  const docObj: ItemplateImg = {
    id: `${documentTitle}_${new Date().getTime()}`,
    fileName: documentTitle,
    htmlStr: htmlStr
  }
  documentStore.saveDocument(docObj)
}

const saveTemplate = (title) => {
  const editorHtmlElem = document.getElementsByClassName('fr-element')
  isShowSaveModal.value = false
  htmlToCanvas(editorHtmlElem[0]).then((canvas) => {
    const t = canvas.toDataURL()
    console.log(t)
    const imageObj: ItemplateImg = {
      id: `${title}_${new Date().getTime()}`,
      imgDataStr: t,
      fileName: title,
      htmlStr: editorHtmlElem[0].innerHTML
    }

    templateStore.saveTemplate(imageObj)
  })
}

const showTemplateEditor = () => {
  let selectDocId = templateStore.getSelectTemplateId()
  toggleIconClass.value = 'fa-regular fa-pen-to-square'
  // TODO useRoute를 통해서 route 객체를 얻어온 후, route.path를 watch > 경로 변경 감지. 파라미터 전달 X
  router.push({ name: 'templateEditor', params: { docId: selectDocId } })
}

const goBackDocumentEditor = () => {
  const editorHtmlElem = document.getElementsByClassName('fr-element')
  let selectDocId = templateStore.getSelectTemplateId()

  htmlToCanvas(editorHtmlElem[0]).then((canvas) => {
    const t = canvas.toDataURL()
    const updateObj = {
      imgDataStr: t,
      htmlStr: editorHtmlElem[0].innerHTML
    }

    templateStore.updateTemplate(selectDocId, updateObj)
    toggleIconClass.value = 'fa-regular fa-hand-pointer'
    router.push({
      name: 'documentEditor',
      params: { isUpdateTemplate: 'true', updateTemplateId: selectDocId }
    })
  })
}
</script>

<style scoped></style>
