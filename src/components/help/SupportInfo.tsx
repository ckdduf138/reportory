import React, { useState } from "react";
import { MessageCircle, Send, CheckCircle } from "lucide-react";
import { getSupportInfo } from "../../utils/helpUtils";

const SupportInfo: React.FC = () => {
  const supportInfo = getSupportInfo();
  const [formData, setFormData] = useState({ title: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // 디스코드 웹훅 URL (환경변수로 관리하는 것이 좋습니다)
  const DISCORD_WEBHOOK_URL =
    process.env.REACT_APP_DISCORD_WEBHOOK_URL ||
    "YOUR_DISCORD_WEBHOOK_URL_HERE"; // 여기에 실제 웹훅 URL을 넣으세요

  const sendToDiscord = async (title: string, message: string) => {
    const discordMessage = {
      embeds: [
        {
          title: "📝 새로운 문의가 도착했습니다!",
          color: 0x14b8a6, // teal-500 색상
          fields: [
            {
              name: "제목",
              value: title || "제목 없음",
              inline: false,
            },
            {
              name: "문의 내용",
              value: message,
              inline: false,
            },
            {
              name: "앱 버전",
              value: `v${supportInfo.version}`,
              inline: true,
            },
            {
              name: "전송 시간",
              value: new Date().toLocaleString("ko-KR"),
              inline: true,
            },
          ],
        },
      ],
    };

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordMessage),
    });

    if (!response.ok) {
      throw new Error("메시지 전송에 실패했습니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await sendToDiscord(formData.title, formData.message);
      setIsSubmitted(true);
      setFormData({ title: "", message: "" });

      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "전송 중 오류가 발생했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-center gap-3 text-green-600">
          <CheckCircle className="w-6 h-6" />
          <h2 className="text-xl font-bold">피드백이 전송되었습니다!</h2>
        </div>
        <p className="text-center text-gray-600 mt-2">
          소중한 의견 감사합니다. 더 나은 서비스를 위해 참고하겠습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <MessageCircle className="w-6 h-6 text-teal-600" />
        <h2 className="text-xl font-bold text-gray-800">지원 및 피드백</h2>
      </div>

      <div className="space-y-4">
        {/* 버전 정보 */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">현재 버전:</span>
            <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded text-sm font-medium">
              v{supportInfo.version}
            </span>
          </div>
        </div>

        {/* 문의 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목 *
            </label>
            <input
              type="text"
              placeholder="예: 버그 신고, 기능 요청, 사용법 문의 등"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
              required
              maxLength={100}
            />
            <div className="text-xs text-gray-500 mt-1">
              {formData.title.length}/100
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              문의 내용 *
            </label>
            <textarea
              placeholder="구체적으로 작성해주시면 더 빠른 답변이 가능합니다.&#10;&#10;• 버그인 경우: 어떤 상황에서 발생하는지&#10;• 기능 요청인 경우: 어떤 기능이 필요한지&#10;• 사용법 문의인 경우: 어떤 부분이 궁금한지"
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              rows={6}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none transition-colors"
              required
              maxLength={1000}
            />
            <div className="text-xs text-gray-500 mt-1">
              {formData.message.length}/1000
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-lg flex items-start gap-2">
              <span className="text-red-500 text-base">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={
              isSubmitting || !formData.title.trim() || !formData.message.trim()
            }
            className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                전송 중...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                피드백 보내기
              </>
            )}
          </button>
        </form>

        {/* 도움말 텍스트 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <span className="text-blue-500 text-base">💡</span>
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">피드백 작성 팁</p>
              <ul className="text-xs space-y-1">
                <li>• 버그나 개선사항을 구체적으로 설명해주세요</li>
                <li>• 어떤 기능이 있으면 좋을지 자유롭게 제안해주세요</li>
                <li>• 모든 의견은 개발에 소중한 참고자료가 됩니다</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportInfo;
