import CartCta from "@/features/cart/components/cart-cta";
import CartList from "@/features/cart/components/cart-list";
import { GetServerSideProps } from "next";

export default function CartPage() {
  return (
    <div className="flex-1 flex flex-col gap-8">
      <CartList />
      <CartCta />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const locale = "fa";
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  };
};
