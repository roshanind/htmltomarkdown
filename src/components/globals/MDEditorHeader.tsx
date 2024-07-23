import { useMemo } from 'react';
import { Grid, Typography } from '@mui/material';

import { useStore } from '@store';

import SaveButton from './SaveButton';
import ExportButton from './ExportButton';

export default function MDEditorHeader() {
  const { files } = useStore();
  const viewingFile = useMemo(() => files.find((file) => file.isViewing), [files]);

  return (
    <Grid
      container
      p={2}
      sx={{
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Grid item xs justifyContent="flex-start" display="flex" alignItems="center">
        <Typography
          variant="h4"
          fontWeight={500}
          textTransform="capitalize"
          lineHeight={1}
          color={(theme) => theme.palette.primary.darker}
        >
          {viewingFile?.name}
        </Typography>
      </Grid>
      <Grid item xs display="flex" alignItems="center" justifyContent="flex-end" columnGap={1.5}>
        <SaveButton />
        <ExportButton />
      </Grid>
    </Grid>
  );
}
