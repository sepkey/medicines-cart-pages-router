import { createCartItem } from "@/features/cart/actions/create-cart-item";
import { updateCartItem } from "@/features/cart/actions/update-cart-item";
import { getCart } from "@/features/cart/queries/get-cart";
import type { Item } from "@/features/cart/types";
import { useCartStore } from "@/store/cart-store";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";
import type { Medicine } from "../types";

type MedicineCardProps = {
  medicine: Medicine;
};

export default function MedicineItem({ medicine }: MedicineCardProps) {
  const { items, setItems } = useCartStore();
  const t = useTranslations("medicine");

  const handleAddToCart = async () => {
    const newItem: Item = {
      name: medicine.name,
      price: medicine.price,
      quantity: 1,
      medicineId: medicine.id,
    };
    try {
      const existingItem = items.find((i) => i.medicineId === medicine.id);

      if (existingItem) {
        await updateCartItem(existingItem);
      } else {
        await createCartItem(newItem);
      }

      const newItems = await getCart();
      setItems(newItems);

      toast.success(t("item_added_title"), {
        description: t("item_added_description"),
      });
    } catch (error) {
      toast.error("Error adding item to cart:" + error);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-input flex justify-between items-center">
      <div className="flex">
        <Image
          src="/medicine.jpg"
          alt={medicine.name}
          width={80}
          height={80}
          className="rounded-lg ml-4"
          priority={false}
        />
        <div className=" flex flex-col justify-between text-base">
          <h3 className="font-bold text">{medicine.name}</h3>
          <p className="text-sm text-muted-foreground/70">
            {medicine.price.toLocaleString()} {t("toman")}
          </p>
        </div>
      </div>

      <Button
        variant="ghost"
        onClick={handleAddToCart}
        className="text-primary font-semibold self-end cursor-pointer"
      >
        <Plus className="[&_svg]:size-6 " />
        {t("add")}
      </Button>
    </div>
  );
}
