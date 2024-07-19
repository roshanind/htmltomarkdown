import { useMemo } from 'react';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import { useStore } from '@store';
import { useSaveFile } from '@hooks/useSaveFile';

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
    <Button disabled={!files.length || !isEnableAllFilesSave} onClick={handleOnSaveAll} startIcon={<SaveAltIcon />}>
      Save All
    </Button>
  ) : (
    <Button disabled={!viewingFile || !viewingFile.modified} onClick={handleOnSave} startIcon={<SaveIcon />}>
      Save
    </Button>
  );
}
