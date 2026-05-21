import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { Product } from "../types/product";
import { formatPrice } from "../utils/format";

const supportsIntersectionObserver = "IntersectionObserver" in window;

const tileBackgrounds = [
  "linear-gradient(145deg, #edf2ff 0%, #f7f8ff 52%, #ffffff 100%)",
  "linear-gradient(145deg, #f5f2ff 0%, #fbf9ff 48%, #ffffff 100%)",
  "linear-gradient(145deg, #fff0ed 0%, #fff8f6 50%, #ffffff 100%)",
  "linear-gradient(145deg, #eefdff 0%, #f7feff 48%, #ffffff 100%)",
  "linear-gradient(145deg, #f1f5f9 0%, #f8fbfd 50%, #ffffff 100%)",
  "linear-gradient(145deg, #fffbe8 0%, #fffdf4 48%, #ffffff 100%)",
];

const descriptionsByType: Record<string, string> = {
  Books: "Practical ideas for sharper everyday craft.",
  Clothing: "Comfortable essentials with a refined feel.",
  Electronics: "Reliable hardware for focused daily work.",
};

interface ProductCardProps {
  product: Product;
  inWishlist: boolean;
  isAdding: boolean;
  onAdd: (productId: number) => void;
}

export function ProductCard({
  product,
  inWishlist,
  isAdding,
  onAdd,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const supportsIntersectionObserver = typeof window !== "undefined" && "IntersectionObserver" in window;
  const [isVisible, setIsVisible] = useState(!supportsIntersectionObserver);
  const buttonLabel = inWishlist
    ? "In wishlist"
    : isAdding
      ? "Adding..."
      : "Add to wishlist";
  const tileBackground = tileBackgrounds[product.id % tileBackgrounds.length];
  const description =
    descriptionsByType[product.type] ?? "Premium essentials for modern work.";

  useEffect(() => {
    const card = cardRef.current;

    if (!card || !supportsIntersectionObserver) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.22,
      },
    );

    observer.observe(card);

    return () => observer.disconnect();
  }, []);

  return (
    <Card
      ref={cardRef}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "rgba(255, 255, 255, 0.42)",
        borderRadius: "24px",
        border: 0,
        boxShadow: "0 24px 60px rgba(16, 24, 44, 0.08)",
        opacity: isVisible ? 1 : 0.72,
        transform: isVisible ? "translateY(0)" : "translateY(18px)",
        p: { xs: 1.25, lg: 1.5 },
        transition:
          "transform 0.22s ease, box-shadow 0.22s ease, filter 0.22s ease, opacity 0.22s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 28px 70px rgba(16, 24, 44, 0.14)",
        },
        "&:hover .product-card-image": {
          transform: isVisible ? "scale(1.065)" : "scale(1)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: { xs: 210, sm: 232, md: 248, lg: 268, xl: 286 },
          borderRadius: "22px",
          background: tileBackground,
          overflow: "hidden",
          transition: "box-shadow 0.3s ease, transform 0.3s ease",
          boxShadow: isVisible
            ? "inset 0 0 0 1px rgba(255, 255, 255, 0.72), inset 0 -42px 78px rgba(91, 80, 255, 0.05)"
            : "none",
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at 50% 36%, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0) 42%)",
          },
        }}
      >
        <Chip
          label={product.type}
          size="small"
          sx={{
            position: "absolute",
            top: 14,
            left: 14,
            zIndex: 1,
            height: 23,
            bgcolor: "rgba(255, 255, 255, 0.82)",
            color: "#26324a",
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            "& .MuiChip-label": { px: 1.1 },
          }}
        />
        <CardMedia
          className="product-card-image"
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            width: isVisible
              ? { xs: 124, sm: 136, md: 146, lg: 156, xl: 166 }
              : { xs: 104, sm: 112, md: 120, lg: 128, xl: 136 },
            height: isVisible
              ? { xs: 124, sm: 136, md: 146, lg: 156, xl: 166 }
              : { xs: 104, sm: 112, md: 120, lg: 128, xl: 136 },
            borderRadius: 2,
            boxShadow: isVisible
              ? "0 18px 34px rgba(16, 24, 44, 0.16)"
              : "0 10px 22px rgba(16, 24, 44, 0.1)",
            objectFit: "cover",
            zIndex: 1,
            transition:
              "width 0.45s ease, height 0.45s ease, box-shadow 0.45s ease, transform 0.45s ease",
            transform: isVisible ? "scale(1)" : "scale(0.94)",
          }}
        />
      </Box>
      <CardContent
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          gap: 1.5,
          px: 0,
          pt: { xs: 2.25, lg: 2.75 },
          pb: 0.25,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
        >
          <Typography
            variant="subtitle1"
            component="h3"
            sx={{
              color: "text.primary",
              fontSize: { xs: 15, md: 16, lg: 17 },
              fontWeight: 900,
              lineHeight: 1.18,
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "text.primary",
              flexShrink: 0,
              fontSize: { xs: 15, md: 16, lg: 17 },
              fontWeight: 900,
              lineHeight: 1.18,
            }}
          >
            {formatPrice(product.price)}
          </Typography>
        </Stack>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: { xs: 13, lg: 14 },
            lineHeight: 1.55,
            minHeight: { xs: 40, lg: 44 },
          }}
        >
          {description}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          onClick={() => onAdd(product.id)}
          disabled={inWishlist || isAdding}
          size="medium"
          aria-label={`${buttonLabel}: ${product.name}`}
          sx={{
            mt: "auto",
            minHeight: { xs: 46, lg: 50 },
            fontSize: { xs: 12, lg: 13 },
            "&.Mui-disabled": {
              bgcolor: "#dce2ed",
              color: "#6b7890",
            },
          }}
        >
          {inWishlist ? "Saved to collection" : buttonLabel}
        </Button>
      </CardContent>
    </Card>
  );
}
