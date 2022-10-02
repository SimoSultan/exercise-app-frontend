import { Typography } from "@mui/material";

export default function SectionTitle({ children }) {
  return (
    <Typography variant="h5" sx={{ py: 2 }}>
      {children}
    </Typography>
  );
}
