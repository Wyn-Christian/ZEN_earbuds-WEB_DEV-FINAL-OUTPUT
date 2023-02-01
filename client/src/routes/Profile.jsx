// MUI Components
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

import { useUser } from "../contexts/user";

function Profile() {
  let { user } = useUser();
  return (
    <Container>
      <Typography variant="h1" textAlign="center">
        My Profile
      </Typography>
      <Box
        sx={{
          minHeight: "40vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Paper
          sx={{
            p: "10px",
            display: "flex",
            justifyContent: "space-around",
            mt: "40px",
          }}
          elevation={4}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "end",
              margin: "20px 20px",
            }}
          >
            <Typography variant="h5">Username: </Typography>
            <Typography variant="h5">Email: </Typography>
            <Typography variant="h5">Password: </Typography>
          </Box>
          <Divider
            orientation="vertical"
            sx={{ borderBottomWidth: "210px" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              margin: "20px 20px",
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              {user.username}
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {user.email}
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {user.password}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Profile;
