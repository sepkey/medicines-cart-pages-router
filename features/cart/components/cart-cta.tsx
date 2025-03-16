import { Button } from "@/components/ui/button";
import { purchasePath } from "@/paths";
import { useCartStore } from "@/store/cart-store";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useTransition } from "react";
import { deleteCart } from "../queries/delete-cart";

export default function CartCta() {
  const { items, clearCart } = useCartStore();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("cart");

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteCart();
      if (result.success) clearCart();
    });
  };

  if (items.length === 0) return null;
  return (
    <div className="w-full max-w-[600px] flex mx-auto gap-4">
      <Button className="bg-primary p-6 w-1/2 " asChild>
        <Link href={purchasePath()} className="text-lg">
          {t("complete_shopping")}
        </Link>
      </Button>

      <Button
        onClick={handleDelete}
        variant="outline"
        className="w-1/2 p-6 "
        disabled={isPending}
      >
        {t("delete_cart")}
      </Button>
    </div>
  );
}
