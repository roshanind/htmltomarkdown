import React from 'react';
import { Grid, useTheme } from '@mui/material';

import { HeaderProps } from '@globals/Header';

import BaseLayout from './Base';

type Props = {
  header?: HeaderProps;
  leftContent: React.ReactNode | React.ReactNode[];
  rightContent: React.ReactNode | React.ReactNode[];
};

export default function TwoColumnLayout({ header, leftContent, rightContent }: Props) {
  const theme = useTheme();

  return (
    <BaseLayout
      header={header}
      content={
        <>
          <Grid
            item
            xs="auto"
            sx={{
              width: { xs: 400 },
              overflowY: 'auto',
              background: theme.palette.primary.lighter,
            }}
          >
            {leftContent}
          </Grid>
          <Grid item xs height="100%" minWidth={0} sx={{ boxShadow: theme.customShadows.pageShadow }}>
            {rightContent}
          </Grid>
        </>
      }
    />
  );
}
