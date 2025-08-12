import { YooEditor, YooptaPathIndex } from '@yoopta/editor';
import { FileElement, FileElementProps } from '../types';
type FileElementOptions = {
    props?: Omit<FileElementProps, 'nodeType'>;
};
type InsertFileOptions = FileElementOptions & {
    at?: YooptaPathIndex;
    focus?: boolean;
};
export type FileCommands = {
    buildFileElements: (editor: YooEditor, options?: Partial<FileElementOptions>) => FileElement;
    insertFile: (editor: YooEditor, options?: Partial<InsertFileOptions>) => void;
    deleteFile: (editor: YooEditor, blockId: string) => void;
    updateFile: (editor: YooEditor, blockId: string, props: Partial<FileElementProps>) => void;
};
export declare const FileCommands: FileCommands;
export {};
//# sourceMappingURL=index.d.ts.map