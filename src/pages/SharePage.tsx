import React from "react";
import { Share2 } from "lucide-react";
import { AppHeader, SidebarMenu } from "../components/common";
import { useTodo } from "../hooks/todo/useTodo";
import { useShareManager } from "../hooks/useShareManager";
import { ShareOptions, ReportPreview, ShareActions } from "../components/share";
import { useIsMobile } from "../hooks/useBreakpoint";

const SharePage: React.FC = () => {
  const isMobile = useIsMobile();
  const { todos } = useTodo();

  const {
    selectedFormat,
    selectedDate,
    generatedReport,
    setSelectedFormat,
    setSelectedDate,
    generateReport,
    handleCopyToClipboard,
    handleDownloadAsText,
    handleShareToEmail,
    handleShareViaWebAPI,
  } = useShareManager(todos);

  // 현재 날짜에 맞는 투두 필터링
  const filteredTodos = todos.filter((todo) => {
    const todoDate = new Date(todo.createdAt).toISOString().split("T")[0];
    return todoDate === selectedDate;
  });

  const completedTodos = filteredTodos.filter((todo) => todo.isCompleted);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <div className="container mx-auto max-w-4xl">
        <AppHeader
          title="공유하기"
          subtitle="일일 리포트를 다양한 방식으로 공유하세요"
        />

        <div className={`${isMobile ? "px-4" : "px-6"} pb-24 space-y-6`}>
          {/* Share Options */}
          <ShareOptions
            selectedDate={selectedDate}
            selectedFormat={selectedFormat}
            onDateChange={setSelectedDate}
            onFormatChange={setSelectedFormat}
            onGenerate={generateReport}
            todosCount={filteredTodos.length}
            completedCount={completedTodos.length}
          />

          {/* Generated Report */}
          {generatedReport && <ReportPreview report={generatedReport} />}

          {/* Share Actions */}
          <ShareActions
            onCopy={handleCopyToClipboard}
            onDownload={handleDownloadAsText}
            onEmail={handleShareToEmail}
            onShare={handleShareViaWebAPI}
          />
        </div>
      </div>

      <SidebarMenu />
    </div>
  );
};

export default SharePage;
