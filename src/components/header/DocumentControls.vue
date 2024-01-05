<template>
  <div class="bg-white pt-2 pb-2 pl-5 pr-5 border"  style="font-size: 35px;">
    <div class="flex flex-nowrap justify-between md:px-10 px-4">
      <div class="title space-x-3">
        <input type="text" v-model="documentTitle" style="border:none; font-size: 35px; padding:0;"/>
      </div>
      <div class="doc-control-1 space-x-5" style="display: none;">
        <select class="pt-0.5 pr-10 pb-0.5 pl-2.5" name="zoom-value" v-show="false">
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
      </div>
      <div class="doc-control-2 space-x-5">
        <button @click="toggleEditor" v-if="pathname!='/doc/editor'"><i :class="toggleIconClass"></i></button>
        <button @click="showSaveModal" v-else><i class="fa-regular fa-floppy-disk"></i></button>
        <button @click="exitEditor">
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
import { onMounted, ref,watch } from 'vue'
import { useTemplateStore, useDocStore, type ItemplateImg } from '@/stores/document'
import { useServiceStore, useEditorStore } from '@/stores/service'
import saveModal from '@/components/modal/TemplateSaveModal.vue'
import htmlToCanvas from 'html2canvas'
import router from '@/router'
import { useRoute } from 'vue-router'

const serviceStore = useServiceStore()
const templateStore = useTemplateStore()
const documentStore = useDocStore()
const editorStore = useEditorStore()
const route = useRoute()

const isShowSaveModal = ref(false)
const toggleIconClass = ref('fa-regular fa-pen-to-square')
const documentTitle = ref(templateStore.getSelectTemplateName() || '무제')

const pathname = ref(window.location.pathname || '/doc/editor')


watch(()=>route.path, (cur, pre)=>{
  
  if(cur.indexOf('/doc/editor') > -1 || cur.indexOf('/doc/dashboard') > -1) {
    console.log('route move')
    documentTitle.value = templateStore.getSelectTemplateName()
  }
})

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
  const contentsElem = document.getElementById('doc-container')
  // const name = document.querySelector('.ck-editor__main')

  let bodyStr = contentsElem.parentElement.innerHTML
  // let bodyStr = name.innerHTML
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

  let fileName = `${documentTitle.value}.html`

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

const saveTemplate = async (title) => {
  // const editorHtmlElem = document.getElementById('doc-container')   // CKEditor
  const editorHtmlElem = document.querySelector('#doc-container')
  isShowSaveModal.value = false
  debugger
  
  const canvas = await htmlToCanvas(editorHtmlElem.firstChild)
  
  let children:HTMLCollection = (editorHtmlElem.firstChild.children) as HTMLCollection;

  for(let i=0; i<children?.length; i++){
    if(children[i]?.getAttribute('class')?.indexOf('ck-placeholder')! > -1) {
      editorHtmlElem?.firstChild?.removeChild(children[i])
    }
  }
  
  const t = canvas.toDataURL()
  console.log(t)
  const imageObj: ItemplateImg = {
    id: `${title}_${new Date().getTime()}`,
    imgDataStr: t,
    fileName: title,
    htmlStr: editorHtmlElem?.innerHTML == '<br data-cke-filler="true">' ? '' : editorHtmlElem?.outerHTML
  }

  templateStore.saveTemplate(imageObj)

  templateStore.setSelectTemplateId(imageObj.id)
  // documentTitle = templateStore.getSelectTemplateName()

  goBackDocumentEditor()
}

const toggleEditor = () => {
  serviceStore.setCreateBarStatus(false)

  let selectDocId = templateStore.getSelectTemplateId()
  
  if(!selectDocId) {
    // 템플릿 편집 모드 -> 배치 모드
    toggleIconClass.value = 'fa-regular fa-hand-pointer'
    saveTemplate(documentTitle.value)
    
    
  } else {
    // 배치 모드 -> 템플릿 편집 모드
    toggleIconClass.value = 'fa-regular fa-pen-to-square'

    let selectDocId = templateStore.getSelectTemplateId()
    const el = document.getElementById('annotationLayer')!
    editorStore.setTempAnnotationObj(el.innerHTML)
    const paddingStatus = serviceStore.offPaddingStatus()

    // TODO useRoute를 통해서 route 객체를 얻어온 후, route.path를 watch > 경로 변경 감지. 파라미터 전달 X
    router.replace({ name: 'templateEditor', params: { docId: selectDocId, paddingFlag: paddingStatus} })
  }
}

const goBackDocumentEditor = async () => {
  // const editorHtmlElem = document.getElementsByClassName('fr-element')
  const editorHtmlElem = document.querySelector('#doc-container')
  
  let selectDocId = templateStore.getSelectTemplateId()

  const canvas = await htmlToCanvas(editorHtmlElem)
  const pageAllImage = canvas.toDataURL()
  const updateObj = {
      imgDataStr: pageAllImage,
      htmlStr: editorHtmlElem?.outerHTML
  }

  templateStore.updateTemplate(selectDocId, updateObj)
  toggleIconClass.value = 'fa-regular fa-hand-pointer'
  serviceStore.setCreateBarStatus(true)

  router.replace({
    name: 'documentEditor',
    params: { isUpdateTemplate: 'true', updateTemplateId: selectDocId }
  })

}

const exitEditor = ()=>{
  router.push({path: '/'})
}

</script>

<style scoped></style>
