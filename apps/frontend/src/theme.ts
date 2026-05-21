import { alpha, createTheme } from "@mui/material/styles";

const indigo = "#5b50ff";
const ink = "#10182c";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: indigo,
      dark: "#4338ca",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#14b8a6",
      contrastText: "#06111f",
    },
    background: {
      default: "#f4f6fb",
      paper: "#ffffff",
    },
    text: {
      primary: ink,
      secondary: "#667592",
    },
    divider: "#dde3ef",
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontWeight: 900, letterSpacing: 0 },
    h2: { fontWeight: 900, letterSpacing: 0 },
    h3: { fontWeight: 800, letterSpacing: 0 },
    button: {
      fontWeight: 800,
      letterSpacing: 0,
      textTransform: "none",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minWidth: 320,
          background:
            "linear-gradient(180deg, #f8f9fd 0%, #f3f5fb 46%, #eef2f8 100%)",
          color: ink,
          textRendering: "optimizeLegibility",
        },
        "::selection": {
          backgroundColor: alpha(indigo, 0.2),
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          minHeight: 42,
          transition:
            "background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, color 0.2s ease",
          "&:focus-visible": {
            outline: `3px solid ${alpha(indigo, 0.28)}`,
            outlineOffset: 2,
          },
        },
        contained: {
          backgroundColor: ink,
          color: "#ffffff",
          "&:hover": {
            backgroundColor: indigo,
            color: "#ffffff",
            boxShadow: `0 12px 24px ${alpha(indigo, 0.32)}`,
            transform: "translateY(-1px)",
          },
        },
        outlined: {
          borderColor: alpha(ink, 0.14),
          color: ink,
          "&:hover": {
            borderColor: alpha(indigo, 0.45),
            backgroundColor: alpha(indigo, 0.08),
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition:
            "background-color 0.2s ease, color 0.2s ease, transform 0.2s ease",
          "&:focus-visible": {
            outline: `3px solid ${alpha(indigo, 0.28)}`,
            outlineOffset: 2,
          },
          "&:hover": {
            transform: "translateY(-1px)",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: ink,
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#b8c1d0",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#8794aa",
          },
          "&.Mui-focused": {
            boxShadow: `0 0 0 4px ${alpha(indigo, 0.12)}`,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: indigo,
            borderWidth: 1,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 800,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: "none",
          borderLeft: `1px solid ${alpha(ink, 0.08)}`,
          boxShadow: `-24px 0 60px ${alpha("#000000", 0.18)}`,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: `0 14px 34px ${alpha("#000000", 0.14)}`,
        },
      },
    },
  },
});
