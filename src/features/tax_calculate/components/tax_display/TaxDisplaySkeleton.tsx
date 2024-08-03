import { Box, Card, Skeleton, Stack } from '@mui/material';
import React from 'react';

function TaxDisplaySkeleton() {
  return (
    <Card className="container taxdisplay-container card flex-row">
      <Stack spacing={1} sx={{ width: '55%', height: '100%' }}>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="rectangular" height={80} />
        <Skeleton variant="rectangular" height={80} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="rectangular" height={80} />
      </Stack>

      <Stack
        spacing={1}
        sx={{
          width: '30%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="circular" width={250} height={250} />
      </Stack>
    </Card>
  );
}

export default TaxDisplaySkeleton;
