import CssBaseline from '@mui/material/CssBaseline';
import { GlobalStyles, Grid, Paper, ThemeProvider } from '@mui/material';

import { theme } from '@ui/theme';
import FileUploader from '@globals/FileUploader';
import FileList from '@globals/FileList';
import { StoreProvider } from '@store';
import MDViewer from '@globals/MDViewer';
import ExportButton from '@globals/ExportButton';

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
                  <Grid item xs>
                    <FileUploader />
                  </Grid>
                  <Grid item xs flexGrow={{ xs: 0 }}>
                    <ExportButton />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs sx={{ minHeight: 0 }}>
              <Grid container columnSpacing={2} sx={{ height: '100%' }}>
                <Grid item xs={4}>
                  <Paper sx={{ p: 2, height: '100%', overflowY: 'auto' }} elevation={3}>
                    <FileList />
                  </Paper>
                </Grid>
                <Grid item xs={8} height="100%">
                  <Paper sx={{ p: 2, height: '100%', overflowY: 'auto' }} elevation={3}>
                    <MDViewer />
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
