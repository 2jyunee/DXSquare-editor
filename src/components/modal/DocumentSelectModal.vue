<template>
  <Modal>
    <template #title>
      <span class="text-lg font-semibold">{{ props.title }}</span>
    </template>
    <template #content>
      <div class="flex flex-col modal-content">
        <div class="modal-list">
          <!-- <div class="p-2">
            <button @click="confirm(item)">{{ item.fileName }}</button>
          </div> -->
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
                v-for="(item, idx) of documentList"
                :key="idx"
                @click="selectItem(item)"
                :class="[
                  documentPicked === item.id
                    ? 'hover:bg-zinc-200 hover:text-black bg-emerald-500 text-white'
                    : 'hover:bg-zinc-200 hover:text-black'
                ]"
              >
                <td class="hide">
                  <input
                    type="radio"
                    :id="'radio' + item.id"
                    :value="item.id"
                    v-model="documentPicked"
                  />
                </td>
                <td class="p-2">{{ item.fileName }}</td>
                <td class="p-2">2023-12-19 00:00:00</td>
              </tr>
            </tbody>
          </table>
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
// TODO 저장된 문서가 없을 때 없다는 표시
import { ref } from 'vue'
import Modal from '@/components/ModalItem.vue'
import { useDocStore, type ItemplateImg } from '@/stores/document'
const props = defineProps({
  title: String
})

const documentStore = useDocStore()
const documentPicked = ref('')
const documentPickedItem = ref('')
const selectedTrClass = ref('hover:bg-zinc-200 hover:text-black')

let documentList: ItemplateImg[]

documentList = documentStore.getAllDocuments()

const emit = defineEmits(['confirm', 'cancel'])

const closeModal = () => {
  emit('cancel', false)
}

const confirm = () => {
  debugger
  emit('confirm', documentPickedItem.value)
}

const selectItem = (item) => {
  debugger
  documentPicked.value = item.id
  documentPickedItem.value = item
  selectedTrClass.value += ' bg-emerald-500 text-white'
}
</script>

<style scoped>
.hide {
  display: none;
}
</style>
