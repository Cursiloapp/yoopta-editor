import { Elements, useYooptaEditor, useYooptaPluginOptions } from '@yoopta/editor';
import { ImageElementProps, ImagePluginElements, ImagePluginOptions } from '../types';
import { limitSizes } from '../utils/limitSizes';

type Props = {
  onClose: () => void;
  blockId: string;
  accept?: string;
  onSetLoading: (_s: boolean) => void;
};

const FileUploader = ({ accept = 'image/*', onClose, blockId, onSetLoading }: Props) => {
  const options = useYooptaPluginOptions<ImagePluginOptions>('Image');
  const editor = useYooptaEditor();

  const upload = async (file: File) => {
    if (!options?.onUpload) {
      console.warn('onUpload not provided');
      return;
    }
    onClose();
    onSetLoading(true);

    try {
      const data = await options?.onUpload(file);
      const defaultImageProps = editor.plugins.Image.elements.image.props as ImageElementProps;

      const image = new window.Image();
      image.src = data.src || '';
      image.onload = () => {
        const newSizes = { width: image.naturalWidth, height: image.naturalHeight };
        const maxSizes = (editor.plugins.Image.options as ImagePluginOptions)?.maxSizes;
        const limitedSizes = limitSizes(newSizes, {
          width: maxSizes?.maxWidth,
          height: maxSizes?.maxHeight,
        });

        Elements.updateElement<ImagePluginElements, ImageElementProps>(editor, blockId, {
          type: 'image',
          props: {
            src: data.src,
            alt: data.alt,
            sizes: limitedSizes,
            bgColor: data.bgColor || defaultImageProps.bgColor,
            fit: data.fit || defaultImageProps.fit || 'fill',
          },
        });
        onSetLoading(false);
      };
      image.onerror = (error) => {
        options?.onError?.(error);
        onSetLoading(false);
      };
    } catch (error) {
      options?.onError?.(error);
      onSetLoading(false);
    }
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    if (file) upload(file);
  };

  return (
    <div className="user-select-none transition-bg duration-20 ease-in white-space-nowrap rounded-[4px] h-[32px] px-[12px] border border-solid border-[rgba(55,53,47,0.16)] w-full cursor-pointer bg-[#fe4a55] text-[#fff]">
      <label
        htmlFor="image-uploader"
        className="text-[14px] leading-[1.2] font-medium cursor-pointer w-full flex items-center justify-center h-full"
      >
        <input
          type="file"
          id="image-uploader"
          className="absolute left-0 top-0 invisible"
          accept={options?.accept || accept}
          onChange={onChange}
          multiple={false}
        />
        Upload image
      </label>
    </div>
  );
};

export { FileUploader };
