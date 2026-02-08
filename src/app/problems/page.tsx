import Header from "@/components/Header";

export default function ProblemsPage() {
  const problems = [
    {
      id: 1,
      title: "React Hooks Deep Dive",
      description: "useCallback과 useMemo의 차이와 관한 면접",
      status: "통과",
    },
    {
      id: 2,
      title: "Javascript Closures",
      description: "실전 면접으로 떠나기 전 마지막 준비 이해와 이해",
      status: "통과",
    },
    {
      id: 3,
      title: "Dynamic Programming (DP)",
      description: "메모 문제 (Knapsack Problem) 에 대한 풀이",
      status: "실패",
    },
    {
      id: 4,
      title: "HTTP Methods & Status Codes",
      description: "RESTful API와 함께 하는 매력",
      status: "통과",
    },
    {
      id: 5,
      title: "Advanced Generics",
      description: "Conditional Types와 infer 키워드 학습",
      status: "실패",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative">
      {/* Header */}
      <Header variant="simple" />

      {/* Main Content */}
      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-20 min-h-screen bg-white border-r-2 border-black flex flex-col items-center py-10 gap-8">
          {/* Star Icon */}
          <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors">
            <div className="relative w-6 h-6">
              <div className="absolute inset-0" style={{
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
              }}>
                <div className="w-full h-full bg-black"></div>
              </div>
            </div>
          </button>

          {/* Diamond Icon */}
          <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors">
            <div className="w-5 h-5 bg-black rotate-45"></div>
          </button>
        </aside>

        {/* Main Area */}
        <main className="flex-1 px-10 py-10 max-w-[1200px]">
          {/* Title */}
          <h1 className="text-[32px] font-bold mb-8 text-black">
            전체 문제 리스트
          </h1>

          {/* Filters and Search */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-3">
              <button className="px-5 py-2 bg-black text-white border-2 border-black rounded font-semibold text-sm hover:-translate-y-0.5 transition-transform">
                전체
              </button>
              <button className="px-5 py-2 bg-white text-black border-2 border-black rounded font-semibold text-sm hover:-translate-y-0.5 transition-transform">
                통과
              </button>
              <button className="px-5 py-2 bg-white text-black border-2 border-black rounded font-semibold text-sm hover:-translate-y-0.5 transition-transform">
                실패
              </button>
            </div>

            <div className="flex items-center border-2 border-black rounded overflow-hidden w-64">
              <input
                type="text"
                placeholder="기록 검색..."
                className="flex-1 px-4 py-2 border-0 outline-none text-sm"
              />
              <button className="px-4 py-2 bg-[#FEE500] border-l-2 border-black hover:bg-[#FFD700] flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-black rounded-full relative">
                  <div className="absolute -bottom-[6px] -right-[6px] w-[2px] h-[6px] bg-black rotate-45"></div>
                </div>
              </button>
            </div>
          </div>

          {/* Problem List */}
          <div className="flex flex-col gap-5 mb-8">
            {problems.map((problem) => (
              <div
                key={problem.id}
                className="bg-white border-[3px] border-black rounded-lg p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-black">
                      {problem.title}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {problem.description}
                    </p>
                  </div>

                  <div className="ml-6">
                    <span
                      className={`px-4 py-2 rounded text-sm font-bold border-2 border-black ${
                        problem.status === "통과"
                          ? "bg-[#90EE90] text-black"
                          : "bg-[#FF6B6B] text-white"
                      }`}
                    >
                      {problem.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center">
            <button className="px-8 py-3 bg-white text-black border-2 border-black rounded font-semibold hover:-translate-y-0.5 active:translate-y-0 transition-transform">
              더 보기
            </button>
          </div>
        </main>
      </div>

      {/* Floating Star - Bottom Right */}
      <div className="fixed bottom-10 right-10">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0" style={{
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
          }}>
            <div className="w-full h-full bg-black"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
