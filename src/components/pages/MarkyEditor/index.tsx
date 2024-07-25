import { darken, Grid, styled, Typography, useTheme } from '@mui/material';

import { useStore } from '@store';
import AutoSave from '@globals/AutoSave';
import ExportButton from '@globals/ExportButton';
import FileNavigation from '@globals/FileNavigation';
import FileUploader from '@globals/FileUploader';
import MDEditor from '@globals/MDEditor';
import MDEditorHeader from '@globals/MDEditorHeader';
import SaveButton from '@globals/SaveButton';
import CreateFile from '@globals/CreateFile';
import TwoColumnLayout from '@layouts/TwoColumn';
import Message from '@ui/Message';

type Props = {};

export default function MarkyEditorPage({}: Props) {
  const theme = useTheme();
  const { files, viewingFile } = useStore();

  return (
    <TwoColumnLayout
      header={{
        leftContent: <Logo />,
        rightContent: (
          <>
            <AutoSave />
            <SaveButton isSaveAll />
            <ExportButton isMultiple />
          </>
        ),
      }}
      leftContent={
        <>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{
              p: 2,
              background: darken(theme.palette.primary.light, 0.1),
            }}
          >
            <Grid item pl={2} justifyContent="flex-start">
              <Typography fontWeight={600} sx={{ color: theme.palette.primary[400] }} variant="h5" lineHeight={1}>
                Files
              </Typography>
            </Grid>
            <Grid item pr={1.3} justifyContent="flex-end" display="flex" columnGap={1.5}>
              <FileUploader />
              <CreateFile />
            </Grid>
          </Grid>
          <Grid container p={2}>
            <Grid item xs>
              {files.length === 0 && (
                <Message
                  sx={{ mt: 5, opacity: 0.5 }}
                  size="small"
                  image="./empty_navigation.svg"
                  message="Import or create files to edit"
                />
              )}
              <FileNavigation />
            </Grid>
          </Grid>
        </>
      }
      rightContent={
        <>
          {viewingFile ? (
            <Grid container direction="column" alignItems="flex-start" height="100%" flexWrap="nowrap">
              <Grid item xs="auto" zIndex={1} sx={{ width: { xs: '100%' } }}>
                <MDEditorHeader />
              </Grid>
              <Grid item sx={{ minHeight: 0, width: '100%' }} flexGrow={1}>
                <MDEditor />
              </Grid>
            </Grid>
          ) : (
            <Grid container justifyContent="center" alignItems="center" height="100%">
              <Grid item>
                <Message
                  image="./empty_files_hero.svg"
                  message="Please import or select a file from the file browser"
                />
              </Grid>
            </Grid>
          )}
        </>
      }
    />
  );
}

const Logo = styled('div')`
  height: 34px;
  width: 104px;
  background-image: url(./marky_logo.svg);
  display: inline-block;
  box-sizing: border-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 90%;
`;
