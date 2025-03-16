import { Item } from "../types";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createCartItem = async (newItem: Item) => {
  const response = await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem),
  });

  if (!response.ok) {
    throw new Error(`Failed to create item with ID: ${newItem.id}`);
  }
};
