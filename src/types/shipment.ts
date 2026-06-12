export type ShipmentStatus = "prep" | "transit" | "done" | "delay" | "return";

export type CargoType = "general" | "fragile" | "cold" | "frozen" | "valuable";

export interface Shipment {
  id: number;
  trackingNumber: string;
  companyName: string;
  status: ShipmentStatus;
  cargoType: CargoType;
  origin: string;
  destination: string;
  estimatedDate: string;
  statusText: string;
  cargoText: string;

  driverName: string;
  driverPhone: string;
  vehicleNumber: string;
  vehicleType: string;

  reasonType?: string;
  reasonMemo?: string;
}
