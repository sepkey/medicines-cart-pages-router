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
  const addItem = useCartStore((state) => state.addItem);
  const t = useTranslations("medicine");
  const handleAddToCart = async () => {
    const newItem: Item = {
      name: medicine.name,
      price: medicine.price,
      quantity: 1,
      medicineId: medicine.id,
    };
    try {
      const res = await fetch(
        `http://localhost:3001/cart?medicineId=${medicine.id}`
      );
      const existingItems = await res.json();

      if (existingItems.length > 0) {
        const itemToUpdate = existingItems[0];
        await fetch(`http://localhost:3001/cart/${itemToUpdate.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: itemToUpdate.quantity + 1 }),
        });
      } else {
        await fetch("http://localhost:3001/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        });
      }
      toast("Item added", {
        description: "An Item is added to the cart.",
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
