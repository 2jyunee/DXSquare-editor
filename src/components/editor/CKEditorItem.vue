<style scoped>
.ck.ck-editor__editable_inline {
    border: 1px solid transparent;
    overflow: auto;
    min-height: 70vh;
    padding: 0 var(--ck-spacing-standard);
}
</style>
<template>

  <div style="background-color: #ffffff;">
    <ckeditor id="doc-container" :editor="editor" v-model="editorData" :config="editorConfig" @ready="onEditorReady"></ckeditor>
  </div>
</template>


<script setup lang="ts">
  import BalloonEditor from '@ckeditor/ckeditor5-build-balloon-block'
  // import { ImportWord } from '@ckeditor/ckeditor5-import-word'
  // import '@/assets/external/editor4.22.1/ckeditor.js'
  import { onMounted, ref } from 'vue'
  import { useEditorStore } from '@/stores/service'

  const props = defineProps({
    contents: { type: String, required: false, default: '' }
  })



  // CKEDITOR.ClassicEditor.create()
  const editor = ref(BalloonEditor)
  const editorData = ref(props.contents)
  const editorConfig = ref({})

  // editorConfig.value = {
  //   plugins: [ImportWord],
  //   toolbar: ['importWord'],
  //   importWord: {
  //     formatting: {
  //               resets: 'none',
  //               defaults: 'none',
  //               styles: 'inline'
  //           }
  //   }
  // }
  const editorStore = useEditorStore()
  const onEditorReady = (editor) => {
    editorStore.setEditorObject(editor)
  }
  onMounted(() => {
    // editorStore.setEditorObject(editor.value)
  })
</script>
