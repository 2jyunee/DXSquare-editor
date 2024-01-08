<template>
  <Modal>
    <template #title>
      <span class="text-lg font-semibold">{{ props.title }}</span>
    </template>
    <template #content>
      <div class="flex modal-content divide-x space-x-3 text-sm">
        <div class="modal-list space-y-2 mt-2 w-2/12">
          <button class="block text-xs">내 서식문서함</button>
          <button class="block text-xs">내 템플릿 문서함</button>
          <button class="block text-xs">내 컴퓨터</button>
        </div>
        <div class="modal-list pl-4 space-y-4 w-full mt-2">
          <form class="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div class="relative flex w-full flex-wrap items-stretch">
              <span
                class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
              >
                <i class="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder=""
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
          </form>
          <table class="table-fixed border-spacing-2 w-full divide-y">
            <thead>
              <tr class="p-4 text-left">
                <th class="hide">check</th>
                <th class="p-2" width="400">서식 문서</th>
                <th class="p-2">마지막 수정일</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, idx) of templateList"
                :key="idx"
                @click="selectItem(item)"
                :class="[
                  templatePicked === item.id
                    ? 'hover:bg-zinc-200 hover:text-black bg-emerald-500 text-white'
                    : 'hover:bg-zinc-200 hover:text-black'
                ]"
              >
                <td class="hide">
                  <input
                    type="radio"
                    :id="'radio' + item.id"
                    :value="item.id"
                    v-model="templatePicked"
                  />
                </td>
                <td class="p-2">{{ item.fileName }}</td>
                <td class="p-2">2024-01-08</td>
              </tr>
            </tbody>
          </table>
          <!-- <div class="p-2">
              <button @click="confirm(item)">{{ item.fileName }}</button>
            </div> -->
        </div>
      </div>
    </template>
    <template #footer>
      <button class="bg-blue-600 w-16 p-2 rounded font-bold text-base text-white" @click="confirm">
        확인
      </button>
      <button
        class="border border-blue-600 w-16 p-2 rounded font-bold text-base text-blue-600"
        @click="closeModal"
      >
        닫기
      </button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
// TODO 저장된 템플릿이 없을 때 없다는 표시
import { ref } from 'vue'
import Modal from '@/components/ModalItem.vue'
import { useTemplateStore, type ItemplateImg } from '@/stores/document'
const props = defineProps({
  title: String
})

const imageStore = useTemplateStore()
const templatePicked = ref('')
const selectedTrClass = ref('hover:bg-zinc-200 hover:text-black')
const emit = defineEmits(['confirm', 'cancel'])

let templateList: ItemplateImg[]

templateList = imageStore.getAllTemplates()

const closeModal = () => {
  emit('cancel', false)
}

const confirm = () => {
  emit('confirm', templatePicked.value)
}

const selectItem = (item) => {
  templatePicked.value = item.id
  selectedTrClass.value += ' bg-emerald-500 text-white'
}
</script>

<style scoped>
.hide {
  display: none;
}
</style>
