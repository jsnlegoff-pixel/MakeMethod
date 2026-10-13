export default function Loading() {
  return (
    <div className="animate-pulse space-y-4 py-8">
      <div className="h-4 w-40 rounded bg-[#e4eaf1]" />
      <div className="h-10 w-2/3 max-w-xl rounded-lg bg-[#e4eaf1]" />
      <div className="h-4 w-full max-w-2xl rounded bg-[#e4eaf1]" />
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="h-40 rounded-2xl bg-[#e4eaf1]" />
        <div className="h-40 rounded-2xl bg-[#e4eaf1]" />
        <div className="h-40 rounded-2xl bg-[#e4eaf1]" />
      </div>
    </div>
  );
}
