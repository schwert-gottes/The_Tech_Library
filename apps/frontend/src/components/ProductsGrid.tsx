import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Product } from "../types/product";
import { EmptyState } from "./EmptyState";
import { ProductCard } from "./ProductCard";

interface ProductsGridProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  wishlistIds: number[];
  pendingAddIds: number[];
  onAdd: (productId: number) => void;
  onRetry: () => void;
}

export function ProductsGrid({
  products,
  loading,
  error,
  wishlistIds,
  pendingAddIds,
  onAdd,
  onRetry,
}: ProductsGridProps) {
  if (loading) {
    return (
      <Box
        aria-live="polite"
        sx={{
          display: "grid",
          gap: { xs: 4, sm: 4.5, md: 5, lg: 5.5, xl: 6 },
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            sm: "repeat(2, minmax(0, 1fr))",
            md: "repeat(3, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
            xl: "repeat(5, minmax(0, 1fr))",
          },
        }}
      >
        <Box
          sx={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }}
        >
          <CircularProgress size={20} />
          <Typography>Loading products</Typography>
        </Box>
        {Array.from({ length: 10 }).map((_, index) => (
          <Box key={index}>
            <Skeleton
              variant="rounded"
              sx={{
                height: { xs: 210, sm: 232, md: 248, lg: 268, xl: 286 },
                borderRadius: 4,
              }}
            />
            <Skeleton width="82%" sx={{ mt: 2.5 }} />
            <Skeleton width="58%" />
            <Skeleton
              variant="rounded"
              height={48}
              sx={{ mt: 2, borderRadius: 999 }}
            />
          </Box>
        ))}
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 6 }}>
        <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
          <Typography color="error" variant="body1">
            {error}
          </Typography>
          <Button variant="outlined" onClick={onRetry}>
            Try again
          </Button>
        </Stack>
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon={SearchOffOutlinedIcon}
        title="No products found"
        description="Try a different search term or clear the selected product type."
      />
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "minmax(0, 1fr)",
          sm: "repeat(2, minmax(0, 1fr))",
          md: "repeat(3, minmax(0, 1fr))",
          lg: "repeat(4, minmax(0, 1fr))",
          xl: "repeat(5, minmax(0, 1fr))",
        },
        gap: { xs: 4, sm: 4.5, md: 5, lg: 5.5, xl: 6 },
        alignItems: "stretch",
      }}
    >
      {products.map((product) => (
        <Box key={`product-${product.id}`} sx={{ minWidth: 0 }}>
          <ProductCard
            product={product}
            inWishlist={wishlistIds.includes(product.id)}
            isAdding={pendingAddIds.includes(product.id)}
            onAdd={onAdd}
          />
        </Box>
      ))}
    </Box>
  );
}
