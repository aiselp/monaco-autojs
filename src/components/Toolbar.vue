<template >
    <el-button-group>
        <el-button text bg type="primary" :size="buttonSize">文件</el-button>
        <el-button @click="showClick" text bg type="primary" :size="buttonSize" :icon="Edit">编辑</el-button>
        <el-dropdown ref="dropdown" trigger="click">
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="find">查找/替换</el-dropdown-item>
                    <el-dropdown-item @click="goto">跳转</el-dropdown-item>
                    <el-dropdown-item>折叠/展开</el-dropdown-item>
                    <el-dropdown-item @click="execCommand">执行命令</el-dropdown-item>
                    <el-dropdown-item @click="formatDocument" divided>格式化文档</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <el-button @click="editor?.revoke()" text bg type="primary" :size="buttonSize">撤销</el-button>
        <el-button @click="editor?.redo()" text bg type="primary" :size="buttonSize">重做</el-button>
        <el-button bg type="primary" @click="noTodo" :size="buttonSize" :icon="CaretRight">运行</el-button>
        <el-button bg type="primary" :size="buttonSize" :icon="Collection">保存</el-button>
    </el-button-group>
</template>
<script setup lang="ts">
import MobileEditor from '../core/MobileEditor';
import type { DropdownInstance } from 'element-plus'
import { ref } from 'vue';
import { Edit, Collection, CaretRight } from '@element-plus/icons-vue'
import app, { getDefaultEditor } from '../core/app'
import { ElMessage } from 'element-plus'

const buttonSize = ref<'small' | 'default' | 'large'>("small")
const dropdown = ref<DropdownInstance>()
function showClick() {
    dropdown.value?.handleOpen()
}
function execCommand() {
    setTimeout(() => {
        editor?.editor.focus();
        editor?.editor.trigger('editor', 'editor.action.quickCommand', {});
    }, 100)
}
function find() {
    editor?.editor.trigger('editor', 'actions.find', {});
}
function goto() {
    setTimeout(() => {
        editor?.editor.focus();
        editor?.editor.trigger('editor', 'editor.action.gotoLine', {});
    }, 100)
}
function formatDocument() {
    const formatCommand = 'editor.action.formatDocument';
    // 触发格式化命令
    editor?.editor.trigger('editor', formatCommand, {});
}
function noTodo() {
    ElMessage("暂未实现")

}
let editor: MobileEditor | null = null;
app.on('ready', () => {
    editor = getDefaultEditor()
})

</script>
<style scoped></style>