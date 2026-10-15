import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eyebrow } from "@/components/eyebrow";
import { ElastomerFeelPanel } from "@/components/elastomer-feel";
import type { Material, Process } from "@/data/types";
import { MATERIAL_TAG_META } from "@/data/materials/tags";
import { familyLabel, tagLabel } from "@/lib/material-labels";
import { cn } from "@/lib/utils";

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
      <Link
        href={`/${type}`}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "mb-2 -ml-2 inline-flex text-[#52647b]"
        )}
      >
        <ArrowLeft className="size-4" />
        Back to {type}
      </Link>

      <div className="mt-2">
        <Eyebrow>
          {isMaterial
            ? `${familyLabel(material!.family)} · Material`
            : "Manufacturing Process"}{" "}
          Overview
        </Eyebrow>
        <h1 className="mt-2 text-[clamp(32px,5vw,44px)] font-bold tracking-tight text-[#17263b]">
          {item.name}
        </h1>
        <p className="mt-3 max-w-[750px] leading-relaxed text-[#63748a]">
          {material ? `${material.full} — ${material.desc}` : item.desc}
        </p>
        {material && material.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            <Badge className="rounded-full bg-[#edf3fa] px-2.5 py-1.5 text-xs font-semibold text-[#385b80]">
              {familyLabel(material.family)}
            </Badge>
            {material.tags.map((tag) => (
              <Badge
                key={tag}
                title={MATERIAL_TAG_META[tag].hint}
                className="rounded-full bg-[#eaf2ff] px-2.5 py-1.5 text-xs font-semibold text-[#155ab5]"
              >
                {tagLabel(tag)}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {material && material.tags.length > 0 && (
        <Card className="mt-6 rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908]">
          <CardHeader>
            <CardTitle className="text-lg">Specialty tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-[13px] leading-relaxed text-[#63748a]">
              Screening hints only. Certifications (medical, food-contact,
              flame, HazLoc) apply to specific grades and finished equipment —
              verify with supplier documentation.
            </p>
            <ul className="space-y-2">
              {material.tags.map((tag) => (
                <li key={tag} className="text-sm leading-relaxed text-[#17263b]">
                  <span className="font-semibold text-[#155ab5]">
                    {tagLabel(tag)}.
                  </span>{" "}
                  {MATERIAL_TAG_META[tag].hint}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {material?.elastomerFeel && (
        <ElastomerFeelPanel feel={material.elastomerFeel} />
      )}

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
        <Link
          href="/advisor"
          className={cn(
            buttonVariants({ variant: "default" }),
            "inline-flex h-11 items-center rounded-[10px] bg-[#2877df] px-5 font-bold text-white hover:bg-[#185fbd]"
          )}
        >
          Evaluate for my product
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
