declare namespace AutoxService {
  declare function saveFile(filename: string): void;
}


interface JsBridge {
  callHandle(data: string, callback: () => void): void
  registerHandler(event: string,
    handle: (data: string, callback: (data: string) => void) => void): void
}

let autox: Promise<JsBridge> = new Promise(function (re) {
  document.addEventListener('AutoxJsBridgeReady', () => {
    re(window.$autox)
  })
})
export default AutoxService;
export { autox }