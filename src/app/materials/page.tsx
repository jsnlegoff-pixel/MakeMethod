import { LibraryGrid } from "@/components/library-grid";
import { materials } from "@/data/materials";

export default function MaterialsPage() {
  return (
    <LibraryGrid
      type="materials"
      items={materials}
      title="Explore Materials"
      intro="Browse plastics, metals, elastomers/rubbers, fabrics/textiles, and composites. Filter by family or tags (acoustic/speaker, softgoods, gasket/sealing, medical, chemical). Elastomer and fabric cards show qualitative feel for seals and softgoods — verify constructions with suppliers."
    />
  );
}
