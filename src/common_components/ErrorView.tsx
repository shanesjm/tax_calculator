import { Box, Typography } from '@mui/material';
import ResponsiveImage from './ResponsiveImage';
import errorImage from '../images/error.png';

function ErrorView() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      // height="100vh"
    >
      <ResponsiveImage
        src={errorImage}
        alt="Something Went Wrong Image"
        maxWidth={400}
      />
      <h1 className="secondary-title">Something went wrong.</h1>
      <p className="paragraph">
        Brace yourself till we get the error fixed. You may also refresh the
        page or try again later.
      </p>
      {/* <Typography variant="h2" color="textSecondary">
        Something went wrong.
      </Typography>
      <Typography variant="h6" color="textSecondary">
        Brace yourself till we get the error fixed. You may also refresh the
        page or try again later.
      </Typography>
      <Typography variant="h6" color="textSecondary">
        You may also refresh the page or try again later.
      </Typography> */}
    </Box>
  );
}

export default ErrorView;
