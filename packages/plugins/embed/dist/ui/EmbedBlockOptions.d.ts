import { YooEditor, YooptaBlockData } from '@yoopta/editor';
import { EmbedElementProps } from '../types';
type Props = {
    editor: YooEditor;
    block: YooptaBlockData;
    props?: EmbedElementProps;
};
declare const EmbedBlockOptions: ({ editor, block, props: embedProps }: Props) => import("react/jsx-runtime").JSX.Element;
export { EmbedBlockOptions };
//# sourceMappingURL=EmbedBlockOptions.d.ts.map