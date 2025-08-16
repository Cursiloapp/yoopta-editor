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

const FilePlaceholderUploader = ({ floatingStyles, refs, onClose, blockId, onSetLoading }: Props) => {
  return (
    <Portal id="yoo-file-uploader-portal">
      <Overlay lockScroll className="yoo-file-z-[100]" onClick={onClose}>
        <div ref={refs.setFloating} style={floatingStyles} onClick={(e) => e.stopPropagation()}>
          <div className="yoo-file-flex yoo-file-flex-col yoo-file-rounded-[6px] yoo-file-min-w-[540px] yoo-file-max-w-[calc(100vw-24px)] yoo-file-h-full yoo-file-max-h-[420px] yoo-file-bg-[#FFFFFF] yoo-file-shadow-[rgb(15_15_15_/5%)_0px_0px_0px_1px,_rgb(15_15_15_/10%)_0px_3px_6px,_rgb(15_15_15_/20%)_0px_9px_24px]">
            <div className="yoo-file-pt-[6px] yoo-file-pb-[6px] yoo-file-flex yoo-file-justify-center yoo-file-mr-[6px] yoo-file-ml-[6px]">
              <FileUploader onClose={onClose} blockId={blockId} onSetLoading={onSetLoading} />
            </div>
          </div>
        </div>
      </Overlay>
    </Portal>
  );
};

export { FilePlaceholderUploader };
