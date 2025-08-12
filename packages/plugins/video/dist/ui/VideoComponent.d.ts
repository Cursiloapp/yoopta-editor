import { RenderElementProps } from 'slate-react';
import { VideoElementProps } from '../types';
type VideoComponentProps = Omit<VideoElementProps, 'sizes'> & {
    width: number | string;
    height: number | string;
} & Pick<RenderElementProps, 'attributes' | 'children'>;
declare const VideoComponent: ({ width, height, src, bgColor, poster, provider, fit, attributes, children, }: VideoComponentProps) => import("react/jsx-runtime").JSX.Element;
export { VideoComponent, VideoComponentProps };
//# sourceMappingURL=VideoComponent.d.ts.map