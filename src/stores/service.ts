import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useServiceStore = defineStore('service', () => {
  const isShowModal = ref(false)
  const isShowCreateBar = ref(false)

  function saveModalStatus(val: boolean) {
    isShowModal.value = val
  }

  function setCreateBarStatus(bool) {
    isShowCreateBar.value = bool
  }

  function getCreateBarStatus() {
    return isShowCreateBar.value
  }

  return { isShowModal, isShowCreateBar, saveModalStatus, setCreateBarStatus, getCreateBarStatus }
})

export const useEditorStore = defineStore('editor', () => {
  const editorObject = ref('')
  const tempAnnotationObj = ref('')

  function setEditorObject(obj) {
    editorObject.value = obj
  }

  function getEditorObject() {
    return editorObject.value
  }

  function setTempAnnotationObj(data) {
    tempAnnotationObj.value = data
  }

  function getTempAnnotationObj() {
    return tempAnnotationObj.value
  }

  return { tempAnnotationObj, setEditorObject, getEditorObject, setTempAnnotationObj, getTempAnnotationObj }
})
