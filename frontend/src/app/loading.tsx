import { ProductGridSkeleton } from '@/components';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="h-10 bg-gray-200 rounded w-64 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded w-96 mt-2 animate-pulse" />
      </div>
      <ProductGridSkeleton />
    </div>
  );
}
