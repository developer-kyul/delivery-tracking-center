// import { Clock, RefreshCcw } from "lucide-react";
import { memo } from "react";

function DashboardTitle() {
  return (
    <section className="mb-2 rounded-[10px] border border-border bg-white px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-baseline gap-2">
          <h1 className="text-[18px] font-bold tracking-[-0.5px] text-text-primary">
            배송현황
          </h1>

          <p className="text-xs text-text-secondary">
            Delivery Status Overview
          </p>
        </div>

        {/* 추후 확장을 위해서 남겨둠 */}
        {/* <div className="flex items-center gap-[5px] whitespace-nowrap text-[11px] text-text-secondary">
          <Clock size={12} className="text-text-tertiary" />
          <span>마지막 업데이트 :</span>
          <strong className="font-semibold text-text-secondary">14:32</strong>
        </div> */}

        {/* <button
          type="button"
          className="flex shrink-0 items-center gap-1 rounded-md border border-border bg-white px-[11px] py-1 text-[11px] font-semibold text-text-primary transition hover:border-border-strong hover:bg-subtle"
        >
          <RefreshCcw size={12} className="text-text-secondary" />
          새로고침
        </button> */}
      </div>
    </section>
  );
}

export default memo(DashboardTitle);
