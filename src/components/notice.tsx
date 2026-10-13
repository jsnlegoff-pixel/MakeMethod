import { cn } from "@/lib/utils";

export function Notice({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[7px] border-l-[3px] border-[#e7a747] bg-[#fff8eb] px-[17px] py-3.5 text-[13px] leading-relaxed text-[#66512f]",
        className
      )}
    >
      {children}
    </div>
  );
}
