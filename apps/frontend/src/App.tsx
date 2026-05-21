import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { fetchStoreName } from "./api/store";
import { useWishlist } from "./hooks/useWishlist";
import { ProductCatalog } from "./pages/ProductCatalog";
import { WishlistDrawer } from "./components/WishlistDrawer";

type SnackbarState = {
  open: boolean;
  message: string;
  severity: "success" | "error";
};

function App() {
  const [storeName, setStoreName] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [pendingAddIds, setPendingAddIds] = useState<number[]>([]);
  const [pendingRemoveIds, setPendingRemoveIds] = useState<number[]>([]);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    wishlist,
    loading: wishlistLoading,
    error: wishlistError,
    reload: reloadWishlist,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();

  useEffect(() => {
    fetchStoreName()
      .then((data) => setStoreName(data.name))
      .catch(() => setStoreName("Tech Store"));
  }, []);

  const handleAddToWishlist = async (productId: number) => {
    if (
      pendingAddIds.includes(productId) ||
      wishlist.some((item) => item.id === productId)
    ) {
      return;
    }

    setPendingAddIds((prev) => [...prev, productId]);

    try {
      await addToWishlist(productId);
      setSnackbar({
        open: true,
        message: "Added to wishlist",
        severity: "success",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to add to wishlist";
      setSnackbar({ open: true, message, severity: "error" });
    } finally {
      setPendingAddIds((prev) => prev.filter((id) => id !== productId));
    }
  };

  const handleRemoveFromWishlist = async (productId: number) => {
    if (pendingRemoveIds.includes(productId)) {
      return;
    }

    setPendingRemoveIds((prev) => [...prev, productId]);

    try {
      await removeFromWishlist(productId);
      setSnackbar({
        open: true,
        message: "Removed from wishlist",
        severity: "success",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to remove from wishlist";
      setSnackbar({ open: true, message, severity: "error" });
    } finally {
      setPendingRemoveIds((prev) => prev.filter((id) => id !== productId));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          top: 0,
          bgcolor: "rgba(17, 22, 33, 0.88)",
          color: "#ffffff",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 4px 24px rgba(8, 12, 24, 0.22)",
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 68, sm: 76 },
            justifyContent: "space-between",
            px: { xs: 2.5, sm: 4, md: 6, lg: 8, xl: 10 },
          }}
        >
          {/* Brand */}
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Avatar
              sx={{
                width: 42,
                height: 42,
                bgcolor: "#635bff",
                fontSize: 18,
                fontWeight: 900,
                boxShadow: "0 4px 14px rgba(99, 91, 255, 0.45)",
              }}
            >
              T
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                component="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "1.1rem", sm: "1.3rem" },
                  lineHeight: 1.1,
                  letterSpacing: "-0.3px",
                  color: "#ffffff",
                }}
              >
                {storeName || "Tech Store"}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.5px",
                  lineHeight: 1,
                }}
              >
                Premium gear store
              </Typography>
            </Box>
          </Stack>

          {/* Wishlist button */}
          <Badge
            badgeContent={wishlist.length}
            color="secondary"
            showZero
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "0.7rem",
                fontWeight: 800,
                minWidth: 20,
                height: 20,
              },
            }}
          >
            <IconButton
              aria-label={`Open wishlist, ${wishlist.length} item${wishlist.length === 1 ? "" : "s"} saved`}
              onClick={() => setDrawerOpen(true)}
              sx={{
                width: 46,
                height: 46,
                color: "#ffffff",
                bgcolor: "rgba(255, 255, 255, 0.09)",
                border: "1px solid rgba(255,255,255,0.12)",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.16)",
                  borderColor: "rgba(255,255,255,0.22)",
                },
              }}
            >
              <FavoriteIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Badge>
        </Toolbar>
      </AppBar>

      <ProductCatalog
        wishlist={wishlist}
        searchText={searchText}
        onSearchTextChange={setSearchText}
        pendingAddIds={pendingAddIds}
        onAddToWishlist={handleAddToWishlist}
      />

      <WishlistDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        wishlist={wishlist}
        loading={wishlistLoading}
        error={wishlistError}
        pendingRemoveIds={pendingRemoveIds}
        onRemove={handleRemoveFromWishlist}
        onRetry={reloadWishlist}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
