import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';

function CustomSkeleton() {
  return (
    <Stack spacing={1} sx={{ width: '100%', height: '100%' }}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="rectangular" height={80} />
      <Skeleton variant="rounded" height={80} />
    </Stack>
  );
}

export default CustomSkeleton;
