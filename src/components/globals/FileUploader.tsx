import { useEffect, useState } from 'react';
import TurndownService from 'turndown';
import uuid from 'short-uuid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack } from '@mui/material';

import { useStore } from '@store/index';
import { MDFile } from '@type/files.types';
import { ReaderOutput, readFiles } from '@utils/readFiles';
import { getFileNameAndExtension } from '@utils/index';
import customRules from '@utils/turndownCustomRules';
import FileUploadButton from '@ui/FileUploadButton';
import FileList from '@ui/FileList/index';

const turndownService = new TurndownService();
turndownService.remove('script');
turndownService.use(customRules);

const parseFileObject = (file: File) => {
  const fileNameAndExt = getFileNameAndExtension(file.name);

  return {
    id: uuid.generate(),
    name: fileNameAndExt.name,
    fileExtension: fileNameAndExt.extension,
    modified: false,
    isViewing: false,
    content: '',
  };
};

type ProcessingFile = MDFile & { progress?: number };

/**
 * Component for uploading and handling files.
 */
export const FileUploader = () => {
  const { dispatch } = useStore();
  const [files, setFiles] = useState<ProcessingFile[]>([]);
  const [processedFiles, setProcessedFiles] = useState<ReaderOutput | ReaderOutput[]>([]);

  useEffect(() => {
    if (Array.isArray(processedFiles) && processedFiles.length) {
      for (const file of processedFiles) {
        if (Array.isArray(file)) {
          const content: string = file[0];
          const fileIndex: number = files.findIndex((f) => f.name === getFileNameAndExtension(file[1].name).name);
          const processingFile: ProcessingFile = files[fileIndex];

          if (processingFile?.progress) {
            delete processingFile.progress;
          }

          setFiles((prevFiles) => [
            ...prevFiles.slice(0, fileIndex),
            { ...processingFile, content },
            ...prevFiles.slice(fileIndex + 1),
          ]);
        }
      }

      setProcessedFiles([]);
    }
  }, [files, processedFiles]);

  const onProgress = (progress: number, file: File) => {
    setFiles((prevFiles) => {
      const fileIndex = prevFiles.findIndex((f) => f.name === file.name);

      if (fileIndex === -1) {
        return [...prevFiles, { ...parseFileObject(file), progress }];
      }

      return [
        ...prevFiles.slice(0, fileIndex),
        { ...parseFileObject(file), progress },
        ...prevFiles.slice(fileIndex + 1),
      ];
    });
  };

  const openFiles = async (rawFiles: File[]) => {
    const processedFiles = await readFiles(rawFiles, onProgress);

    if (processedFiles) {
      setProcessedFiles(processedFiles);
    }
  };

  const handleOnUpload = () => {
    files.forEach((file) => {
      dispatch.addFile({
        ...file,
        originalContent: file.content,
        modified: true,
        content: file.fileExtension === 'md' ? file.content : turndownService.turndown(file.content),
      });
    });

    setFiles([]);
  };

  const handleOnCancel = () => {
    setFiles([]);
  };

  const handleOnChange = (rawFiles: File[]) => {
    openFiles(rawFiles);
  };

  const handleOnDelete = (fileName: string | undefined) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <Stack direction="row" spacing={1}>
      <FileUploadButton onChange={handleOnChange} />
      <Dialog open={!!files.length}>
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent dividers>
          <Grid container rowGap={2}>
            <Grid item xs="auto" sx={{ width: { xs: 400 } }}>
              <FileList files={files} isShowDelete onDelete={handleOnDelete} />
            </Grid>
            <Grid item xs height="100%" minWidth={0}></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleOnCancel}>
            Cancel
          </Button>
          <Button onClick={handleOnUpload}>Upload</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default FileUploader;
//
