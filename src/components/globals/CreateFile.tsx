import uuid from 'short-uuid';
import { Button } from '@mui/material';

import { useStore } from '@store';
import { CreateIcon } from '@ui/icons/CreateIcon';

export default function CreateFile() {
  const { files, dispatch } = useStore();

  const handleOnCreate = () => {
    const untitledCount = files.filter((file) => file.name.startsWith('Untitled')).length;
    const id = uuid.generate();
    dispatch.addFile({
      id,
      name: `Untitled-${untitledCount + 1}`,
      content: '',
      modified: true,
      fileExtension: 'md',
      isViewing: false,
    });
    dispatch.setViewingFile(id);
  };

  return (
    <Button onClick={handleOnCreate} startIcon={<CreateIcon />} color="secondary">
      Create
    </Button>
  );
}
