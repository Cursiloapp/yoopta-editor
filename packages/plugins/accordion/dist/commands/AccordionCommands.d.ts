import { YooEditor, YooptaPathIndex } from '@yoopta/editor';
import { AccordionListElement, AccordionListItemProps } from '../types';
type AccordionElementOptions = {
    items?: number;
    props: AccordionListItemProps;
};
type InsertAccordionOptions = AccordionElementOptions & {
    at?: YooptaPathIndex;
    focus?: boolean;
};
export type AccordionCommands = {
    buildAccordionElements: (editor: YooEditor, options?: Partial<AccordionElementOptions>) => AccordionListElement;
    insertAccordion: (editor: YooEditor, options?: Partial<InsertAccordionOptions>) => void;
    deleteAccordion: (editor: YooEditor, blockId: string) => void;
};
export declare const AccordionCommands: AccordionCommands;
export {};
//# sourceMappingURL=AccordionCommands.d.ts.map