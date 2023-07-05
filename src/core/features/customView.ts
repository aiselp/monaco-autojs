import { IDialogService } from 'vscode/services'
import { registerCustomView, ViewContainerLocation } from 'vscode/service-override/views'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
// import iconUrl from '../Visual_Studio_Code_1.35_icon.svg?url'

registerCustomView({
  id: 'custom-view',
  name: 'Custom demo view',
  order: 0,
  renderBody: function (container: HTMLElement): monaco.IDisposable {
    container.style.display = 'flex'
    container.style.alignItems = 'center'
    container.style.justifyContent = 'center'
    container.innerHTML = 'This is a custom view<br />You can render anything you want here'

    return {
      dispose() {
      }
    }
  },
  location: ViewContainerLocation.Panel,
  actions: [{
    id: 'custom-action',
    title: 'Custom action',
    render(element) {
      const button = document.createElement('button')
      button.innerText = 'Ugly button'
      button.style.height = '30px'
      button.onclick = () => {
        alert('What did you expect?')
      }
      element.append(button)
    }
  }, {
    id: 'custom-action2',
    title: 'Custom action2',
    icon: 'dialogInfo',
    async run(accessor) {
      void accessor.get(IDialogService).info('This is a custom view action button')
    }
  }]
})
