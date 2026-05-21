import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import Drawer from "@mui/material/Drawer";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Product } from "../types/product";
import { EmptyState } from "./EmptyState";
import { formatPrice } from "../utils/format";

interface WishlistDrawerProps {
  open: boolean;
  onClose: () => void;
  wishlist: Product[];
  loading: boolean;
  error: string | null;
  pendingRemoveIds: number[];
  onRemove: (productId: number) => void;
  onRetry: () => void;
}

export function WishlistDrawer({
  open,
  onClose,
  wishlist,
  loading,
  error,
  pendingRemoveIds,
  onRemove,
  onRetry,
}: WishlistDrawerProps) {
  const estimatedTotal = wishlist.reduce((sum, item) => sum + item.price, 0);

  const handleClearAll = () => {
    wishlist.forEach((item) => {
      if (!pendingRemoveIds.includes(item.id)) {
        onRemove(item.id);
      }
    });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      transitionDuration={220}
      ModalProps={{ keepMounted: true }}
      slotProps={{
        paper: {
          sx: {
            width: { xs: 340, sm: 400 },
            display: "flex",
            flexDirection: "column",
            bgcolor: "#ffffff",
          },
        },
      }}
    >
      <Box
        aria-labelledby="wishlist-title"
        aria-modal="true"
        role="dialog"
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        {/* Header */}
        <Box sx={{ px: 3, pt: 3, pb: 2 }}>
          <Stack
            direction="row"
            sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
          >
            <Stack spacing={0.25}>
              <Typography
                id="wishlist-title"
                variant="h6"
                component="h2"
                sx={{ fontWeight: 800, fontSize: "1.25rem", color: "#10182c" }}
              >
                Wishlist
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#667592", fontSize: "0.875rem" }}
              >
                {wishlist.length} item{wishlist.length === 1 ? "" : "s"} saved
              </Typography>
            </Stack>
            <IconButton
              aria-label="Close wishlist drawer"
              onClick={onClose}
              size="small"
              sx={{
                color: "#667592",
                "&:hover": { bgcolor: "rgba(0,0,0,0.06)" },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>

        {/* Scrollable item list */}
        <Box sx={{ flex: 1, overflowY: "auto", px: 2.5, pb: 2 }}>
          {loading && (
            <Box
              aria-live="polite"
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                py: 8,
              }}
            >
              <CircularProgress size={28} />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2 }}
              >
                Loading wishlist
              </Typography>
            </Box>
          )}

          {error && (
            <Stack spacing={1.5} sx={{ mb: 2 }}>
              <Typography color="error" variant="body2">
                {error}
              </Typography>
              <Button variant="outlined" size="small" onClick={onRetry}>
                Try again
              </Button>
            </Stack>
          )}

          {!loading && wishlist.length === 0 && (
            <EmptyState
              icon={FavoriteBorderOutlinedIcon}
              title="Wishlist is empty"
              description="Save products here so they are easy to revisit later."
            />
          )}

          <Stack spacing={1.5}>
            {wishlist.map((item) => {
              const isRemoving = pendingRemoveIds.includes(item.id);

              return (
                <Box
                  key={`wishlist-${item.id}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 1.5,
                    borderRadius: "14px",
                    border: "1px solid #e8edf4",
                    bgcolor: "#ffffff",
                    opacity: isRemoving ? 0.5 : 1,
                    transition: "opacity 0.2s",
                  }}
                >
                  {/* Product image */}
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      flexShrink: 0,
                      borderRadius: "10px",
                      bgcolor: "#f4f6fb",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.image ? (
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.name}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          p: 0.5,
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          bgcolor: "#dde3ef",
                          borderRadius: "6px",
                        }}
                      />
                    )}
                  </Box>

                  {/* Name + category · price */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        color: "#10182c",
                        lineHeight: 1.3,
                        mb: 0.25,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "#667592", fontSize: "0.8rem" }}
                    >
                      {item.type} · {formatPrice(item.price)}
                    </Typography>
                  </Box>

                  {/* Delete icon */}
                  <IconButton
                    aria-label={`Remove ${item.name} from wishlist`}
                    onClick={() => onRemove(item.id)}
                    disabled={isRemoving}
                    size="small"
                    sx={{
                      flexShrink: 0,
                      color: "#667592",
                      "&:hover": {
                        color: "#10182c",
                        bgcolor: "rgba(0,0,0,0.06)",
                      },
                    }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Box>
              );
            })}
          </Stack>
        </Box>

        {/* Footer */}
        {!loading && wishlist.length > 0 && (
          <Box
            sx={{
              px: 3,
              pt: 2,
              pb: 3,
              borderTop: "1px solid #e8edf4",
              bgcolor: "#ffffff",
            }}
          >
            {/* Estimated total */}
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#667592", fontSize: "0.9rem" }}
              >
                Estimated total
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#10182c" }}
              >
                {formatPrice(estimatedTotal)}
              </Typography>
            </Stack>

            {/* Buttons */}
            <Stack direction="row" spacing={1.5}>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleClearAll}
                disabled={pendingRemoveIds.length > 0}
                sx={{
                  borderRadius: "999px",
                  borderColor: "#10182c",
                  color: "#10182c",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  py: 1.25,
                  "&:hover": {
                    borderColor: "#10182c",
                    bgcolor: "rgba(16,24,44,0.06)",
                  },
                }}
              >
                Clear all
              </Button>
              <Button
                variant="contained"
                fullWidth
                disabled
                sx={{
                  borderRadius: "999px",
                  bgcolor: "#d1d5db",
                  color: "#9ca3af",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  py: 1.25,
                  boxShadow: "none",
                  "&.Mui-disabled": {
                    bgcolor: "#d1d5db",
                    color: "#9ca3af",
                  },
                }}
              >
                Checkout
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
