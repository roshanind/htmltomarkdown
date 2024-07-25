import { ReactNode, useState } from 'react';
import {
  Badge,
  Box,
  CircularProgress,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';

import { FileId } from '@type/files.types';
import { EditIcon } from '@ui/icons/EditIcon';
import { SaveIcon } from '@ui/icons/SaveIcon';

type Props = {
  id: FileId;
  content: string | null;
  startAdornment?: ReactNode | null;
  progress?: number | boolean | null;
  isSelected: boolean;
  isChanged?: boolean;
  isEditable?: boolean;
  actions?: ReactNode | ReactNode[] | null;
  onSelect?: (id: string | number) => void;
  onApply?: (id: FileId, content: string) => void;
};

export default function FileListItem({
  id,
  content = null,
  startAdornment = null,
  actions = null,
  progress,
  isSelected,
  isChanged,
  isEditable,
  onSelect,
  onApply,
}: Props) {
  const theme = useTheme();
  const [editableContent, setEditableContent] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <Box display="flex" alignItems="center">
          {isEditable && !isEditing && (
            <Tooltip title="Preview" placement="top" arrow>
              <IconButton color="primary" onClick={() => setIsEditing(true)} sx={{ p: 0.5 }}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          {isEditable && isEditing && (
            <Tooltip title="Save" placement="top" arrow>
              <IconButton
                color="primary"
                disabled={!editableContent}
                onClick={() => {
                  setIsEditing(false);
                  if (editableContent) {
                    onApply?.(id, editableContent);
                  }
                }}
                sx={{ p: 0.5 }}
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
          )}
          {actions}
        </Box>
      }
    >
      <ListItemButton selected={isSelected} onClick={() => onSelect?.(id)}>
        {typeof progress === 'number' && progress < 100 && (
          <ListItemAvatar sx={{ minWidth: 0, mr: 1, display: 'flex', alignItems: 'center' }}>
            <CircularProgress variant={'determinate'} value={progress} size={16} />
          </ListItemAvatar>
        )}
        {typeof progress === 'boolean' && progress && (
          <ListItemAvatar sx={{ minWidth: 0, mr: 1, display: 'flex', alignItems: 'center' }}>
            <CircularProgress size={16} />
          </ListItemAvatar>
        )}

        {startAdornment}

        {isEditable && isEditing ? (
          <TextField
            InputProps={{ sx: { backgroundColor: theme.palette.common.white } }}
            value={editableContent}
            onChange={(e) => setEditableContent(e.target.value)}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />
        ) : (
          <ListItemText
            primary={
              <Badge
                invisible={!isChanged}
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
                  {content || 'Untitled'}
                </Typography>
              </Badge>
            }
          />
        )}
      </ListItemButton>
    </ListItem>
  );
}
