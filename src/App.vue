<script setup lang="ts">
import Editor from './components/Editor.vue'
import { ref, onMounted } from 'vue'
import { renderEditorPart, renderSidebarPart, renderActivitybarPar, renderPanelPart } from './core/setup'

const sidebar = ref<HTMLElement>()
const activityBar = ref<HTMLElement>()
const editors = ref<HTMLElement>()
const panel = ref<HTMLElement>()
onMounted(() => {
  renderSidebarPart(sidebar.value!!)
  renderActivitybarPar(activityBar.value!!)
  renderEditorPart(editors.value!!)
  renderPanelPart(panel.value!!)
})
</script>

<template>
  <div style="width: 100vw;height: 100vh;">
    <div class="box">
      <div ref="activityBar"></div>
      <div ref="sidebar"></div>
      <div style="flex: 1; min-width: 0">
        <div style="min-width: 50px;width: 100%;height: 100%;" ref="editors"></div>
      </div>
      <!-- <Editor @ready="init" /> -->
    </div>
    <div style="width: 100%;height: 200px;" ref="panel"></div>
  </div>
</template>

<style scoped>
.tlile {
  display: flex;
  justify-content: center;
  font-weight: 200;
}

.box {
  display: flex;
  height: 80%;
  width: 100vw;
}
</style>
