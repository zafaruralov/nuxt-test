<template>
  <Teleport to="body">
    <Transition name="modal-transition">
      <div class="modal" v-if="visible">
        <div class="modal-container" :class="{ show: visible }">
          <div class="modal-header">
            <div class="modal-header__text">
              <slot name="header">{{ title }}</slot>
            </div>
            <button class="modal-header__close" @click="emitClose">
              <div class="btn-close" />
            </button>
          </div>

          <div class="modal-content">
            <slot />
          </div>

          <div class="modal-footer">
            <button class="btn close" @click="emitClose">
              {{ cancelText }}
            </button>
            <button class="btn save" @click="emitSave">
              {{ saveText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  cancelText?: string;
  saveText?: string;
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "save"): void;
}>();
const emitClose = () => emit("close");
const emitSave = () => emit("save");
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 7;
  top: 0;
  left: 0;

  &-transition {
    &-active,
    &-leave-active {
      transition: all 0.4s;
    }
    &-enter-to {
      opacity: 1;
      transform: translateY(0);
    }
    &-leave-from {
      opacity: 1;
      transform: translateY(0);
    }
    &-enter-from {
      opacity: 0;
      transform: translateY(100px);
    }
    &-leave-to {
      opacity: 0;
      transform: translateY(-100px);
    }
  }
  &-container {
    max-width: 450px;
    border-radius: 20px;
    border: 1px solid #e0e5f2;
    padding: 10px 12px;
    max-height: 90vh;
    background: #fff;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
  }
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-footer {
    display: flex;
    gap: 20px;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
