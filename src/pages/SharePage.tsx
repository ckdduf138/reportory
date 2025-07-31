import React, { useEffect, useState } from "react";
import {
  Share2,
  Copy,
  Download,
  QrCode,
  Mail,
  MessageCircle,
  Calendar,
  Clock,
} from "lucide-react";

import { AppHeader, SidebarMenu } from "../components/common";
import { Loader } from "../components/ui";
import { useReport } from "../hooks/report/useReport";
import { useTodo } from "../hooks/todo/useTodo";
import { useIsMobile } from "../hooks/useBreakpoint";
import { formatTime } from "../utils/transalte";
import { toast } from "../components/ui/toastContainer";

const SharePage: React.FC = () => {
  const isMobile = useIsMobile();
  const { reports, fetchReports } = useReport();
  const { todos, fetchTodos } = useTodo();

  const [selectedFormat, setSelectedFormat] = useState<
    "daily" | "weekly" | "custom"
  >("daily");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("");

  useEffect(() => {
    fetchReports();
    fetchTodos();
  }, [fetchReports, fetchTodos]);

  const generateShareText = () => {
    setIsGenerating(true);

    const today = new Date(selectedDate);
    const formattedDate = `${today.getFullYear()}.${String(
      today.getMonth() + 1
    ).padStart(2, "0")}.${String(today.getDate()).padStart(
      2,
      "0"
    )}(${today.toLocaleDateString("ko-KR", { weekday: "short" })})`;

    let shareText = `📅 ${formattedDate}\n\n`;

    // 완료된 할일 추가
    const completedTodos = todos.filter((todo) => todo.isCompleted);
    if (completedTodos.length > 0) {
      shareText += "✅ 완료한 할일:\n";
      completedTodos.forEach((todo) => {
        shareText += `• ${todo.title}\n`;
      });
      shareText += "\n";
    }

    // 기록 추가
    if (reports.length > 0) {
      shareText += "⏰ 시간 기록:\n";
      reports.forEach((report) => {
        const formattedStartTime = formatTime(report.startTime);
        const formattedEndTime = formatTime(report.endTime);
        shareText += `${formattedStartTime} ~ ${formattedEndTime} ${report.content}\n`;
      });
      shareText += "\n";
    }

    // 미완료 할일 추가
    const incompleteTodos = todos.filter((todo) => !todo.isCompleted);
    if (incompleteTodos.length > 0) {
      shareText += "📋 진행 중인 할일:\n";
      incompleteTodos.forEach((todo) => {
        shareText += `• ${todo.title}\n`;
      });
    }

    setGeneratedText(shareText);
    setIsGenerating(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
      toast.success("클립보드에 복사되었습니다!");
    } catch (error) {
      toast.error("클립보드 복사에 실패했습니다.");
    }
  };

  const downloadAsText = () => {
    const blob = new Blob([generatedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `daily-report-${selectedDate}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("파일이 다운로드되었습니다!");
  };

  const shareToEmail = () => {
    const subject = encodeURIComponent(`Daily Report - ${selectedDate}`);
    const body = encodeURIComponent(generatedText);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  useEffect(() => {
    generateShareText();
  }, [selectedDate, reports, todos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <div className="container mx-auto max-w-4xl">
        <AppHeader
          title="공유하기"
          subtitle="일일 리포트를 다양한 방식으로 공유하세요"
        />

        <div className={`${isMobile ? "px-4" : "px-6"} pb-24 space-y-6`}>
          {/* 옵션 설정 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">공유 옵션</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  형식 선택
                </label>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="daily">일일 리포트</option>
                  <option value="weekly">주간 리포트</option>
                  <option value="custom">사용자 정의</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  날짜 선택
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={generateShareText}
              disabled={isGenerating}
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:bg-gray-300 transition-colors"
            >
              {isGenerating ? "생성 중..." : "리포트 생성"}
            </button>
          </div>

          {/* 미리보기 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">미리보기</h2>

            <div className="bg-gray-50 rounded-lg p-4 min-h-[200px]">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                {generatedText || "리포트를 생성해주세요."}
              </pre>
            </div>
          </div>

          {/* 공유 방법 */}
          {generatedText && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                공유 방법
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={copyToClipboard}
                  className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Copy className="w-6 h-6 text-teal-600" />
                  <span className="text-sm font-medium">복사</span>
                </button>

                <button
                  onClick={downloadAsText}
                  className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-medium">다운로드</span>
                </button>

                <button
                  onClick={shareToEmail}
                  className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Mail className="w-6 h-6 text-green-600" />
                  <span className="text-sm font-medium">이메일</span>
                </button>

                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: `Daily Report - ${selectedDate}`,
                        text: generatedText,
                      });
                    } else {
                      toast.info("이 브라우저에서는 지원되지 않습니다.");
                    }
                  }}
                  className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="w-6 h-6 text-purple-600" />
                  <span className="text-sm font-medium">공유</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <SidebarMenu />
        {isGenerating && <Loader />}
      </div>
    </div>
  );
};

export default SharePage;
