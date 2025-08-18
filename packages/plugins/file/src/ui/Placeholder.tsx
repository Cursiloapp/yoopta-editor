import { useFloating, inline, flip, shift, offset, arrow } from '@floating-ui/react';
import { useRef } from 'react';
import { FileIcon } from '@radix-ui/react-icons';
import { CSSProperties, useState } from 'react';
import { FilePlaceholderUploader } from './FilePlaceholderUploader';
import { Loader } from './Loader';

const Placeholder = ({ attributes, children, blockId }) => {
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const arrowRef = useRef<SVGSVGElement | null>(null);

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom',
    open: isUploaderOpen,
    onOpenChange: setIsUploaderOpen,
    middleware: [inline(), flip(), shift(), offset(10), arrow({ element: arrowRef })],
  });

  const loadingStyles: CSSProperties = {
    width: '100%',
    transition: 'width 100ms ease-in',
  };

  const onSetLoading = (slate: boolean) => setLoading(slate);

  return (
    <div
      className="w-full user-select-none m-[20px_0_10px] relative flex"
      {...attributes}
      contentEditable={false}
    >
      <button
        type="button"
        className={`yoopta-button p-[12px_36px_12px_12px] flex items-center text-left w-full overflow-hidden rounded-[3px] text-[14px] text-[rgba(55,53,47,0.65)] relative cursor-pointer border-none bg-[#efefef] transition-[background-color_100ms_ease-in] hover:bg-[#e3e3e3]`}
        onClick={() => setIsUploaderOpen(true)}
        ref={refs.setReference}
      >
        {loading ? (
          <Loader className="mr-2 user-select-none" width={24} height={24} />
        ) : (
          <FileIcon className="mr-2 user-select-none" width={24} height={24} />
        )}
        <span className="font-medium">{loading ? 'Loading...' : 'Click to add file'}</span>
        {loading && (
          <div
            className="yoopta-button absolute top-0 left-0 h-full bg-[rgba(55,53,47,0.16)]"
            style={loadingStyles}
          />
        )}
      </button>
      {isUploaderOpen && (
        <FilePlaceholderUploader
          blockId={blockId}
          floatingStyles={floatingStyles}
          context={context}
          arrowRef={arrowRef}
          refs={refs}
          onClose={() => setIsUploaderOpen(false)}
          onSetLoading={onSetLoading}
        />
      )}
      {children}
    </div>
  );
};

export { Placeholder };
