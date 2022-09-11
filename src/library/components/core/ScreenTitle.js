import { Typography } from "@mui/material";

export default function ScreenTitle({ children }) {
  return (
    <Typography variant="h3" sx={{ py: 2 }}>
      {children}
    </Typography>
  );
}
