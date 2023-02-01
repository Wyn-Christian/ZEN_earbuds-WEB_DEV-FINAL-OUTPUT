// MUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function Index() {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Typography variant="h1" textAlign="center">
          Welcome to Zen Earbuds
        </Typography>
      </Box>
    </Container>
  );
}

export default Index;
