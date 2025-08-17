import TurnIcon from './icons/turn.svg';
import { TrashIcon, CopyIcon, Link2Icon } from '@radix-ui/react-icons';
import { useYooptaEditor } from '../../contexts/YooptaContext/YooptaContext';
import { CSSProperties, useState } from 'react';
import { useFloating, offset, flip, shift, inline, autoUpdate, useTransitionStyles } from '@floating-ui/react';
import copy from 'copy-to-clipboard';
import { findPluginBlockByPath } from '../../utils/findPluginBlockByPath';
import { getRootBlockElement } from '../../utils/blockElements';
import { useYooptaTools } from '../../contexts/YooptaContext/ToolsContext';
import { buildActionMenuRenderProps } from './utils';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';

const BlockOptionsMenuGroup = ({ children }) => <div className="yoopta-block-options-group">{children}</div>;

const BlockOptionsMenuContent = ({ children }) => (
  <div
    onClick={(e) => e.stopPropagation()}
    className="yoopta-block-options-menu-content data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
  >
    {children}
  </div>
);

const BlockOptionsMenuItem = ({ children }) => <div className="yoopta-block-options-item">{children}</div>;

type BlockOptionsSeparatorProps = {
  className?: string;
};

const BlockOptionsSeparator = ({ className = '' }: BlockOptionsSeparatorProps) => (
  <div className={`yoopta-block-options-separator ${className}`} />
);

export type BlockOptionsProps = {
  isOpen: boolean;
  onClose: () => void;
  refs: any;
  style: CSSProperties;
  children?: React.ReactNode;
  actions?: ['delete', 'duplicate', 'turnInto', 'copy'] | null;
};

const DEFAULT_ACTIONS: BlockOptionsProps['actions'] = ['delete', 'duplicate', 'turnInto', 'copy'];

const BlockOptions = ({ isOpen, onClose, refs, style, actions = DEFAULT_ACTIONS, children }: BlockOptionsProps) => {
  const editor = useYooptaEditor();
  const tools = useYooptaTools();
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const {
    refs: actionMenuRefs,
    floatingStyles: actionMenuFloatingStyles,
    context,
  } = useFloating({
    placement: 'right',
    open: isActionMenuOpen,
    onOpenChange: setIsActionMenuOpen,
    middleware: [inline(), flip(), shift(), offset(10)],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted: isActionMenuMounted, styles: actionMenuTransitionStyles } = useTransitionStyles(context, {
    duration: 100,
  });

  if (!isOpen) return null;

  const currentBlock = findPluginBlockByPath(editor, { at: editor.path.current });
  const rootElement = getRootBlockElement(editor.blocks[currentBlock?.type || '']?.elements);
  const isVoidElement = rootElement?.props?.nodeType === 'void';

  const onDelete = () => {
    editor.deleteBlock({ at: editor.path.current });
    editor.setPath({ current: null });

    onClose();
  };

  const onDuplicate = () => {
    // [TEST]
    if (typeof editor.path.current !== 'number') return;

    editor.duplicateBlock({ original: { path: editor.path.current }, focus: true });

    onClose();
  };

  const onCopy = () => {
    const block = findPluginBlockByPath(editor);
    if (block) {
      copy(`${window.location.origin}${window.location.pathname}#${block.id}`);
      editor.emit('block:copy', block);
    }

    onClose();
  };

  const ActionMenu = tools.ActionMenu;
  const actionMenuStyles = { ...actionMenuFloatingStyles, ...actionMenuTransitionStyles };

  const onCloseActionMenu = () => {
    setIsActionMenuOpen(false);
    onClose();
  };

  const actionMenuRenderProps = buildActionMenuRenderProps({ editor, view: 'small', onClose: onCloseActionMenu });

  return (
    // [TODO] - take care about SSR
    <Portal id="yoo-block-options-portal">
      <Overlay lockScroll className="z-[100]" onClick={onClose}>
        <div style={style} ref={refs.setFloating} contentEditable={false}>
          <BlockOptionsMenuContent>
            {actions !== null && (
              <BlockOptionsMenuGroup>
                <BlockOptionsMenuItem>
                  <button type="button" className="yoopta-block-options-button" onClick={onDelete}>
                    <TrashIcon className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </BlockOptionsMenuItem>
                <BlockOptionsMenuItem>
                  <button type="button" className="yoopta-block-options-button" onClick={onDuplicate}>
                    <CopyIcon className="w-4 h-4 mr-2" />
                    Duplicate
                  </button>
                </BlockOptionsMenuItem>
              </BlockOptionsMenuGroup>
            )}
            {children}
          </BlockOptionsMenuContent>
        </div>
      </Overlay>
    </Portal>
  );
};

export { BlockOptions, BlockOptionsMenuContent, BlockOptionsMenuGroup, BlockOptionsMenuItem, BlockOptionsSeparator };
