declare namespace AutoxService {
  declare function saveFile(filename: string): void;
}


interface JsBridge {
  callHandler(event: string, data?: string, callback?: (data: string) => void): void
  registerHandler(event: string,
    handle: (data: string, callback: (data: string) => void) => void): void
}

let autox: Promise<JsBridge> = new Promise(function (re) {
  document.addEventListener('AutoxJsBridgeReady', () => {
    re(window.$autox)
  })
})
interface Result {
  state: boolean,
  value?: string,
  errMessage?: string,
  uri?: string,
}
interface FileRequest {
  uri: string,
  type: string,
  data?: string,
}
export default AutoxService;
export { autox }
export type { JsBridge, Result, FileRequest }