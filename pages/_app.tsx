import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div dir="rtl">
      <Header />

      <div className="flex h-screen overflow-hidden border-collapse">
        <main className="min-h-screen flex-1 overflow-y-auto overflow-x-hidden py-24 px-8 flex flex-col bg-muted text-muted-foreground">
          <Component {...pageProps} />
        </main>
      </div>
      <Toaster />
    </div>
  );
}
