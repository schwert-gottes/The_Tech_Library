import { describe, it, expect, beforeEach, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { Product } from "./types/product";

const products: Product[] = [
  {
    id: 1,
    name: "Mechanical Keyboard",
    type: "Electronics",
    price: 129.99,
    image: "https://example.com/keyboard.jpg",
  },
  {
    id: 2,
    name: "Clean Code",
    type: "Books",
    price: 34.99,
    image: "https://example.com/clean-code.jpg",
  },
];

function jsonResponse(body: unknown, status = 200): Promise<Response> {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  } as Response);
}

function mockApi({
  productList = products,
  initialWishlist = [],
}: {
  productList?: Product[];
  initialWishlist?: Product[];
} = {}) {
  const wishlist = [...initialWishlist];

  globalThis.fetch = vi.fn().mockImplementation((input, init) => {
    const url = input.toString();

    if (url.endsWith("/store-name")) {
      return jsonResponse({ name: "The Tech Library" });
    }

    if (url.endsWith("/products")) {
      return jsonResponse(productList);
    }

    if (url.endsWith("/wishlist") && (!init || init.method === undefined)) {
      return jsonResponse(wishlist);
    }

    if (url.endsWith("/wishlist") && init?.method === "POST") {
      const body = JSON.parse(init.body as string) as { productId: number };
      const item = productList.find((product) => product.id === body.productId);

      if (!item) {
        return jsonResponse({ message: "Product not found" }, 404);
      }

      wishlist.push(item);
      return jsonResponse(item);
    }

    if (url.includes("/wishlist/") && init?.method === "DELETE") {
      const id = Number(url.split("/").at(-1));
      const index = wishlist.findIndex((item) => item.id === id);

      if (index === -1) {
        return jsonResponse({ message: "Wishlist item not found" }, 404);
      }

      wishlist.splice(index, 1);
      return jsonResponse({ removed: true });
    }

    return jsonResponse({ message: "Not found" }, 404);
  }) as unknown as typeof fetch;
}

describe("App", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the loading state", async () => {
    globalThis.fetch = vi.fn().mockImplementation((input) => {
      const url = input.toString();

      if (url.endsWith("/store-name")) {
        return jsonResponse({ name: "The Tech Library" });
      }

      return new Promise(() => undefined);
    }) as unknown as typeof fetch;

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/loading products/i)).toBeInTheDocument();
    });
    expect(screen.getAllByRole("progressbar").length).toBeGreaterThan(0);
  });

  it("renders the product empty state", async () => {
    mockApi({ productList: [] });

    render(<App />);

    expect(
      await screen.findByRole("heading", { name: /no products found/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/try a different search term/i),
    ).toBeInTheDocument();
  });

  it("opens and closes the wishlist drawer with an empty state", async () => {
    mockApi();

    render(<App />);

    await screen.findByText("Mechanical Keyboard");
    fireEvent.click(
      screen.getByRole("button", { name: /open wishlist/i }),
    );

    expect(
      screen.getByRole("dialog", { name: /wishlist/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /wishlist is empty/i }),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: /close wishlist drawer/i }),
    );

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: /wishlist/i }),
      ).not.toBeInTheDocument();
    });
  });

  it("shows snackbar feedback after adding an item", async () => {
    mockApi();

    render(<App />);

    fireEvent.click(
      await screen.findByRole("button", {
        name: /add to wishlist: mechanical keyboard/i,
      }),
    );

    expect(await screen.findByText(/added to wishlist/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /in wishlist/i })).toBeDisabled();
  });

  it("filters products by search text", async () => {
    mockApi();

    render(<App />);

    expect(await screen.findByText("Mechanical Keyboard")).toBeInTheDocument();
    expect(screen.getByText("Clean Code")).toBeInTheDocument();

    fireEvent.change(
      screen.getByRole("textbox", { name: /search products/i }),
      {
        target: { value: "keyboard" },
      },
    );

    expect(screen.getByText("Mechanical Keyboard")).toBeInTheDocument();
    expect(screen.queryByText("Clean Code")).not.toBeInTheDocument();
  });
});
