<template >
    <el-button-group>
        <el-button bg type="primary" @click="requseFile" :size="buttonSize">文件</el-button>
        <el-button @click="showClick" bg type="primary" :size="buttonSize" :icon="Edit">编辑</el-button>
        <el-dropdown ref="dropdown" trigger="click">
            <div class="edit"></div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="find">查找/替换</el-dropdown-item>
                    <el-dropdown-item @click="goto">跳转</el-dropdown-item>
                    <el-dropdown-item @click="foldAll = !foldAll">{{ foldAll ? '展开所有' : '折叠所有' }}</el-dropdown-item>
                    <el-dropdown-item @click="execCommand">执行命令</el-dropdown-item>
                    <el-dropdown-item @click="formatDocument" divided>格式化文档</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <el-button @click="editor?.revoke()" bg type="primary" :size="buttonSize">撤销</el-button>
        <el-button @click="editor?.redo()" bg type="primary" :size="buttonSize">重做</el-button>
        <el-button bg type="primary" @click="noTodo" :size="buttonSize" :icon="CaretRight">运行</el-button>
        <el-button bg type="primary" @click="save" :size="buttonSize" :disabled="!isTextChange"
            :icon="Collection">保存</el-button>
    </el-button-group>
</template>
<script setup lang="ts">
import MobileEditor from '../core/MobileEditor';
import { DropdownInstance, ElMessageBox } from 'element-plus'
import { ref, watch } from 'vue';
import { Edit, Collection, CaretRight } from '@element-plus/icons-vue'
import app, { getDefaultEditor, requestFile, saveFile } from '../core/app'
import { ElMessage } from 'element-plus'
import { isTextChange } from '../core/status'

const buttonSize = ref<'small' | 'default' | 'large'>("small")
const dropdown = ref<DropdownInstance>()
const foldAll = ref<boolean>(false)
watch(foldAll, (newVal) => {
    if (newVal) {
        editor?.editor.trigger('editor', 'editor.foldAll', {});
    } else editor?.editor.trigger('editor', 'editor.unfoldAll', {});
})
function requseFile() {
    ElMessageBox.prompt("请输入文件路径:").then(({ value }) => {
        requestFile(value)
    })
}
function save() {
    saveFile().then((b) => {
        if (b) {
            ElMessage.success('保存成功')
        } else throw new Error('失败')
    }).catch((e: Error) => {
        ElMessage.error("保存失败：" + e.message)
    })
    editor?.editor.focus()
}
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
    setTimeout(() => {
        editor?.editor.trigger('editor', 'actions.find', {});
        editor?.editor.focus();
    }, 100)
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
<style scoped>
.edit {
    position: relative;
    display: none;
}
</style>