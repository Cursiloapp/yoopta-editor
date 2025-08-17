import { UI } from '@yoopta/editor';
import { CSSProperties, useState, RefObject } from 'react';
import { EmbedUploader } from './EmbedUploader';
import { FileUploader } from './FileUploader';
import { FloatingArrow, type FloatingContext } from '@floating-ui/react';

const { Overlay, Portal } = UI;

type Props = {
  floatingStyles: CSSProperties;
  refs: any;
  blockId: string;
  onClose: () => void;
  onSetLoading: (_s: boolean) => void;
  context: FloatingContext;
  arrowRef: RefObject<SVGSVGElement>;
};

type Tab = 'upload' | 'embed';

const VideoUploader = ({ floatingStyles, refs, onClose, blockId, onSetLoading, context, arrowRef }: Props) => {
  const [activeTab, setActiveTab] = useState<Tab>('upload');

  const switchTab = (tab: Tab) => setActiveTab(tab);

  const isUploader = activeTab === 'upload';
  const isEmbed = activeTab === 'embed';

  const getTabStyles = (isActive) => ({
    borderBottom: isActive ? '2px solid #fe4a55' : '2px solid transparent',
  });

  return (
    <Portal id="uploader-portal">
      <Overlay lockScroll className="z-[100]" onClick={onClose}>
        <div ref={refs.setFloating} style={floatingStyles} onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col rounded-[6px] min-w-[540px] max-w-[calc(100vw-24px)] h-full max-h-[420px] bg-[#FFFFFF] shadow-[rgb(15_15_15_/5%)_0px_0px_0px_1px,_rgb(15_15_15_/10%)_0px_3px_6px,_rgb(15_15_15_/20%)_0px_9px_24px]">
            <div className="w-full flex text-[14px] p-[0_8px] shadow-[rgb(55_53_47_/9%)_0px_-1px_0px_inset] relative z-10 h-[40px]">
              {/* Upload Button */}
              <button
                type="button"
                onClick={() => switchTab('upload')}
                style={getTabStyles(isUploader)}
                className={`yoopta-button py-[6px] whitespace-nowrap min-w-0 flex-shrink-0 relative cursor-pointer user-select-none bg-inherit transition-[height_20ms_ease-in] inline-flex items-center h-full text-[14px] leading-[1.2] px-[8px] ${ isUploader ? 'font-medium text-black'
                    : 'font-medium text-[#808080]'
                }`}
              >
                Upload
              </button>

              {/* Embed Button */}
              <button
                type="button"
                onClick={() => switchTab('embed')}
                style={getTabStyles(isEmbed)}
                className={`yoopta-button py-[6px] whitespace-nowrap min-w-0 flex-shrink-0 relative cursor-pointer user-select-none bg-inherit transition-[height_20ms_ease-in] inline-flex items-center h-full text-[14px] leading-[1.2] px-[8px] ${ isEmbed ? 'font-medium text-black'
                    : 'font-medium text-[#808080]'
                }`}
              >
                Video link
              </button>
            </div>

            <div className="p-[6px] mt-[4px] flex justify-center">
              {isEmbed && <EmbedUploader onClose={onClose} blockId={blockId} />}
              {isUploader && <FileUploader onClose={onClose} blockId={blockId} onSetLoading={onSetLoading} />}
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

export { VideoUploader };
