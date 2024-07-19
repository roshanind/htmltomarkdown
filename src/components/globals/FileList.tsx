import { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';

import { useStore } from '@store';
import { FileContent } from '@type/files.types';
import { FILE_SAVE_KEY } from '@constants/index';
import { useLocalStorage } from '@hooks/useLocalStorage';

import FileViewAndModify from './FileViewAndModify';

/**
 * Renders a list of files with options to preview and delete.
 * @returns The FileList component.
 */
export default function FileList() {
  const theme = useTheme();
  const { files, dispatch } = useStore();
  const [previewingFile, setPreviewingFile] = useState<FileContent | null>(null);
  const [savedFiles] = useLocalStorage(FILE_SAVE_KEY, []);

  useEffect(() => {
    dispatch.loadFromLocalStorage(savedFiles);
  }, []);

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
              <Box display="flex" alignItems="center">
                <Tooltip title="Preview" placement="top" arrow>
                  <IconButton onClick={handleOnPreviewClick(file)} sx={{ p: 0.5 }}>
                    <PreviewIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Preview" placement="top" arrow>
                  <IconButton onClick={() => dispatch.deleteFile(file.name)} sx={{ p: 0.5 }}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            }
          >
            <ListItemButton
              selected={file.isViewing}
              onClick={() => {
                dispatch.setViewingFile(file.name);
              }}
            >
              <ListItemAvatar sx={{ minWidth: 0, mr: 1 }}>
                <Avatar
                  sx={{
                    bgcolor:
                      file.fileExtension === 'md' ? theme.palette.secondary.main : theme.palette.secondary['100'],
                    width: 24,
                    height: 24,
                    fontSize: '0.5rem',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    pt: '2px',
                  }}
                  variant="rounded"
                >
                  {file.fileExtension}
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <>
                    <Badge
                      invisible={!file.modified}
                      color="secondary"
                      variant="dot"
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <Typography variant="body1" fontWeight={700}>
                        {file.name}
                      </Typography>
                    </Badge>
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
