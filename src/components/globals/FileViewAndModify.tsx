import { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';

import { FileContent } from '@type/files.types';
import { CreateIcon } from '@ui/icons/CreateIcon';

type Props = {
  isShow?: boolean;
  isCreatable?: boolean;
  content?: FileContent;
  onCreate?: (file: FileContent) => void;
  onCancel?: () => void;
};

/**
 * Renders a component for viewing and modifying a file.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isShow - Flag indicating whether to show the file view and modify component.
 * @param {Function} props.onCreate - Function to be called when creating a new file.
 * @param {Object} props.content - The content of the file.
 * @param {boolean} props.isCreatable - Flag indicating whether the file is creatable.
 * @param {Function} props.onCancel - Function to be called when canceling the file creation.
 * @returns {JSX.Element} The rendered component.
 */
export default function FileViewAndModify({ isShow = false, onCreate, content, isCreatable, onCancel }: Props) {
  const [isShowPreview, setIsShow] = useState(isShow);
  const [fileContent, setFileContent] = useState<FileContent>({
    name: content?.name || '',
    content: content?.content || '',
  });
  const isValid = fileContent.name && fileContent.content;

  useEffect(() => {
    setIsShow(isShow);
  }, [isShow]);

  useEffect(() => {
    setFileContent({ name: content?.name || '', content: content?.content || '' });
  }, [content]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setFileContent((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleOnCreate = () => {
    onCreate?.(fileContent);
    setIsShow(false);
  };

  const handleOnCancel = () => {
    setIsShow(false);
    setFileContent({ name: '', content: '' });
    onCancel?.();
  };

  return (
    <>
      {isCreatable && (
        <Button onClick={() => setIsShow(true)} startIcon={<CreateIcon />} color="secondary">
          Create
        </Button>
      )}
      <Dialog open={isShowPreview} maxWidth="lg" fullWidth>
        <DialogTitle>{isCreatable ? 'Create New File' : 'Preview File'}</DialogTitle>

        <DialogContent dividers>
          <Grid container rowGap={2}>
            <Grid item xs={12}>
              <TextField
                value={fileContent.name}
                label="File Name"
                fullWidth
                onChange={(e) => handleOnChange(e, 'name')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={fileContent.content}
                label="File Content"
                multiline
                fullWidth
                minRows={4}
                maxRows={10}
                onChange={(e) => handleOnChange(e, 'content')}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleOnCancel}>
            Cancel
          </Button>
          {isCreatable && (
            <Button variant="contained" onClick={handleOnCreate} disabled={!isValid}>
              Create
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
