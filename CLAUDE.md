# DORIV - 노트에서 기억으로

## 프로젝트 개요

DORIV는 학습과 기억을 돕는 플래시카드 기반 학습 플랫폼입니다. 노션 페이지를 불러와 자동으로 플래시카드를 생성하고, 반복 학습을 통해 지식을 장기 기억으로 전환합니다.

**핵심 가치:**

- 그저 적지 마세요, 생각을 시작하세요
- 노트에서 기억으로의 전환
- 효율적인 반복 학습

## 디자인 시스템: 네오브루탈리즘 (Neo-Brutalism)

### 디자인 철학

네오브루탈리즘은 대담하고 직접적인 시각적 언어를 사용하여 명확성과 기능성을 강조합니다.

**핵심 원칙:**

1. **굵은 검은 테두리 (3-4px)**
   - 모든 UI 요소에 두꺼운 검은 테두리 적용
   - 명확한 경계와 구분을 제공

2. **강렬한 색상 대비**
   - 순수하고 채도 높은 색상 사용
   - 배경과 요소 간 명확한 대비

3. **하드 섀도우 (Hard Shadow)**
   - 부드러운 그림자 대신 단단한 오프셋 섀도우 사용
   - 일반적으로 `shadow-[4px_4px_0px_rgba(0,0,0,1)]` 또는 `shadow-[8px_8px_0px_rgba(0,0,0,1)]`

4. **기하학적 형태**
   - 단순하고 명확한 기하학적 도형 사용
   - 이모티콘 사용 금지 - 모든 아이콘은 순수 CSS로 구현

5. **평면적 디자인**
   - 그라데이션 최소화
   - 단색 배경과 요소 사용

### 색상 팔레트

```css
/* Primary Colors */
--primary-yellow: #e8c547; /* 메인 배경 */
--kakao-yellow: #fee500; /* 카카오 버튼, 액센트 */

/* Neutral Colors */
--white: #ffffff;
--black: #000000;
--gray-100: #fafafa; /* 연한 배경 */
--gray-300: #e8e8e8; /* 중간 배경 */
--gray-600: #666666; /* 보조 텍스트 */

/* Accent Colors */
--blue: #4a90e2; /* 정보, 통계 */
--light-blue: #d8e5f0; /* 계란 흰자 */
--cyan: #4ecdc4; /* 액센트 */
--red: #ff4444; /* 경고, 에러 */
--coral: #ff6b6b; /* 강조 */
--green: #90ee90; /* 성공, 초급 */
--yellow-gold: #ffd93d; /* 노른자 */
```

### 타이포그래피

```css
/* Font Family */
font-family: Arial, Helvetica, sans-serif;

/* Font Sizes */
--text-xs: 11px; /* 작은 라벨 */
--text-sm: 13-14px; /* 본문, 버튼 */
--text-md: 18px; /* 부제목 */
--text-lg: 24px; /* 제목 */
--text-xl: 32px; /* 큰 제목 */
--text-2xl: 48px; /* 통계 숫자 */
```

**규칙:**

- 제목은 항상 `font-bold` 사용
- 버튼 텍스트는 `font-semibold` 또는 `font-bold`
- 보조 텍스트는 `text-gray-600`

### 컴포넌트 패턴

#### 1. 카드 (Card)

```tsx
<div className="bg-white border-[3px] border-black rounded-lg p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
  {/* 카드 내용 */}
</div>
```

**변형:**

- 큰 카드: `border-4`, `shadow-[8px_8px_0px_rgba(0,0,0,1)]`
- 작은 카드: `border-2`, `shadow-[2px_2px_0px_rgba(0,0,0,1)]`

#### 2. 버튼 (Button)

```tsx
{
  /* Primary Button */
}
<button className="px-6 py-3 bg-[#FEE500] text-black border-2 border-black rounded font-bold hover:-translate-y-0.5 active:translate-y-0 transition-transform">
  버튼 텍스트
</button>;

{
  /* Secondary Button */
}
<button className="px-6 py-3 bg-white text-black border-2 border-black rounded font-semibold hover:-translate-y-0.5 active:translate-y-0 transition-transform">
  버튼 텍스트
</button>;
```

**규칙:**

- 항상 2px 이상의 검은 테두리
- hover 시 `-translate-y-0.5` (살짝 위로)
- active 시 `translate-y-0` (원위치)
- transition-transform 사용

#### 3. 배지 (Badge)

```tsx
<span className="bg-black text-white px-3 py-1 text-xs rounded font-bold">
  라벨
</span>
```

**변형:**

- 초급: `bg-[#90EE90] text-black border-2 border-black`
- 심화: `bg-[#FF6B6B] text-white border-2 border-black`

#### 4. 입력 필드 (Input)

```tsx
<div className="flex items-center border-2 border-black rounded overflow-hidden">
  <input
    type="text"
    className="flex-1 px-4 py-2.5 border-0 outline-none text-sm"
    placeholder="입력..."
  />
</div>
```

#### 5. 아이콘 (Icons)

**⚠️ 중요: 이모티콘 사용 금지!**

모든 아이콘은 순수 CSS로 구현합니다.

**예시:**

```tsx
{
  /* 돋보기 (Search) */
}
<div className="w-4 h-4 border-2 border-black rounded-full relative">
  <div className="absolute -bottom-[6px] -right-[6px] w-[2px] h-[6px] bg-black rotate-45"></div>
</div>;

{
  /* 사용자 프로필 */
}
<div className="w-11 h-11 rounded-full bg-[#E8E8E8] border-2 border-black flex items-center justify-center relative overflow-hidden">
  <div className="absolute top-[8px] w-[14px] h-[14px] bg-black rounded-full"></div>
  <div className="absolute bottom-[2px] w-[24px] h-[16px] bg-black rounded-t-full"></div>
</div>;

{
  /* 클립보드 */
}
<div className="w-5 h-6 border-2 border-black rounded-sm bg-white relative">
  <div className="absolute -top-[4px] left-1/2 -translate-x-1/2 w-3 h-2 bg-black rounded-t-sm"></div>
</div>;

{
  /* 느낌표 (Warning) */
}
<div className="flex flex-col items-center gap-[2px]">
  <div className="w-[3px] h-[10px] bg-black rounded-full"></div>
  <div className="w-[3px] h-[3px] bg-black rounded-full"></div>
</div>;
```

### 레이아웃 원칙

1. **여백 (Spacing)**
   - 카드 간격: `gap-5` 또는 `gap-8`
   - 내부 패딩: `p-6` ~ `p-10`
   - 섹션 간격: `mb-8`

2. **반응형 디자인**

   ```tsx
   // 2컬럼 레이아웃
   <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
   ```

3. **최대 너비**
   - 컨테이너: `max-w-[1400px]`
   - 로그인 카드: `max-w-[900px]`

## 기술 스택

- **Framework:** Next.js 16.1.6 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3
- **State Management:** (추가 예정)
- **API:** (추가 예정)

## 파일 구조

```
doriv-fe/
├── app/
│   ├── page.tsx              # 로그인 페이지
│   ├── main/
│   │   └── page.tsx          # 메인 대시보드
│   ├── globals.css           # 전역 스타일
│   └── layout.tsx            # 루트 레이아웃
├── public/
│   └── icons/
│       └── DORIV.png         # 로고 이미지
├── components/               # 재사용 컴포넌트 (추가 예정)
├── tailwind.config.ts        # Tailwind 설정
├── postcss.config.mjs        # PostCSS 설정
└── CLAUDE.md                 # 이 파일
```

## 코딩 규칙

### TypeScript

1. **타입 안전성**
   - `any` 사용 최소화
   - Props는 항상 인터페이스로 정의

2. **컴포넌트 작성**

   ```tsx
   interface ComponentProps {
     title: string;
     onClick?: () => void;
   }

   export default function Component({ title, onClick }: ComponentProps) {
     return <div>{title}</div>;
   }
   ```

### Tailwind CSS

1. **클래스 순서**
   - 레이아웃 (flex, grid, position)
   - 크기 (w-, h-, p-, m-)
   - 배경/테두리 (bg-, border-)
   - 텍스트 (text-, font-)
   - 기타 (shadow-, transition-)

2. **커스텀 값 사용**

   ```tsx
   // ✅ Good
   className = "border-[3px] shadow-[4px_4px_0px_rgba(0,0,0,1)]";

   // ❌ Bad
   className = "border-2 shadow-md";
   ```

3. **반복되는 패턴은 컴포넌트화**
   ```tsx
   // 3번 이상 반복되면 컴포넌트로 분리
   ```

### 네이밍 컨벤션

- **컴포넌트:** PascalCase (`LoginPage`, `DashboardCard`)
- **함수:** camelCase (`handleClick`, `fetchData`)
- **상수:** UPPER_SNAKE_CASE (`API_URL`, `MAX_ITEMS`)
- **파일:** kebab-case (`user-profile.tsx`, `api-client.ts`)

## 주요 페이지

### 1. 로그인 페이지 (`/`)

**구성 요소:**

- EST. 2026 배지
- DORIV 로고
- 제목: "노트에서 기억으로"
- 설명: "그저 적지 마세요. 생각을 시작하세요."
- Google 로그인 버튼
- 카카오 로그인 버튼
- 이용약관 / 개인정보처리방침 링크
- 계란 일러스트 (네오브루탈리즘 스타일)

### 2. 메인 대시보드 (`/main`)

**구성 요소:**

- 헤더 (로고, 검색바, 프로필)
- 환영 메시지
- 최근 노트 카드
- 노션 페이지 불러오기 카드
- 통계 (플래시카드, 기억 유지율)
- 문제 리스트 사이드바

## 개발 가이드

### 새 컴포넌트 추가 시

1. **디자인 검토**
   - 네오브루탈리즘 원칙 준수 확인
   - 굵은 테두리, 강한 대비, 하드 섀도우 적용

2. **아이콘 구현**
   - ⚠️ 이모티콘 절대 사용 금지
   - 순수 CSS로 구현
   - 기하학적 형태 유지

3. **색상 선택**
   - 정의된 색상 팔레트 사용
   - 새로운 색상 필요 시 팀 논의

4. **반응형 확인**
   - 모바일, 태블릿, 데스크톱 모두 테스트
   - Tailwind 반응형 접두사 활용 (sm:, md:, lg:)

### 개발 서버 실행

```bash
npm run dev
# http://localhost:3000
```

### 빌드

```bash
npm run build
npm run start
```

## 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [네오브루탈리즘 디자인 가이드](https://hype4.academy/articles/design/neubrutalism-is-taking-over-web)

## 버전 히스토리

- **v0.1.0** (2026-02-07): 초기 프로젝트 구조 및 로그인/메인 페이지 구현

---

**마지막 업데이트:** 2026-02-07
**작성자:** Claude + Development Team
