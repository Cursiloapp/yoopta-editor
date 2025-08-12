import { RenderElementProps } from 'slate-react';
import { EmbedElementProps } from '../types';
type EmbedComponentProps = Omit<EmbedElementProps, 'sizes'> & {
    width: number | 'auto';
    height: number | 'auto';
    blockId: string;
} & Pick<RenderElementProps, 'attributes' | 'children'>;
declare const EmbedComponent: ({ width, height, provider, blockId, attributes, children }: EmbedComponentProps) => import("react/jsx-runtime").JSX.Element | null;
export { EmbedComponent, EmbedComponentProps };
//# sourceMappingURL=EmbedComponent.d.ts.map