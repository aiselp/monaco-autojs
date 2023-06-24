
import { ElMessage } from 'element-plus'
import { autox } from './javainterface.d';
import event, { getDefaultEditor } from '../core/app'
import MobileEditor from '../core/MobileEditor'

let editor: MobileEditor | null

autox.then(($autox) => {
    ElMessage("ready");
    $autox.registerHandler('test', (data, callback) => {
        ElMessage("test:" + data)
        callback("web回调")
    })
})

event.on("ready", () => {
    editor = getDefaultEditor()
})

