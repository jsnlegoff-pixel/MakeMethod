import { LibraryGrid } from "@/components/library-grid";
import { materials } from "@/data/materials";

export default function MaterialsPage() {
  return (
    <LibraryGrid
      type="materials"
      items={materials}
      title="Explore Materials"
      intro="Learn about material properties, advantages, limitations and manufacturing compatibility."
    />
  );
}
