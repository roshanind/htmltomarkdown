import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useStore } from '@store';
import { changeExtension } from '@utils/changeExtension';

type Props = {};

export default function ExportButton({}: Props) {
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
    <Button color="primary" startIcon={<FileDownloadIcon />} onClick={handleOnExport}>
      Export
    </Button>
  );
}
