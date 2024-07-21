import { useStore } from '@store';
import SaveButton from './SaveButton';
import { Grid, Typography } from '@mui/material';
import { useMemo } from 'react';

export default function MDEditorHeader() {
  const { files } = useStore();
  const viewingFile = useMemo(() => files.find((file) => file.isViewing), [files]);

  return (
    <Grid
      container
      p={2}
      sx={{
        backgroundColor: (theme) => theme.colors.teal[100],
        borderBottom: (theme) => `1px solid ${theme.colors.teal[300]}`,
      }}
    >
      <Grid xs justifyContent="flex-start">
        <Typography variant="h4" textTransform="capitalize" lineHeight={1}>
          {viewingFile?.name}
        </Typography>
      </Grid>
      <Grid xs display="flex" alignItems="center" justifyContent="flex-end">
        <SaveButton />
      </Grid>
    </Grid>
  );
}
