import { LibraryGrid } from "@/components/library-grid";
import { materials } from "@/data/materials";

export default function MaterialsPage() {
  return (
    <LibraryGrid
      type="materials"
      items={materials}
      title="Explore Materials"
      intro="Browse plastics, metals, elastomers, and composites. Filter by family or specialty tags such as medical-grade candidates, chemical resistance, and HazLoc enclosure candidates — then verify grades with suppliers."
    />
  );
}
