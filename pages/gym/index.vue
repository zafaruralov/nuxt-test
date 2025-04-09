<template>
  <h1>hello world</h1>
  <section class="gym">
    <Modal
      title="how can we help you"
      cancel-text="close"
      :visible="isModalVisible"
      save-text="save"
      v-on:close="closeModal"
      v-on:save="saveModal"
    >
      <label for="calo">how much calory did you loose</label>
      <input type="text" id="calo" />
    </Modal>
    <div class="" v-if="$route.params.id">
      <nuxt-link :to="prev"><-</nuxt-link>
      <nuxt-link :to="next">-></nuxt-link>
    </div>
  </section>
</template>
<script setup lang="ts">
const route = useRoute();
const id = computed(() => Number(route.params.id) || 1);
const prev = computed(() => "/" + (id.value - 1));
const next = computed(() => "/" + (id.value + 1));

const isModalVisible = ref(true);

function closeModal() {
  isModalVisible.value = false;
}
function saveModal() {
  isModalVisible.value = false;
}
</script>
<style lang="scss"></style>
