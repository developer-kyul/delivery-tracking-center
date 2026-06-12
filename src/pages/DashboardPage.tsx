import { useEffect, useState } from "react";

import DashboardTitle from "../components/dashboard/DashboardTitle";
import KpiSummarySection from "../components/dashboard/KpiSummarySection";
import SearchFilter from "../components/dashboard/SearchFilter";
import ShipmentListSection from "../components/dashboard/ShipmentListSection";
import { mockShipments } from "../data/mockShipments";
import { getShipmentSummary } from "../utils/shipmentSummary";

function DashboardPage() {
  // 검색 입력값
  const [keywordInput, setKeywordInput] = useState("");

  // 실제 조회에 사용되는 검색어
  const [keyword, setKeyword] = useState("");

  // 배송 상태 필터
  const [status, setStatus] = useState("all");

  // 화물 유형 필터
  const [cargo, setCargo] = useState("all");

  // Skeleton UI 표시 여부
  const [isLoading, setIsLoading] = useState(true);

  // 브라우저 탭 제목 설정
  useEffect(() => {
    document.title = "배송현황";
  }, []);

  // 최초 진입 시 Skeleton UI 표시
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 검색 실행
  const handleSearch = () => {
    setIsLoading(true);
    setKeyword(keywordInput);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // 필터 초기화
  const handleReset = () => {
    setIsLoading(true);

    setKeywordInput("");
    setKeyword("");
    setStatus("all");
    setCargo("all");

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // KPI 카드 통계 데이터 계산
  const summary = getShipmentSummary(mockShipments);

  return (
    <>
      {/* 페이지 타이틀 */}
      <DashboardTitle />

      {/* 배송 현황 요약 KPI */}
      <KpiSummarySection summary={summary} isLoading={isLoading} />

      {/* 검색 및 필터 영역 */}
      <SearchFilter
        keyword={keywordInput}
        onKeywordChange={setKeywordInput}
        onSearch={handleSearch}
        status={status}
        onStatusChange={setStatus}
        cargo={cargo}
        onCargoChange={setCargo}
        onReset={handleReset}
      />

      {/* 배송 목록 */}
      <ShipmentListSection keyword={keyword} status={status} cargo={cargo} />
    </>
  );
}

export default DashboardPage;
