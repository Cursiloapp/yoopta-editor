import { UI } from '@yoopta/editor';
import { CSSProperties } from 'react';
import { FileUploader } from './FileUploader';

type Props = {
  floatingStyles: CSSProperties;
  refs: any;
  blockId: string;
  onClose: () => void;
  onSetLoading: (_s: boolean) => void;
};
const { Overlay, Portal } = UI;

const ImageUploader = ({ floatingStyles, refs, onClose, blockId, onSetLoading }: Props) => {
  return (
    <Portal id="yoo-image-uploader-portal rounded-lg">
      <Overlay lockScroll className="yoo-image-z-[100]" onClick={onClose}>
        <div ref={refs.setFloating} style={floatingStyles} onClick={(e) => e.stopPropagation()}>
          <div className="yoo-image-flex yoo-image-flex-col yoo-image-rounded-[6px] yoo-image-min-w-[540px] yoo-image-max-w-[calc(100vw-24px)] yoo-image-h-full yoo-image-max-h-[420px] yoo-image-bg-[#FFFFFF] yoo-image-shadow-[rgb(15_15_15_/5%)_0px_0px_0px_1px,_rgb(15_15_15_/10%)_0px_3px_6px,_rgb(15_15_15_/20%)_0px_9px_24px]">
            {/* File Uploader Component */}
            <div className="yoo-image-pt-[6px] yoo-image-pb-[6px] yoo-image-flex yoo-image-justify-center yoo-image-mr-[6px] yoo-image-ml-[6px]">
              <FileUploader onClose={onClose} blockId={blockId} onSetLoading={onSetLoading} />
            </div>
          </div>
        </div>
      </Overlay>
    </Portal>
  );
};

export { ImageUploader };
