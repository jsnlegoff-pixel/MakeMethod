import { notFound } from "next/navigation";
import { DetailView } from "@/components/detail-view";
import { materials } from "@/data/materials";
import { getProcess, processes } from "@/data/processes";

export function generateStaticParams() {
  return processes.map((p) => ({ id: p.id }));
}

export default async function ProcessDetailPage({
  params,
}: PageProps<"/processes/[id]">) {
  const { id } = await params;
  const item = getProcess(id);
  if (!item) notFound();

  const linked = materials.filter((m) => m.processes.includes(item.id));

  return <DetailView type="processes" item={item} linked={linked} />;
}
