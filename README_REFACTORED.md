# 📋 Reportory - Daily Report & Todo Management

할일 계획부터 시간 기록까지, 완벽한 하루 관리를 위한 React 애플리케이션입니다.

## 🏗️ 프로젝트 구조

### 📂 Components

프로젝트의 모든 UI 컴포넌트들은 기능별로 분리되어 관리됩니다.

```
src/components/
├── common/          # 페이지간 공유되는 공통 컴포넌트
│   ├── AppHeader.tsx           # 앱 헤더 컴포넌트
│   ├── FloatingActionButton.tsx # 플로팅 액션 버튼
│   ├── SidebarMenu.tsx         # 사이드바 메뉴
│   ├── StatsView.tsx           # 통계 뷰 컴포넌트
│   └── TabNavigation.tsx       # 탭 네비게이션
├── todo/            # Todo 관련 컴포넌트
│   ├── TodoForm.tsx            # Todo 추가/수정 폼
│   └── TodoViewer.tsx          # Todo 목록 뷰어
├── report/          # Report 관련 컴포넌트
│   ├── ReportForm.tsx          # Report 추가/수정 폼
│   └── ReportViewer.tsx        # Report 목록 뷰어
└── ui/              # 재사용 가능한 UI 컴포넌트
    ├── Category.tsx            # 카테고리 컴포넌트
    ├── ColorPicker.tsx         # 색상 선택기 (기존)
    ├── SimpleColorPicker.tsx   # 간단한 색상 선택기
    ├── Dropdown.tsx            # 드롭다운 컴포넌트
    ├── Loader.tsx              # 로딩 컴포넌트
    ├── Modal.tsx               # 모달 컴포넌트
    └── toastContainer.tsx      # 토스트 알림
```

### 🎣 Custom Hooks

비즈니스 로직과 상태 관리를 위한 커스텀 훅들입니다.

```
src/hooks/
├── useBreakpoint.ts     # 반응형 브레이크포인트 훅
├── useCategory.ts       # 카테고리 관리 훅
├── todo/
│   └── useTodo.ts       # Todo 관련 상태 및 로직
└── report/
    └── useReport.ts     # Report 관련 상태 및 로직
```

### 📄 Pages

각 라우트에 해당하는 페이지 컴포넌트들입니다.

```
src/pages/
├── Home.tsx             # 메인 페이지 (Todo & Report 통합)
├── CategoryControl.tsx  # 카테고리 관리 페이지
└── StatsPage.tsx        # 통계 페이지
```

### 🔧 Utils & Types

유틸리티 함수들과 TypeScript 타입 정의입니다.

```
src/utils/
├── transalte.ts         # 번역 및 유틸 함수
└── stores/              # 데이터 저장소 관련
    ├── categoryUtils.ts
    ├── dbUtils.ts
    ├── reportUtils.ts
    └── todoUtils.ts

src/types/
└── Common.ts            # 공통 타입 정의
```

## 🚀 주요 개선사항

### 1. 컴포넌트 분리 및 구조화

- **기능별 폴더 구조**: `common`, `todo`, `report`, `ui`로 컴포넌트 분리
- **페이지별 컴포넌트 식별**: 어떤 페이지에서 사용되는 컴포넌트인지 명확히 구분
- **재사용성 향상**: UI 컴포넌트들을 독립적으로 분리하여 재사용성 증대

### 2. 커스텀 훅을 통한 로직 분리

- **useTodo**: Todo 관련 모든 상태와 로직을 캡슐화
- **useReport**: Report 관련 모든 상태와 로직을 캡슐화
- **useCategory**: 카테고리 관리 로직 분리
- **중복 코드 제거**: 페이지 컴포넌트에서 반복되던 로직들을 훅으로 추출

### 3. Import 경로 최적화

- **배럴 익스포트**: 각 폴더에 `index.ts` 파일로 깔끔한 import 구조
- **상대 경로 정규화**: 일관된 import 경로로 가독성 향상

### 4. 컴포넌트 최적화

- **책임 분리**: 각 컴포넌트가 단일 책임을 가지도록 리팩토링
- **Props 최적화**: 불필요한 props 전달 제거
- **성능 최적화**: memo, useCallback 등을 활용한 리렌더링 최적화

## 🎯 사용법

### 컴포넌트 Import 예시

```typescript
// 개선 전
import TodoForm from "../components/TodoForm";
import ReportViewer from "../components/ReportViewer";
import Loader from "../components/Loader";

// 개선 후
import { TodoForm } from "../components/todo";
import { ReportViewer } from "../components/report";
import { Loader } from "../components/ui";
```

### 커스텀 훅 사용 예시

```typescript
const MyComponent = () => {
  const {
    todos,
    handleAddTodo,
    handleSaveTodo,
    // ... 기타 todo 관련 기능들
  } = useTodo();

  const {
    reports,
    handleAddReport,
    handleSaveReport,
    // ... 기타 report 관련 기능들
  } = useReport();

  // 컴포넌트 로직이 매우 간결해짐
};
```

## 🛠️ 개발 명령어

```bash
# 개발 서버 실행
npm start

# 빌드
npm run build

# 테스트
npm test
```

## 📦 주요 의존성

- React 18
- TypeScript
- Tailwind CSS
- React Router DOM
- Lucide React (아이콘)

## 🔄 향후 계획

- [ ] 컴포넌트 스토리북 추가
- [ ] 단위 테스트 커버리지 확대
- [ ] PWA 지원 추가
- [ ] 다크 모드 지원
