
import { ElMessage } from 'element-plus'
import { autox, JsBridge, Result, FileRequest } from './javainterface.d';
import event, { getDefaultEditor, setFileProvider, requestFile } from '../core/app'
import MobileEditor from '../core/MobileEditor'
import { FileProvider } from '../core/filesystem/FileProvider'
import { Uri } from 'monaco-editor';

let editor: MobileEditor | null

class TextFileProvider implements FileProvider {
    $autox: JsBridge
    constructor($autox: JsBridge) {
        this.$autox = $autox
    }

    read(uri: Uri): Promise<string> {
        const req: FileRequest = {
            uri: uri.toString(),
            type: 'read',
        }
        return new Promise<string>((resolve, reject) => {
            console.log("请求文件：", uri.toString())
            this.$autox.callHandler("readFile", JSON.stringify(req), function (data: string) {
                // console.log("请求结束：", data)
                const result: Result = JSON.parse(data)
                if (result.state) {
                    return resolve(result.value!)
                } else {
                    return reject(new Error(result.errMessage))
                }
            })
        })
    }
    readdir(uri: Uri): Promise<string[]> {
        throw new Error('Method not implemented.');
    }
    write(uri: Uri, text: string): Promise<boolean> {
        const req: FileRequest = {
            uri: uri.toString(),
            type: 'write',
            data: text
        }
        return new Promise<boolean>((resolve, reject) => {
            this.$autox.callHandler('writeFile', JSON.stringify(req), (data) => {
                const result: Result = JSON.parse(data)
                if (result.state) {
                    return resolve(!!result.value)
                } else {
                    return reject(new Error(result.errMessage))
                }
            })
        })
    }
    delete(uri: Uri): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}



event.on("ready", () => {
    editor = getDefaultEditor()
    autox.then(($autox) => {
        //ElMessage("ready");
        $autox.registerHandler('test', (data, callback) => {
            ElMessage("test:" + data)
            callback("web回调")
        })
        setFileProvider(new TextFileProvider($autox))
        $autox.registerHandler("openFile", (data) => {
            const { naem, path } = JSON.parse(data)
            if (path) {
                requestFile(path)
            }
        })
        $autox.registerHandler("InputClose", () => {
            console.log("Closed")
            const activeElement = document.activeElement;
            if (activeElement) {
                (activeElement as any).blur();
            }

        })
        $autox.callHandler("init")
    })
})

