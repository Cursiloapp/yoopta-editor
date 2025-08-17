import { Elements, useYooptaEditor } from '@yoopta/editor';
import { ChangeEvent, useState } from 'react';
import { EmbedElementProps, EmbedPluginElements, EmbedProvider } from '../types';
import { getProvider, ProviderGetters } from '../utils/providers';

const EmbedLinkUploader = ({ blockId, onClose }) => {
  const editor = useYooptaEditor();
  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const embed = () => {
    if (value.length === 0) return;

    const providerType = getProvider(value);
    const embedId = providerType ? ProviderGetters[providerType]?.(value) : null;
    const provider: EmbedProvider = { type: providerType, id: embedId, url: value };

    if (!providerType || !embedId) {
      provider.id = value;
    }

    Elements.updateElement<EmbedPluginElements, EmbedElementProps>(editor, blockId, {
      type: 'embed',
      props: { provider },
    });

    onClose();
  };

  const isEmpty = value.length === 0;

  // shared button class with yoo-embed prefix
  const baseButtonClass =
    'w-full mt-[8px] user-select-none transition-bg duration-20 ease-in cursor-pointer flex items-center justify-center white-space-nowrap h-[32px] rounded-[4px] shadow-[rgba(15,15,15,0.1)_0px_0px_0px_1px_inset,_rgba(15,15,15,0.1)_0px_1px_2px] bg-[rgba(254,74,85,1)] text-white leading-[1.2] px-[12px] text-[14px] font-medium disabled:bg-[rgba(254,74,85,0.5)] disabled:cursor-not-allowed';

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Paste embed link"
        value={value}
        onChange={onChange}
        className="items-center bg-[hsla(45,13%,94%,.6)] rounded-[4px] shadow-[inset_0_0_0_1px_hsla(0,0%,6%,.1)] cursor-text flex text-[14px] h-[32px] leading-[20px] px-[6px] relative w-full border-none"
      />
      <button type="button" className={baseButtonClass} disabled={isEmpty} onClick={embed}>
        Embed link
      </button>
    </div>
  );
};

export { EmbedLinkUploader };
