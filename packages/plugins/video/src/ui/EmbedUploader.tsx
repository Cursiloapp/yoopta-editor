import { Elements, useYooptaEditor } from '@yoopta/editor';
import { ChangeEvent, useState } from 'react';
import { VideoElementProps, VideoPluginElements } from '../types';
import { getProvider, ProviderGetters } from '../utils/providers';

const EmbedUploader = ({ blockId, onClose }) => {
  const editor = useYooptaEditor();
  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const embed = () => {
    if (value.length === 0) return;

    const providerType = getProvider(value);
    const videoId = providerType ? ProviderGetters[providerType]?.(value) : null;

    if (!providerType || !videoId) return console.warn('Unsupported video provider or video id is not found.');

    Elements.updateElement<VideoPluginElements, VideoElementProps>(editor, blockId, {
      type: 'video',
      props: {
        src: value,
        provider: { type: providerType, id: videoId, url: value },
      },
    });

    onClose();
  };

  const baseButtonClass =
    'w-full user-select-none transition-bg duration-20 ease-in cursor-pointer flex items-center justify-center white-space-nowrap h-[32px] rounded-[4px] shadow-[rgba(15,15,15,0.1)_0px_0px_0px_1px_inset,_rgba(15,15,15,0.1)_0px_1px_2px] bg-[rgba(254,74,85,1)] text-white leading-[1.2] px-[12px] text-[14px] font-medium';
  const isEmpty = value.length === 0;

  return (
    <div className="cursor-pointer user-select-none transition-bg duration-20 ease-in white-space-nowrap w-full">
      <input
        type="text"
        placeholder="Paste video link"
        value={value}
        className="items-center bg-[hsla(45,13%,94%,.6)] rounded-[4px] shadow-[inset_0_0_0_1px_hsla(0,0%,6%,.1)] cursor-text flex text-[14px] h-[32px] leading-[20px] px-[6px] mt-2 relative w-full border-none"
        onChange={onChange}
      />
      <div className="flex w-full justify-between items-center mt-2 mb-1">
        {/* Embed Video Button */}
        <button
          type="button"
          className={`${baseButtonClass} disabled:bg-[rgba(254,74,85,0.5)] disabled:cursor-not-allowed`}
          disabled={isEmpty}
          onClick={embed}
        >
          Embed video
        </button>
      </div>
    </div>
  );
};

export { EmbedUploader };
