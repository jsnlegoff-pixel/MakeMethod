"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eyebrow } from "@/components/eyebrow";
import { ElastomerFeelBadges } from "@/components/elastomer-feel";
import { FabricFeelBadges } from "@/components/fabric-feel";
import type {
  ElastomerFeel,
  FabricFeel,
  MaterialFamily,
  MaterialTag,
} from "@/data/types";
import { ALL_MATERIAL_TAGS } from "@/data/materials/tags";
import { familyLabel, tagLabel } from "@/lib/material-labels";
import { cn } from "@/lib/utils";

type LibraryItem = {
  id: string;
  name: string;
  desc: string;
  full?: string;
  family?: string;
  tags?: MaterialTag[];
  elastomerFeel?: ElastomerFeel;
  fabricFeel?: FabricFeel;
};

const MATERIAL_FAMILIES: MaterialFamily[] = [
  "plastic",
  "metal",
  "elastomer",
  "composite",
  "fabric",
];

export function LibraryGrid({
  type,
  items,
  title,
  intro,
}: {
  type: "materials" | "processes";
  items: LibraryItem[];
  title: string;
  intro: string;
}) {
  const [search, setSearch] = useState("");
  const [familyFilter, setFamilyFilter] = useState<MaterialFamily | "all">(
    "all"
  );
  const [tagFilters, setTagFilters] = useState<MaterialTag[]>([]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return items.filter((x) => {
      if (type === "materials" && familyFilter !== "all" && x.family !== familyFilter) {
        return false;
      }
      if (
        type === "materials" &&
        tagFilters.length > 0 &&
        !tagFilters.every((t) => x.tags?.includes(t))
      ) {
        return false;
      }
      if (!q) return true;
      const tagText = (x.tags ?? []).map(tagLabel).join(" ");
      const feelText = x.elastomerFeel
        ? `${x.elastomerFeel.flexibility} ${x.elastomerFeel.pliability} ${x.elastomerFeel.gasketFit} gasket seal rubber soft pliable`
        : "";
      const fabricText = x.fabricFeel
        ? `${x.fabricFeel.hand} ${x.fabricFeel.drape} ${x.fabricFeel.stretch} ${x.fabricFeel.acousticOpenness} speaker cloth softgoods textile fabric knit woven`
        : "";
      return `${x.name} ${x.full ?? ""} ${x.desc} ${x.family ?? ""} ${tagText} ${feelText} ${fabricText}`
        .toLowerCase()
        .includes(q);
    });
  }, [items, search, familyFilter, tagFilters, type]);

  function toggleTag(tag: MaterialTag) {
    setTagFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  return (
    <div>
      <div className="mb-[18px]">
        <Eyebrow>Knowledge Library</Eyebrow>
        <h1 className="mt-2 mb-2 text-[clamp(28px,5vw,39px)] font-bold tracking-tight text-[#17263b]">
          {title}
        </h1>
        <p className="max-w-[750px] text-[#63748a] leading-relaxed">{intro}</p>
      </div>

      <div className="relative mb-4 max-w-[500px]">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#63748a]" />
        <Input
          aria-label={`Search ${type}`}
          placeholder={`Search ${type}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 rounded-[10px] border-[#ccd7e4] bg-white pr-3 pl-10 text-[#203550]"
        />
      </div>

      {type === "materials" && (
        <div className="mb-5 space-y-3">
          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={familyFilter === "all"}
              onClick={() => setFamilyFilter("all")}
            >
              All families
            </FilterChip>
            {MATERIAL_FAMILIES.map((f) => (
              <FilterChip
                key={f}
                active={familyFilter === f}
                onClick={() => setFamilyFilter(f)}
              >
                {familyLabel(f)}
              </FilterChip>
            ))}
          </div>
          <div>
            <div className="mb-2 text-[11px] font-semibold tracking-wide text-[#8190a2] uppercase">
              Specialty tags
            </div>
            <div className="flex flex-wrap gap-2">
              {ALL_MATERIAL_TAGS.map((tag) => (
                <FilterChip
                  key={tag}
                  active={tagFilters.includes(tag)}
                  onClick={() => toggleTag(tag)}
                >
                  {tagLabel(tag)}
                </FilterChip>
              ))}
            </div>
            <p className="mt-2 max-w-3xl text-[12px] leading-relaxed text-[#8190a2]">
              Tags are educational screening hints. Medical, food-contact,
              flame, and HazLoc suitability are grade- and certification-dependent
              — not approvals.
            </p>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-[#e2e8f0] bg-white px-7 py-10 text-center text-[#66778d]">
          No {type} match your filters. Clear a tag or try a different keyword.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {filtered.map((item) => (
            <Link key={item.id} href={`/${type}/${item.id}`} className="group">
              <Card className="h-full rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908] transition duration-150 group-hover:-translate-y-0.5 group-hover:border-[#8eb7ef]">
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-1.5">
                    <Badge
                      variant="secondary"
                      className="rounded-full bg-[#edf3fa] px-2.5 py-1.5 text-xs font-semibold text-[#385b80]"
                    >
                      {type === "materials"
                        ? familyLabel(item.family ?? "")
                        : item.family}
                    </Badge>
                    {type === "materials" && item.elastomerFeel && (
                      <ElastomerFeelBadges feel={item.elastomerFeel} />
                    )}
                    {type === "materials" && item.fabricFeel && (
                      <FabricFeelBadges feel={item.fabricFeel} />
                    )}
                    {type === "materials" &&
                      (item.tags ?? []).slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="rounded-full bg-[#eaf2ff] px-2.5 py-1.5 text-[11px] font-semibold text-[#155ab5]"
                        >
                          {tagLabel(tag)}
                        </Badge>
                      ))}
                    {type === "materials" && (item.tags?.length ?? 0) > 2 && (
                      <Badge
                        variant="secondary"
                        className="rounded-full bg-[#f5f8fc] px-2.5 py-1.5 text-[11px] font-semibold text-[#63748a]"
                      >
                        +{(item.tags?.length ?? 0) - 2}
                      </Badge>
                    )}
                  </div>
                  <h3 className="mt-2.5 text-lg font-semibold text-[#17263b]">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#63748a]">
                    {item.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#2169c7]">
                    View details
                    <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
        active
          ? "border-[#2877df] bg-[#eaf2ff] text-[#155ab5]"
          : "border-[#d7e0eb] bg-white text-[#52647b] hover:border-[#8eb7ef]"
      )}
    >
      {children}
    </button>
  );
}
