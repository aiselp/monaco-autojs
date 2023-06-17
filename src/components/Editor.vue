<template >
    <div class="main-box" ref="main">
    </div>
</template>
<script setup lang="ts">
import * as monaco from 'monaco-editor';
import { ref, onMounted } from 'vue';

const main = ref<HTMLElement>()
var jsCodeArr = [
    "// ------------------------------",
    "// ------------------------------",
    "function Person(age) {",
    "	if (age) {",
    "		this.age = age;",
    "	}",
    "}",
    "Person.prototype.getAge = function () {",
    "	return this.age;",
    "};",
    "",
    "",
];

jsCodeArr = jsCodeArr.concat(jsCodeArr.slice(0));
jsCodeArr = jsCodeArr.concat(jsCodeArr.slice(0));
jsCodeArr = jsCodeArr.concat(jsCodeArr.slice(0));

jsCodeArr[49] +=
    "And this is some long line. And this is some long line. And this is some long line. And this is some long line. And this is some long line. ";


onMounted(function () {
    if (!main.value) return
    monaco.editor.create(main.value, {
        value: jsCodeArr.join('\n'),
        language: 'javascript',
        automaticLayout: true,
        lineNumbersMinChars: 3,
        minimap: {
            enabled: false
        },
        scrollbar: {
            horizontal: 'hidden',
            verticalScrollbarSize: 5
        }
    });
})
</script>
<style scoped>
.main-box {
    width: 100%;
    height: 100%;
}
</style>