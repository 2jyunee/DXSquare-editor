import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useServiceStore = defineStore('service', () => {
  const isShowModal = ref(false)
  const isShowCreateBar = ref(false)
  const editingTemplateImgArr = ref([])

  function saveModalStatus(val: boolean) {
    isShowModal.value = val
  }

  function setCreateBarStatus(bool) {
    isShowCreateBar.value = bool
  }

  function getCreateBarStatus() {
    return isShowCreateBar.value
  }

  function appendEditingTemplateImgArr(data) {
    editingTemplateImgArr.value.push(data)
  }

  function getEditingTemplateImgArr() {
    return editingTemplateImgArr.value
  }

  function initEditingTemplateImgArr() {
    editingTemplateImgArr.value = []
  }

  return {
    isShowModal,
    isShowCreateBar,
    editingTemplateImgArr,
    saveModalStatus,
    setCreateBarStatus,
    getCreateBarStatus,
    appendEditingTemplateImgArr,
    getEditingTemplateImgArr,
    initEditingTemplateImgArr
  }
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

  return {
    editorObject,
    tempAnnotationObj,
    setEditorObject,
    getEditorObject,
    setTempAnnotationObj,
    getTempAnnotationObj
  }
})
