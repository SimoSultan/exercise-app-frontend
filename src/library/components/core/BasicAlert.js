import { Container, Alert, Stack, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useExerciseContext } from "../../store/context";
import { ACTIONS } from "../../store/initialState";

export default function BasicAlert({ type, message }) {
  const { dispatch } = useExerciseContext();

  if (!type && !message) {
    return null;
  }

  const closeAlert = () => {
    dispatch({ type: ACTIONS.HIDE_ALERT });
  };

  if (type && message) {
    setTimeout(() => {
      dispatch({ type: ACTIONS.HIDE_ALERT });
    }, 3000);
  }

  return (
    <Container maxWidth="sm" sx={{ width: "100vw" }}>
      <Stack
        sx={{
          width: "auto",
          left: "5%",
          right: "5%",
          position: "absolute",
          bottom: "10%",

          margin: "0 auto",
        }}
        spacing={2}
      >
        <Alert
          variant="filled"
          severity={type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={closeAlert}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Stack>
    </Container>
  );
}
