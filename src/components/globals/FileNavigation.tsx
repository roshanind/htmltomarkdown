import { useEffect, useState } from 'react';

import { useStore } from '@store';
import { FileContent } from '@type/files.types';
import { FILE_SAVE_KEY } from '@constants/index';
import { useLocalStorage } from '@hooks/useLocalStorage';

import FileViewAndModify from './FileViewAndModify';
import FileList from '@ui/FileList';

/**
 * Renders a list of files with options to preview and delete.
 * @returns The FileList component.
 */
export default function FileNavigation() {
  const { files, dispatch } = useStore();
  const [previewingFile, setPreviewingFile] = useState<FileContent | null>(null);
  const [savedFiles, setSavedFiles] = useLocalStorage<FileContent[]>(FILE_SAVE_KEY, []);

  useEffect(() => {
    dispatch.loadFromLocalStorage(savedFiles);
  }, []);

  const handleOnPreviewClick = (file: FileContent | undefined) => {
    if (file) {
      setPreviewingFile(file);
    }
  };

  const handleOnDeleteClick = (fileName: string | undefined) => {
    if (fileName) {
      dispatch.deleteFile(fileName);
      setSavedFiles(savedFiles.filter((file) => file.name !== fileName));
    }
  };

  const handleOnSelectClick = (file: FileContent) => {
    dispatch.setViewingFile(file.name);
  };

  return (
    <>
      <FileList<FileContent>
        files={files}
        isShowDelete
        isShowPreview
        onPreview={handleOnPreviewClick}
        onDelete={handleOnDeleteClick}
        onSelect={handleOnSelectClick}
      />

      <FileViewAndModify
        isShow={!!previewingFile}
        content={{ name: previewingFile?.name || '', content: previewingFile?.originalContent || '' }}
        onCancel={() => setPreviewingFile(null)}
      />
    </>
  );
}
