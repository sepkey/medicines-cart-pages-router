import { Item } from "../types";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const updateCartItem = async (item: Item) => {
  await fetch(`${BASE_URL}/cart/${item.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity: item.quantity + 1 }),
  });
};
