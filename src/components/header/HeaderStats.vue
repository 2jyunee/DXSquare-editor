<template>
  <!-- Header -->
  <!-- <div class="relative bg-emerald-600 md:pt-32 pb-32 pt-12"> -->
  <!-- <div class="px-4 md:px-10 mx-auto w-full"> -->
  <div class="border p-4 m-4 bg-white" style="border-radius: 10px;">
    <!-- Card stats -->
    <!-- <DocumentControls></DocumentControls> -->

    <!-- <div class="flex flex-nowrap justify-between bg-white p-2 mb-7">
          <div class="title space-x-3">
            <span>표준 근로계약서</span>
            <button @click="showTemplateEditor"><i class="fa-regular fa-pen-to-square"></i>템플릿 편집</button>
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
          </div>
          <div class="doc-control-2 space-x-5">
            <button @click="showSaveModal"><i class="fa-regular fa-floppy-disk"></i></button>
            <button>
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        </div> -->

    <div class="flex justify-center" v-show="props.isShow">
      <div class="px-4">
        <card-stats
          compId="comp-input"
          compName="텍스트"
          iconName="far fa-solid fa-t"
          iconColor="bg-fuchsia-900"
        />
      </div>
      <div class="px-4">
        <card-stats
          compId="comp-select"
          compName="리스트박스"
          iconName="fa-regular fa-square-caret-down"
          iconColor="bg-fuchsia-900"
        />
      </div>
      <div class="px-4">
        <card-stats
          compId="comp-check"
          compName="체크박스"
          iconName="fa-regular fa-circle-check"
          iconColor="bg-fuchsia-900"
        />
      </div>
      <div class="px-4">
        <card-stats
          compId="comp-radio"
          compName="라디오"
          iconName="fa-regular fa-circle-dot"
          iconColor="bg-fuchsia-900"
        />
      </div>
      <div class="px-4">
        <card-stats
          compId="comp-signature"
          compName="서명"
          iconName="fa-solid fa-signature"
          iconColor="bg-fuchsia-900"
        />
      </div>
      <div class="px-4">
        <card-stats
          compId="comp-image"
          compName="이미지"
          iconName="fa-regular fa-image"
          iconColor="bg-fuchsia-900"
        />
      </div>
    </div>
  </div>
  <!-- </div> -->
  <!-- </div> -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Constant from '@/assets/ts/constant'
import CardStats from '@/components/card/CardStats.vue'
import DocumentControls from '@/components/header/DocumentControls.vue'
import dragPorinter from '@/assets/images/drag-pointer.png'

interface IProp {
  isShow?: boolean
  isShowTemplateSaveBtn?: boolean
}

const props = withDefaults(defineProps<IProp>(), {
  isShow: true,
  isShowTemplateSaveBtn: false
})

const dragging = function (e: any) {
  const img = new Image()
  img.src = dragPorinter
  e.dataTransfer.setData('Text', e.target.id)
  e.dataTransfer.setDragImage(img, 18, 15)
}

const compBtnList: { [key: string]: string } = Constant.COMPONENT_CREATE_BUTTON_ID_LIST

onMounted(() => {
  for (const key in compBtnList) {
    let compCreateBtn = document.querySelector(`#${compBtnList[key as string]}`)
    compCreateBtn?.addEventListener('dragstart', dragging)
  }
})
</script>
