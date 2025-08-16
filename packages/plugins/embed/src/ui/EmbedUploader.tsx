import { CSSProperties } from 'react';
import { UI } from '@yoopta/editor';
import { EmbedLinkUploader } from './EmbedLinkUploader';

type Props = {
  floatingStyles: CSSProperties;
  refs: any;
  blockId: string;
  onClose: () => void;
};

const { Overlay, Portal } = UI;

const EmbedUploader = ({ floatingStyles, refs, onClose, blockId }: Props) => {
  return (
    <Portal id="yoo-embed-uploader-portal">
      <Overlay lockScroll className="yoo-embed-z-[100]" onClick={onClose}>
        <div ref={refs.setFloating} style={floatingStyles} onClick={(e) => e.stopPropagation()}>
          <div className="yoo-embed-flex yoo-embed-flex-col yoo-embed-rounded-[6px] yoo-embed-min-w-[540px] yoo-embed-max-w-[calc(100vw-24px)] yoo-embed-h-full yoo-embed-max-h-[420px] yoo-embed-bg-[#FFFFFF] yoo-embed-shadow-[rgb(15_15_15_/5%)_0px_0px_0px_1px,_rgb(15_15_15_/10%)_0px_3px_6px,_rgb(15_15_15_/20%)_0px_9px_24px]">
            <div className="yoo-embed-pt-[6px] yoo-embed-pb-[6px] yoo-embed-flex yoo-embed-justify-center yoo-embed-mr-[6px] yoo-embed-ml-[6px]">
              <EmbedLinkUploader onClose={onClose} blockId={blockId} />
            </div>
          </div>
        </div>
      </Overlay>
    </Portal>
  );
};

export { EmbedUploader };
