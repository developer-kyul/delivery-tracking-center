import Skeleton from "react-loading-skeleton";

function ShipmentCardSkeleton() {
  return (
    <div className="rounded-lg border border-[#E9ECEF] bg-white p-4">
      <Skeleton height={24} width={120} />

      <div className="mt-4">
        <Skeleton height={20} />
      </div>

      <div className="mt-2">
        <Skeleton height={20} />
      </div>

      <div className="mt-4">
        <Skeleton height={80} />
      </div>
    </div>
  );
}

export default ShipmentCardSkeleton;
