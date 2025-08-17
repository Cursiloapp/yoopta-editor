import { CSSProperties, RefObject } from 'react';
import { type FloatingContext } from '@floating-ui/react';
type Props = {
    floatingStyles: CSSProperties;
    refs: any;
    blockId: string;
    onClose: () => void;
    onSetLoading: (_s: boolean) => void;
    context: FloatingContext;
    arrowRef: RefObject<SVGSVGElement>;
};
declare const VideoUploader: ({ floatingStyles, refs, onClose, blockId, onSetLoading, context, arrowRef }: Props) => import("react/jsx-runtime").JSX.Element;
export { VideoUploader };
//# sourceMappingURL=VideoUploader.d.ts.map