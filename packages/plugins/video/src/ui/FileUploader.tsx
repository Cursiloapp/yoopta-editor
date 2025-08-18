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
    'yoo-video-w-full yoo-video-user-select-none yoo-video-transition-bg yoo-video-duration-20 yoo-video-ease-in yoo-video-cursor-pointer yoo-video-flex yoo-video-items-center yoo-video-justify-center yoo-video-white-space-nowrap yoo-video-h-[32px] yoo-video-rounded-[4px] yoo-video-shadow-[rgba(15,15,15,0.1)_0px_0px_0px_1px_inset,_rgba(15,15,15,0.1)_0px_1px_2px] yoo-video-bg-[rgba(254,74,85,1)] yoo-video-text-white yoo-video-leading-[1.2] yoo-video-px-[12px] yoo-video-text-[14px] yoo-video-font-medium';

  return (
    <div className="yoo-video-user-select-none yoo-video-transition-bg yoo-video-duration-20 yoo-video-ease-in yoo-video-white-space-nowrap yoo-video-w-full">
      <div className="yoo-video-flex yoo-video-justify-between yoo-video-w-full yoo-video-items-center yoo-video-mt-2 yoo-video-mb-1">
        {/* Upload Video Button */}
        <div className="yoo-video-flex yoo-video-items-center yoo-video-w-full yoo-video-justify-start">
          <label htmlFor="video-uploader" className={baseButtonClass}>
            <input
              type="file"
              id="video-uploader"
              className="yoo-video-absolute yoo-video-left-0 yoo-video-top-0 yoo-video-invisible yoo-video-h-[28px] yoo-video-rounded-[4px] yoo-video-shadow-[rgba(15,15,15,0.1)_0px_0px_0px_1px_inset,_rgba(15,15,15,0.1)_0px_1px_2px] yoo-video-bg-[rgba(254,74,85,1)] yoo-video-text-white yoo-video-fill-white yoo-video-leading-[1.2] yoo-video-px-[12px] yoo-video-text-[14px] yoo-video-font-medium yoo-video-w-full"
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
