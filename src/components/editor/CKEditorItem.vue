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
    <ckeditor id="doc-container" :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
  </div>
</template>


<script setup lang="ts">
  import BalloonEditor from '@ckeditor/ckeditor5-build-balloon-block'
  import { onMounted, ref } from 'vue'
 
  const editor = ref(BalloonEditor)
  const editorData = ref('<p>Content of the editor.</p>')
  const editorConfig = ref({})
  // export default {
  //     data() {
  //         return {
  //             editor: ClassicEditor,
  //             editorData: '<p>Content of the editor.</p>',
  //             editorConfig: {
  //                 // The configuration of the editor.
  //             }
  //         };
  //     }
  // }
  onMounted(() => {})
</script>
