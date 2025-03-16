import Spinner from "@/components/spinner";
import MedicineCta from "@/features/medicine/components/medicine-cta";
import MedicineItem from "@/features/medicine/components/medicine-item";
import MedicinePagination from "@/features/medicine/components/medicine-pagination";
import { getMedicines } from "@/features/medicine/queries/get-medicines";
import type { Medicine } from "@/features/medicine/types";
import { GetServerSideProps } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/Samim.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

interface HomeProps {
  medicines: Medicine[];
  paginationMetadata: {
    totalCount: number;
    currentPage: number;
    perPage: number;
  };
}

export default function Home({ medicines, paginationMetadata }: HomeProps) {
  return (
    <div
      className={`${geistSans.variable} font-[family-name:var(--font-geist-sans)] flex-1 flex flex-col gap-8`}
    >
      <div className="w-full max-w-[600px] flex flex-col gap-4 mx-auto ">
        <Suspense fallback={<Spinner />}>
          {medicines.map((medicine) => (
            <MedicineItem key={medicine.id} medicine={medicine} />
          ))}
        </Suspense>
        <MedicinePagination metadata={paginationMetadata} />
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

    const data = await getMedicines(page, perPage);
    const totalCount = data.items;
    const medicines = data.data as Medicine[];

    return {
      props: {
        medicines,
        paginationMetadata: { currentPage: page, perPage, totalCount },
        messages: (await import(`../messages/${locale}.json`)).default,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        medicines: [],
        metadata: { currentPage: 1, perPage: 4, totalCount: 0 },
      },
    };
  }
};
