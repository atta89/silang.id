import { Box } from "@mui/material";

const Loading = ({ message }: { message: string }) => {
  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {message}
    </Box>
  );
};

export default Loading;
