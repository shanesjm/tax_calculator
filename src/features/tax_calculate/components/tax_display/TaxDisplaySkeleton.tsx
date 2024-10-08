import { Card, Skeleton, Stack } from '@mui/material';

function TaxDisplaySkeleton() {
  return (
    <Card
      className="container taxdisplay-container card flex-row"
      data-testid="skeleton"
    >
      <Stack spacing={1} sx={{ width: '55%', height: '100%' }}>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
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
        <Skeleton variant="circular" width={250} height={250} />
      </Stack>
    </Card>
  );
}

export default TaxDisplaySkeleton;
