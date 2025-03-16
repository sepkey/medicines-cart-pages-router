import { toast } from "sonner";

export const deleteCart = async () => {
  try {
    const response = await fetch("http://localhost:3001/cart");
    const cartItems = await response.json();

    await Promise.all(
      cartItems.map((item: { id: string }) =>
        fetch(`http://localhost:3001/cart/${item.id}`, {
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
