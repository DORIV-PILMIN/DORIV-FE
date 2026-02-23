"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import {
  useCreateNotionPage,
  useSearchNotionPages,
  useStartNotionOAuth,
} from "@/hooks/useNotion";

function extractNotionPageId(url: string) {
  const matched = url.match(/([a-f0-9]{32})(?:\?|$)/i);
  return matched?.[1] ?? "";
}

function formatEditedTime(isoDate: string) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return "수정 시간 정보 없음";
  }
  return `${date.toLocaleDateString("ko-KR")} 수정됨`;
}

export default function ImportPage() {
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [notionUrl, setNotionUrl] = useState("");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const searchMutation = useSearchNotionPages();
  const createMutation = useCreateNotionPage();
  const { start: startNotionOAuth } = useStartNotionOAuth();

  useEffect(() => {
    searchMutation.mutate({ query: "", pageSize: 10 });
    // 초기 최근 페이지 로드
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pages = searchMutation.data?.pages ?? [];

  const selectedCount = useMemo(() => {
    const urlCount = notionUrl.trim() ? 1 : 0;
    return selectedPages.length + urlCount;
  }, [notionUrl, selectedPages.length]);

  const togglePage = (notionPageId: string) => {
    setSelectedPages((prev) =>
      prev.includes(notionPageId)
        ? prev.filter((id) => id !== notionPageId)
        : [...prev, notionPageId]
    );
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setNotionUrl(clipboardText);
      setNotice("클립보드 URL을 붙여넣었습니다.");
    } catch {
      setNotice("클립보드 접근에 실패했습니다. 직접 붙여넣어 주세요.");
    }
  };

  const handleSearch = () => {
    setNotice(null);
    searchMutation.mutate({ query: query.trim(), pageSize: 10 });
  };

  const handleRefresh = () => {
    setNotice(null);
    searchMutation.mutate({ query: "", pageSize: 10 });
  };

  const handleStartNotionOAuth = async () => {
    setNotice(null);
    try {
      await startNotionOAuth();
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : "노션 권한 연결 중 오류가 발생했습니다."
      );
    }
  };

  const handleConnect = async () => {
    setNotice(null);

    const requestMap = new Map<string, { notionUrl: string; notionPageId: string }>();

    if (notionUrl.trim()) {
      const notionPageId = extractNotionPageId(notionUrl.trim());
      if (!notionPageId) {
        setNotice("유효한 Notion URL이 아닙니다.");
        return;
      }
      requestMap.set(notionPageId, {
        notionUrl: notionUrl.trim(),
        notionPageId,
      });
    }

    selectedPages.forEach((notionPageId) => {
      const page = pages.find((item) => item.notionPageId === notionPageId);
      if (page) {
        requestMap.set(notionPageId, {
          notionUrl: page.url,
          notionPageId,
        });
      }
    });

    if (requestMap.size === 0) {
      setNotice("연동할 페이지를 선택하거나 URL을 입력해 주세요.");
      return;
    }

    try {
      await Promise.all(
        [...requestMap.values()].map((request) => createMutation.mutateAsync(request))
      );
      setNotice(`${requestMap.size}개 페이지 연동이 완료되었습니다.`);
      setSelectedPages([]);
      setNotionUrl("");
      handleRefresh();
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : "페이지 연동 중 오류가 발생했습니다."
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header variant="close" closeLink="/main" />

      <main className="max-w-[900px] mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-[40px] font-bold mb-4 text-black">노션 페이지 연결하기</h1>
          <p className="text-lg text-gray-600">
            DORIV 학습 센터로 변환할 페이지를 불러옵니다.
          </p>
        </div>

        <div className="border-4 border-dashed border-black rounded-lg p-12 mb-12">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-[#90EE90] border-[3px] border-black rounded-full flex items-center justify-center shadow-[3px_3px_0px_rgba(0,0,0,1)]">
              <svg className="w-8 h-8" fill="none" stroke="black" strokeWidth="3" viewBox="0 0 24 24">
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
                Notion 페이지 링크를 붙여넣거나 아래 목록에서 선택할 수 있습니다.
              </p>
            </div>

            <div className="w-full flex items-center border-[3px] border-black rounded overflow-hidden shadow-[3px_3px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2 px-4 py-3 flex-1">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                <input
                  type="text"
                  value={notionUrl}
                  onChange={(event) => setNotionUrl(event.target.value)}
                  placeholder="https://notion.so/..."
                  className="flex-1 outline-none text-sm"
                />
              </div>
              <button
                onClick={handlePaste}
                className="px-6 py-3 bg-white border-l-[3px] border-black font-bold text-sm hover:bg-gray-100 transition-colors"
              >
                PASTE
              </button>
            </div>

            <div className="w-full flex gap-3">
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="검색어 입력 (예: interview)"
                className="flex-1 border-[3px] border-black rounded px-4 py-3 text-sm outline-none"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-[#FEE500] border-[3px] border-black font-bold text-sm hover:bg-[#FFD700] transition-colors"
              >
                검색
              </button>
              <button
                onClick={handleStartNotionOAuth}
                className="px-6 py-3 bg-white border-[3px] border-black font-bold text-sm hover:bg-gray-100 transition-colors"
              >
                Notion 권한 연결
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black">최근 수정된 페이지</h2>
            <button
              onClick={handleRefresh}
              className="text-sm font-semibold text-black underline hover:no-underline"
            >
              새로고침
            </button>
          </div>

          <div className="flex flex-col gap-5">
            {searchMutation.isPending && (
              <div className="p-5 border-[3px] border-black rounded-lg bg-[#FAFAFA]">
                페이지 목록을 불러오는 중입니다.
              </div>
            )}

            {!searchMutation.isPending && pages.length === 0 && (
              <div className="p-5 border-[3px] border-black rounded-lg bg-[#FAFAFA]">
                표시할 페이지가 없습니다. 검색 또는 새로고침을 시도해 주세요.
              </div>
            )}

            {pages.map((page) => (
              <div
                key={page.notionPageId}
                className="flex items-center gap-4 p-5 bg-white border-[3px] border-black rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-pointer"
                onClick={() => togglePage(page.notionPageId)}
              >
                <div
                  className={`w-6 h-6 border-[3px] border-black rounded flex items-center justify-center cursor-pointer ${
                    selectedPages.includes(page.notionPageId) ? "bg-black" : "bg-white"
                  }`}
                >
                  {selectedPages.includes(page.notionPageId) && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                <div className="w-10 h-10 bg-gray-100 border-2 border-black rounded flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-black mb-1">{page.title}</h3>
                  <p className="text-sm text-gray-600">{formatEditedTime(page.lastEditedTime)}</p>
                </div>

                <a
                  href={page.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="text-sm font-semibold underline"
                >
                  원문
                </a>
              </div>
            ))}
          </div>
        </div>

        {notice && (
          <div className="mb-6 p-4 border-[3px] border-black rounded bg-[#FAFAFA] text-sm text-black">
            {notice}
          </div>
        )}

        {searchMutation.error && (
          <div className="mb-6 p-4 border-[3px] border-black rounded bg-[#FFE4E4] text-sm text-black">
            페이지 검색에 실패했습니다.
          </div>
        )}

        <button
          onClick={handleConnect}
          disabled={createMutation.isPending}
          className="w-full py-4 bg-[#90EE90] text-black border-[3px] border-black rounded-lg font-bold text-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {createMutation.isPending
            ? "연동 중..."
            : `연동 완료 (${selectedCount}개 선택)`}
          {!createMutation.isPending && "→"}
        </button>
      </main>
    </div>
  );
}
