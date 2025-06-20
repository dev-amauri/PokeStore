export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-muted rounded-lg p-4 flex flex-col">
      <div className="w-full h-[200px] bg-gray-300 mb-4 rounded-lg" />
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  );
}