import { Item } from "../types";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const updateCartItem = async (item: Item) => {
  const response = await fetch(`${BASE_URL}/cart/${item.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity: item.quantity + 1 }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update item with ID: ${item.id}`);
  }
};
