import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "text-xs font-bold tracking-[1.6px] uppercase",
        light ? "text-[#8dc4ff]" : "text-[#2772d6]",
        className
      )}
    >
      {children}
    </div>
  );
}
