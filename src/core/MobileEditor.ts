import { Uri, editor, Range, Position, Selection } from "monaco-editor";
import EventEmitter from "eventemitter3";

class MobileEditor extends EventEmitter {
  readonly editor: editor.IStandaloneCodeEditor;
  readonly models = new Set<editor.ITextModel>();
  constructor(dom: HTMLElement) {
    super();
    this.editor = editor.create(dom, {
      automaticLayout: true,
      lineNumbersMinChars: 3,
      minimap: {
        enabled: false,
      },
      scrollbar: {
        horizontal: "hidden",
        verticalScrollbarSize: 5,
      },
    });
  }
  revoke(): void {
    this.editor.trigger("keyboard", "undo", null);
  }
  redo(): void {
    this.editor.trigger("keyboard", "redo", null);
  }
  openFile(file: File): void {
    const model = editor.createModel(file.value, file.language, file.uri);
    this.models.add(model);
    this.editor.setModel(model);
  }
  insertText(text: string): void {
    // 获取当前光标位置
    const position = this.editor.getPosition();
    if (!position) return
    const lineNumber = position.lineNumber;
    const column = position.column;
    // 创建编辑操作对象
    const editOperation = {
      range: new Range(lineNumber, column, lineNumber, column),
      text
    };
    // 执行编辑操作
    this.editor.executeEdits('keyboard', [editOperation]);
  }
}
interface File {
  value: string;
  name?: string;
  uri?: Uri;
  language?: string;
  readonly?: boolean;
}

export default MobileEditor;
export type { File };
