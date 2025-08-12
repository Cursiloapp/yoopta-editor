import { YooEditor, YooptaPathIndex } from '@yoopta/editor';
import { CalloutElement, CalloutElementProps, CalloutTheme } from '../types';
type CalloutElementOptions = {
    text?: string;
    props?: Omit<CalloutElementProps, 'nodeType'>;
};
type InsertCalloutOptions = CalloutElementOptions & {
    at?: YooptaPathIndex;
    focus?: boolean;
};
export type CalloutCommands = {
    buildCalloutElements: (editor: YooEditor, options?: Partial<CalloutElementOptions>) => CalloutElement;
    insertCallout: (editor: YooEditor, options?: Partial<InsertCalloutOptions>) => void;
    deleteCallout: (editor: YooEditor, blockId: string) => void;
    updateCalloutTheme: (editor: YooEditor, blockId: string, theme: CalloutTheme) => void;
};
export declare const CalloutCommands: CalloutCommands;
export {};
//# sourceMappingURL=CalloutCommands.d.ts.map