import { YooEditor, YooptaBlockData } from '@yoopta/editor';
import { VideoElementProps } from '../types';
type Props = {
    editor: YooEditor;
    block: YooptaBlockData;
    props?: VideoElementProps;
    settings?: VideoElementProps['settings'];
};
declare const VideoBlockOptions: ({ editor, block, props: videoProps }: Props) => import("react/jsx-runtime").JSX.Element;
export { VideoBlockOptions };
//# sourceMappingURL=VideoBlockOptions.d.ts.map