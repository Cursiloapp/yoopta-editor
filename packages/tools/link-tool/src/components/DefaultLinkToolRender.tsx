import { ChangeEvent, useEffect, useState } from 'react';
import { LinkToolRenderProps, Link } from '../types';
import ChevronUp from '../icons/chevronup.svg';
import { useYooptaEditor } from '@yoopta/editor';

const DefaultLinkToolRender = (props: LinkToolRenderProps) => {
  const { withLink = true, withTitle = true } = props;
  const editor = useYooptaEditor();
  const defaultLinkProps = editor.plugins?.LinkPlugin?.elements?.link?.props;

  const [link, setLink] = useState(props?.link || defaultLinkProps);
  const [isAdditionalPropsOpen, setAdditionPropsOpen] = useState(false);

  const onChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setLink((p) => ({ ...p, [target.name]: target.value }));
  };

  useEffect(() => {
    const hasUrl = !!props.link.url;
    if (hasUrl) setLink(props.link);
    if (!hasUrl && defaultLinkProps) {
      setLink({
        ...props.link,
        rel: defaultLinkProps.rel || props.link.rel || '',
        target: defaultLinkProps.target || props.link.target || '_self',
      });
    }
  }, [props.link]);

  const onSave = () => {
    if (!link.url) return;
    props.onSave(link);
  };

  const onDelete = () => {
    props.onDelete();
  };

  return (
    <div className="yoopta-link-tool shadow-y-[4px]">
      {withTitle && (
        <div>
          <label htmlFor="title" className="yoopta-link-tool-label">
            Link title
          </label>
          <input
            id="title"
            type="text"
            className="yoopta-link-tool-input"
            name="title"
            value={link.title || ''}
            onChange={onChange}
            placeholder="Edit link title"
            autoComplete="off"
          />
        </div>
      )}
      {withLink && (
        <div className={withTitle ? 'mt-2' : ''}>
          <label htmlFor="url" className="yoopta-link-tool-label">
            Link URL
          </label>
          <input
            id="url"
            type="text"
            className="yoopta-link-tool-input"
            name="url"
            value={link.url || ''}
            onChange={onChange}
            placeholder="Edit link URL"
            autoComplete="off"
          />
        </div>
      )}
      <button
        type="button"
        className="yoopta-button yoopta-link-tool-label !font-[500] mt-2 !mb-0 !flex justify-between items-center w-full"
        onClick={() => setAdditionPropsOpen((p) => !p)}
      >
        Additional props
        <ChevronUp style={{ transform: isAdditionalPropsOpen ? `rotate(180deg)` : `rotate(0deg)` }} />
      </button>
      {isAdditionalPropsOpen && (
        <>
          <div className="mt-2">
            <label htmlFor="target" className="yoopta-link-tool-label">
              Link target
            </label>
            <input
              id="target"
              type="text"
              className="yoopta-link-tool-input"
              name="target"
              value={link.target}
              onChange={onChange}
              placeholder="Edit link target"
              autoComplete="off"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="rel" className="yoopta-link-tool-label">
              Link rel
            </label>
            <input
              id="rel"
              type="text"
              className="yoopta-link-tool-input"
              name="rel"
              value={link.rel}
              onChange={onChange}
              placeholder="Edit link rel"
              autoComplete="off"
            />
          </div>
        </>
      )}
      <div className="mt-2 flex justify-between">
        <button
          type="button"
          className="yoopta-button bg-[#fe4a55] text-[#fff] text-sm font-medium py-[5px] px-[10px] rounded-md shadow-sm disabled:opacity-50"
          disabled={!link.url}
          onClick={onSave}
        >
          {props.link.url ? 'Update' : 'Add'}
        </button>
        <button
          type="button"
          className="yoopta-button ml-2 bg-[#f4f4f5] text-[#000] text-sm font-medium py-[5px] px-[10px] rounded-md shadow-sm disabled:opacity-50"
          onClick={onDelete}
        >
          Delete link
        </button>
      </div>
    </div>
  );
};

export { DefaultLinkToolRender };
