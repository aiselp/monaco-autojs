import MobileEditor from "./MobileEditor";
import EventEmitter from "eventemitter3";
import { Uri, editor, Range, Position, Selection } from "monaco-editor";
import { jsCode } from "./testdata";
import { darkModel, currentText, savedText, editorOpenFile, isTextChange } from './status'
import { FileProvider, File } from './filesystem/FileProvider'
import { ElMessage, ElMessageBox } from 'element-plus'

export const event = new EventEmitter();
const isDev = import.meta.env.DEV;

let globalApp: MobileEditor | null = null;
let fileProvider: FileProvider | null = null;

function editorEventWith(mobileEditor: MobileEditor) {
  const editor = mobileEditor.editor;
  editor.onDidChangeModelContent(() => {
    currentText.value = editor.getValue();
  })
}
export function init(dom: HTMLElement) {
  globalApp = new MobileEditor(dom);
  editorEventWith(globalApp)
  if (editorOpenFile.value.uri) {
    globalApp.openFile({
      uri: Uri.parse(editorOpenFile.value.uri),
      value: editorOpenFile.value.value || "",
    })
    globalApp.editor.restoreViewState(editorOpenFile.value.editor)
  } else if (isDev) {
    openFile({
      value: jsCode,
      language: "javascript",
      uri: new Uri()
    });
  }

  event.emit("ready");
}
export async function openFile(file: File) {
  if (!globalApp) return;
  if (isTextChange.value) {
    try {
      await ElMessageBox.confirm("有未保存的更改，是否继续？")
    } catch (e) {
      return
    }
  }
  currentText.value = file.value;
  savedText.value = file.value
  globalApp.openFile(file)
}
export const setFileProvider = (p: FileProvider) => {
  fileProvider = p;
  event.emit("fileprovider-ready");
}
export function getDefaultEditor(): MobileEditor | null {
  return globalApp;
}
export function insertText(text: string): void {
  globalApp?.insertText(text);
}
export async function saveFile(): Promise<boolean> {
  if (globalApp && fileProvider) {
    const uri = globalApp.currentFileUri
    if (!uri) return false
    const text = globalApp.editor.getValue()
    const b = await fileProvider.write(uri, text)
    if (b) {
      savedText.value = text
      editorOpenFile.value = {
        editor: null
      }
    }
    return b;
  } else return false
}
export async function requestFile(uri: string): Promise<void> {
  const u = Uri.parse(uri)
  if (!fileProvider) return console.warn("未设置文件提供器");
  let data: string
  try {
    data = await fileProvider.read(u)
  } catch (e) {
    ElMessage.error(`打开文件失败：${e instanceof Error ? e.message : e}`)
    return
  }
  openFile({
    uri: u,
    value: data
  })
}
export default event;
