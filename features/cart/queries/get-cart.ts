const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getCart = async () => {
  const response = await fetch(`${BASE_URL}/cart`);
  if (!response.ok) {
    throw new Error("Failed to fetch cart data");
  }
  const cartData = await response.json();

  return cartData;
};
