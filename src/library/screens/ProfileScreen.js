import { Container } from "@mui/material";
import { ProfileView } from "../components/exports";

export default function ProfileScreen() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <ProfileView />
    </Container>
  );
}
