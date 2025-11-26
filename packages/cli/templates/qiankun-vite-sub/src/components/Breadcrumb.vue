<template>
  <el-breadcrumb class="breadcrumb-container" separator="/">
    <el-breadcrumb-item 
      v-for="(item, index) in breadcrumbItems" 
      :key="index"
      :to="item.path"
    >
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMenuStore } from '@/stores/menu';
const menuStore = useMenuStore();
const route = useRoute()
const breadcrumbItems = computed(() => {
  return menuStore.getBreadcrumb(route.path);
});
</script>

<style scoped>
.breadcrumb-container {
  padding: 10px 20px;
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
}
</style>