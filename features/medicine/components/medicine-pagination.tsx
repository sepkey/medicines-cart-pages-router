import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/router";

type MedicinePaginationProps = {
  metadata: { totalCount: number; currentPage: number; perPage: number };
};

export default function MedicinePagination({
  metadata: { totalCount, currentPage, perPage },
}: MedicinePaginationProps) {
  const totalPages = Math.ceil(totalCount / perPage);
  const router = useRouter();

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
  );
}
