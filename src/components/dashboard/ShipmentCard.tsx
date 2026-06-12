import {
  AlertTriangle,
  Calendar,
  CircleCheck,
  Diamond,
  MapPin,
  Package,
  Plus,
  Snowflake,
  Truck,
  Undo2,
} from "lucide-react";
import { memo } from "react";

import type { Shipment, ShipmentStatus } from "../../types/shipment";
import { buttonMotion } from "../../styles/common";

const statusStyle: Record<
  ShipmentStatus,
  {
    badge: string;
    card: string;
    icon: typeof Package;
  }
> = {
  prep: {
    badge: "border-status-border-prep bg-status-bg-prep text-text-primary",
    card: "border-border",
    icon: Package,
  },
  transit: {
    badge:
      "border-status-border-transit bg-status-bg-transit text-status-transit",
    card: "border-border",
    icon: Truck,
  },
  done: {
    badge: "border-status-border-done bg-status-bg-done text-status-done",
    card: "border-border",
    icon: CircleCheck,
  },
  delay: {
    badge: "border-progress-orange-light bg-status-bg-delay text-status-delay",
    card: "border-status-border-delay",
    icon: AlertTriangle,
  },
  return: {
    badge: "border-progress-red-light bg-status-bg-return text-status-return",
    card: "border-status-border-return",
    icon: Undo2,
  },
};

const cargoIconMap = {
  파손주의: AlertTriangle,
  냉장: Snowflake,
  냉동: Snowflake,
  고가품: Diamond,
};

interface ShipmentCardProps {
  shipment: Shipment;
  onDetailClick?: (shipment: Shipment) => void;
}

function ShipmentCard({ shipment, onDetailClick }: ShipmentCardProps) {
  const currentStatus = statusStyle[shipment.status];
  const StatusIcon = currentStatus.icon;
  const CargoIcon =
    cargoIconMap[shipment.cargoText as keyof typeof cargoIconMap] || Package;

  return (
    <article
      className={`flex cursor-pointer flex-col rounded-xl border bg-white px-[18px] pb-4 pt-[18px] transition hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)] ${currentStatus.card}`}
    >
      <div className="mb-1 flex items-center justify-between gap-1">
        <span
          className={`inline-flex shrink-0 items-center gap-[3px] rounded-full border px-[9px] py-[3px] text-[11px] font-bold ${currentStatus.badge}`}
        >
          <StatusIcon size={11} />
          {shipment.statusText}
        </span>

        <button
          type="button"
          onClick={() => onDetailClick?.(shipment)}
          className={`inline-flex items-center gap-0.5
                rounded-[6px]
                border-[1.5px] border-accent-navy
                bg-transparent
                px-[10px] py-[3px]
                text-[11px] font-bold
                text-accent-navy
                transition
                hover:bg-accent-navy-bg
                ${buttonMotion}`}
        >
          <Plus size={11} />
          상세보기
        </button>
      </div>

      <p className="mt-4 text-xs font-bold text-text-secondary">
        {shipment.trackingNumber}
      </p>

      <p className="mb-3.5 text-base font-bold text-text-primary">
        {shipment.companyName}
      </p>

      <div className="mb-3.5 flex items-center gap-2 rounded-lg bg-subtle px-3 py-[9px]">
        <div className="min-w-0 flex-1">
          <p className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.5px] text-text-secondary">
            출발지
          </p>
          <p className="flex items-center gap-[3px] text-[11px] font-medium text-text-primary">
            <MapPin size={11} className="shrink-0 text-text-tertiary" />
            <span className="truncate">{shipment.origin}</span>
          </p>
        </div>

        <span className="shrink-0 text-[11px] text-text-tertiary">→</span>

        <div className="min-w-0 flex-1 text-right">
          <p className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.5px] text-text-secondary">
            도착지
          </p>
          <p className="flex items-center justify-end gap-[3px] text-[11px] font-medium text-text-primary">
            <MapPin size={11} className="shrink-0 text-text-tertiary" />
            <span className="truncate">{shipment.destination}</span>
          </p>
        </div>
      </div>

      <div className="mb-[18px] flex items-center justify-between border-b border-border-light px-3 pb-3">
        <div>
          <p className="mb-0.5 flex items-center gap-[3px] text-[9px] font-bold uppercase tracking-[0.4px] text-text-secondary">
            <Calendar size={10} />
            예상 도착일
          </p>
          <p
            className={`text-xs font-bold ${
              shipment.status === "done"
                ? "text-status-done"
                : shipment.status === "delay"
                  ? "text-status-delay"
                  : shipment.status === "return"
                    ? "text-status-return"
                    : "text-text-primary"
            }`}
          >
            {shipment.estimatedDate}
          </p>
        </div>
        <span className="inline-flex items-center gap-[3px] whitespace-nowrap rounded border border-cargo-border bg-cargo-bg py-0.5 pl-2 pr-1 text-[10px] font-semibold text-cargo-text">
          <CargoIcon size={11} className="text-cargo-text" />
          {shipment.cargoText}
        </span>
      </div>

      <ShipmentProgress status={shipment.status} />
    </article>
  );
}

type ProgressColor = "gray" | "blue" | "green" | "orange" | "red";

const progressColorClass: Record<
  ProgressColor,
  {
    dot: string;
    inner: string;
    fill: string;
    line: string;
    label: string;
  }
> = {
  gray: {
    dot: "border-status-prep bg-white shadow-[0_0_0_2px_rgba(173,181,189,0.18)]",
    inner: "bg-status-prep",
    fill: "border-status-prep bg-status-prep text-white",
    line: "bg-border",
    label: "text-status-prep",
  },
  blue: {
    dot: "border-progress-blue bg-white shadow-[0_0_0_2px_rgba(51,154,240,0.15)]",
    inner: "bg-progress-blue",
    fill: "border-progress-blue bg-progress-blue text-white",
    line: "bg-progress-blue",
    label: "text-status-transit",
  },
  green: {
    dot: "border-progress-green bg-white shadow-[0_0_0_2px_rgba(81,207,102,0.15)]",
    inner: "bg-progress-green",
    fill: "border-progress-green bg-progress-green text-white",
    line: "bg-progress-green",
    label: "text-status-done",
  },
  orange: {
    dot: "border-progress-orange bg-white shadow-[0_0_0_2px_rgba(255,146,43,0.15)]",
    inner: "bg-progress-orange",
    fill: "border-progress-orange bg-progress-orange text-white",
    line: "bg-progress-orange",
    label: "text-status-delay",
  },
  red: {
    dot: "border-progress-red bg-white shadow-[0_0_0_2px_rgba(255,107,107,0.15)]",
    inner: "bg-progress-red",
    fill: "border-progress-red bg-progress-red text-white",
    line: "bg-progress-red-light",
    label: "text-status-return",
  },
};

interface ProgressStepConfig {
  label: string;
  color?: ProgressColor;
  active?: boolean;
  done?: boolean;
  error?: boolean;
}

interface ProgressStageConfig {
  steps: [ProgressStepConfig, ProgressStepConfig, ProgressStepConfig];
  lineColors: [ProgressColor?, ProgressColor?];
}

const progressStageConfig: Record<ShipmentStatus, ProgressStageConfig> = {
  prep: {
    steps: [
      { label: "준비중", color: "gray", active: true },
      { label: "배송중" },
      { label: "완료" },
    ],
    lineColors: [undefined, undefined],
  },
  transit: {
    steps: [
      { label: "준비중", color: "blue", active: true, done: true },
      { label: "배송중", color: "blue", active: true },
      { label: "완료" },
    ],
    lineColors: ["blue", undefined],
  },
  done: {
    steps: [
      { label: "준비중", color: "green", active: true, done: true },
      { label: "배송중", color: "green", active: true, done: true },
      { label: "완료", color: "green", active: true, done: true },
    ],
    lineColors: ["green", "green"],
  },
  delay: {
    steps: [
      { label: "준비중", color: "orange", active: true, done: true },
      { label: "배송중", color: "orange", active: true },
      { label: "완료" },
    ],
    lineColors: ["orange", undefined],
  },
  return: {
    steps: [
      { label: "준비중", color: "red", active: true, done: true },
      { label: "배송중", color: "red", active: true, done: true },
      { label: "반송", color: "red", active: true, error: true },
    ],
    lineColors: ["red", "red"],
  },
};

function ShipmentProgress({ status }: { status: ShipmentStatus }) {
  const { steps, lineColors } = progressStageConfig[status];

  return (
    <div className="flex items-start">
      <Step {...steps[0]} />
      <Line color={lineColors[0]} />
      <Step {...steps[1]} />
      <Line color={lineColors[1]} />
      <Step {...steps[2]} />
    </div>
  );
}

function Step({
  active = false,
  done = false,
  error = false,
  color = "blue",
  label,
}: {
  active?: boolean;
  done?: boolean;
  error?: boolean;
  color?: ProgressColor;
  label: string;
}) {
  const currentColor = progressColorClass[color];

  if (!active) {
    return (
      <div className="flex w-10 shrink-0 flex-col items-center">
        <div className="mb-[3px] h-[15px] w-[15px] rounded-full border-2 border-border-strong bg-white" />

        <span className="whitespace-nowrap text-center text-[8px] font-medium text-text-tertiary">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div className="flex w-9 shrink-0 flex-col items-center">
      <div
        className={`mb-[3px] flex h-[16px] w-[16px] items-center justify-center rounded-full border-2 text-[8px] ${done || error ? currentColor.fill : currentColor.dot}`}
      >
        {done && <span>✓</span>}
        {error && <span>×</span>}
        {!done && !error && (
          <span
            className={`h-[4px] w-[4px] rounded-full ${currentColor.inner}`}
          />
        )}
      </div>

      <span
        className={`whitespace-nowrap text-center text-[8px] font-medium ${currentColor.label}`}
      >
        {label}
      </span>
    </div>
  );
}

function Line({ color }: { color?: ProgressColor }) {
  return (
    <div
      className={`mt-2 h-0.5 flex-1 ${
        color ? progressColorClass[color].line : "bg-border"
      }`}
    />
  );
}

export default memo(ShipmentCard);
