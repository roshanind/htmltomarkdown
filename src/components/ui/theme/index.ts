import { createTheme, PaletteOptions } from '@mui/material';
import { grey, common, yellow } from '@mui/material/colors';

export const colors = {
  primary: {
    light: '#e0f2f1',
    main: '#26a69a',
    dark: '#00897b',
    darker: '#004d40',
  },
  secondary: {
    main: '#2979ff',
    100: '#ff7043',
  },
  grey,
  common,
  yellow,
};

export const theme = createTheme({
  colors,
  palette: colors as PaletteOptions,
  typography: {
    fontFamily: 'Urbanist, sans-serif',
    htmlFontSize: 17.7, // base / default font size is 17.7px. 14px in rem is 0.9rem so 16/17.7 = 0.9
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
    MuiListItem: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${colors.grey[100]}`,
          '&:last-child': {
            borderBottom: 'none',
          },
        },
      },
    },
    MuiListItemButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 24,
          '&.Mui-selected': {
            backgroundColor: colors.primary.dark,
            color: colors.common.white,
            '&:hover': {
              backgroundColor: colors.primary.darker,
            },
            '& + .MuiListItemSecondaryAction-root .MuiSvgIcon-root': {
              color: colors.common.white,
            },
          },
          transition: 'background-color 0.3s',
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
