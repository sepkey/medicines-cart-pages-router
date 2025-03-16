import { cartPath, purchasePath } from "@/paths";
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/router";

export default function CartIndicator() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const { pathname } = useRouter();

  if (totalItems === 0 || pathname === cartPath() || purchasePath()) {
    return null;
  }

  return (
    <div className="absolute top-2 left-3 bg-destructive text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
      {totalItems}
    </div>
  );
}
