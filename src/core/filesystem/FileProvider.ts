import { Uri } from 'monaco-editor'

interface FileProvider {
    read(uri: Uri): Promise<string>
    readdir(uri: Uri): Promise<Array<string>>
    write(uri: Uri, text: string): Promise<void>
    delete(uri: Uri): Promise<void>
}


export type { FileProvider }