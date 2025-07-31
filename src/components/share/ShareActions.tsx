import React from "react";
import { Clipboard, FileDown, ExternalLink } from "lucide-react";

interface ShareActionsProps {
  onCopy: () => void;
  onDownload: () => void;
  onShare: () => void;
}

const ShareActions: React.FC<ShareActionsProps> = ({
  onCopy,
  onDownload,
  onShare,
}) => {
  const shareActions = [
    {
      id: "copy",
      label: "복사",
      icon: Clipboard,
      color: "text-teal-600",
      action: onCopy,
    },
    {
      id: "download",
      label: "다운로드",
      icon: FileDown,
      color: "text-blue-600",
      action: onDownload,
    },
    {
      id: "share",
      label: "공유",
      icon: ExternalLink,
      color: "text-purple-600",
      action: onShare,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">공유 방법</h2>

      <div className="grid grid-cols-3 gap-4">
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
