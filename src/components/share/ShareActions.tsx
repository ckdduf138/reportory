import React from "react";
import { Copy, Download, Mail, Share2 } from "lucide-react";

interface ShareActionsProps {
  onCopy: () => void;
  onDownload: () => void;
  onEmail: () => void;
  onShare: () => void;
}

const ShareActions: React.FC<ShareActionsProps> = ({
  onCopy,
  onDownload,
  onEmail,
  onShare,
}) => {
  const shareActions = [
    {
      id: "copy",
      label: "복사",
      icon: Copy,
      color: "text-teal-600",
      action: onCopy,
    },
    {
      id: "download",
      label: "다운로드",
      icon: Download,
      color: "text-blue-600",
      action: onDownload,
    },
    {
      id: "email",
      label: "이메일",
      icon: Mail,
      color: "text-green-600",
      action: onEmail,
    },
    {
      id: "share",
      label: "공유",
      icon: Share2,
      color: "text-purple-600",
      action: onShare,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">공유 방법</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {shareActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.action}
              className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Icon className={`w-6 h-6 ${action.color}`} />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ShareActions;
