import { Skeleton, Stack } from '@mui/material';

function CustomSkeleton() {
  return (
    <Stack spacing={1} sx={{ width: '100%', height: '100%' }}>
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="rectangular" height={80} />
      <Skeleton variant="rounded" height={80} />
    </Stack>
  );
}

export default CustomSkeleton;
