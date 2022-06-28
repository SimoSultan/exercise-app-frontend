import Typography from "@mui/material/Typography";

import ExternalLink from "./ExternalLink";

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <ExternalLink link="https://mui.com/">Your Website</ExternalLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
