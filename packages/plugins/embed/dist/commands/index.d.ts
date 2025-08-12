import { YooEditor, YooptaPathIndex } from '@yoopta/editor';
import { EmbedElement, EmbedElementProps, EmbedSizes } from '../types';
type EmbedElementOptions = {
    props?: {
        sizes?: EmbedSizes;
        provider?: {
            url: string;
        };
    };
};
type InsertEmbedOptions = EmbedElementOptions & {
    at?: YooptaPathIndex;
    focus?: boolean;
};
export type EmbedCommands = {
    buildEmbedElements: (editor: YooEditor, options?: Partial<EmbedElementOptions>) => EmbedElement;
    insertEmbed: (editor: YooEditor, options?: Partial<InsertEmbedOptions>) => void;
    deleteEmbed: (editor: YooEditor, blockId: string) => void;
    updateEmbed: (editor: YooEditor, blockId: string, props: Partial<EmbedElementProps>) => void;
};
export declare const EmbedCommands: EmbedCommands;
export {};
//# sourceMappingURL=index.d.ts.map