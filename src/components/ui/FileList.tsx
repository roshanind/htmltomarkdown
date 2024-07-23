import { useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  CircularProgress,
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
import { PreviewIcon } from './icons/PreviewIcon';
import { DeleteIcon } from './icons/DeleteIcon';

interface IFile {
  name?: string;
  fileExtension?: string;
  modified?: boolean;
  isViewing?: boolean;
  progress?: number | boolean | null;
}

type Props<T extends IFile> = {
  files: T[];
  isShowPreview?: boolean;
  isShowDelete?: boolean;
  onPreview?: (file?: T) => void;
  onDelete?: (fileName?: string) => void;
  onSelect?: (file: T) => void;
};

export default function FileList<T extends IFile>({
  files,
  isShowPreview,
  isShowDelete,
  onPreview,
  onDelete,
  onSelect,
}: Props<T>) {
  const theme = useTheme();
  const [viewingFile, setViewingFile] = useState<string | null>(null);

  return (
    <List>
      {files.map((file, index) => (
        <ListItem
          disablePadding
          key={`file-list-item-${file.name || index}`}
          secondaryAction={
            <Box display="flex" alignItems="center">
              {isShowPreview && (
                <Tooltip title="Preview" placement="top" arrow>
                  <IconButton color="primary" onClick={() => onPreview?.(file)} sx={{ p: 0.5 }}>
                    <PreviewIcon />
                  </IconButton>
                </Tooltip>
              )}
              {isShowDelete && (
                <Tooltip title="Delete" placement="top" arrow>
                  <IconButton color="primary" onClick={() => onDelete?.(file?.name)} sx={{ p: 0.5 }}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          }
        >
          <ListItemButton
            selected={file?.isViewing || file?.name === viewingFile}
            onClick={() => {
              setViewingFile(file?.name || '');
              onSelect?.(file);
            }}
          >
            {typeof file?.progress === 'number' && file?.progress < 100 && (
              <ListItemAvatar sx={{ minWidth: 0, mr: 1, display: 'flex', alignItems: 'center' }}>
                <CircularProgress variant={'determinate'} value={file?.progress} size={16} />
              </ListItemAvatar>
            )}
            {typeof file?.progress === 'boolean' && file?.progress && (
              <ListItemAvatar sx={{ minWidth: 0, mr: 1, display: 'flex', alignItems: 'center' }}>
                <CircularProgress size={16} />
              </ListItemAvatar>
            )}

            {file.fileExtension && ((typeof file?.progress === 'number' && !(file?.progress < 100)) || !file.progress) && (
              <ListItemAvatar sx={{ minWidth: 0, mr: 1 }}>
                <Avatar
                  sx={{
                    bgcolor:
                      file.fileExtension === 'md' ? theme.palette.secondary.main : theme.palette.secondary['100'],
                    width: 'auto',
                    height: 24,
                    fontSize: '0.5rem',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    p: '2px 5px 0 5px',
                  }}
                  variant="rounded"
                >
                  {file.fileExtension}
                </Avatar>
              </ListItemAvatar>
            )}

            <ListItemText
              primary={
                <>
                  <Badge
                    invisible={!file.modified}
                    color="secondary"
                    sx={{
                      '.MuiBadge-colorSecondary': {
                        backgroundColor: theme.palette.secondary.color1?.[700],
                        top: 3,
                        right: -8,
                      },
                    }}
                    variant="dot"
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <Typography variant="body1" fontWeight={700}>
                      {file?.name || 'Untitled'}
                    </Typography>
                  </Badge>
                </>
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
