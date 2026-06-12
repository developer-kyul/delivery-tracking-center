import { AlertTriangle } from "lucide-react";
import { mockShipments } from "../../data/mockShipments";
import { getShipmentSummary } from "../../utils/shipmentSummary";

function Header() {
  const summary = getShipmentSummary(mockShipments);

  return (
    <header className="flex h-[52px] shrink-0 items-center justify-between border-b border-border bg-white px-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="flex-1" />

      <div className="flex items-center gap-3">
        {/* 알림 */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="flex items-center gap-1 rounded-full border border-status-border-delay bg-status-bg-delay px-[11px] py-1 text-[10px] font-bold text-status-delay transition hover:opacity-80"
          >
            <AlertTriangle size={12} />
            <span>배송지연 {summary.delay}건</span>
          </button>
        </div>

        {/* 구분선 */}
        <div className="h-5 w-px shrink-0 bg-border" />

        {/* 사용자 */}
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] bg-primary text-[11px] font-bold text-white">
            K
          </div>

          <div>
            <div className="text-[11px] font-bold leading-tight text-text-primary">
              김한결
            </div>
            <div className="text-[9px] leading-tight text-text-secondary">
              물류 운영팀
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
