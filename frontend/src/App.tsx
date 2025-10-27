import { Box, Typography } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Typography variant="h3" component="h1">
        Task Management App
      </Typography>
    </Box>
  );
}

export default App;
