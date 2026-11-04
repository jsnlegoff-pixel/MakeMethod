import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompatibleLinkCard } from "@/components/compatible-link-card";
import { Eyebrow } from "@/components/eyebrow";
import { ElastomerFeelPanel } from "@/components/elastomer-feel";
import { FabricFeelPanel } from "@/components/fabric-feel";
import { MaterialDetailSections } from "@/components/material-detail-sections";
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

      {/* 1) Overview */}
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
        <p className="mt-3 max-w-[750px] text-[15px] leading-relaxed text-[#63748a] sm:text-base">
          {material ? `${material.full} — ${material.desc}` : item.desc}
        </p>
        {material && (
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Badge className="rounded-full bg-[#edf3fa] px-3.5 py-2 text-[14px] font-bold tracking-tight text-[#2a4a6e] sm:px-4 sm:py-2.5 sm:text-[15px]">
              {familyLabel(material.family)}
            </Badge>
            {material.tags.map((tag) => (
              <Badge
                key={tag}
                title={MATERIAL_TAG_META[tag].hint}
                className="rounded-full bg-[#eaf2ff] px-3.5 py-2 text-[14px] font-bold tracking-tight text-[#155ab5] sm:px-4 sm:py-2.5 sm:text-[15px]"
              >
                {tagLabel(tag)}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Material: tabbed middle (processes default, grades second) */}
      {material && (
        <MaterialDetailSections
          material={material}
          linked={linked as Process[]}
        />
      )}

      {/* Process essentials before compatible list */}
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

      {/* Process pages keep a flat compatible materials list */}
      {process && (
        <section className="mt-8">
          <h2 className="mb-1 text-[28px] font-bold tracking-tight text-[#17263b]">
            Compatible Materials
          </h2>
          <p className="mb-4 max-w-[720px] text-[13px] leading-relaxed text-[#63748a]">
            Each material card includes educational DFM rules and finish
            compatibility notes for this pairing — not shop standards or coating
            certs.
          </p>
          {linked.length === 0 ? (
            <div className="rounded-2xl border border-[#e2e8f0] bg-white px-7 py-10 text-center text-[#66778d]">
              No compatible materials listed yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {linked.map((y) => {
                const linkedMaterial = y as Material;
                return (
                  <CompatibleLinkCard
                    key={y.id}
                    href={`/materials/${y.id}`}
                    title={y.name}
                    description={y.desc}
                    processId={process.id}
                    materialId={linkedMaterial.id}
                    family={linkedMaterial.family}
                  />
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Essentials below the tabbed middle */}
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

      {material?.elastomerFeel && (
        <ElastomerFeelPanel feel={material.elastomerFeel} />
      )}

      {material?.fabricFeel && <FabricFeelPanel feel={material.fabricFeel} />}

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
