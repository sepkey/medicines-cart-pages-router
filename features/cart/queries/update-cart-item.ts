import { Item } from "../types";

export const updateCartItem = async (item: Item) => {
  const response = await fetch(`http://localhost:3001/cart/${item.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity: item.quantity + 1 }),
  });

  console.log(response, "bingo");
};
