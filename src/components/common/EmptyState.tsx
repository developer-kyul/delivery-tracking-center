import { PackageSearch } from "lucide-react";

function EmptyState() {
  return (
    <div className="flex flex-1 items-start justify-center pt-[120px]">
      <div className="flex flex-col items-center gap-2 text-text-secondary">
        <PackageSearch size={22} className="text-text-tertiary" />
        <p className="text-sm font-semibold">검색 결과가 없습니다.</p>
      </div>
    </div>
  );
}

export default EmptyState;
