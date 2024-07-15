import { createTheme, PaletteOptions } from '@mui/material';

export const colors = {
  primary: {
    main: '#26a69a',
    dark: '#00897b',
    darker: '#004d40',
  },
  secondary: {
    main: '#2979ff',
    100: '#ff7043',
  },
};

export const theme = createTheme({
  colors,
  palette: colors as PaletteOptions,
  typography: {
    htmlFontSize: 16,
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'primary',
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            backgroundColor: colors.primary.darker,
            '&:hover': {
              backgroundColor: colors.primary.main,
            },
          },
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            backgroundColor: colors.primary.main,
            '&:hover': {
              backgroundColor: colors.primary.darker,
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          borderRadius: 12,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'contained-heading' },
          style: {
            fontSize: '1rem',
            backgroundColor: '#e0f2f1',
            borderRadius: 12,
            padding: '12px 16px',
            display: 'flex',
            fontWeight: 600,
            color: '#26a69a',
            lineHeight: 1.1,
          },
        },
      ],
    },
    MuiListItemButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 24,
        },
      },
    },
    MuiListItemSecondaryAction: {
      styleOverrides: {
        root: {
          right: 8,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          paddingLeft: 16,
          paddingRight: 16,
        },
      },
    },
    MuiChip: {
      variants: [
        {
          props: { variant: 'tag', size: 'small' },
          style: {
            borderRadius: 12,
            backgroundColor: '#e0f2f1',
            color: '#26a69a',
            padding: '5px 0px 3px 0px',
            fontSize: '0.5rem',
            fontWeight: 600,
            textTransform: 'uppercase',
          },
        },
      ],
    },
  },
});
