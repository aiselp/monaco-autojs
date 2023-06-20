<script setup lang="ts">
import Editor from './components/Editor.vue'
import { init } from './core/app'


</script>

<template>
  <div class="tlile">monaco编辑器</div>
  <Editor @ready="init" />
</template>

<style scoped>
.tlile {
  display: flex;
  justify-content: center;
  font-weight: 200;
}
</style>
