import { useMemo } from 'react';
import { Button } from '@mui/material';

import { useStore } from '@store';
import { useSaveFile } from '@hooks/useSaveFile';
import { SaveIcon } from '@ui/icons/SaveIcon';
import { SaveAllIcon } from '@ui/icons/SaveAllIcon';

type Props = {
  isSaveAll?: boolean;
};

/**
 * SaveButton component.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isSaveAll - Indicates whether the button is for saving all files.
 * @returns {JSX.Element} The SaveButton component.
 */
export default function SaveButton({ isSaveAll }: Props) {
  const { files } = useStore();
  const { saveFile, saveAllFiles } = useSaveFile();
  const viewingFile = useMemo(() => {
    return files.find((file) => file.isViewing);
  }, [files]);

  const isEnableAllFilesSave = useMemo(() => {
    return files.some((file) => file.modified);
  }, [files]);

  const handleOnSave = () => {
    if (!viewingFile) return;

    saveFile(viewingFile);
  };

  const handleOnSaveAll = () => {
    if (!files.length) return;
    saveAllFiles(files);
  };

  return isSaveAll ? (
    <Button disabled={!files.length || !isEnableAllFilesSave} onClick={handleOnSaveAll} startIcon={<SaveAllIcon />}>
      Save All
    </Button>
  ) : (
    <Button
      color="secondary"
      disabled={!viewingFile || !viewingFile.modified}
      onClick={handleOnSave}
      startIcon={<SaveIcon />}
    >
      Save
    </Button>
  );
}
