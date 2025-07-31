import React, { useEffect } from "react";
import { AppHeader, SidebarMenu } from "../components/common";
import { useTodo } from "../hooks/todo/useTodo";
import { useShareManager } from "../hooks/useShareManager";
import { ReportPreview, ShareActions } from "../components/share";
import { useIsMobile } from "../hooks/useBreakpoint";

const SharePage: React.FC = () => {
  const isMobile = useIsMobile();
  const { todos, fetchTodos } = useTodo();

  const {
    selectedDate,
    generatedReport,
    handleCopyToClipboard,
    handleDownloadAsText,
    handleShareViaWebAPI,
  } = useShareManager(todos);

  // 페이지 로드 시 todos 가져오기
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // 현재 날짜에 맞는 투두 필터링
  const filteredTodos = todos.filter((todo) => {
    const todoDate = new Date(todo.createdAt).toISOString().split("T")[0];
    return todoDate === selectedDate;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <div className="container mx-auto max-w-4xl">
        <AppHeader
          title="공유하기"
          subtitle="일일 리포트를 다양한 방식으로 공유하세요"
        />

        <div className={`${isMobile ? "px-4" : "px-6"} pb-24 space-y-6`}>
          {/* Generated Report */}
          {generatedReport ? (
            <ReportPreview report={generatedReport} />
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="text-center py-8">
                <p className="text-gray-500 mb-2">
                  리포트를 생성하고 있습니다...
                </p>
                <p className="text-sm text-gray-400">
                  할일이 없다면 리포트가 생성되지 않을 수 있습니다.
                </p>
              </div>
            </div>
          )}

          {/* Share Actions */}
          <ShareActions
            onCopy={handleCopyToClipboard}
            onDownload={handleDownloadAsText}
            onShare={handleShareViaWebAPI}
          />
        </div>
      </div>

      <SidebarMenu />
    </div>
  );
};

export default SharePage;
