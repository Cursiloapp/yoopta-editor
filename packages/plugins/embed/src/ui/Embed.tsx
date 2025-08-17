import { EmbedComponent } from './EmbedComponent';
import {
  useBlockData,
  PluginElementRenderProps,
  useYooptaEditor,
  useYooptaPluginOptions,
  useBlockSelected,
  useYooptaReadOnly,
  Elements,
} from '@yoopta/editor';
import { Resizable, ResizableProps } from 're-resizable';
import { useEffect, useMemo, useState } from 'react';
import { Placeholder } from './Placeholder';
import { EmbedPluginOptions } from '../types';
import { EmbedBlockOptions } from './EmbedBlockOptions';

const EmbedRender = ({ extendRender, ...props }: PluginElementRenderProps) => {
  const { element, children, attributes, blockId } = props;
  const { sizes: propSizes, provider } = element.props || {};
  const block = useBlockData(blockId);
  const editor = useYooptaEditor();
  const pluginOptions = useYooptaPluginOptions<EmbedPluginOptions>('Embed');
  const isReadOnly = useYooptaReadOnly();

  const [sizes, setSizes] = useState({
    width: propSizes?.width || 762,
    height: propSizes?.height || 428,
  });

  useEffect(
    () =>
      setSizes({
        width: propSizes?.width || 762,
        height: propSizes?.height || 428,
      }),
    [element.props],
  );

  const blockSelected = useBlockSelected({ blockId });

  const resizeProps: ResizableProps = useMemo(
    () => ({
      minWidth: 300,
      size: { width: sizes.width, height: sizes.height },
      maxWidth: pluginOptions?.maxSizes?.maxWidth || 800,
      maxHeight: pluginOptions?.maxSizes?.maxHeight || 900,
      lockAspectRatio: true,
      resizeRatio: 2,
      enable: {
        left: !isReadOnly,
        right: !isReadOnly,
      },
      handleStyles: {
        left: { left: 0 },
        right: { right: 0 },
      },
      onResize: (e, direction, ref) => {
        if (isReadOnly) return;
        setSizes({ width: ref.offsetWidth, height: ref.offsetHeight });
      },
      onResizeStop: (e, direction, ref) => {
        if (isReadOnly) return;
        Elements.updateElement(editor, blockId, {
          type: 'embed',
          props: {
            sizes: { width: ref.offsetWidth, height: ref.offsetHeight },
          },
        });
      },
      handleComponent: {},
    }),
    [sizes.width, sizes.height],
  );

  if (!provider || !provider?.id) {
    return (
      <Placeholder attributes={attributes} blockId={blockId}>
        {children}
      </Placeholder>
    );
  }

  const currentAlign = 'center';
  const alignClass = `yoopta-align-${currentAlign}`;

  return (
    <div
      contentEditable={false}
      draggable={false}
      className={`mt-4 relative flex ${alignClass} yoopta-embed`}
    >
      <Resizable {...resizeProps} className="my-0 flex">
        {blockSelected && (
          <div className="absolute pointer-events-none inset-0 z-[81] rounded-[3px] opacity-100 transition-opacity duration-150 ease-in" />
        )}
        {extendRender ? (
          extendRender(props)
        ) : (
          <EmbedComponent
            width={sizes?.width || 762}
            height={sizes?.height || 428}
            provider={provider}
            blockId={blockId}
            attributes={attributes}
          >
            {children}
          </EmbedComponent>
        )}

        {!isReadOnly && <EmbedBlockOptions block={block} editor={editor} props={element.props} />}
      </Resizable>
    </div>
  );
};

export { EmbedRender };
