<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import CartIcon from '@/components/CartIcon.vue';
  import GlobalError from '@/components/GlobalError.vue';
</script>
<template>
  <v-app>
    <v-app-bar :elevation="4" height="50">
      <v-container fluid>
        <div class="d-flex align-center">
          <v-btn to="/" size="small">Home</v-btn>
          <v-spacer></v-spacer>
          <cart-icon></cart-icon>
        </div>
      </v-container>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer app class="py-1 px-3 border-t">
      <v-spacer></v-spacer>
      <small class="footer-version-text">
        <span class="primary--text">&copy;Store {{ new Date().getFullYear() }}</span>
      </small>
    </v-footer>

    <global-error />
  </v-app>
</template>
