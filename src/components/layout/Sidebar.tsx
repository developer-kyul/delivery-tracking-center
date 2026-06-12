import { ChevronsLeft, LayoutDashboard, Truck } from "lucide-react";
import { useState } from "react";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex h-screen shrink-0 flex-col border-r border-border bg-white transition-all duration-300 ${
        collapsed ? "w-[60px]" : "w-[180px]"
      }`}
    >
      {/* Logo */}
      <div className="flex h-[52px] shrink-0 items-center gap-[9px] border-b border-border px-[13px]">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] bg-primary text-white">
          <Truck size={15} />
        </div>

        <div
          className={`overflow-hidden whitespace-nowrap text-[11px] font-bold uppercase tracking-[1px] text-text-secondary transition-all duration-300 ${
            collapsed ? "w-0 opacity-0" : "w-[36px] opacity-100"
          }`}
        >
          LOGO
        </div>
      </div>

      {/* Collapse Button */}
      <div className="shrink-0 border-b border-border p-2">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-[7px] p-[7px] text-text-tertiary transition hover:bg-subtle hover:text-text-secondary"
        >
          <ChevronsLeft
            size={15}
            className={`transition-transform duration-300 ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-0.5 bg-white px-2 py-2.5">
        <button
          type="button"
          className="flex w-full items-center rounded-[7px] bg-status-bg-transit px-2.5 py-2 text-xs font-bold text-status-transit transition-colors duration-300"
        >
          <LayoutDashboard size={15} className="shrink-0" />

          <span
            className={`ml-2 overflow-hidden whitespace-nowrap transition-all duration-300 ${
              collapsed ? "w-0 opacity-0" : "w-[52px] opacity-100"
            }`}
          >
            배송현황
          </span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
