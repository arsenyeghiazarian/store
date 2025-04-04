<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: "66"
  },
  width: {
    type: String,
    default: "7"
  },
})
</script>
<template>
  <div class="progress-bar">
    <v-progress-circular
      indeterminate
      :size
      :width
    ></v-progress-circular>
  </div>
</template>
<style scoped>
.progress-bar {
  width: 66px;
  height: 66px;
}
</style>
