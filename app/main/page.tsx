import Image from "next/image";
import Link from "next/link";

export default function MainPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-4 bg-white border-b-2 border-black">
        <Image
          src="/icons/DORIV.png"
          alt="DORIV"
          width={120}
          height={35}
          className="w-auto h-auto"
          priority
        />

        <div className="flex-1 max-w-[400px] mx-10 flex items-center border-2 border-black rounded overflow-hidden">
          <input
            type="text"
            placeholder="주제 검색..."
            className="flex-1 px-4 py-2.5 border-0 outline-none text-sm"
          />
          <button className="px-4 py-2.5 bg-[#FEE500] border-l-2 border-black cursor-pointer hover:bg-[#FFD700] flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-black rounded-full relative">
              <div className="absolute -bottom-[6px] -right-[6px] w-[2px] h-[6px] bg-black rotate-45"></div>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-bold text-black">Alex M.</div>
            <div className="text-[11px] text-gray-600">Pro User</div>
          </div>
          <div className="w-11 h-11 rounded-full bg-[#E8E8E8] border-2 border-black flex items-center justify-center relative overflow-hidden">
            {/* Head */}
            <div className="absolute top-[8px] w-[14px] h-[14px] bg-black rounded-full"></div>
            {/* Body */}
            <div className="absolute bottom-[2px] w-[24px] h-[16px] bg-black rounded-t-full"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-10 py-10 max-w-[1400px] mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-[32px] font-bold mb-2 text-black">
            반가워요, Alex님!
          </h1>
          <p className="text-sm text-black py-2 px-4 border-2 border-black rounded inline-block m-0">
            기억력을 향상시킬 준비가 되셨나요?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-5">
            {/* Recent Note Card */}
            <div className="bg-white border-[3px] border-black rounded-lg p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] relative">
              <div className="mb-4">
                <span className="bg-black text-white px-3 py-1 text-xs rounded font-semibold inline-flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-white rounded-sm"></div>
                  방문
                </span>
              </div>
              <div className="mb-5">
                <p className="text-sm text-gray-600 m-0">
                  <span className="text-black font-semibold">
                    Javascript Closures
                  </span>
                  , 미니 인터뷰 시작입니다!
                </p>
              </div>
              <Link
                href="/interview"
                className="absolute bottom-6 right-6 bg-[#FEE500] text-black border-2 border-black rounded px-6 py-3 text-sm font-bold cursor-pointer hover:-translate-y-0.5 transition-transform"
              >
                지금 시작하기 →
              </Link>
            </div>

            {/* Add Notion Page Card */}
            <Link href="/import" className="block">
              <div className="bg-white border-[3px] border-black rounded-lg p-10 shadow-[4px_4px_0px_rgba(0,0,0,1)] relative flex flex-col items-center text-center min-h-[280px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-pointer">
                {/* Corner Decorations */}
                <div className="absolute top-6 left-6 w-4 h-4 bg-[#4A90E2] border-2 border-black rounded-sm"></div>
                <div className="absolute top-6 right-6 w-4 h-4 bg-[#90EE90] rounded-full border-2 border-black"></div>
                <div className="absolute bottom-6 left-6 w-4 h-4 bg-[#FF4444] rounded-full border-2 border-black"></div>
                <div className="absolute bottom-6 right-6 w-4 h-4 bg-[#FEE500] border-2 border-black rounded-sm"></div>

                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 border-4 border-black rounded-full flex items-center justify-center text-5xl font-light text-black">
                    +
                  </div>
                  <h2 className="text-[22px] font-bold m-0 text-black">
                    노션 페이지 블러오기
                  </h2>
                  <p className="text-[13px] text-gray-600 leading-relaxed m-0">
                    최신 노트를 등기화하여 즉시 플래시카드를 생성하세요. 표, 목록,
                    <br />
                    토글을 지원합니다.
                  </p>
                </div>
              </div>
            </Link>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-[#4A90E2] border-[3px] border-black rounded-lg p-8 text-center shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <div className="text-sm mb-2 font-semibold text-white">
                  플래시카드
                </div>
                <div className="text-5xl font-bold text-white">1,240</div>
              </div>

              <div className="bg-white border-[3px] border-black rounded-lg p-8 text-center shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <div className="text-sm mb-2 font-semibold text-black">
                  기억 유지율
                </div>
                <div className="text-5xl font-bold text-black">84%</div>
              </div>
            </div>
          </div>

          {/* Right Column - Problem List */}
          <div className="flex flex-col">
            <div className="bg-white border-[3px] border-black rounded-lg p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] h-fit">
              <h3 className="text-lg font-bold mb-5 text-black flex items-center gap-2">
                <div className="w-4 h-5 border-2 border-black rounded-sm bg-white relative">
                  <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-2 h-1.5 bg-black rounded-t-sm"></div>
                </div>
                문제 리스트
              </h3>

              <div className="flex flex-col gap-4 mb-5">
                <div className="flex justify-between items-center p-4 border-2 border-black rounded-md bg-[#FAFAFA]">
                  <div>
                    <div className="text-sm font-bold text-black">
                      React Hooks
                    </div>
                  </div>
                  <span className="bg-[#90EE90] text-black px-3 py-1 rounded text-[11px] font-bold border-2 border-black">
                    초급
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 border-2 border-black rounded-md bg-[#FAFAFA]">
                  <div>
                    <div className="text-sm font-bold text-black">
                      CSS Grid Layout
                    </div>
                  </div>
                  <span className="bg-[#FF6B6B] text-white px-3 py-1 rounded text-[11px] font-bold border-2 border-black">
                    심화
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 border-2 border-black rounded-md bg-[#FAFAFA]">
                  <div>
                    <div className="text-sm font-bold text-black">
                      TypeScript Generics
                    </div>
                  </div>
                  <span className="bg-[#FF6B6B] text-white px-3 py-1 rounded text-[11px] font-bold border-2 border-black">
                    심화
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 border-2 border-black rounded-md bg-[#FAFAFA]">
                  <div>
                    <div className="text-sm font-bold text-black">
                      HTTP Methods
                    </div>
                  </div>
                  <span className="bg-[#90EE90] text-black px-3 py-1 rounded text-[11px] font-bold border-2 border-black">
                    초급
                  </span>
                </div>
              </div>

              <Link
                href="/problems"
                className="block text-center text-black text-[13px] font-semibold no-underline py-3 border-2 border-black rounded hover:bg-[#FEE500] transition-colors"
              >
                전체 문제 리스트 보기 →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
