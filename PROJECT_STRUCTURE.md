# 📦 프로젝트 구조 및 역할 정리

OMNIQ KOREA 2단계 채용 과제 - **물류 배송 현황 추적 대시보드**

---

## 전체 디렉토리 구조

```
delivery-tracking-center/
├─ public/                     # 정적 파일 (favicon, 아이콘 스프라이트)
├─ src/
│  ├─ main.tsx                 # 앱 진입점 (React Root 렌더링)
│  ├─ App.tsx                  # 최상위 컴포넌트 (레이아웃 + 페이지 조립)
│  ├─ index.css                # Tailwind 테마(색상 토큰) 및 전역 스타일
│  │
│  ├─ layouts/
│  │  └─ MainLayout.tsx         # Sidebar + Header + 본문(main) 레이아웃 틀
│  │
│  ├─ pages/
│  │  └─ DashboardPage.tsx      # 배송현황 대시보드 페이지 (상태 관리 + 조립)
│  │
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ Header.tsx          # 상단 헤더 (배송지연 알림, 사용자 정보)
│  │  │  └─ Sidebar.tsx         # 좌측 네비게이션 (접기/펼치기 가능)
│  │  │
│  │  ├─ dashboard/
│  │  │  ├─ DashboardTitle.tsx       # 페이지 타이틀 영역
│  │  │  ├─ KpiCard.tsx              # KPI 요약 카드 (전체/준비중/배송중 등 건수)
│  │  │  ├─ SearchFilter.tsx         # 송장번호 검색 + 상태/화물 필터 UI
│  │  │  ├─ ShipmentCard.tsx         # 개별 배송 카드 (+ 진행 단계 표시기)
│  │  │  ├─ ShipmentDetailModal.tsx  # 배송 상세 정보 모달 (배차 정보, 지연/반송 사유)
│  │  │  └─ ShipmentListSection.tsx  # 배송 목록 섹션 (필터링/페이지네이션/모달 오케스트레이션)
│  │  │
│  │  └─ common/
│  │     ├─ EmptyState.tsx      # 검색 결과 없음 표시
│  │     ├─ Modal.tsx           # 공통 모달 컨테이너 (오버레이 + 닫기)
│  │     └─ Pagination.tsx      # 공통 페이지네이션 컴포넌트
│  │
│  ├─ constants/
│  │  ├─ shipmentStatus.ts      # 배송 상태 코드/라벨/스타일(색상) 매핑
│  │  └─ cargoTypes.ts          # 화물 종류 코드/라벨 매핑
│  │
│  ├─ data/
│  │  └─ mockShipments.ts       # 목(mock) 배송 데이터 50건 (랜덤 배차 정보 생성 포함)
│  │
│  ├─ types/
│  │  └─ shipment.ts            # Shipment, ShipmentStatus, CargoType 타입 정의
│  │
│  ├─ utils/
│  │  └─ shipmentSummary.ts     # 배송 데이터로부터 KPI 요약(건수) 계산
│  │
│  └─ styles/
│     └─ common.ts              # 공통 클래스 문자열 (버튼 모션 등)
│
├─ index.html                  # Vite 엔트리 HTML
├─ vite.config.ts              # Vite 설정 (React + Tailwind 플러그인)
├─ tsconfig*.json               # TypeScript 설정
├─ eslint.config.js             # ESLint 설정
├─ package.json                 # 의존성 및 스크립트
└─ README.md                    # 과제 설명 / 기술스택 / 디자인 의사결정 문서
```

---

## 레이어별 역할 설명

### 1. 진입점 (`main.tsx`, `App.tsx`)

- **main.tsx**: `index.css`를 로드하고 `App`을 React Root에 마운트.
- **App.tsx**: `MainLayout`으로 `DashboardPage`를 감싸는 최상위 조립 컴포넌트.

### 2. 레이아웃 (`layouts/`, `components/layout/`)

- **MainLayout**: 화면을 좌측 `Sidebar` + 우측(상단 `Header` + 본문 `main`) 구조로 배치.
- **Sidebar**: 로고, 접기/펼치기 토글, "배송현황" 네비게이션 메뉴.
- **Header**: 배송지연 건수 알림 배지, 로그인 사용자(이름/소속) 표시.

### 3. 페이지 (`pages/DashboardPage.tsx`)

대시보드의 **상태(state)와 조합 로직**을 담당하는 컨테이너.

- 검색 키워드(`keyword`), 상태 필터(`status`), 화물 필터(`cargo`) state 관리
- `mockShipments`를 `getShipmentSummary`로 집계하여 KPI 데이터 생성
- `DashboardTitle` → KPI 카드 섹션 → `SearchFilter` → `ShipmentListSection` 순으로 렌더링

### 4. 대시보드 컴포넌트 (`components/dashboard/`)

- **DashboardTitle**: "배송현황" 타이틀 영역 (확장용 새로고침/타임스탬프는 주석 처리되어 보류 중)
- **KpiCard**: 라벨/아이콘/수치를 보여주는 단일 KPI 카드 (전체/준비중/배송중/완료/지연/반송)
- **SearchFilter**: 송장번호 검색 입력창, 조회/초기화 버튼, 상태별·화물별 필터 토글 버튼 그룹
- **ShipmentCard**: 배송 1건 카드 — 상태 배지, 출발지→도착지, 예상 도착일, 화물 종류, 3단계 진행 표시기(`ShipmentProgress`/`Step`/`Line`), 상세보기 버튼
- **ShipmentDetailModal**: 카드 클릭 시 뜨는 상세 모달 — 배차기사/연락처/차량 정보 + 지연/반송 사유 박스
- **ShipmentListSection**: 목록 전체를 관할하는 컨테이너
  - `mockShipments`를 키워드/상태/화물 조건으로 필터링 (`useMemo`)
  - 12개 단위(`PAGE_SIZE`)로 페이지네이션
  - 결과 없을 시 `EmptyState`, 선택된 항목 있을 시 `ShipmentDetailModal` 표시

### 5. 공통 컴포넌트 (`components/common/`)

- **Modal**: 배경 오버레이 + 클릭 시 닫기 기능을 가진 범용 모달 래퍼
- **Pagination**: 이전/다음 + 페이지 번호 버튼 (재사용 가능한 범용 컴포넌트)
- **EmptyState**: "검색 결과가 없습니다" 안내 화면

### 6. 데이터 & 타입 (`data/`, `types/`, `constants/`)

- **types/shipment.ts**: `Shipment`, `ShipmentStatus`(prep/transit/done/delay/return), `CargoType`(general/fragile/cold/frozen/valuable) 타입 정의
- **data/mockShipments.ts**: 50건의 배송 시드 데이터 + 배차기사/차량/지연·반송 사유를 랜덤 생성하여 합친 최종 mock 데이터
- **constants/shipmentStatus.ts**: 상태 코드 ↔ 한글 라벨 ↔ 상태별 Tailwind 색상 클래스(`SHIPMENT_STATUS_STYLE`) 매핑
- **constants/cargoTypes.ts**: 화물 코드 ↔ 한글 라벨 매핑

### 7. 유틸 & 스타일 (`utils/`, `styles/`)

- **utils/shipmentSummary.ts**: 배송 배열을 받아 전체/준비중/배송중/완료/지연/반송 건수를 집계 (`DashboardSummary`)
- **styles/common.ts**: 버튼 클릭 시 공통 트랜지션/스케일 효과 클래스 문자열(`buttonMotion`)

### 8. 스타일 시스템 (`index.css`)

Tailwind CSS v4의 `@theme`을 이용해 색상 디자인 토큰을 정의:

- 텍스트/보더/배경 기본 색상 (`text-primary`, `border`, `subtle` 등)
- 배송 상태별 색상 세트 (`status-prep`, `status-transit`, `status-done`, `status-delay`, `status-return`)
- 진행 단계 표시기용 색상 (`progress-blue`, `progress-green`, `progress-orange`, `progress-red`)

---

## 데이터 흐름 요약

```
mockShipments (data)
    │
    ├─ getShipmentSummary() ──▶ KPI 카드 (DashboardPage / Header)
    │
    └─ ShipmentListSection
          ├─ 키워드/상태/화물 필터링
          ├─ Pagination으로 분할
          ├─ ShipmentCard 렌더링
          └─ 카드 클릭 ──▶ ShipmentDetailModal
```

---

## 설정 파일

| 파일                                                         | 역할                                                                        |
| ------------------------------------------------------------ | --------------------------------------------------------------------------- |
| `vite.config.ts`                                             | Vite + React + Tailwind 플러그인 설정                                       |
| `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` | TypeScript 컴파일 설정 (앱/노드 분리)                                       |
| `eslint.config.js`                                           | ESLint 규칙 설정                                                            |
| `package.json`                                               | 의존성(React 19, Zustand, TanStack Query, React Router 등) 및 스크립트 정의 |

> 참고: `package.json`에는 Zustand, TanStack Query, React Router, axios 등이 설치되어 있지만, 현재 코드에서는 아직 사용되지 않고 있음 (추후 확장 예정).
