import { Separator } from "@/components/ui/separator";
import { Item } from "@/types";
import { useTranslations } from "next-intl";
import Image from "next/image";

type CartItemProps = { item: Item };

export default function CartItem({ item }: CartItemProps) {
  const t = useTranslations("cart");

  return (
    <div className="mb-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Image
            src="/medicine.jpg"
            alt={item.name}
            width={80}
            height={80}
            className="rounded-lg"
          />
        </div>
        <h3 className=" font-semibold">{item.name}</h3>
      </div>
      <Separator className="my-4" />
      <div className="flex justify-between items-center mb-1 ">
        <span className="text-sm">{t("item_quantity")}</span>
        <span className="text-sm">
          {item.quantity}
          {t("times")}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm">{t("price")}</span>
        <span className="text-sm text-muted-foreground/80">
          {item.price.toLocaleString()}
          {t("toman")}
        </span>
      </div>
    </div>
  );
}
