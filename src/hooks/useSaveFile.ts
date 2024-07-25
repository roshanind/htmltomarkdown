import { useCallback } from 'react';

import { useStore } from '@store';
import { FILE_SAVE_KEY } from '@constants/index';
import { MDFile } from '@type/files.types';

import { useLocalStorage } from './useLocalStorage';

/**
 * Custom hook for saving files.
 * @returns An object containing the `saveFile` and `saveAllFiles` functions.
 */
export const useSaveFile = () => {
  const { files, dispatch } = useStore();
  const [savedFiles, setSavedFiles] = useLocalStorage<MDFile[]>(FILE_SAVE_KEY, files);

  /**
   * Saves a single file.
   * If the file already exists in `savedFiles`, it updates the file.
   * If the file doesn't exist, it adds the file to `savedFiles`.
   * @param file - The file to be saved.
   */
  const saveFile = useCallback(
    (file: MDFile) => {
      // check if file exists in savedFiles
      const fileExists = savedFiles.findIndex((f) => f.id === file.id);

      if (fileExists !== -1) {
        const updatedFiles = [
          ...savedFiles.slice(0, fileExists),
          { ...file, modified: false, isViewing: false },
          ...savedFiles.slice(fileExists + 1),
        ];
        setSavedFiles(updatedFiles);
      } else {
        setSavedFiles([...savedFiles, { ...file, modified: false, isViewing: false }]);
      }

      dispatch.updateFile(file);
    },
    [savedFiles]
  );

  /**
   * Saves multiple files.
   * @param files - The array of files to be saved.
   */
  const saveAllFiles = (files: MDFile[]) => {
    const updatedFiles = files.map((file) => ({ ...file, modified: false, isViewing: false }));

    setSavedFiles(updatedFiles);
    dispatch.bulkUpdateFiles(updatedFiles);
  };

  return { saveFile, saveAllFiles };
};
