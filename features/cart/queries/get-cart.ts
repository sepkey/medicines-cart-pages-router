export const getCart = async () => {
  const response = await fetch("http://localhost:3001/cart");
  if (!response.ok) {
    throw new Error("Failed to fetch cart data");
  }
  const cartData = await response.json();

  return cartData;
};
