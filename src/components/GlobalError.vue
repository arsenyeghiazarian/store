<script lang="ts" setup>
  import { globalError, isGlobalErrorVisible, clearError } from '@/utils/errorHandler';
</script>

<template>
  <v-snackbar
    v-model="isGlobalErrorVisible"
    color="error"
    timeout="5000"
    location="top right"
    position="fixed"
    @update:model-value="clearError"
  >
    <div class="d-flex align-center">
      <v-icon start icon="mdi-alert-circle" class="me-2"></v-icon>
      <span>{{ globalError }}</span>
    </div>

    <template #actions>
      <v-btn variant="text" color="white" @click="clearError"> Close </v-btn>
    </template>
  </v-snackbar>
</template>
