"use client";

import { useState } from "react";
import Header from "@/components/Header";

export default function ImportPage() {
  const [selectedPages, setSelectedPages] = useState<number[]>([1]);

  const recentPages = [
    {
      id: 1,
      title: "CS101: Computer Architecture",
      info: "2분 전 수정됨 • 개인 페이지",
      isLocked: true,
    },
    {
      id: 2,
      title: "World History Summary",
      info: "2시간 전 수정됨 • 공유함",
      isLocked: true,
    },
    {
      id: 3,
      title: "English Vocabulary Week 4",
      info: "어제 수정됨 • 개인 페이지",
      isLocked: true,
    },
  ];

  const togglePage = (id: number) => {
    if (selectedPages.includes(id)) {
      setSelectedPages(selectedPages.filter((pageId) => pageId !== id));
    } else {
      setSelectedPages([...selectedPages, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header variant="close" closeLink="/main" />

      {/* Main Content */}
      <main className="max-w-[900px] mx-auto px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-[40px] font-bold mb-4 text-black">
            노션 페이지 연결하기
          </h1>
          <p className="text-lg text-gray-600">
            DORIV 학습 센터로 변환할 페이지를 불러옵니다.
          </p>
        </div>

        {/* URL Input Section */}
        <div className="border-4 border-dashed border-black rounded-lg p-12 mb-12">
          <div className="flex flex-col items-center gap-6">
            {/* Link Icon */}
            <div className="w-16 h-16 bg-[#90EE90] border-[3px] border-black rounded-full flex items-center justify-center shadow-[3px_3px_0px_rgba(0,0,0,1)]">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="black"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold mb-2 text-black">
                가져올 페이지를 선택하거나 URL을 붙여넣으세요
              </h2>
              <p className="text-sm text-gray-600">
                Notion 페이지가 링크를 복사해야 아래에 붙여넣으세요
              </p>
            </div>

            {/* URL Input */}
            <div className="w-full flex items-center border-[3px] border-black rounded overflow-hidden shadow-[3px_3px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2 px-4 py-3 flex-1">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="https://notion.so/..."
                  className="flex-1 outline-none text-sm"
                />
              </div>
              <button className="px-6 py-3 bg-white border-l-[3px] border-black font-bold text-sm hover:bg-gray-100 transition-colors">
                PASTE
              </button>
            </div>
          </div>
        </div>

        {/* Recent Pages Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black">최근 수정된 페이지</h2>
            <button className="text-sm font-semibold text-black underline hover:no-underline">
              새로고침
            </button>
          </div>

          <div className="flex flex-col gap-5">
            {recentPages.map((page) => (
              <div
                key={page.id}
                className="flex items-center gap-4 p-5 bg-white border-[3px] border-black rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-pointer"
                onClick={() => togglePage(page.id)}
              >
                {/* Checkbox */}
                <div
                  className={`w-6 h-6 border-[3px] border-black rounded flex items-center justify-center cursor-pointer ${
                    selectedPages.includes(page.id)
                      ? "bg-black"
                      : "bg-white"
                  }`}
                >
                  {selectedPages.includes(page.id) && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>

                {/* Lock Icon */}
                <div className="w-10 h-10 bg-gray-100 border-2 border-black rounded flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>

                {/* Page Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-black mb-1">{page.title}</h3>
                  <p className="text-sm text-gray-600">{page.info}</p>
                </div>

                {/* Arrow */}
                <div className="text-2xl text-black">→</div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button className="w-full py-4 bg-[#90EE90] text-black border-[3px] border-black rounded-lg font-bold text-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-2">
          연동 완료 →
        </button>
      </main>
    </div>
  );
}
