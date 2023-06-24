import MobileEditor from "./MobileEditor";
import EventEmitter from "eventemitter3";
import { jsCode } from "./testdata";

const event = new EventEmitter();
const isDev = import.meta.env.DEV;

let globalApp: MobileEditor | null = null;

export function init(dom: HTMLElement) {
  globalApp = new MobileEditor(dom);
  //   if (isDev) {
  globalApp.openFile({
    value: jsCode,
    language: "javascript",
  });
  //}

  event.emit("ready");
}
export function getDefaultEditor(): MobileEditor | null {
  return globalApp;
}
export function insertText(text: string): void {
  globalApp?.insertText(text);
  globalApp?.editor.focus();
}

export default event;
