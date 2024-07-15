import {
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useStore } from '@store';
import { useState } from 'react';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import FileViewAndModify from './FileViewAndModify';
import { FileContent } from '@type/files.types';

type Props = {};

export default function FileList({}: Props) {
  const theme = useTheme();
  const { files, dispatch } = useStore();
  const [previewingFile, setPreviewingFile] = useState<FileContent | null>(null);
  const [isSelected, setIsSelected] = useState<string | null>(null);

  const handleOnPreviewClick = (file: FileContent) => () => {
    setPreviewingFile(file);
  };

  return (
    <>
      <Typography variant="contained-heading" mb={2}>
        File List
      </Typography>

      <List>
        {files.map((file) => (
          <ListItem
            disablePadding
            key={file.name}
            secondaryAction={
              <>
                <Tooltip title="Preview" placement="right" arrow>
                  <IconButton onClick={handleOnPreviewClick(file)}>
                    <PreviewIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Preview" placement="right" arrow>
                  <IconButton onClick={() => dispatch.deleteFile(file.name)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </>
            }
          >
            <ListItemButton
              selected={isSelected === file.name}
              onClick={() => {
                setIsSelected(file.name);
                dispatch.setViewingFile(file.name);
              }}
            >
              <ListItemText
                primary={
                  <>
                    {file.name}
                    <Chip
                      variant="tag"
                      label={file.fileExtension}
                      size="small"
                      sx={{
                        ml: 1,
                        backgroundColor:
                          file.fileExtension === 'md' ? theme.palette.secondary.main : theme.palette.secondary['100'],
                        color: theme.palette.primary.contrastText,
                      }}
                    />
                  </>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <FileViewAndModify
        isShow={!!previewingFile}
        content={{ name: previewingFile?.name || '', content: previewingFile?.originalContent || '' }}
        onCancel={() => setPreviewingFile(null)}
      />
    </>
  );
}
