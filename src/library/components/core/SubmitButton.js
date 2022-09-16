import { Box, Button, CircularProgress, Typography } from "@mui/material";

export default function SubmitButton({
  children,
  variant,
  color = "primary",
  handleSubmit,
  isLoading,
  isDisabled,
  style,
}) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "fit-content",
        margin: "0 auto",
        ...style,
      }}
    >
      <>
        <Button
          variant={variant}
          onClick={handleSubmit}
          disabled={isDisabled || isLoading}
          sx={{
            py: 1,
          }}
        >
          <Typography
            variant="button"
            color={isLoading ? "transparent" : "inherit"}
          >
            {children}
          </Typography>
        </Button>
        {isLoading ? (
          <CircularProgress
            color="inherit"
            size={24}
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        ) : null}
      </>
    </Box>
  );
}
