import { useCallback, useEffect, useMemo, useState } from "react";

import EmptyState from "../common/EmptyState";
import Pagination from "../common/Pagination";
import { mockShipments } from "../../data/mockShipments";
import type { Shipment } from "../../types/shipment";
import ShipmentCard from "./ShipmentCard";
import ShipmentCardSkeleton from "./ShipmentCardSkeleton";
import ShipmentDetailModal from "./ShipmentDetailModal";

const PAGE_SIZE = 12;

interface ShipmentListSectionProps {
  keyword: string;
  status: string;
  cargo: string;
}

const normalizeText = (value: string | number) => {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9가-힣]/g, "");
};

function ShipmentListSection({
  keyword,
  status,
  cargo,
}: ShipmentListSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, status, cargo]);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [keyword, status, cargo]);

  const filteredShipments = useMemo(() => {
    const normalizedKeyword = normalizeText(keyword);

    return mockShipments.filter((shipment) => {
      const matchesKeyword =
        normalizedKeyword === "" ||
        normalizeText(shipment.trackingNumber).includes(normalizedKeyword) ||
        normalizeText(shipment.companyName).includes(normalizedKeyword);

      const matchesStatus = status === "all" || shipment.status === status;

      const matchesCargo = cargo === "all" || shipment.cargoText === cargo;

      return matchesKeyword && matchesStatus && matchesCargo;
    });
  }, [keyword, status, cargo]);

  const totalPages = Math.ceil(filteredShipments.length / PAGE_SIZE);

  const pagedShipments = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    return filteredShipments.slice(startIndex, endIndex);
  }, [currentPage, filteredShipments]);

  const handleDetailClick = useCallback((shipment: Shipment) => {
    setSelectedShipment(shipment);
  }, []);

  return (
    <>
      <section className="flex min-h-[760px] flex-col rounded-[10px] border border-border bg-white px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="mb-2.5 flex items-center gap-2">
          <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.6px] text-text-secondary">
            배송 목록
          </span>

          <div className="h-px flex-1 bg-border-light" />
        </div>

        {isLoading ? (
          <div className="grid flex-1 grid-cols-4 content-start gap-5">
            {Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <ShipmentCardSkeleton key={index} />
            ))}
          </div>
        ) : pagedShipments.length > 0 ? (
          <div className="grid flex-1 grid-cols-4 content-start gap-5">
            {pagedShipments.map((shipment) => (
              <ShipmentCard
                key={shipment.id}
                shipment={shipment}
                onDetailClick={handleDetailClick}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}

        {!isLoading && totalPages > 1 && (
          <div className="mt-auto">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </section>

      {selectedShipment && (
        <ShipmentDetailModal
          shipment={selectedShipment}
          onClose={() => setSelectedShipment(null)}
        />
      )}
    </>
  );
}

export default ShipmentListSection;
