import { TriangleAlert } from "lucide-react";
import { cloneElement, type ReactElement } from "react";

type NotFoundProps = {
  label: string;
  icon?: ReactElement;
  button?: ReactElement;
};

export default function Placeholder({
  label,
  icon = <TriangleAlert />,
  button = <div />,
}: NotFoundProps) {
  return (
    <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2">
      {cloneElement(icon, {
        className: "w-16 h-16",
      } as React.HTMLAttributes<SVGElement>)}
      <h2 className="text-lg text-center">{label}</h2>
      {cloneElement(button, {
        className: "h-10",
      } as React.HTMLAttributes<HTMLElement>)}
    </div>
  );
}
