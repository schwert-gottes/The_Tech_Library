import { useEffect, useMemo, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useProducts } from "../hooks/useProducts";
import { Product } from "../types/product";
import { FiltersBar } from "../components/FiltersBar";
import { ProductsGrid } from "../components/ProductsGrid";

const supportsIntersectionObserver = "IntersectionObserver" in window;

interface ProductCatalogProps {
  wishlist: Product[];
  searchText: string;
  onSearchTextChange: (value: string) => void;
  pendingAddIds: number[];
  onAddToWishlist: (productId: number) => void;
}

export function ProductCatalog({
  wishlist,
  searchText,
  onSearchTextChange,
  pendingAddIds,
  onAddToWishlist,
}: ProductCatalogProps) {
  const { products, loading, error, reload: reloadProducts } = useProducts();
  const [selectedType, setSelectedType] = useState("All");
  const [productsInView, setProductsInView] = useState(!supportsIntersectionObserver);
  const productSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = productSectionRef.current;

    if (!section || !supportsIntersectionObserver) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setProductsInView(entry.isIntersecting),
      {
        rootMargin: "-20% 0px -35% 0px",
        threshold: 0.12,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const types = useMemo(() => {
    const uniqueTypes = Array.from(
      new Set(products.map((product) => product.type)),
    );
    return ["All", ...uniqueTypes];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    return products.filter((product) => {
      const matchesType =
        selectedType === "All" || product.type === selectedType;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch);

      return matchesType && matchesSearch;
    });
  }, [products, searchText, selectedType]);

  const wishlistIds = useMemo(
    () => wishlist.map((item) => item.id),
    [wishlist],
  );

  return (
    <Container
      component="main"
      maxWidth={false}
      sx={{
        flex: 1,
        width: "100%",
        maxWidth: { xs: "100%", xl: 1680 },
        px: { xs: 2.25, sm: 4, md: 6, lg: 8, xl: 10 },
        py: { xs: 5, sm: 6, md: 8, lg: 10, xl: 12 },
      }}
    >
      <Stack
        spacing={{ xs: 2.25, md: 2.75, lg: 3 }}
        sx={{
          position: "relative",
          maxWidth: { xs: "100%", lg: 920, xl: 1040 },
          mb: { xs: 4, sm: 5, md: 7, lg: 8 },
          pt: { xs: 1, md: 2, lg: 3 },
          "&::before": {
            content: '""',
            position: "absolute",
            top: { xs: -10, md: -16 },
            left: 0,
            width: 78,
            height: 3,
            borderRadius: 999,
            background:
              "linear-gradient(90deg, #5b50ff 0%, rgba(91, 80, 255, 0.12) 100%)",
          },
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: "primary.main",
            fontSize: { xs: 11, lg: 12 },
            fontWeight: 900,
            letterSpacing: 3,
            lineHeight: 1,
          }}
        >
          Catalog
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            maxWidth: { xs: 620, md: 760, lg: 880, xl: 980 },
            color: productsInView ? "primary.dark" : "text.primary",
            fontSize: { xs: 40, sm: 56, md: 70, lg: 82, xl: 90 },
            fontWeight: 900,
            letterSpacing: 0,
            lineHeight: { xs: 1, md: 0.94 },
            textWrap: "balance",
            transition: "color 0.35s ease, text-shadow 0.35s ease",
            textShadow: productsInView
              ? "0 18px 38px rgba(91, 80, 255, 0.16)"
              : "none",
          }}
        >
          Tools for
          <Box
            component="span"
            sx={{
              color: "primary.main",
              display: "inline-block",
              position: "relative",
              ml: { xs: 1.25, sm: 1.75, md: 2.25 },
              px: 0.75,
              borderRadius: 1.5,
              background:
                "linear-gradient(110deg, rgba(91, 80, 255, 0.08), rgba(91, 80, 255, 0.18), rgba(91, 80, 255, 0.08))",
              backgroundSize: "260% 100%",
              boxDecorationBreak: "clone",
              letterSpacing: { xs: 1.75, sm: 2.5, md: 3.5, lg: 4 },
              isolation: "isolate",
              animation:
                "buildersAccent 5.4s cubic-bezier(0.4, 0, 0.2, 1) infinite",
              "&::after": {
                content: '""',
                position: "absolute",
                left: "8%",
                right: "8%",
                bottom: { xs: 1, md: 3 },
                height: { xs: 3, md: 4 },
                borderRadius: 999,
                background:
                  "linear-gradient(90deg, rgba(91, 80, 255, 0), rgba(91, 80, 255, 0.72), rgba(91, 80, 255, 0))",
                filter: "blur(0.2px)",
                opacity: 0.68,
                transform: "scaleX(0.52)",
                transformOrigin: "center",
                zIndex: -1,
                animation:
                  "buildersUnderline 5.4s cubic-bezier(0.4, 0, 0.2, 1) infinite",
              },
              "@keyframes buildersAccent": {
                "0%, 100%": {
                  backgroundPosition: "0% 50%",
                  textShadow: "0 0 0 rgba(91, 80, 255, 0)",
                },
                "50%": {
                  backgroundPosition: "100% 50%",
                  textShadow: "0 14px 34px rgba(91, 80, 255, 0.22)",
                },
              },
              "@keyframes buildersUnderline": {
                "0%, 100%": {
                  opacity: 0.38,
                  transform: "scaleX(0.48) translateX(-5%)",
                },
                "50%": {
                  opacity: 0.84,
                  transform: "scaleX(1) translateX(5%)",
                },
              },
            }}
          >
            builders
          </Box>
          <Box component="span" sx={{ color: "primary.main" }}>
            .
          </Box>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            maxWidth: { xs: 560, md: 660, lg: 720 },
            color: "text.secondary",
            lineHeight: { xs: 1.75, lg: 1.9 },
            fontSize: { xs: 15, sm: 16, lg: 18 },
          }}
        >
          A curated library of premium hardware and accessories. Save the ones
          you love and revisit them anytime from your wishlist.
        </Typography>
      </Stack>

      <FiltersBar
        types={types}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        searchText={searchText}
        onSearchTextChange={onSearchTextChange}
        totalCount={products.length}
        filteredCount={filteredProducts.length}
      />

      <Divider
        sx={{
          mb: { xs: 4, sm: 5, md: 6, lg: 7 },
          borderColor: "divider",
        }}
      />

      <Box ref={productSectionRef}>
        <ProductsGrid
          products={filteredProducts}
          loading={loading}
          error={error}
          wishlistIds={wishlistIds}
          pendingAddIds={pendingAddIds}
          onAdd={onAddToWishlist}
          onRetry={reloadProducts}
        />
      </Box>
    </Container>
  );
}
