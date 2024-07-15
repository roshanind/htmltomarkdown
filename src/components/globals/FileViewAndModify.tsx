import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  // TextareaAutosize,
  TextField,
} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { FileContent } from '@type/files.types';
import { useEffect, useState } from 'react';

type Props = {
  isShow?: boolean;
  isCreatable?: boolean;
  content?: FileContent;
  onCreate?: (file: FileContent) => void;
  onCancel?: () => void;
};

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
        <Button onClick={() => setIsShow(true)} startIcon={<EditNoteIcon />} color="secondary">
          Create New File
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
