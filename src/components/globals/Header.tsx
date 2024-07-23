import React from 'react';
import { Grid, Paper, useTheme } from '@mui/material';

export type HeaderProps = {
  leftContent?: React.ReactNode | React.ReactNode[];
  rightContent?: React.ReactNode | React.ReactNode[];
};

export default function Header({ leftContent, rightContent }: HeaderProps) {
  const theme = useTheme();
  return (
    <Paper sx={{ p: 2, backgroundColor: theme.palette.primary.dark }} elevation={0} square>
      <Grid container justifyContent="space-between">
        <Grid item xs display="flex" alignItems="center" columnGap={2}>
          {leftContent}
        </Grid>
        <Grid item xs flexGrow={{ xs: 1 }} display="flex" justifyContent="flex-end" alignItems="center" columnGap={1.4}>
          {rightContent}
        </Grid>
      </Grid>
    </Paper>
  );
}
