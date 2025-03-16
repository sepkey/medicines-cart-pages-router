import { toast } from "sonner";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const deleteCart = async () => {
  try {
    const response = await fetch(`${BASE_URL}/cart`);
    const cartItems = await response.json();

    await Promise.all(
      cartItems.map((item: { id: string }) =>
        fetch(`${BASE_URL}/cart/${item.id}`, {
          method: "DELETE",
        })
      )
    );

    return { success: true };
  } catch (error) {
    toast.error("Failed to delete cart:" + error);
    return { success: false };
  }
};
