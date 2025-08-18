import { cloneElement, isValidElement } from 'react';
import { ActionMenuRenderProps } from '../types';
import { DEFAULT_ICONS_MAP } from './icons';

const DefaultActionMenuRender = ({
  actions,
  editor,
  empty,
  getItemProps,
  getRootProps,
  view = 'default',
}: ActionMenuRenderProps) => {
  const isViewSmall = view === 'small';

  const wrapStyles = {
    maxWidth: isViewSmall ? '200px' : '270px',
  };

  const iconWrapStyles = {
    minWidth: isViewSmall ? '28px' : '40px',
    width: isViewSmall ? '28px' : '40px',
    height: isViewSmall ? '28px' : '40px',
  };

  const iconStyles = {
    transform: isViewSmall ? 'scale(0.75)' : 'scale(1)',
  };

  const renderIcon = (Icon: any) => {
    if (!Icon) return null;
    if (typeof Icon === 'string') return <img src={Icon} alt="icon" style={iconStyles} />;
    if (isValidElement(Icon)) return cloneElement<any>(Icon, { style: iconStyles });
    return <Icon style={iconStyles} />;
  };

  return (
    <div style={wrapStyles} role="listbox" className="yoopta-action-menu-list-content">
      <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
        <div
          {...getRootProps()}
          className="overflow-hidden p-0 text-foreground"
        >
          {empty && (
            <div className="text-left text-muted-foreground text-xs px-1 py-1">
              No actions available
            </div>
          )}
          {actions.map((action, i) => {
            const block = editor.blocks[action.type];

            if (!block) return null;

            const title = block.options?.display?.title || block.type;
            const description = block.options?.display?.description || '';
            const Icon = action.icon || DEFAULT_ICONS_MAP[action.type];

            return (
              <button
                type="button"
                key={action.type}
                {...getItemProps(action.type)}
                className="yoopta-button flex w-full cursor-pointer items-center space-x-2 rounded-md px-1 py-1 mb-0.5 last:mb-0 text-left text-sm hover:bg-[#f4f4f5] aria-selected:bg-[#f0f0f0]"
              >
                <div
                  style={iconWrapStyles}
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-md border border-solid border-[#e5e7eb] bg-[#FFFFFF]"
                >
                  {renderIcon(Icon)}
                </div>
                <div>
                  <div className="font-medium">{title}</div>
                  {!isViewSmall && (
                    <div className="text-xs text-muted-foreground truncate text-ellipsis max-w-[200px]">
                      {description}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { DefaultActionMenuRender };
