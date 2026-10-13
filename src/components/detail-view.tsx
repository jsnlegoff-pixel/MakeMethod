import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eyebrow } from "@/components/eyebrow";
import type { Material, Process } from "@/data/types";

export function DetailView({
  type,
  item,
  linked,
}: {
  type: "materials" | "processes";
  item: Material | Process;
  linked: Array<Material | Process>;
}) {
  const isMaterial = type === "materials";
  const material = isMaterial ? (item as Material) : null;
  const process = !isMaterial ? (item as Process) : null;

  return (
    <div>
      <Button
        variant="ghost"
        render={<Link href={`/${type}`} />}
        className="mb-2 -ml-2 text-[#52647b]"
      >
        <ArrowLeft data-icon="inline-start" />
        Back to {type}
      </Button>

      <div className="mt-2">
        <Eyebrow>
          {isMaterial ? "Material" : "Manufacturing Process"} Overview
        </Eyebrow>
        <h1 className="mt-2 text-[clamp(32px,5vw,44px)] font-bold tracking-tight text-[#17263b]">
          {item.name}
        </h1>
        <p className="mt-3 max-w-[750px] leading-relaxed text-[#63748a]">
          {material ? `${material.full} — ${material.desc}` : item.desc}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-[18px] md:grid-cols-2">
        <Card className="rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908]">
          <CardHeader>
            <CardTitle className="text-lg">Advantages</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 leading-relaxed text-[#17263b]">
              {item.pros.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908]">
          <CardHeader>
            <CardTitle className="text-lg">Limitations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 leading-relaxed text-[#17263b]">
              {item.cons.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {process && (
        <Card className="mt-8 rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908]">
          <CardHeader>
            <CardTitle className="text-lg">How it works</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal space-y-2 pl-5 leading-relaxed text-[#17263b]">
              {process.steps.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ol>
            <p className="mt-4 text-[13px] text-[#63748a]">
              <strong className="text-[#17263b]">Typical fit:</strong>{" "}
              {process.best}
            </p>
          </CardContent>
        </Card>
      )}

      <section className="mt-8">
        <h2 className="mb-4 text-[28px] font-bold tracking-tight text-[#17263b]">
          Compatible {isMaterial ? "Processes" : "Materials"}
        </h2>
        {linked.length === 0 ? (
          <div className="rounded-2xl border border-[#e2e8f0] bg-white px-7 py-10 text-center text-[#66778d]">
            No compatible {isMaterial ? "processes" : "materials"} listed yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {linked.map((y) => (
              <Link
                key={y.id}
                href={`/${isMaterial ? "processes" : "materials"}/${y.id}`}
                className="group"
              >
                <Card className="h-full rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908] transition duration-150 group-hover:-translate-y-0.5 group-hover:border-[#8eb7ef]">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-[#17263b]">
                      {y.name}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-[#63748a]">
                      {y.desc}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#2169c7]">
                      Learn more
                      <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      <div className="mt-8">
        <Button
          size="lg"
          render={<Link href="/advisor" />}
          className="h-11 rounded-[10px] bg-[#2877df] px-5 font-bold text-white hover:bg-[#185fbd]"
        >
          Evaluate for my product
          <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    </div>
  );
}
