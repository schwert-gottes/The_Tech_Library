import { useCallback, useEffect, useState } from "react";
import {
  addWishlistItem,
  fetchWishlist,
  removeWishlistItem,
} from "../api/wishlist";
import { Product } from "../types/product";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWishlist = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWishlist();
      setWishlist(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadWishlist();
  }, [loadWishlist]);

  const addToWishlist = useCallback(async (productId: number) => {
    const item = await addWishlistItem(productId);
    setWishlist((prev) => [...prev, item]);
    return item;
  }, []);

  const removeFromWishlist = useCallback(async (productId: number) => {
    await removeWishlistItem(productId);
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  return {
    wishlist,
    loading,
    error,
    reload: loadWishlist,
    addToWishlist,
    removeFromWishlist,
  };
}
