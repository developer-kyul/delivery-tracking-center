export const SHIPMENT_STATUS = {
  ALL: "all",
  PREP: "prep",
  TRANSIT: "transit",
  DONE: "done",
  DELAY: "delay",
  RETURN: "return",
} as const;

export const SHIPMENT_STATUS_LABEL = {
  all: "전체",
  prep: "배송 준비중",
  transit: "배송중",
  done: "배송완료",
  delay: "배송지연",
  return: "반송",
} as const;

export const SHIPMENT_STATUS_STYLE = {
  all: {
    filter:
      "border-status-border-transit bg-status-bg-transit font-bold text-status-transit",
    badge: "border-border-strong bg-subtle text-text-label",
  },

  prep: {
    filter: "border-border-strong bg-status-bg-prep text-text-label",
    badge: "border-border-strong bg-status-bg-prep text-text-primary",
  },

  transit: {
    filter:
      "border-status-border-transit bg-status-bg-transit text-status-transit",
    badge:
      "border-status-border-transit bg-status-bg-transit text-status-transit",
  },

  done: {
    filter: "border-status-border-done bg-status-bg-done text-status-done",
    badge: "border-status-border-done bg-status-bg-done text-status-done",
  },

  delay: {
    filter:
      "border-status-border-delay bg-status-bg-delay text-status-delay-text",
    badge:
      "border-status-border-delay bg-status-bg-delay text-status-delay-text",
  },

  return: {
    filter:
      "border-status-border-return bg-status-bg-return text-status-return-text",
    badge:
      "border-status-border-return bg-status-bg-return text-status-return-text",
  },
} as const;
