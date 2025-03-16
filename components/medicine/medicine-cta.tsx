import { Button } from "@/components/ui/button";
import { cartPath } from "@/paths";
import { useCartStore } from "@/store/cart-store";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function MedicineCta() {
  const items = useCartStore((state) => state.items);
  const t = useTranslations("medicine");

  if (items.length === 0) return null;

  return (
    <div className="w-full max-w-[600px] flex flex-col mx-auto ">
      <Button className="bg-primary p-6 animate-cta-from-bottom" asChild>
        <Link href={cartPath()} className="text-lg">
          {t("complete_shopping")}
        </Link>
      </Button>
    </div>
  );
}
