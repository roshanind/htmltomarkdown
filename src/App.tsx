import CssBaseline from '@mui/material/CssBaseline';
import { GlobalStyles, ThemeProvider } from '@mui/material';

import { StoreProvider } from '@store';
import { theme } from '@ui/theme';
import MarkyEditorPage from '@pages/MarkyEditor';

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
          <MarkyEditorPage />
        </ThemeProvider>
      </StoreProvider>
    </>
  );
}

export default App;
