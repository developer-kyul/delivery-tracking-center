import type { Shipment } from "../types/shipment";

export interface DashboardSummary {
  total: number;
  prep: number;
  transit: number;
  done: number;
  delay: number;
  return: number;
}

export function getShipmentSummary(shipments: Shipment[]): DashboardSummary {
  return {
    total: shipments.length,

    prep: shipments.filter((shipment) => shipment.status === "prep").length,

    transit: shipments.filter((shipment) => shipment.status === "transit")
      .length,

    done: shipments.filter((shipment) => shipment.status === "done").length,

    delay: shipments.filter((shipment) => shipment.status === "delay").length,

    return: shipments.filter((shipment) => shipment.status === "return").length,
  };
}
