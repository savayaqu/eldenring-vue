<script setup>
import {RouterView } from 'vue-router'
import Header from "@/components/Header.vue";

</script>

<template>
  <div class="container">
    <Header />
    <RouterView />
  </div>
</template>

<style scoped>

.container {
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
}
</style>