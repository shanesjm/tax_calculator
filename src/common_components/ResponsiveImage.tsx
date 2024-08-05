import { Box } from '@mui/material';
import { ResponsiveImageProps } from '../common_types/CommonTypes';

function ResponsiveImage({
  src,
  alt,
  maxWidth = '100%',
}: ResponsiveImageProps) {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        maxWidth,
        width: '100%',
        height: 'auto',
      }}
    />
  );
}

export default ResponsiveImage;
