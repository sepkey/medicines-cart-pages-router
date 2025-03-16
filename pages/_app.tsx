import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { getCart } from "@/features/cart/queries/get-cart";
import { useCartStore } from "@/store/cart-store";
import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const setItems = useCartStore((state) => state.setItems);

  useEffect(() => {
    const fetchCart = async () => {
      const items = await getCart();
      setItems(items);
    };

    fetchCart();
  }, [setItems]);

  return (
    <div dir="rtl">
      <Header />

      <div className="flex h-screen overflow-hidden border-collapse">
        <main className="min-h-screen flex-1 overflow-y-auto overflow-x-hidden py-24 px-8 flex flex-col bg-muted text-muted-foreground">
          <NextIntlClientProvider
            locale="fa"
            timeZone="Asia/Tehran"
            messages={pageProps.messages}
          >
            <Component {...pageProps} />
          </NextIntlClientProvider>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
