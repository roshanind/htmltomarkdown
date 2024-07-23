import { Button } from '@mui/material';

import { useStore } from '@store';
import { changeExtension } from '@utils/changeExtension';
import { ExportIcon } from '@ui/icons/ExportIcon';

type Props = { isMultiple?: boolean };

/**
 * Renders a button component for exporting files as markdown.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isMultiple - Indicates whether multiple files can be exported.
 * @returns {JSX.Element} The rendered ExportButton component.
 */
export default function ExportButton({ isMultiple }: Props) {
  const { files } = useStore();

  const handleOnExportAll = () => {
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

  const handleOnExport = () => {
    const file = files.find((file) => file.isViewing);
    if (!file) return;

    const blob = new Blob([file.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = changeExtension(file.name, 'md');
    a.click();
  };

  return isMultiple ? (
    <Button startIcon={<ExportIcon />} onClick={handleOnExportAll}>
      Export All
    </Button>
  ) : (
    <Button color="secondary" startIcon={<ExportIcon />} onClick={handleOnExport}>
      Export
    </Button>
  );
}
