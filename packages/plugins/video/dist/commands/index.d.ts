import { YooEditor, YooptaPathIndex } from '@yoopta/editor';
import { VideoElement, VideoElementProps } from '../types';
type VideoElementOptions = {
    props?: Omit<VideoElementProps, 'nodeType'>;
};
type InsertVideoOptions = VideoElementOptions & {
    at?: YooptaPathIndex;
    focus?: boolean;
};
export type VideoCommands = {
    buildVideoElements: (editor: YooEditor, options?: Partial<VideoElementOptions>) => VideoElement;
    insertVideo: (editor: YooEditor, options?: Partial<InsertVideoOptions>) => void;
    deleteVideo: (editor: YooEditor, blockId: string) => void;
    updateVideo: (editor: YooEditor, blockId: string, props: Partial<VideoElementProps>) => void;
};
export declare const VideoCommands: VideoCommands;
export {};
//# sourceMappingURL=index.d.ts.map