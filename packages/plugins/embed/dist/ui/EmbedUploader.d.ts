import { CSSProperties, RefObject } from 'react';
import { type FloatingContext } from '@floating-ui/react';
type Props = {
    floatingStyles: CSSProperties;
    refs: any;
    blockId: string;
    onClose: () => void;
    context: FloatingContext;
    arrowRef: RefObject<SVGSVGElement>;
};
declare const EmbedUploader: ({ floatingStyles, refs, onClose, blockId, context, arrowRef }: Props) => import("react/jsx-runtime").JSX.Element;
export { EmbedUploader };
//# sourceMappingURL=EmbedUploader.d.ts.map