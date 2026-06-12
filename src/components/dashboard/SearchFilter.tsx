import {
  AlertTriangle,
  CircleCheck,
  List,
  Package,
  RefreshCcw,
  Search,
  Snowflake,
  Truck,
  Undo2,
} from "lucide-react";
import type { FormEvent } from "react";
import { SHIPMENT_STATUS_STYLE } from "../../constants/shipmentStatus";
import { buttonMotion } from "../../styles/common";

//Props 타입 정의
interface SearchFilterProps {
  keyword: string;
  onKeywordChange: (value: string) => void;
  onSearch: () => void;
  status: string;
  onStatusChange: (value: string) => void;
  cargo: string;
  onCargoChange: (value: string) => void;
  onReset: () => void;
}

// 배송 상태 필터 데이터
const statusFilters = [
  { label: "전체", value: "all", icon: List },
  { label: "배송 준비중", value: "prep", icon: Package },
  { label: "배송중", value: "transit", icon: Truck },
  { label: "배송완료", value: "done", icon: CircleCheck },
  { label: "배송지연", value: "delay", icon: AlertTriangle },
  { label: "반송", value: "return", icon: Undo2 },
] as const;

// 화물 종류 필터 데이터
const cargoFilters = [
  { label: "전체", value: "all", icon: List },
  { label: "파손주의", value: "파손주의", icon: Package },
  { label: "냉장", value: "냉장", icon: Snowflake },
  { label: "냉동", value: "냉동", icon: Snowflake },
  { label: "고가품", value: "고가품", icon: Package },
] as const;

function SearchFilter({
  keyword,
  onKeywordChange,
  onSearch,
  status,
  onStatusChange,
  cargo,
  onCargoChange,
  onReset,
}: SearchFilterProps) {
  // 검색 조건 초기화
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <section className="mb-2 rounded-[10px] border border-border bg-white px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="mb-2.5 flex items-center gap-2">
        <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.6px] text-text-secondary">
          조회 · 필터
        </span>
        <div className="h-px flex-1 bg-border-light" />
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-[7px] rounded-[7px] border border-border bg-subtle px-[11px] py-[7px] transition focus-within:border-status-border-transit focus-within:bg-white">
          <Search size={13} className="shrink-0 text-text-secondary" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            placeholder="송장번호 혹은 회사명을 입력하세요"
            className="flex-1 bg-transparent text-xs text-text-primary outline-none placeholder:text-text-tertiary"
          />
        </div>

        <button
          type="submit"
          className={`
            flex shrink-0 items-center gap-[5px]
            rounded-[8px]
            bg-text-primary
            px-5 py-[8px]
            text-xs font-bold text-white
            shadow-[0_2px_8px_rgba(0,0,0,0.15)]
            transition
            hover:bg-text-primary-hover
            ${buttonMotion}
          `}
        >
          <Search size={13} />
          조회
        </button>

        <button
          type="button"
          onClick={onReset}
          className={`
              flex shrink-0 items-center gap-[5px]
              rounded-[8px]
              border border-border-strong
              bg-white
              px-4 py-[8px]
              text-xs font-semibold text-text-secondary
              transition
              hover:bg-subtle
              hover:border-text-muted
              hover:text-text-label
            ${buttonMotion}
            `}
        >
          <RefreshCcw size={12} />
          초기화
        </button>
      </form>

      <div className="mt-2 flex items-center gap-2.5">
        <span className="shrink-0 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.5px] text-text-secondary">
          상태
        </span>

        <div className="flex items-center gap-[5px]">
          {statusFilters.map((item) => {
            const Icon = item.icon;
            const isActive = status === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => onStatusChange(item.value)}
                className={`flex items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
                  isActive
                    ? `${SHIPMENT_STATUS_STYLE[item.value].filter} font-bold`
                    : "border-border bg-white text-text-secondary hover:border-border-strong hover:bg-subtle hover:text-text-primary"
                }`}
              >
                <Icon size={11} className={isActive ? "stroke-[2.5]" : ""} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="h-4 w-px shrink-0 bg-border" />

        <span className="shrink-0 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.5px] text-text-secondary">
          화물
        </span>

        <div className="flex items-center gap-[5px]">
          {cargoFilters.map((item) => {
            const Icon = item.icon;
            const isActive = cargo === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => onCargoChange(item.value)}
                className={`flex items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
                  isActive
                    ? "border-status-border-transit bg-status-bg-transit font-bold text-status-transit"
                    : "border-border bg-white text-text-secondary hover:border-border-strong hover:bg-subtle hover:text-text-primary"
                }`}
              >
                <Icon size={11} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SearchFilter;
