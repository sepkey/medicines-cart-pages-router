import { Item } from "../types";

export const createCartItem = async (newItem: Item) => {
  await fetch("http://localhost:3001/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem),
  });
};
