<template>
  <teleport to="body">
    <div class="modal">
      <div
        class="flex flex-col bg-white space-y-10 mx-auto my-20 w-3/6 px-7 py-5 rounded-lg modal-window"
      >
        <div class="flex space-x-2">
          <slot name="title"></slot>
        </div>
        <div class="max-h-96 overflow-auto">
          <slot name="content"></slot>
        </div>
        <div class="flex space-x-2 ml-auto">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts"></script>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 30px;
  box-shadow: 0 4px 16px #00000026;
}

.modal-window {
  min-height: 400px;
}
</style>
