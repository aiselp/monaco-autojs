<script setup lang="ts">
import Editor from './components/Editor.vue'
import Toolbar from './components/Toolbar.vue'
import BottomShortcut from './components/BottomShortcut.vue';
import { init } from './core/app'

</script>

<template>
  <el-container style="height: 100%;">
    <el-header style="height: 50px;padding: 0;">
      <div class="tlile">
        <Toolbar></Toolbar>
      </div>
    </el-header>
    <el-main style="padding: 0;">
      <Editor @ready="init" />
    </el-main>
    <el-footer style="padding: 0;" @click.stop>
      <BottomShortcut></BottomShortcut>
    </el-footer>
  </el-container>
</template>
<style scoped>
.tlile {
  display: flex;
  justify-content: center;
  font-weight: 200;
  margin-top: 8px;
}
</style>
