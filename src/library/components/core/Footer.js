import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import Copyright from "./Copyright";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        width: "100%",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Typography variant="body1">
        My sticky footer can be found here.
      </Typography>
      <Copyright />
    </Box>
  );
}
