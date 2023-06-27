import { Uri, editor, Range, Position, Selection } from "monaco-editor";
import EventEmitter from "eventemitter3";
import { File } from './filesystem/FileProvider'

const editorOptions: editor.IStandaloneEditorConstructionOptions = {
  automaticLayout: true,
  lineNumbersMinChars: 3,
  minimap: {
    enabled: false,
  },
  scrollbar: {
    horizontal: "hidden",
    verticalScrollbarSize: 5,
  },
}

class MobileEditor extends EventEmitter {
  readonly editor: editor.IStandaloneCodeEditor;
  readonly models = new Map<Uri, editor.ITextModel>();
  currentFileUri: Uri | null = null;

  constructor(dom: HTMLElement) {
    super();
    this.editor = editor.create(dom, editorOptions);
    dom.addEventListener('touchstart', (e) => {
      // console.log("onMouseDown")
      document.body.dispatchEvent(new Event('click'));
    })
  }
  revoke(): void {
    this.editor.trigger("keyboard", "undo", null);
  }
  redo(): void {
    this.editor.trigger("keyboard", "redo", null);
  }
  openFile(file: File): void {
    const model = editor.createModel(file.value, file.language, file.uri);
    this.models.set(file.uri, model);
    this.currentFileUri = file.uri;
    this.editor.setModel(model);
  }
  insertText(text: string): void {
    this.editor.trigger("keyboard", "type", { text });
  }
  closeFile(uri: Uri): void {
    const model = this.models.get(uri)
    model?.dispose();
  }
}



export default MobileEditor;
