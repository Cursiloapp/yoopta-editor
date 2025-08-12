import { FileElementProps } from '../types';
type FileComponentProps = Partial<FileElementProps> & {
    blockId: string;
    align?: 'left' | 'center' | 'right';
};
declare const FileComponent: ({ name, src, size, format, align }: FileComponentProps) => import("react/jsx-runtime").JSX.Element | null;
export { FileComponent, FileComponentProps };
//# sourceMappingURL=FileComponent.d.ts.map