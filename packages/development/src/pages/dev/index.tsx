import YooptaEditor, {
  createYooptaEditor,
  YooptaOnChangeOptions,
  YooEditor,
  YooptaContentValue,
  YooptaPath,
} from '@yoopta/editor';
import { useMemo, useRef, useState } from 'react';

import { MARKS } from '../../utils/yoopta/marks';
import { YOOPTA_PLUGINS } from '../../utils/yoopta/plugins';
import { TOOLS } from '../../utils/yoopta/tools';
import { FixedToolbar } from '../../components/FixedToolbar/FixedToolbar';

const EDITOR_STYLE = {
  width: 762,
};

const data = {
  '5c47e38d-4213-472d-8fda-a182fbecd40c': {
    id: '5c47e38d-4213-472d-8fda-a182fbecd40c',
    type: 'Accordion',
    value: [
      {
        id: '23cb2ea7-aeeb-47aa-9d79-3c8a23349b5b',
        type: 'accordion-list',
        children: [
          {
            id: '75e787d6-e184-4e2f-8e33-88d2243b3d94',
            type: 'accordion-list-item',
            children: [
              {
                id: '02b79be6-1b5c-4e69-ab7f-8829fcf83ed6',
                type: 'accordion-list-item-heading',
                children: [
                  {
                    text: 'heading one',
                  },
                ],
              },
              {
                id: '65900302-ddc7-4eef-8399-2cb367b84acf',
                type: 'accordion-list-item-content',
                children: [
                  {
                    text: 'description one',
                  },
                ],
              },
            ],
            props: {
              isExpanded: true,
            },
          },
          {
            id: '921c492a-9eca-4c0a-852d-8670f480ea34',
            type: 'accordion-list-item',
            children: [
              {
                id: 'f8ded2a1-a29d-4296-99a1-d8364d954c4e',
                type: 'accordion-list-item-heading',
                children: [
                  {
                    text: 'heading two',
                  },
                ],
              },
              {
                id: 'f31094a3-4da4-4e50-97b4-67dc28cc40ec',
                type: 'accordion-list-item-content',
                children: [
                  {
                    text: 'aadescription two',
                  },
                ],
              },
            ],
            props: {
              isExpanded: true,
            },
          },
        ],
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 0,
    },
  },
};

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<YooptaContentValue>(data);

  const onChange = (value: YooptaContentValue, options: YooptaOnChangeOptions) => {
    console.log('onChange', value, options);
    setValue(value);
  };

  const onPathChange = (path: YooptaPath) => {};

  return (
    <>
      <div className="px-[100px] max-w-[900px] mx-auto my-10 flex flex-col items-center" ref={selectionRef}>
        <FixedToolbar editor={editor} DEFAULT_DATA={data} />
        <YooptaEditor
          editor={editor}
          plugins={YOOPTA_PLUGINS}
          selectionBoxRoot={selectionRef}
          marks={MARKS}
          autoFocus={true}
          readOnly={false}
          placeholder="Type / to open menu"
          tools={TOOLS}
          style={EDITOR_STYLE}
          value={value}
          onChange={onChange}
          onPathChange={onPathChange}
        />
      </div>
    </>
  );
};

export default BasicExample;
