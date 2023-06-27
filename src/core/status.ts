import { ref, computed, watch } from 'vue';
import { useDark, useStorage, refThrottled, syncRefs } from '@vueuse/core'
import { File } from './filesystem/FileProvider'
import { Uri, editor } from 'monaco-editor';
import { getDefaultEditor, saveFile } from './app'


type saveStatus = {
    editor: editor.ICodeEditorViewState | null
    uri?: string
    value?: string
    savedValue?: string
}
export const editorOpenFile = useStorage<saveStatus>('editorOpenFile', {
    editor: null,
})

export const darkModel = useDark()

export const currentText = ref<string>(editorOpenFile.value.value || '')
export const savedText = ref<string>(editorOpenFile.value.savedValue || '')

export const isTextChange = computed<boolean>(() => {
    return savedText.value !== currentText.value
})
const throttled = refThrottled(currentText, 500)


watch(throttled, (v) => {
    const editor = getDefaultEditor()?.editor
    if (!editor) return
    if (!isTextChange.value) {
        editorOpenFile.value = { editor: null }
        return
    }
    editorOpenFile.value = {
        editor: editor.saveViewState() || null,
        uri: getDefaultEditor()?.currentFileUri?.toString(),
        value: v,
        savedValue: savedText.value
    }
})