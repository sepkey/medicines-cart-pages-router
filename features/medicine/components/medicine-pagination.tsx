import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type MedicinePaginationProps = {
  metadata: { totalCount: number; currentPage: number; perPage: number };
};

export default function MedicinePagination({
  metadata: { totalCount, currentPage, perPage },
}: MedicinePaginationProps) {
  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        asChild
        variant="outline"
        size="icon"
        onClick={(e) => currentPage <= 1 && e.preventDefault()}
        className="bg-muted border border-transparent shadow-transparent"
      >
        <Link href={`/${currentPage - 1}`}>
          <ChevronRight />
        </Link>
      </Button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => {
          const isActive = page === currentPage;
          return (
            <Button
              key={page}
              variant="outline"
              size="icon"
              asChild
              className={cn(
                "bg-muted border border-transparent shadow-transparent transition-colors",
                {
                  "border-secondary text-secondary": isActive,
                }
              )}
            >
              <Link href={`/${page}`}>{page}</Link>
            </Button>
          );
        }
      )}

      <Button
        variant="outline"
        size="icon"
        className="bg-muted border border-transparent shadow-transparent"
        onClick={(e) => currentPage >= totalPages && e.preventDefault()}
        asChild
      >
        <Link href={`/${currentPage + 1}`}>
          <ChevronLeft />
        </Link>
      </Button>
    </div>
  );
}
