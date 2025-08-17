import { Elements, useYooptaEditor, useYooptaPluginOptions } from '@yoopta/editor';
import { VideoElementProps, VideoPluginElements, VideoPluginOptions } from '../types';
import { limitSizes } from '../utils/limitSizes';

type Props = {
  onClose: () => void;
  blockId: string;
  accept?: string;
  onSetLoading: (_s: boolean) => void;
};

const FileUploader = ({ accept = 'video/*', onClose, blockId, onSetLoading }: Props) => {
  const options = useYooptaPluginOptions<VideoPluginOptions>('Video');
  const editor = useYooptaEditor();

  const upload = async (file: File) => {
    if (!options?.onUpload) {
      throw new Error('onUpload not provided in plugin options. Check Video.extend({}) method');
    }
    onClose();
    onSetLoading(true);

    try {
      const data = await options?.onUpload(file);
      const defaultVideoProps = editor.plugins.Video.elements.video.props as VideoElementProps;
      const sizes = data.sizes || defaultVideoProps.sizes;
      const maxSizes = (editor.plugins.Image.options as VideoPluginOptions)?.maxSizes;
      const limitedSizes = limitSizes(sizes!, {
        width: maxSizes!.maxWidth!,
        height: maxSizes!.maxHeight!,
      });

      Elements.updateElement<VideoPluginElements, VideoElementProps>(editor, blockId, {
        type: 'video',
        props: {
          src: data.src,
          sizes: limitedSizes,
          bgColor: data.bgColor || defaultVideoProps.bgColor,
          fit: data.fit || defaultVideoProps.fit || 'cover',
          settings: data.settings || defaultVideoProps.settings,
          poster: data.poster || defaultVideoProps.poster,
        },
      });
    } catch (error) {
      options?.onError?.(error);
    } finally {
      onSetLoading(false);
    }
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    if (file) upload(file);
  };

  const baseButtonClass =
    'w-full user-select-none transition-bg duration-20 ease-in cursor-pointer flex items-center justify-center white-space-nowrap h-[32px] rounded-[4px] shadow-[rgba(15,15,15,0.1)_0px_0px_0px_1px_inset,_rgba(15,15,15,0.1)_0px_1px_2px] bg-[rgba(254,74,85,1)] text-white leading-[1.2] px-[12px] text-[14px] font-medium';

  return (
    <div className="user-select-none transition-bg duration-20 ease-in white-space-nowrap w-full">
      <div className="flex justify-between w-full items-center mt-2 mb-1">
        {/* Upload Video Button */}
        <div className="flex items-center w-full justify-start">
          <label htmlFor="video-uploader" className={baseButtonClass}>
            <input
              type="file"
              id="video-uploader"
              className="absolute left-0 top-0 invisible h-[28px] rounded-[4px] shadow-[rgba(15,15,15,0.1)_0px_0px_0px_1px_inset,_rgba(15,15,15,0.1)_0px_1px_2px] bg-[rgba(254,74,85,1)] text-white fill-white leading-[1.2] px-[12px] text-[14px] font-medium w-full"
              accept={options?.accept || accept}
              onChange={onChange}
              multiple={false}
            />
            Upload video
          </label>
        </div>
      </div>
    </div>
  );
};

export { FileUploader };
