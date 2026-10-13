import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Compass,
  Factory,
  Settings2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eyebrow } from "@/components/eyebrow";

const features = [
  {
    icon: Boxes,
    title: "Explore Materials",
    desc: "Learn about plastics, properties, tradeoffs and compatible processes.",
    href: "/materials",
  },
  {
    icon: Settings2,
    title: "Explore Processes",
    desc: "See how manufacturing methods work and what they cost.",
    href: "/processes",
  },
  {
    icon: Compass,
    title: "Find a Solution",
    desc: "Answer a few questions and receive an explainable shortlist.",
    href: "/advisor",
  },
] as const;

export default function HomePage() {
  return (
    <div>
      <section className="mb-6 rounded-[20px] bg-gradient-to-br from-[#122640] to-[#1c4776] px-6 py-10 text-white md:px-14 md:py-16">
        <Eyebrow light>Explore • Compare • Manufacture</Eyebrow>
        <h1 className="mt-4 text-[clamp(35px,5vw,57px)] leading-[1.08] font-bold tracking-[-2.5px]">
          Find the right way
          <br />
          to make anything.
        </h1>
        <p className="mt-4 max-w-[620px] text-[17px] leading-relaxed text-[#d3e1f2]">
          Discover materials, understand manufacturing processes, and evaluate
          the cost of bringing your product to life.
        </p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <Button
            size="lg"
            render={<Link href="/advisor" />}
            className="h-11 rounded-[10px] bg-[#2877df] px-5 font-bold text-white hover:bg-[#185fbd]"
          >
            Find My Manufacturing Method
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            render={<Link href="/materials" />}
            className="h-11 rounded-[10px] border-[#8199b4] bg-transparent px-[17px] font-semibold text-white hover:bg-white/10 hover:text-white"
          >
            Explore Materials
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {features.map(({ icon: Icon, title, desc, href }) => (
          <Link key={href} href={href} className="group">
            <Card className="h-full rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908] transition duration-150 group-hover:-translate-y-0.5 group-hover:border-[#8eb7ef]">
              <CardContent className="p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[#eaf2ff] text-[#2877df]">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-lg font-semibold text-[#17263b]">{title}</h3>
                <p className="mt-2 leading-relaxed text-[#63748a]">{desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#2169c7]">
                  Explore
                  <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <section className="mt-8">
        <div className="mb-[18px] flex items-center gap-2">
          <Factory className="size-5 text-[#2877df]" />
          <h2 className="text-[28px] font-bold tracking-tight text-[#17263b]">
            Built for real manufacturing decisions
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
          <Card className="rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908]">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-[#17263b]">
                Compare cost versus quantity
              </h3>
              <p className="mt-2 leading-relaxed text-[#63748a]">
                Understand how tooling and unit economics change with production
                volume.
              </p>
              <Button
                variant="outline"
                render={<Link href="/cost-explorer" />}
                className="mt-4 h-11 rounded-[10px] border-[#d7e0eb] font-semibold text-[#243b57] hover:border-[#2877df]"
              >
                Open Cost Explorer
                <ArrowRight data-icon="inline-end" />
              </Button>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908]">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-[#17263b]">
                Start with a product brief
              </h3>
              <p className="mt-2 leading-relaxed text-[#63748a]">
                Define size, geometry, environment, finish and budget. See ranked
                combinations and why they fit.
              </p>
              <Button
                variant="outline"
                render={<Link href="/advisor" />}
                className="mt-4 h-11 rounded-[10px] border-[#d7e0eb] font-semibold text-[#243b57] hover:border-[#2877df]"
              >
                Start Advisor
                <ArrowRight data-icon="inline-end" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
