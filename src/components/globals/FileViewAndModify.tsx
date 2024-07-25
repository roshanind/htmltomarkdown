import { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';

import { MDFile } from '@type/files.types';

type Props = {
  isShow?: boolean;
  isEditable?: boolean;
  file: Partial<MDFile>;
  onSave?: (content: string) => void;
  onCancel?: () => void;
};

/**
 * Renders a dialog component for viewing and modifying a file.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isShow - Determines whether the dialog is visible or hidden.
 * @param {Function} props.onSave - The function to be called when the file is saved.
 * @param {Object} props.file - The file object containing the file details.
 * @param {boolean} props.isEditable - Determines whether the file content is editable.
 * @param {Function} props.onCancel - The function to be called when the dialog is canceled.
 * @returns {JSX.Element} The rendered FileViewAndModify component.
 */
export default function FileViewAndModify({ isShow = false, onSave, file, isEditable, onCancel }: Props) {
  const [isShowPreview, setIsShow] = useState(isShow);
  const [fileContent, setFileContent] = useState(file?.content);

  useEffect(() => {
    setIsShow(isShow);
  }, [isShow]);

  useEffect(() => {
    setFileContent(file?.content);
  }, [file]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFileContent(e.target.value);
  };

  const handleOnSave = () => {
    onSave?.(fileContent || '');
    setIsShow(false);
  };

  const handleOnCancel = () => {
    setIsShow(false);
    setFileContent('');
    onCancel?.();
  };

  return (
    <>
      <Dialog open={isShowPreview} maxWidth="lg" fullWidth>
        <DialogTitle>{file.name}</DialogTitle>

        <DialogContent dividers>
          <Grid container rowGap={2}>
            <Grid item xs={12}>
              <TextField
                value={fileContent}
                label="File Content"
                multiline
                fullWidth
                minRows={4}
                maxRows={10}
                onChange={handleOnChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleOnCancel}>
            Cancel
          </Button>
          {isEditable && (
            <Button variant="contained" onClick={handleOnSave}>
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
