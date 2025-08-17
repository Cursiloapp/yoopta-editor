import { createYooptaMark, YooptaMarkProps } from '@yoopta/editor';

type ItalicMarkProps = YooptaMarkProps<'italic', boolean>;

export const Italic = createYooptaMark<ItalicMarkProps>({
  type: 'italic',
  hotkey: 'mod+i',
  render: (props) => <i className="italic yoopta-mark-italic">{props.children}</i>,
});
