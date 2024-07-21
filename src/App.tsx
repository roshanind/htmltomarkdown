import CssBaseline from '@mui/material/CssBaseline';
import { GlobalStyles, Grid, Paper, styled, ThemeProvider, Typography } from '@mui/material';

import { StoreProvider } from '@store';
import FileUploader from '@globals/FileUploader';
import FileNavigation from '@globals/FileNavigation';
import MDEditor from '@globals/MDEditor';
import ExportButton from '@globals/ExportButton';
import AutoSave from '@globals/AutoSave';
import SaveButton from '@globals/SaveButton';
import { theme } from '@ui/theme';
import MDEditorHeader from '@globals/MDEditorHeader';

const defaultStyles = (
  <GlobalStyles
    styles={(theme) => ({
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
      '::-webkit-scrollbar': {
        width: '7px' /* width of the entire scrollbar */,
        height: '7px' /* height of the entire scrollbar */,
      },
      '::-webkit-scrollbar-track': {
        background: 'transparent' /* color of the tracking area */,
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main /* color of the scroll thumb */,
        borderRadius: '6px' /* roundness of the scroll thumb */,
        transition: 'all 0.3s',
        cursor: 'pointer',
      },
      '::-webkit-scrollbar-thumb:hover': {
        backgroundColor: theme.palette.primary.dark /* color of the scroll thumb when hovered */,
      },
    })}
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
            direction="column"
            flexWrap="nowrap"
            sx={{ backgroundColor: theme.palette.grey[100], height: '100%' }}
          >
            <Grid item xs sx={{ flexGrow: { xs: 0 }, zIndex: 1, borderBottom: `2px solid ${theme.colors.teal[300]}` }}>
              <Paper sx={{ p: 2, backgroundColor: theme.palette.primary.dark }} elevation={0} square>
                <Grid container justifyContent="space-between">
                  <Grid item xs display="flex" alignItems="center" columnGap={2}>
                    <Logo />
                  </Grid>
                  <Grid
                    item
                    xs
                    flexGrow={{ xs: 1 }}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    columnGap={1.4}
                  >
                    <AutoSave />
                    <SaveButton isSaveAll />
                    <ExportButton />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs sx={{ minHeight: 0 }}>
              <Grid container sx={{ height: '100%' }} flexWrap="nowrap">
                <Grid
                  item
                  xs="auto"
                  sx={{
                    width: { xs: 400 },
                    overflowY: 'auto',
                    background: theme.palette.primary.light,
                  }}
                >
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ p: 2, borderBottom: `1px solid ${theme.colors.teal[300]}` }}
                  >
                    <Grid item pl={2} justifyContent="flex-start">
                      <Typography fontWeight={900} sx={{ color: theme.colors.teal[400] }} variant="h4" lineHeight={1}>
                        Files
                      </Typography>
                    </Grid>
                    <Grid item pr={1.3} justifyContent="flex-end">
                      <FileUploader />
                    </Grid>
                  </Grid>
                  <Grid container p={2}>
                    <Grid item xs>
                      <FileNavigation />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs height="100%" minWidth={0}>
                  <Grid container direction="column" alignItems="flex-start" height="100%" flexWrap="nowrap">
                    <Grid item xs="auto" zIndex={1} sx={{ width: { xs: '100%' } }}>
                      <MDEditorHeader />
                    </Grid>
                    <Grid item sx={{ minHeight: 0, width: '100%' }} flexGrow={1}>
                      {/* <Paper  elevation={3} square> */}
                      <MDEditor />
                      {/* </Paper> */}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ThemeProvider>
      </StoreProvider>
    </>
  );
}

const Logo = styled('div')`
  height: 34px;
  width: 104px;
  background-image: url(/marky_logo.svg);
  background-color: #004d40;
  border-radius: 20px;
  padding: 8px;
  display: inline-block;
  box-sizing: border-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 74%;
`;

export default App;
