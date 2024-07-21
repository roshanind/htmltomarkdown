import { ChangeEvent } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { ImportIcon } from './icons/ImportIcon';

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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files?.length) {
      onChange?.(Array.from(files));
    }
  };

  return (
    <Button component="label" role={undefined} color="secondary" tabIndex={-1} startIcon={<ImportIcon />}>
      Import
      <VisuallyHiddenInput type="file" onChange={handleChange} multiple accept=".txt, .md" />
    </Button>
  );
}
