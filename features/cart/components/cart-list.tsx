import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { homePath } from "@/paths";
import { useCartStore } from "@/store/cart-store";
import { MessageSquareWarning } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import CartItem from "./cart-item";

export default function CartList() {
  const { items, totalPrice } = useCartStore();
  const t = useTranslations("cart");

  console.log(items, "in cart-list");

  if (items.length === 0) {
    return (
      <Placeholder
        label={t("placeholder_message")}
        icon={<MessageSquareWarning />}
        button={
          <Button asChild variant="outline">
            <Link href={homePath()}>{t("back_to")}</Link>
          </Button>
        }
      />
    );
  }
  return (
    <div className="w-full max-w-[600px] flex flex-col gap-4 mx-auto ">
      {items.map((item) => {
        console.log(item.id, "kir");
        return <CartItem key={item.id} item={item} />;
      })}

      <Separator className="mt-8" />

      <div className="flex justify-between items-center font-bold">
        <span>{t("total_prices")}</span>

        <span>
          {totalPrice().toLocaleString()}
          {t("toman")}
        </span>
      </div>
    </div>
  );
}
