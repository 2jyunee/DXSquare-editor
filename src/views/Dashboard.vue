<template>
  <div>
    <div class="flex flex-wrap">
      <div class="w-full h-full mb-12 xl:mb-0 px-4">
        <!-- <froala v-if="isShowEditor === true" class="w-full" id="edit" :tag="'textarea'" :config="config"></froala> -->
        <div class="w-full">
          <div id="doc-container" class="layer">
            <!-- <img :src="backgroundImage" /> -->
            <div id="templateLayer" v-html="htmlstring" class="template-layer" style="width: 100%;"></div>
            <canvas class="canvas-div"></canvas>
            <div id="annotationLayer" class="annotation-layer"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, onUpdated } from 'vue'
import { useTemplateStore, type ItemplateImg } from '@/stores/document'
import { useEditorStore } from '@/stores/service'

interface IProp {
  isUpdateTemplate?: string
  updateTemplateId?: string
}
const props = withDefaults(defineProps<IProp>(), {
  isUpdateTemplate: 'false',
  updateTemplateId: ''
})

const docStore = useTemplateStore()
const editorStore = useEditorStore()
const backgroundImage = ref('')
const htmlstring = ref()

const showFlag = ref(props.isUpdateTemplate)

watch(showFlag, (cur) => {
  if (cur === 'true') {
    backgroundImage.value = docStore.getTemplate(props.updateTemplateId).imgDataStr
    htmlstring.value = docStore.getTemplate(props.updateTemplateId).htmlStr
  }
})

const allowDrop = (e) => {
  e.preventDefault()
}

const moveElementDrop = (e) => {
  e.dataTransfer.setData('Text', e.target.id)
}

const drop = (e) => {
  e.preventDefault()
  let data = e.dataTransfer.getData('Text')

  // const topPos = e.layerY - 20
  // const leftPos = e.layerX - 20
  const topPos = e.offsetY - 10
  const leftPos = e.offsetX - 10
  let idSeq = new Date().getTime()

  if (data.indexOf('dxcomplayer') > -1) {
    let compLayerElm = document.getElementById(data)
    compLayerElm?.setAttribute('style', `position:absolute; top: ${topPos}px; left:${leftPos}px;`)
  } else {
    let tempDiv = document.createElement('div')
    tempDiv.setAttribute(
      'style',
      `position:absolute; top: ${topPos}px; left:${leftPos}px; z-index: 999;`
    )
    tempDiv.setAttribute('id', `dxcomplayer_${data}_${idSeq}`)
    tempDiv.setAttribute('draggable', 'true')
    tempDiv.addEventListener('dragstart', moveElementDrop)

    if (data == 'comp-input') {
      let tempInput = document.createElement('input')
      tempInput.setAttribute('style', 'border:1px solid #000; width: 100px; height: 30px;')

      tempDiv.appendChild(tempInput)
      e.target.appendChild(tempDiv)
    } else if (data == 'comp-text') {
      let tempText = document.createElement('span')
      tempText.setAttribute('style', 'font-size:12px')
      tempText.innerText = '텍스트'

      tempDiv.appendChild(tempText)
      e.target.appendChild(tempDiv)
    } else if (data == 'comp-check') {
      let tempCheck = document.createElement('input')
      tempCheck.type = 'checkbox'
      // tempCheck.setAttribute('style', 'font-size:12px')
      // tempCheck.setAttribute('type', 'check')

      tempDiv.appendChild(tempCheck)
      e.target.appendChild(tempDiv)
    } else if (data == 'comp-radio') {
      let tempRadio = document.createElement('input')
      tempRadio.type = 'radio'

      tempDiv.appendChild(tempRadio)
      e.target.appendChild(tempDiv)
    } else if (data == 'comp-signature') {
      let tempSignComp = document.createElement('a')
      // let clickEventComp = document.createElement('a')
      tempSignComp.setAttribute(
        'style',
        'display:block;font-size:12px;border:1px solid #000; width: 100px; height: 40px;'
      )

      tempDiv.appendChild(tempSignComp)
      e.target.appendChild(tempDiv)
    }
  }
}

onMounted(() => {
  const annotationLayer = document.querySelector('#annotationLayer')
  const templateLayer = document.querySelector('#templateLayer')

  annotationLayer?.addEventListener('drop', drop)
  annotationLayer?.addEventListener('dragover', allowDrop)

  const selectTemplateId = docStore.getSelectTemplateId()
  let templateImg: ItemplateImg = docStore.getTemplate(selectTemplateId)

  backgroundImage.value = templateImg.imgDataStr ?? ''
  htmlstring.value = templateImg.htmlStr

  const annotationElmStr = editorStore.getTempAnnotationObj()

  if(annotationElmStr) {
    annotationLayer?.insertAdjacentHTML( 'beforeend', annotationElmStr );
  }
  
})

onUpdated(()=>{
  const annotationLayer = document.querySelector('#annotationLayer')
  // const containerHeight = document.querySelector('#doc-container')?.scrollHeight
  annotationLayer.style.height = '2300px'
})

</script>


<style scoped>
.page {
  width: 100%;
  height: 100%;
  border: 1px solid #000;
}
.layer {
  border-radius: 10px;
  position: relative;
  border-width: 0;
  border-style: solid;
  border-color: #e4e4e7;
  width: 100%;
  height: 600px;
  background-color: #fff;
  overflow-y: auto;
}

.canvas-div {
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
