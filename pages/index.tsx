import MedicineCta from "@/components/medicine/medicine-cta";
import MedicineItem from "@/components/medicine/medicine-item";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Medicine } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GetServerSideProps } from "next";
import localFont from "next/font/local";
import { useRouter } from "next/router";
import { useEffect } from "react";

const geistSans = localFont({
  src: "./fonts/Samim.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

interface HomeProps {
  medicines: Medicine[];
  totalCount: number;
  currentPage: number;
  perPage: number;
}

export default function Home({
  medicines,
  totalCount,
  currentPage,
  perPage,
}: HomeProps) {
  const totalPages = Math.ceil(totalCount / perPage);
  const router = useRouter();
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handlePageChange = (page: number) => {
    const queryParams = new URLSearchParams(
      router.query as Record<string, string>
    );

    if (page === 1) {
      queryParams.delete("page");
    } else {
      queryParams.set("page", String(page));
    }

    router.push(
      `/${queryParams.toString() ? "?" + queryParams.toString() : ""}`,
      undefined,
      {
        shallow: false,
      }
    );
  };

  return (
    <div
      className={`${geistSans.variable} font-[family-name:var(--font-geist-sans)] flex-1 flex flex-col gap-8`}
    >
      <div className="w-full max-w-[600px] flex flex-col gap-4 mx-auto ">
        {medicines.map((medicine) => (
          <MedicineItem key={medicine.id} medicine={medicine} />
        ))}

        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="bg-muted border border-transparent shadow-transparent"
          >
            <ChevronRight />
          </Button>

          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index + 1}
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(index + 1)}
              className={cn(
                "bg-muted border border-transparent shadow-transparent transition-colors",
                {
                  "border-secondary text-secondary": currentPage === index + 1,
                }
              )}
            >
              {index + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            className="bg-muted border border-transparent shadow-transparent"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ChevronLeft />
          </Button>
        </div>

        <MedicineCta />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const page = parseInt((query.page as string) || "1", 10) || 1;
    const perPage = 4;
    const locale = "fa";

    const res = await fetch(
      `http://localhost:3001/medicines?_page=${page}&_per_page=${perPage}`
    );
    const paginatedData = await res.json();
    const totalCount = paginatedData.items;
    const medicines = paginatedData.data as Medicine[];

    return {
      props: {
        medicines,
        currentPage: page,
        perPage,
        totalCount,
        messages: (await import(`../messages/${locale}.json`)).default,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        medicines: [],
        totalCount: 0,
        currentPage: 1,
        perPage: 4,
      },
    };
  }
};
