import TurndownService from 'turndown';

import { useStore } from '@store/index';
import FileUploadButton from '@ui/FileUploadButton';
import { FileContent } from '@type/files.types';
import FileViewAndModify from './FileViewAndModify';
import { Stack } from '@mui/material';
import customRules from '@utils/turndownCustomRules';

const turndownService = new TurndownService();
turndownService.remove('script');
turndownService.use(customRules);

export const FileUploader = () => {
  const { dispatch } = useStore();

  const openFiles = async (files: File[]) => {
    for (const file of files) {
      const fileExtension = file.name.split('.').pop();
      let markdown = '';
      let fileContent = await file.text();

      if (fileExtension !== 'md') {
        if (fileContent) {
          markdown = turndownService.turndown(fileContent);
        }
      }

      dispatch.addContent({
        name: file.name.replace(`.${fileExtension}`, ''),
        fileExtension,
        originalContent: fileContent,
        content: markdown || fileContent,
      });
    }
  };

  const handleOnChange = (rawFiles: File[]) => {
    openFiles(rawFiles);
  };

  const handleOnCreate = (file: FileContent) => {
    const markdown = turndownService.turndown(file.content);

    dispatch.addContent({ name: file.name, fileExtension: 'md', originalContent: file.content, content: markdown });
  };

  return (
    <Stack direction="row" spacing={2}>
      <FileUploadButton onChange={handleOnChange} />
      <FileViewAndModify isCreatable onCreate={handleOnCreate} />
    </Stack>
  );
};

export default FileUploader;
//
