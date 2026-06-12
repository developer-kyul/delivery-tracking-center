import {
  AlertTriangle,
  CircleCheck,
  Package,
  Truck,
  Undo2,
} from "lucide-react";

import KpiCard from "./KpiCard";
import KpiCardSkeleton from "./KpiCardSkeleton";
import type { DashboardSummary } from "../../utils/shipmentSummary";

interface KpiSummarySectionProps {
  summary: DashboardSummary;
  isLoading: boolean;
}

function KpiSummarySection({ summary, isLoading }: KpiSummarySectionProps) {
  const kpiItems = [
    {
      label: "전체 배송",
      value: summary.total,
      icon: Package,
      iconClassName: "bg-text-primary text-white",
      labelClassName: "text-text-primary",
      valueClassName: "text-text-primary",
    },
    {
      label: "준비중",
      value: summary.prep,
      icon: Package,
      iconClassName: "bg-status-bg-prep text-status-prep",
      labelClassName: "text-status-prep",
      valueClassName: "text-text-primary",
    },
    {
      label: "배송중",
      value: summary.transit,
      icon: Truck,
      iconClassName: "bg-status-bg-transit text-status-transit",
      labelClassName: "text-status-transit",
      valueClassName: "text-status-transit",
    },
    {
      label: "배송완료",
      value: summary.done,
      icon: CircleCheck,
      iconClassName: "bg-status-bg-done text-status-done",
      labelClassName: "text-status-done",
      valueClassName: "text-status-done",
    },
    {
      label: "배송지연",
      value: summary.delay,
      icon: AlertTriangle,
      iconClassName: "bg-status-bg-delay text-status-delay",
      labelClassName: "text-status-delay",
      valueClassName: "text-status-delay",
      borderClassName: "border-status-border-delay",
    },
    {
      label: "반송",
      value: summary.return,
      icon: Undo2,
      iconClassName: "bg-status-bg-return text-status-return",
      labelClassName: "text-status-return",
      valueClassName: "text-status-return",
      borderClassName: "border-status-border-return",
    },
  ];

  return (
    <section className="mb-2 rounded-[10px] border border-border bg-white px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="mb-2.5 flex items-center gap-2">
        <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.6px] text-text-secondary">
          현황 요약
        </span>
        <div className="h-px flex-1 bg-border-light" />
      </div>

      <div className="grid grid-cols-6 gap-2.5">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <KpiCardSkeleton key={index} />
            ))
          : kpiItems.map((item) => (
              <KpiCard
                key={item.label}
                label={item.label}
                value={item.value}
                icon={item.icon}
                iconClassName={item.iconClassName}
                labelClassName={item.labelClassName}
                valueClassName={item.valueClassName}
                borderClassName={item.borderClassName}
              />
            ))}
      </div>
    </section>
  );
}

export default KpiSummarySection;
