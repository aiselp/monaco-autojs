import { Uri } from 'monaco-editor'

interface FileProvider {
    read(uri: Uri): Promise<string>
    readdir(uri: Uri): Promise<Array<string>>
    write(uri: Uri, text: string): Promise<boolean>
    delete(uri: Uri): Promise<boolean>
}
interface File {
    value: string;
    name?: string;
    uri: Uri;
    language?: string;
    readonly?: boolean;
}

export type { FileProvider, File }