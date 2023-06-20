<template >
    <div class="main-box" ref="main">
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const main = ref<HTMLElement>()
const emit = defineEmits<{
    (e: 'ready', dom: HTMLElement): void
}>()
onMounted(function () {
    if (!main.value) return
    emit('ready', main.value)
})
</script>
<style scoped>
.main-box {
    width: 100%;
    height: 100%;
}
</style>