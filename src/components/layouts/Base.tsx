import { Grid } from '@mui/material';

import { theme } from '@ui/theme';
import Header, { HeaderProps } from '@globals/Header';

export type BaseLayoutProps = {
  header?: HeaderProps;
  content: React.ReactNode | React.ReactNode[];
};

export default function BaseLayout({ header = {}, content }: BaseLayoutProps) {
  return (
    <Grid
      container
      direction="column"
      flexWrap="nowrap"
      sx={{ backgroundColor: theme.palette.grey[100], height: '100%' }}
    >
      <Grid item xs sx={{ flexGrow: { xs: 0 }, zIndex: 1 }}>
        <Header {...header} />
      </Grid>
      <Grid item xs sx={{ minHeight: 0 }}>
        <Grid container sx={{ height: '100%' }} flexWrap="nowrap">
          {content}
        </Grid>
      </Grid>
    </Grid>
  );
}
