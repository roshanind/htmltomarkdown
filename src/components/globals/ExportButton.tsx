import { Button } from '@mui/material';

import { useStore } from '@store';
import { changeExtension } from '@utils/changeExtension';
import { ExportIcon } from '@ui/icons/ExportIcon';

/**
 * ExportButton component exports all files as markdown files.
 *
 * @returns JSX.Element
 */
export default function ExportButton() {
  const { files } = useStore();

  const handleOnExport = () => {
    // download files as markdown files
    files.forEach((file) => {
      const blob = new Blob([file.content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = changeExtension(file.name, 'md');
      a.click();
    });
  };

  return (
    <Button color="primary" startIcon={<ExportIcon />} onClick={handleOnExport}>
      Export
    </Button>
  );
}
