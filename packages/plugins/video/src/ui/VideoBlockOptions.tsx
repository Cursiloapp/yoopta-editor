import { Elements, UI, useYooptaPluginOptions, YooEditor, YooptaBlockData } from '@yoopta/editor';
import { RowSpacingIcon, SizeIcon, WidthIcon, ExternalLinkIcon, ImageIcon, UpdateIcon } from '@radix-ui/react-icons';
import { VideoElementProps, VideoPluginElements, VideoPluginOptions } from '../types';
import CheckmarkIcon from '../icons/checkmark.svg';
import DownloadIcon from '../icons/download.svg';
import { useState } from 'react';
import { Loader } from './Loader';

const { ExtendedBlockActions, BlockOptionsMenuGroup, BlockOptionsMenuItem, BlockOptionsSeparator } = UI;

type Props = {
  editor: YooEditor;
  block: YooptaBlockData;
  props?: VideoElementProps;
  settings?: VideoElementProps['settings'];
};

type Loaders = 'poster' | 'video';
const DEFAULT_LOADER_STATE: Record<Loaders, boolean> = { poster: false, video: false };

const VideoBlockOptions = ({ editor, block, props: videoProps }: Props) => {
  const options = useYooptaPluginOptions<VideoPluginOptions>('Video');
  const [loaders, setLoaders] = useState<Record<Loaders, boolean>>(DEFAULT_LOADER_STATE);
  const onSetLoading = (type: Loaders, state: boolean) => setLoaders((prev) => ({ ...prev, [type]: state }));

  const onCover = () => {
    Elements.updateElement<VideoPluginElements, VideoElementProps>(editor, block.id, {
      type: 'video',
      props: { fit: 'cover' },
    });
  };

  const onFit = () => {
    Elements.updateElement<VideoPluginElements, VideoElementProps>(editor, block.id, {
      type: 'video',
      props: { fit: 'contain' },
    });
  };

  const onFill = () => {
    Elements.updateElement<VideoPluginElements, VideoElementProps>(editor, block.id, {
      type: 'video',
      props: { fit: 'fill' },
    });
  };

  const isExternalVideo = !!videoProps?.provider?.id;

  const onDownload = () => {
    if (!videoProps || !videoProps.src || isExternalVideo) return;

    const link = document.createElement('a');
    link.href = videoProps.src;
    link.download = videoProps.src;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onOpen = () => {
    if (videoProps?.provider?.url) {
      window.open(videoProps?.provider?.url, '_blank');
    }
  };

  const onUploadPoster = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!options?.onUploadPoster) {
      throw new Error('onUploadPoster not provided in plugin options. Check Video.extend({}) method');
    }

    const file = e.target.files?.[0];
    if (!file) return;

    onSetLoading('poster', true);

    const posterSrc = await options.onUploadPoster?.(file);
    Elements.updateElement<VideoPluginElements, VideoElementProps>(editor, block.id, {
      type: 'video',
      props: { poster: posterSrc },
    });

    onSetLoading('poster', false);
  };

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!options?.onUpload) {
      throw new Error('onUpload not provided in plugin options. Check Video.extend({}) method');
    }

    const file = e.target.files?.[0];
    if (!file) return;

    onSetLoading('video', true);

    // [TODO] - abort controller?
    const data = await options?.onUpload(file);
    const defaultVideoProps = editor.plugins.Video.elements.video.props as VideoElementProps;

    Elements.updateElement<VideoPluginElements, VideoElementProps>(editor, block.id, {
      type: 'video',
      props: {
        src: data.src,
        sizes: data.sizes || defaultVideoProps.sizes,
        bgColor: data.bgColor || defaultVideoProps.bgColor,
        fit: videoProps?.fit || data.fit || defaultVideoProps.fit || 'cover',
        settings: videoProps?.settings || data.settings || defaultVideoProps.settings,
      },
    });

    onSetLoading('video', false);
  };

  return (
    <ExtendedBlockActions onClick={() => editor.setPath({ current: block.meta.order })} id="yoopta-video-options">
      <BlockOptionsSeparator />
      {!isExternalVideo && (
        <>
          <BlockOptionsMenuGroup>
            <BlockOptionsMenuItem>
              <button type="button" className="yoopta-block-options-button justify-between" onClick={onFit}>
                <span className="flex">
                  <RowSpacingIcon width={16} height={16} className="w-4 h-4 mr-2" />
                  Fit
                </span>
                {videoProps?.fit === 'contain' && (
                  <CheckmarkIcon width={16} height={16} className="w-4 h-4" />
                )}
              </button>
            </BlockOptionsMenuItem>
            <BlockOptionsMenuItem>
              <button type="button" className="yoopta-block-options-button justify-between" onClick={onFill}>
                <span className="flex">
                  <WidthIcon width={16} height={16} className="w-4 h-4 mr-2" />
                  Fill
                </span>
                {videoProps?.fit === 'fill' && (
                  <CheckmarkIcon width={16} height={16} className="w-4 h-4" />
                )}
              </button>
            </BlockOptionsMenuItem>
            <BlockOptionsMenuItem>
              <button type="button" className="yoopta-block-options-button justify-between" onClick={onCover}>
                <span className="flex">
                  <SizeIcon width={16} height={16} className="w-4 h-4 mr-2" />
                  Cover
                </span>
                {videoProps?.fit === 'cover' && (
                  <CheckmarkIcon width={16} height={16} className="w-4 h-4" />
                )}
              </button>
            </BlockOptionsMenuItem>
          </BlockOptionsMenuGroup>
          <BlockOptionsSeparator />
        </>
      )}
      {!isExternalVideo && (
        <>
          <BlockOptionsMenuGroup>
            <BlockOptionsMenuItem>
              <label
                htmlFor="video-uploader"
                className="rounded-sm relative hover:bg-[#37352f14] leading-[120%] px-2 py-1.5 mx-[4px] cursor-pointer w-full flex justify-start data-[disabled=true]:cursor-not-allowed data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                data-disabled={loaders.video}
              >
                <input
                  type="file"
                  accept={options.accept}
                  multiple={false}
                  id="video-uploader"
                  className="absolute hidden"
                  onChange={onUpload}
                  disabled={loaders.video}
                />
                {loaders.video ? (
                  <Loader className="mr-2 user-select-none" width={24} height={24} />
                ) : (
                  <UpdateIcon width={16} height={16} className="w-4 h-4 mr-2" />
                )}
                Replace video
              </label>
            </BlockOptionsMenuItem>
          </BlockOptionsMenuGroup>
          <BlockOptionsSeparator />
        </>
      )}
      <BlockOptionsMenuGroup>
        {options.onUploadPoster && !isExternalVideo && (
          <BlockOptionsMenuItem>
            <label
              htmlFor="video-poster-uploader"
              className="rounded-sm relative hover:bg-[#37352f14] leading-[120%] px-2 py-1.5 mx-[4px] cursor-pointer w-full flex justify-start data-[disabled=true]:cursor-not-allowed data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
              data-disabled={loaders.poster}
            >
              <input
                type="file"
                accept="image/*"
                multiple={false}
                id="video-poster-uploader"
                className="absolute hidden"
                onChange={onUploadPoster}
                disabled={loaders.poster}
              />
              {loaders.poster ? (
                <Loader className="mr-2 user-select-none" width={24} height={24} />
              ) : (
                <ImageIcon width={16} height={16} className="w-4 h-4 mr-2" />
              )}
              {videoProps?.poster ? 'Replace poster' : 'Add poster'}
            </label>
          </BlockOptionsMenuItem>
        )}

        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoopta-button rounded-sm hover:bg-[#37352f14] leading-[120%] px-2 py-1.5 mx-[4px] cursor-pointer w-full flex justify-start"
            onClick={isExternalVideo ? onOpen : onDownload}
          >
            {isExternalVideo ? (
              <>
                <ExternalLinkIcon width={16} height={16} className="w-4 h-4 mr-2" />
                Open
              </>
            ) : (
              <>
                <DownloadIcon width={16} height={16} className="w-4 h-4 mr-2" />
                Download
              </>
            )}
          </button>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </ExtendedBlockActions>
  );
};

export { VideoBlockOptions };
