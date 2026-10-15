import { LibraryGrid } from "@/components/library-grid";
import { materials } from "@/data/materials";

export default function MaterialsPage() {
  return (
    <LibraryGrid
      type="materials"
      items={materials}
      title="Explore Materials"
      intro="Browse plastics, metals, elastomers/rubbers, and composites. Filter by family or specialty tags (medical, chemical, gasket/sealing, HazLoc candidates). Elastomer cards show qualitative flexibility and pliability for gasket-style screening — verify compounds with suppliers."
    />
  );
}
