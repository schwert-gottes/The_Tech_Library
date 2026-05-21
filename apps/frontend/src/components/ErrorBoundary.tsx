import { Component, ErrorInfo, ReactNode } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unexpected UI error", error, info);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <Box
        sx={{
          display: "grid",
          minHeight: "100vh",
          placeItems: "center",
          px: 3,
        }}
      >
        <Alert severity="error" sx={{ maxWidth: 520 }}>
          <Stack spacing={1.5}>
            <Typography variant="h6" component="h1">
              Something went wrong
            </Typography>
            <Typography variant="body2">
              The catalog could not render. Refresh the page and try again.
            </Typography>
            <Button
              onClick={() => window.location.reload()}
              variant="contained"
            >
              Refresh page
            </Button>
          </Stack>
        </Alert>
      </Box>
    );
  }
}
