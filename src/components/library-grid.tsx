"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eyebrow } from "@/components/eyebrow";

type LibraryItem = {
  id: string;
  name: string;
  desc: string;
  full?: string;
  family?: string;
};

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

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return items;
    return items.filter((x) =>
      `${x.name} ${x.full ?? ""} ${x.desc}`.toLowerCase().includes(q)
    );
  }, [items, search]);

  return (
    <div>
      <div className="mb-[18px]">
        <Eyebrow>Knowledge Library</Eyebrow>
        <h1 className="mt-2 mb-2 text-[clamp(28px,5vw,39px)] font-bold tracking-tight text-[#17263b]">
          {title}
        </h1>
        <p className="max-w-[750px] text-[#63748a] leading-relaxed">{intro}</p>
      </div>

      <div className="relative mb-[18px] max-w-[500px]">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#63748a]" />
        <Input
          aria-label={`Search ${type}`}
          placeholder={`Search ${type}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 rounded-[10px] border-[#ccd7e4] bg-white pr-3 pl-10 text-[#203550]"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-[#e2e8f0] bg-white px-7 py-10 text-center text-[#66778d]">
          No {type} match “{search}”. Try a different keyword.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {filtered.map((item) => (
            <Link key={item.id} href={`/${type}/${item.id}`} className="group">
              <Card className="h-full rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908] transition duration-150 group-hover:-translate-y-0.5 group-hover:border-[#8eb7ef]">
                <CardContent className="p-6">
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-[#edf3fa] px-2.5 py-1.5 text-xs font-semibold text-[#385b80]"
                  >
                    {type === "materials" ? "Plastic" : item.family}
                  </Badge>
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
