<template>
  <div>
    <CKEditorItem :contents="htmlContents"></CKEditorItem>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import htmlToPdf from 'html2pdf.js'
import EditorItem from '@/components/editor/EditorItem.vue'
import CKEditorItem from '@/components/editor/CKEditorItem.vue'
import { useTemplateStore } from '@/stores/document'
// import FroalaEditor from 'froala-editor'
// import htmlToCanvas from 'html2canvas'

interface ICreateForm {
  docId?: string
}
const props = withDefaults(defineProps<ICreateForm>(), {
  docId: ''
})

const docStore = useTemplateStore()
const htmlContents = docStore.getTemplate(props.docId)?.htmlStr

const config = ref({
  // events: {
  //   initialized: () => {
  //     console.log('initialized')
  //     let editor = this as any
  //     // editor.opts.html2pdf=methods.htmlToPdf

  //     editor.events.on(
  //       'drop',
  //       function (dropEvent) {
  //         // Focus at the current posisiton.
  //         editor?.markers.insertAtPoint(dropEvent.originalEvent)
  //         // eslint-disable-next-line
  //         debugger
  //         console.log(editor)
  //         var $marker = editor?.$el.find('.fr-marker')
  //         $marker.replaceWith(FroalaEditor.MARKERS)
  //         editor?.selection.restore()

  //         // Save into undo stack the current position.
  //         if (!editor?.undo.canDo()) editor?.undo.saveStep()

  //         const topPos = dropEvent.originalEvent.offsetX + 100
  //         const leftPos = dropEvent.originalEvent.offsetY - 200

  //         // Insert HTML.
  //         if (dropEvent.originalEvent.dataTransfer.getData('Text') == 'input-comp') {
  //           let pageObj = editor?.$el.find('.page')[0]

  //           let tempDiv = document.createElement('div')
  //           tempDiv.setAttribute('style', `position:absolute; top: ${topPos}px; left:${leftPos}px;`)
  //           let tempInput = document.createElement('input')
  //           tempInput.setAttribute('style', 'border:1px solid #000; width: 100px; height: 30px;')

  //           tempDiv.appendChild(tempInput)

  //           pageObj.appendChild(tempDiv)

  //           // editor.html.insert(`<div style='position:absolute; top: ${topPos}, left:${leftPos}'><input style="border:1px solid #000; width: 100px; height: 30px;"/></div>`);
  //         } else if (dropEvent.originalEvent.dataTransfer.getData('Text') == 'text-comp') {
  //           editor.html.insert(
  //             `<div style='position:absolute; top: ${topPos}, left:${leftPos}'><span style="font-size:12px;">텍스트</span></div>`
  //           )
  //         }

  //         // Save into undo stack the changes.
  //         editor.undo.saveStep()

  //         // Stop event propagation.
  //         dropEvent.preventDefault()
  //         dropEvent.stopPropagation()

  //         // Firefox show cursor.
  //         if (editor.core.hasFocus() && editor.browser.mozilla) {
  //           editor.events.disableBlur()
  //           setTimeout(function () {
  //             editor.$el.blur().focus()
  //             editor.events.enableBlur()
  //           }, 0)
  //         }

  //         return false
  //       },
  //       true
  //     )
  //   }
  // },
  height: 580,
  // pluginsEnabled: ['image', 'link','inlineClass', 'inlineStyle', 'lineBreaker', 'paragraphFormat', 'paragraphStyle', 'fontAwesome', 'print'],
  html2pdf: htmlToPdf
})

onMounted(() => {})
</script>

<style scoped></style>
