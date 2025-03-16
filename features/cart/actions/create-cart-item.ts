import { Item } from "../types";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createCartItem = async (newItem: Item) => {
  await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem),
  });
};
