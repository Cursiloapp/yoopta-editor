import { HexColorPicker } from 'react-colorful';
import { CSSProperties, MouseEvent, useState } from 'react';
import { YooEditor, UI } from '@yoopta/editor';
import { PaletteIcon } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

const { Portal } = UI;

const COLOR_PRESETS = {
  text: [
    { name: 'Default', value: 'black' },
    { name: 'Gray', value: '#787774' },
    { name: 'Brown', value: '#976D57' },
    { name: 'Orange', value: '#CC772F' },
    { name: 'Yellow', value: '#C29243' },
    { name: 'Green', value: '#548064' },
    { name: 'Blue', value: '#477DA5' },
    { name: 'Purple', value: '#A48BBE' },
    { name: 'Pink', value: '#B35588' },
    { name: 'Red', value: '#C4554D' },
  ],
  background: [
    { name: 'Default', value: 'unset' },
    { name: 'Gray', value: '#F1F1EF' },
    { name: 'Brown', value: '#F3EEEE' },
    { name: 'Orange', value: '#F8ECDF' },
    { name: 'Yellow', value: '#FAF3DD' },
    { name: 'Green', value: '#EEF3ED' },
    { name: 'Blue', value: '#E9F3F7' },
    { name: 'Purple', value: '#F6F3F8' },
    { name: 'Pink', value: '#F9F2F5' },
    { name: 'Red', value: '#FAECEC' },
  ],
};

type Props = {
  editor: YooEditor;
  highlightColors: CSSProperties;
  onClose: () => void;
  refs: { setFloating: (el: any) => void };
  floatingStyles: React.CSSProperties;
};

const COLOR_PICKER_STYLES = {
  width: '100%',
  height: 170,
};

const HighlightColor = ({ editor, refs, floatingStyles, highlightColors = {} }: Props) => {
  const [tab, setTab] = useState<'text' | 'background'>('text');
  const [showColorPicker, setShowColorPicker] = useState(true);
  const [localColor, setLocalColor] = useState<string | null>(null);

  const debouncedUpdateColor = useDebouncedCallback((type: 'color' | 'backgroundColor', color: string) => {
    const value = editor.formats.highlight.getValue();
    if (value?.[type] === color) {
      editor.formats.highlight.update({ ...highlightColors, [type]: undefined });
    } else {
      editor.formats.highlight.update({ ...highlightColors, [type]: color });
    }

    setLocalColor(null);
  }, 50);

  const handleColorChange = (type: 'color' | 'backgroundColor', color: string, shouldDebounce?: boolean) => {
    if (shouldDebounce) {
      setLocalColor(color);
      debouncedUpdateColor(type, color);
    } else {
      const value = editor.formats.highlight.getValue();
      if (value?.[type] === color) {
        editor.formats.highlight.update({ ...highlightColors, [type]: undefined });
      } else {
        editor.formats.highlight.update({ ...highlightColors, [type]: color });
      }
    }
  };

  const getItemStyles = (type: 'color' | 'backgroundColor', color: string) => {
    const currentColor = localColor || highlightColors?.[type];
    const isActive = currentColor === color;
    return {
      backgroundColor: color,
      border: isActive ? '2px solid #3b82f6' : '1px solid #e3e3e3',
      position: 'relative' as const,
    };
  };

  return (
    <Portal id="yoo-highlight-color-portal">
      <div
        style={floatingStyles}
        ref={refs.setFloating}
        onClick={(e: MouseEvent) => e.stopPropagation()}
        className="z-50"
      >
        <div className="bg-[#FFFFFF] p-2 rounded-md shadow-md border border-solid border-[#e5e7eb]">
          {/* Tabs */}
          <div className="flex space-x-2 mb-3">
            <button
              type="button"
              className={`px-3 py-1 text-sm rounded ${ tab === 'text'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setTab('text')}
            >
              Text
            </button>
            <button
              type="button"
              className={`px-3 py-1 text-sm rounded ${ tab === 'background'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setTab('background')}
            >
              Background
            </button>
          </div>

          {/* Presets Grid */}
          <div className="grid justify-items-center grid-cols-5 gap-1 mb-3">
            {COLOR_PRESETS[tab].map(({ name, value }) => (
              <button
                type="button"
                key={name}
                title={name}
                className="w-6 h-6 rounded transition-all hover:scale-110"
                style={getItemStyles(tab === 'text' ? 'color' : 'backgroundColor', value)}
                onClick={() => handleColorChange(tab === 'text' ? 'color' : 'backgroundColor', value)}
              />
            ))}
          </div>

          {/* Custom Color Section */}
          <div className="border-t pt-2">
            <button
              type="button"
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
              onClick={() => setShowColorPicker(!showColorPicker)}
            >
              Color Picker
              <PaletteIcon className="w-4 h-4 ml-1" />
            </button>

            {showColorPicker && (
              <div className="mt-2">
                <HexColorPicker
                  color={localColor || highlightColors?.[tab === 'text' ? 'color' : 'backgroundColor'] || '#000000'}
                  onChange={(color) => handleColorChange(tab === 'text' ? 'color' : 'backgroundColor', color, true)}
                  style={COLOR_PICKER_STYLES}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export { HighlightColor };
