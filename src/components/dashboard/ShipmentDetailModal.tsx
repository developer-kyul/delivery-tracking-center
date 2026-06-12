import {
  AlertTriangle,
  CircleCheck,
  Package,
  Truck,
  Undo2,
  X,
} from "lucide-react";

import Modal from "../common/Modal";
import type { Shipment, ShipmentStatus } from "../../types/shipment";

interface ShipmentDetailModalProps {
  shipment: Shipment;
  onClose: () => void;
}

const modalStyle: Record<
  ShipmentStatus,
  {
    icon: typeof Package;
    statusText: string;
    iconClassName: string;
    textClassName: string;
    borderClassName: string;
  }
> = {
  prep: {
    icon: Package,
    statusText: "배송 준비중",
    iconClassName: "bg-status-bg-prep text-status-prep",
    textClassName: "text-status-prep",
    borderClassName: "border-border",
  },
  transit: {
    icon: Truck,
    statusText: "배송중",
    iconClassName: "bg-status-bg-transit text-status-transit",
    textClassName: "text-status-transit",
    borderClassName: "border-border",
  },
  done: {
    icon: CircleCheck,
    statusText: "배송완료",
    iconClassName: "bg-status-bg-done text-status-done",
    textClassName: "text-status-done",
    borderClassName: "border-border",
  },
  delay: {
    icon: AlertTriangle,
    statusText: "배송지연",
    iconClassName: "bg-status-bg-delay text-status-delay",
    textClassName: "text-status-delay",
    borderClassName: "border-status-border-delay",
  },
  return: {
    icon: Undo2,
    statusText: "반송",
    iconClassName: "bg-status-bg-return text-status-return",
    textClassName: "text-status-return",
    borderClassName: "border-status-border-return",
  },
};

function ShipmentDetailModal({ shipment, onClose }: ShipmentDetailModalProps) {
  const currentStyle = modalStyle[shipment.status];
  const StatusIcon = currentStyle.icon;

  return (
    <Modal onClose={onClose}>
      <div
        className={`overflow-hidden rounded-[14px] border bg-white shadow-[0_8px_24px_rgba(0,0,0,0.10)] ${currentStyle.borderClassName}`}
      >
        <div className="flex items-center gap-2.5 border-b border-border bg-subtle px-3.5 py-3">
          <div className="flex shrink-0 flex-col items-center gap-[3px]">
            <div
              className={`flex h-[30px] w-[30px] items-center justify-center rounded-lg ${currentStyle.iconClassName}`}
            >
              <StatusIcon size={15} />
            </div>

            <span
              className={`whitespace-nowrap text-[9px] font-bold ${currentStyle.textClassName}`}
            >
              {currentStyle.statusText}
            </span>
          </div>

          <div className="h-9 w-px shrink-0 bg-border" />

          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-text-primary">상세보기</p>
            <p className="mt-[3px] text-[10px] text-text-secondary">
              {shipment.trackingNumber}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-md border border-border bg-white text-text-secondary transition hover:bg-border-light hover:text-text-primary"
          >
            <X size={13} />
          </button>
        </div>

        <div className="p-4">
          <SectionTitle />

          <InfoRow label="배송 업체" value={shipment.companyName} />
          <InfoRow label="배차 기사" value={shipment.driverName} />
          <InfoRow label="연락처" value={shipment.driverPhone} />
          <InfoRow label="차량 번호" value={shipment.vehicleNumber} />
          <InfoRow label="차량 종류" value={shipment.vehicleType} />

          {shipment.status === "delay" && (
            <>
              <div className="my-3.5 h-px bg-border-light" />

              <ReasonBox
                type="delay"
                title="배송지연 상세 사유"
                text="교통 정체로 인해 배송이 지연되고 있습니다. 우회 경로로 이동 중이며 도착 예정 시간이 변경될 수 있습니다."
              />
            </>
          )}

          {shipment.status === "return" && (
            <>
              <div className="my-3.5 h-px bg-border-light" />

              <ReasonBox
                type="return"
                title="반송 상세 사유"
                text="수취인 부재 또는 주소 확인 불가로 인해 반송 처리되었습니다."
              />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}

function SectionTitle() {
  return (
    <div className="mb-2.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.5px] text-text-label">
      <Truck size={12} />
      <span>배차 정보</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-border-light py-2 last:border-b-0">
      <span className="text-[11px] font-medium text-text-secondary">{label}</span>
      <span className="text-xs font-bold text-text-primary">{value}</span>
    </div>
  );
}

function ReasonBox({
  type,
  title,
  text,
}: {
  type: "delay" | "return";
  title: string;
  text: string;
}) {
  const isDelay = type === "delay";

  return (
    <div>
      <div
        className={`mb-2.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.5px] ${
          isDelay ? "text-status-delay" : "text-status-return"
        }`}
      >
        {isDelay ? <AlertTriangle size={12} /> : <Undo2 size={12} />}
        {title}
      </div>

      <div
        className={`rounded-lg border px-3 py-2.5 ${
          isDelay
            ? "border-status-border-delay bg-status-bg-delay text-status-delay"
            : "border-status-border-return bg-status-bg-return text-status-return"
        }`}
      >
        <p className="text-[11px] font-medium leading-[1.7]">{text}</p>
      </div>
    </div>
  );
}

export default ShipmentDetailModal;
