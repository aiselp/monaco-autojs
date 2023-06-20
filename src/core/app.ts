import MobileEditor from "./MobileEditor";
import EventEmitter from "eventemitter3";
import { jsCode } from "./testdata";

const ee = new EventEmitter();
const isDev = import.meta.env.DEV;

let globalApp: MobileEditor | null = null;

function init(dom: HTMLElement) {
  globalApp = new MobileEditor(dom);
  //   if (isDev) {
  globalApp.openFile({
    value: jsCode,
    language: "javascript",
  });
  //}

  ee.emit("ready");
}
function getDefaultEditor(): MobileEditor | null {
  return globalApp;
}

export default ee;
export { init, getDefaultEditor };
