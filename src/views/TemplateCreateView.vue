<template>
  <div>
    <CKEditorItem :contents="htmlContents" :paddingFlag="props.paddingFlag"></CKEditorItem>
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
  docId?: string,
  paddingFlag?: boolean
}
const props = withDefaults(defineProps<ICreateForm>(), {
  docId: '',
})

const docStore = useTemplateStore()
const isPaddingApply = ref(false)
const htmlContents = docStore.getTemplate(props.docId)?.htmlStr

</script>

<style scoped></style>
