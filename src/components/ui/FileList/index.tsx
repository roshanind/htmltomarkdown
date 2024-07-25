import { useCallback, useState } from 'react';
import { Avatar, IconButton, List, ListItemAvatar, Tooltip, useTheme } from '@mui/material';

import { useStore } from '@store';
import { FileId, MDFile } from '@type/files.types';

import { DeleteIcon } from '../icons/DeleteIcon';
import { PreviewIcon } from '../icons/PreviewIcon';
import FileListItem from './FileListItem';

interface IFile extends MDFile {
  id: FileId;
  fileExtension?: string;
  modified?: boolean;
  isViewing?: boolean;
  progress?: number | boolean | null;
}

type Props<T extends IFile> = {
  files: T[];
  isShowPreview?: boolean;
  isShowDelete?: boolean;
  isEditable?: boolean;
  onPreview?: (file?: T) => void;
  onDelete?: (fileId?: FileId) => void;
  onSelect?: (file: T) => void;
};

export default function FileList<T extends IFile>({
  files,
  isShowPreview = false,
  isShowDelete = false,
  isEditable = false,
  onPreview,
  onDelete,
  onSelect,
}: Props<T>) {
  const theme = useTheme();
  const { dispatch } = useStore();
  const [viewingFile, setViewingFile] = useState<string | null>(null);

  const handleOnSelect = useCallback(
    (id: string | number) => {
      const file = files.find((file) => file.id === id);
      if (file) {
        setViewingFile(file?.id || null);
        onSelect?.(file);
      }
    },
    [files]
  );

  const handleOnApply = useCallback(
    (id: FileId, name: string) => {
      dispatch.updateFile({ id, name });
    },
    [files, viewingFile]
  );

  return (
    <List>
      {files.map((file, index) => (
        <FileListItem
          key={`file-list-item-${file?.id || index.toString()}`}
          id={file?.id}
          content={file?.name || null}
          progress={file?.progress}
          isSelected={file?.isViewing || file?.id === viewingFile}
          isChanged={file?.modified}
          isEditable={isEditable}
          actions={
            <>
              {isShowPreview && file.originalContent && (
                <Tooltip title="Preview" placement="top" arrow>
                  <IconButton color="primary" onClick={() => onPreview?.(file)} sx={{ p: 0.5 }}>
                    <PreviewIcon />
                  </IconButton>
                </Tooltip>
              )}
              {isShowDelete && (
                <Tooltip title="Delete" placement="top" arrow>
                  <IconButton color="primary" onClick={() => onDelete?.(file?.id)} sx={{ p: 0.5 }}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
            </>
          }
          startAdornment={
            file.fileExtension &&
            ((typeof file?.progress === 'number' && !(file?.progress < 100)) || !file.progress) && (
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
            )
          }
          onSelect={handleOnSelect}
          onApply={handleOnApply}
        />
      ))}
    </List>
  );
}
