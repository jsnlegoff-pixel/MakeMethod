import { Lightbulb } from "lucide-react";

export function WhyThisMatters({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 flex gap-3 rounded-xl border border-[#c9ddf5] bg-[#eef5ff] px-4 py-3.5 text-[13px] leading-relaxed text-[#1f4f86]">
      <Lightbulb className="mt-0.5 size-4 shrink-0 text-[#2877df]" />
      <div>
        <div className="mb-1 font-bold text-[#155ab5]">Why this matters</div>
        <p>{children}</p>
      </div>
    </div>
  );
}
