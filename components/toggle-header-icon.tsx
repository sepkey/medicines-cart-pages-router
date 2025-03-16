import { homePath } from "@/paths";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type ToggleHeaderIcon = {
  main: ReactNode;
  alternative: ReactNode;
};
export default function ToggleHeaderIcon({
  alternative,
  main,
}: ToggleHeaderIcon) {
  const pathname = usePathname();
  return <div>{pathname === homePath() ? main : alternative}</div>;
}
