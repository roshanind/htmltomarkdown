import CssBaseline from '@mui/material/CssBaseline';
import { GlobalStyles, Grid, Paper, ThemeProvider } from '@mui/material';

import { StoreProvider } from '@store';
import FileUploader from '@globals/FileUploader';
import FileNavigation from '@globals/FileNavigation';
import MDEditor from '@globals/MDEditor';
import ExportButton from '@globals/ExportButton';
import AutoSave from '@globals/AutoSave';
import SaveButton from '@globals/SaveButton';
import { theme } from '@ui/theme';

const defaultStyles = (
  <GlobalStyles
    styles={{
      html: {
        fontSize: 16,
        height: '100%',
      },
      body: {
        height: '100%',
      },
      '#root': {
        height: '100%',
      },
    }}
  />
);

function App() {
  return (
    <>
      <StoreProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {defaultStyles}
          <Grid
            container
            p={2}
            direction="column"
            rowGap={2}
            flexWrap="nowrap"
            sx={{ backgroundColor: theme.palette.grey[100], height: '100%' }}
          >
            <Grid item xs sx={{ flexGrow: { xs: 0 } }}>
              <Paper sx={{ p: 1 }} elevation={3}>
                <Grid container justifyContent="space-between">
                  <Grid item xs display="flex" alignItems="center" columnGap={2}>
                    <FileUploader />
                    <AutoSave />
                    {/* <SavingProgress isShow /> */}
                  </Grid>
                  <Grid
                    item
                    xs
                    flexGrow={{ xs: 1 }}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    columnGap={2}
                  >
                    <SaveButton />
                    <SaveButton isSaveAll />
                    <ExportButton />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs sx={{ minHeight: 0 }}>
              <Grid container columnSpacing={2} sx={{ height: '100%' }} flexWrap="nowrap">
                <Grid item xs="auto" sx={{ width: { xs: 400 }, background: theme.palette.primary.light }}>
                  <Paper sx={{ p: 2, height: '100%', overflowY: 'auto' }} elevation={3}>
                    <FileNavigation />
                  </Paper>
                </Grid>
                <Grid item xs height="100%" minWidth={0}>
                  <Paper sx={{ p: 2, height: '100%', overflowY: 'auto' }} elevation={3}>
                    <MDEditor />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ThemeProvider>
      </StoreProvider>
    </>
  );
}

export default App;
