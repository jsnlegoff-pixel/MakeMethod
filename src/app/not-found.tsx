import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="rounded-2xl border border-[#e2e8f0] bg-white px-7 py-16 text-center shadow-[0_4px_18px_#132a4908]">
      <h1 className="text-3xl font-bold tracking-tight text-[#17263b]">
        Page not found
      </h1>
      <p className="mx-auto mt-3 max-w-md text-[#63748a]">
        That material, process, or page is not in the MakeMethod library yet.
      </p>
      <Button
        render={<Link href="/" />}
        className="mt-6 h-11 rounded-[10px] bg-[#2877df] px-5 font-bold text-white hover:bg-[#185fbd]"
      >
        <ArrowLeft data-icon="inline-start" />
        Back to Home
      </Button>
    </div>
  );
}
