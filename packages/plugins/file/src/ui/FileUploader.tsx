import { Elements, useYooptaEditor, useYooptaPluginOptions } from '@yoopta/editor';
import { FileElementProps, FilePluginElements, FilePluginOptions } from '../types';

type Props = {
  onClose: () => void;
  blockId: string;
  accept?: string;
  onSetLoading: (_s: boolean) => void;
};

const FileUploader = ({ accept = '', onClose, blockId, onSetLoading }: Props) => {
  const options = useYooptaPluginOptions<FilePluginOptions>('File');
  const editor = useYooptaEditor();

  const upload = async (file: File) => {
    if (!options?.onUpload) {
      throw new Error('onUpload not provided in plugin options. Check File.extend({}) method');
    }
    onClose();
    onSetLoading(true);

    try {
      const response = await options?.onUpload(file);

      Elements.updateElement<FilePluginElements, FileElementProps>(editor, blockId, {
        type: 'file',
        props: {
          src: response.src,
          name: response.name || file.name,
          size: response.size || file.size,
          format: response.format,
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

  // Shared button style with yoo-file prefix
  const baseButtonClass =
    'w-full user-select-none transition-bg duration-20 ease-in cursor-pointer flex items-center justify-center white-space-nowrap h-[32px] rounded-[4px] shadow-[rgba(15,15,15,0.1)_0px_0px_0px_1px_inset,_rgba(15,15,15,0.1)_0px_1px_2px] bg-[rgba(254,74,85,1)] text-white leading-[1.2] px-[12px] text-[14px] font-medium';

  return (
    <div className="w-full">
      <label htmlFor="file-uploader" className={baseButtonClass}>
        <input
          type="file"
          id="file-uploader"
          className="hidden"
          accept={options?.accept || accept}
          onChange={onChange}
          multiple={false}
        />
        Upload file
      </label>
    </div>
  );
};

export { FileUploader };
