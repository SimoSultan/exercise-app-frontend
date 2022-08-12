import { useContext } from "react";
import { Container, Alert, Stack, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { ExerciseContext } from "../../store/context";
import { ACTIONS } from "../../store/initialState";

export default function BasicAlert({ type, message }) {
  const { dispatch } = useContext(ExerciseContext);

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
    <Container maxWidth="sm">
      <Stack sx={{ width: "100%" }} spacing={2}>
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
