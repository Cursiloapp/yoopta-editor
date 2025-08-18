import { UI } from '@yoopta/editor';
import { CSSProperties, RefObject } from 'react';
import { FileUploader } from './FileUploader';
import { FloatingArrow, type FloatingContext } from '@floating-ui/react';

type Props = {
  floatingStyles: CSSProperties;
  refs: any;
  blockId: string;
  onClose: () => void;
  onSetLoading: (_s: boolean) => void;
  context: FloatingContext;
  arrowRef: RefObject<SVGSVGElement>;
};
const { Overlay, Portal } = UI;

const ImageUploader = ({ floatingStyles, refs, onClose, blockId, onSetLoading, context, arrowRef }: Props) => {
  return (
    <Portal id="uploader-portal rounded-lg">
      <Overlay lockScroll className="z-[100]" onClick={onClose}>
        <div ref={refs.setFloating} style={floatingStyles} onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col rounded-[6px] min-w-[540px] max-w-[calc(100vw-24px)] h-full max-h-[420px] bg-[#FFFFFF] shadow-[rgb(15_15_15_/5%)_0px_0px_0px_1px,_rgb(15_15_15_/10%)_0px_3px_6px,_rgb(15_15_15_/20%)_0px_9px_24px]">
            {/* File Uploader Component */}
            <div className="p-[6px] rounded flex justify-center">
              <FileUploader onClose={onClose} blockId={blockId} onSetLoading={onSetLoading} />
            </div>
          </div>

          <FloatingArrow
            ref={arrowRef}
            context={context}
            width={12}
            height={6}
            tipRadius={1}
            fill="#FFFFFF"
            stroke="rgb(229 231 235)"
            strokeWidth={1}
          />
        </div>
      </Overlay>
    </Portal>
  );
};

export { ImageUploader };
