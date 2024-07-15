import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';
import { ChangeEvent, useCallback, useState } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

type Props = {
  onChange?: (files: File[]) => void;
};

export default function FileUploadButton({ onChange }: Props) {
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { files: rawFiles } = e.target;

      // check file name exists and if exists update file in state or add new files to state
      if (rawFiles?.length) {
        const newFiles = Array.from(rawFiles);

        const updatedFiles = newFiles.reduce((acc, file) => {
          const fileExists = files.some((prevFile) => prevFile.name === file.name);
          if (fileExists) {
            return acc.concat(files.map((prevFile) => (prevFile.name === file.name ? file : prevFile)));
          }
          return acc.concat(file);
        }, [] as File[]);

        setFiles(updatedFiles);
        onChange?.(updatedFiles);
      }
    },
    [files]
  );

  return (
    <>
      <Button component="label" role={undefined} color="secondary" tabIndex={-1} startIcon={<UploadIcon />}>
        Upload file
        <VisuallyHiddenInput type="file" onChange={handleChange} multiple accept=".txt, .md" />
      </Button>
    </>
  );
}
