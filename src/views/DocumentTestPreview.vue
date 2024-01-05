<template>
  <div id="preview-container" class="container" v-html="docHtml">

  </div>
  <SignatureModal
    v-if="isShowSignModal"
    :title="'서명하기'"
    @cancel="hideSignModal"
    @confirm="(str) => applySign(str)"
  ></SignatureModal>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SignatureModal from '@/components/modal/SignatureModal.vue'

const contentHtml = history.state.contentHtml
const docHtml = ref(contentHtml)
const isShowSignModal = ref(false)

let targetSignComp

const showSignModal = ($event) => {
  isShowSignModal.value = true
  targetSignComp = $event.target
}

const hideSignModal = () => {
  isShowSignModal.value = false
}

const applySign = (str) => {
  let styleStr = targetSignComp.parentElement.getAttribute('style')

  if (styleStr.indexOf('background') == -1) {
    styleStr += ` background:url(${str}) no-repeat center center;`
  } else {
    styleStr.replace(/(url\(\w+\))/g, `url(${str})`)
  }

  if (styleStr.indexOf('background-size') == -1) {
    styleStr += ' background-size: contain;'
  }
  targetSignComp.parentElement.setAttribute('style', styleStr)
  isShowSignModal.value = false
}

onMounted(() => {
  let container = document.querySelector('#doc-container')
  let docComps = container?.querySelectorAll('div.annotation-layer > div')

  Array.prototype.slice.call(docComps).filter((element) => {
    var match = element.outerHTML.match(/(dxcomplayer_comp-)\w+/g)

    if (match == null) return false
    if (match == void 0) return false

    for (let idStr of match) {
      if (idStr.indexOf('comp-signature') > -1) {
        let comp = document.getElementById(idStr)
        if (comp) {
          comp.firstChild.addEventListener('click', showSignModal)
        }
      }
    }
  })
})
</script>
<style scoped>

</style>
