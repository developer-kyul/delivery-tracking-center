export const CARGO_TYPE = {
  ALL: "all",
  GENERAL: "general",
  FRAGILE: "fragile",
  COLD: "cold",
  FROZEN: "frozen",
  VALUABLE: "valuable",
} as const;

export const CARGO_TYPE_LABEL = {
  all: "전체",
  general: "일반",
  fragile: "파손주의",
  cold: "냉장",
  frozen: "냉동",
  valuable: "고가품",
} as const;
