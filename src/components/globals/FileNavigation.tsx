import { useEffect, useState } from 'react';

import { useStore } from '@store';
import { FileId, MDFile } from '@type/files.types';
import { FILE_SAVE_KEY } from '@constants/index';
import { useLocalStorage } from '@hooks/useLocalStorage';
import FileList from '@ui/FileList';

import FileViewAndModify from './FileViewAndModify';

/**
 * Renders a list of files with options to preview and delete.
 * @returns The FileList component.
 */
export default function FileNavigation() {
  const { files, dispatch } = useStore();
  const [previewingFile, setPreviewingFile] = useState<MDFile | null>(null);
  const [savedFiles, setSavedFiles] = useLocalStorage<MDFile[]>(FILE_SAVE_KEY, []);

  useEffect(() => {
    dispatch.loadFromLocalStorage(savedFiles);
  }, []);

  const handleOnPreviewClick = (file: MDFile | undefined) => {
    if (file) {
      setPreviewingFile(file);
    }
  };

  const handleOnDeleteClick = (fileId: FileId | undefined) => {
    if (fileId) {
      dispatch.deleteFile(fileId);
      setSavedFiles(savedFiles.filter((file) => file.id !== fileId));
    }
  };

  const handleOnSelectClick = (file: MDFile) => {
    dispatch.setViewingFile(file.id);
  };

  return (
    <>
      <FileList<MDFile>
        files={files}
        isShowDelete
        isShowPreview
        isEditable
        onPreview={handleOnPreviewClick}
        onDelete={handleOnDeleteClick}
        onSelect={handleOnSelectClick}
      />

      <FileViewAndModify
        isShow={!!previewingFile}
        file={{ name: previewingFile?.name || '', content: previewingFile?.originalContent || '' }}
        onCancel={() => setPreviewingFile(null)}
      />
    </>
  );
}
