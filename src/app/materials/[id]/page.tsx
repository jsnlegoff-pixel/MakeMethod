import { notFound } from "next/navigation";
import { DetailView } from "@/components/detail-view";
import { getMaterial, materials } from "@/data/materials";
import { processes } from "@/data/processes";

export function generateStaticParams() {
  return materials.map((m) => ({ id: m.id }));
}

export default async function MaterialDetailPage({
  params,
}: PageProps<"/materials/[id]">) {
  const { id } = await params;
  const item = getMaterial(id);
  if (!item) notFound();

  const linked = processes.filter((p) => item.processes.includes(p.id));

  return <DetailView type="materials" item={item} linked={linked} />;
}
