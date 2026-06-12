import Skeleton from "react-loading-skeleton";

function KpiCardSkeleton() {
  return (
    <div className="rounded-[10px] border border-border bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between">
        <Skeleton width={80} height={16} />
        <Skeleton circle width={28} height={28} />
      </div>

      <div className="mt-4">
        <Skeleton width={60} height={28} />
      </div>
    </div>
  );
}

export default KpiCardSkeleton;
