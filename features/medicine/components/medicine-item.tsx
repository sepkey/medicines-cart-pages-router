import { createCartItem } from "@/features/cart/queries/create-cart-item";
import { updateCartItem } from "@/features/cart/queries/update-cart-item";
import type { Item } from "@/features/cart/types";
import { useCartStore } from "@/store/cart-store";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";
import { Medicine } from "../types";

type MedicineCardProps = {
  medicine: Medicine;
};

export default function MedicineItem({ medicine }: MedicineCardProps) {
  const { addItem, items } = useCartStore();
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

      toast("Item added", {
        description: t("item-added"),
      });
      addItem(newItem);
    } catch (error) {
      console.error("Error adding item to cart:", error);
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
