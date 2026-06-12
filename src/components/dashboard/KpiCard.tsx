import type { LucideIcon } from "lucide-react";
import { memo } from "react";

interface KpiCardProps {
  label: string;
  value: number;
  unit?: string;
  icon: LucideIcon;
  iconClassName: string;
  labelClassName: string;
  valueClassName: string;
  borderClassName?: string;
}

function KpiCard({
  label,
  value,
  unit = "건",
  icon: Icon,
  iconClassName,
  labelClassName,
  valueClassName,
  borderClassName = "border-border",
}: KpiCardProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-[9px] border bg-subtle px-[14px] py-3 ${borderClassName}`}
    >
      <div className="flex flex-col items-start gap-1.5">
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] ${iconClassName}`}
        >
          <Icon size={13} />
        </div>

        <span
          className={`whitespace-nowrap text-[10px] font-semibold ${labelClassName}`}
        >
          {label}
        </span>
      </div>

      <div className="text-right">
        <span className={`text-2xl font-bold leading-none ${valueClassName}`}>
          {value.toLocaleString()}
        </span>

        <span className="ml-px text-[10px] font-normal text-text-secondary">
          {unit}
        </span>
      </div>
    </div>
  );
}

export default memo(KpiCard);
