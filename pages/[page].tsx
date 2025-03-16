import Spinner from "@/components/spinner";
import MedicineCta from "@/features/medicine/components/medicine-cta";
import MedicineItem from "@/features/medicine/components/medicine-item";
import MedicinePagination from "@/features/medicine/components/medicine-pagination";
import { getMedicines } from "@/features/medicine/queries/get-medicines";
import type { Medicine } from "@/features/medicine/types";
import { GetStaticPaths, GetStaticProps } from "next";
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
      <div className="w-full max-w-[600px] flex flex-col gap-4 mx-auto">
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

// ✅ Pre-generate the first few pages
export const getStaticPaths: GetStaticPaths = async () => {
  const data: Medicine[] = await getMedicines();
  const perPage = 4;
  const totalPages = Math.ceil(data.length / perPage);

  const paths = Array.from({ length: totalPages }).map((_, index) => ({
    params: { page: (index + 1).toString() }, // /1, /2, etc.
  }));

  return {
    paths, // Pre-build some pages
    fallback: "blocking", // Ensures ISR for additional pages
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const page = parseInt((params?.page as string) || "1", 10) || 1;
    const perPage = 4;
    const locale = "fa";

    const start = (page - 1) * perPage;
    const end = start + perPage;

    const data: Medicine[] = await getMedicines();
    const totalCount = data.length;
    const medicines = data.slice(start, end);

    return {
      props: {
        medicines,
        paginationMetadata: { currentPage: page, perPage, totalCount },
        messages: (await import(`../messages/${locale}.json`)).default,
      },
      revalidate: 60, // ISR every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        medicines: [],
        paginationMetadata: { currentPage: 1, perPage: 4, totalCount: 0 },
      },
    };
  }
};
