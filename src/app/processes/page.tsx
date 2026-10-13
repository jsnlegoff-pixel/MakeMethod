import { LibraryGrid } from "@/components/library-grid";
import { processes } from "@/data/processes";

export default function ProcessesPage() {
  return (
    <LibraryGrid
      type="processes"
      items={processes}
      title="Explore Manufacturing Processes"
      intro="Discover process fundamentals, tooling, design constraints and compatible materials."
    />
  );
}
