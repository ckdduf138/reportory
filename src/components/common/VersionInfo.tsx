import React, { useState } from 'react';
import { Info, X, Clock, GitBranch } from 'lucide-react';

interface VersionInfoProps {
  className?: string;
}

export const VersionInfo: React.FC<VersionInfoProps> = ({ className = "" }) => {
  const [showModal, setShowModal] = useState(false);
  
  // package.json에서 버전 정보 가져오기
  const version = process.env.REACT_APP_VERSION || "1.0.0";
  
  // 최근 업데이트 내역 (실제로는 CHANGELOG.md나 API에서 가져올 수 있음)
  const updateHistory = [
    {
      version: "1.0.0",
      date: "2025-08-14",
      type: "major" as const,
      changes: [
        "첫 번째 정식 버전 출시",
        "Google SEO 최적화 완료",
        "반응형 디자인 개선",
        "UI/UX 전면 개선",
        "성능 최적화"
      ]
    },
    {
      version: "0.1.0",
      date: "2025-08-10",
      type: "minor" as const,
      changes: [
        "기본 할일 관리 기능",
        "통계 및 분석 기능",
        "공유 기능",
        "설정 페이지"
      ]
    }
  ];

  const getTypeColor = (type: 'major' | 'minor' | 'patch') => {
    switch (type) {
      case 'major': return 'bg-red-100 text-red-800';
      case 'minor': return 'bg-blue-100 text-blue-800';
      case 'patch': return 'bg-green-100 text-green-800';
    }
  };

  const getTypeLabel = (type: 'major' | 'minor' | 'patch') => {
    switch (type) {
      case 'major': return 'Major';
      case 'minor': return 'Minor';
      case 'patch': return 'Patch';
    }
  };

  return (
    <>
      {/* 버전 정보 버튼 */}
      <button
        onClick={() => setShowModal(true)}
        className={`inline-flex items-center gap-2 px-3 py-2 text-sm bg-teal-50 hover:bg-teal-100 text-teal-700 hover:text-teal-800 rounded-lg transition-colors duration-200 ${className}`}
        title="버전 정보 및 업데이트 내역"
      >
        <Info className="w-4 h-4" />
        <span>v{version} 보기</span>
      </button>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* 헤더 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <GitBranch className="w-6 h-6 text-blue-600" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Reportory v{version}
                  </h2>
                  <p className="text-sm text-gray-500">업데이트 내역</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* 업데이트 내역 */}
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="space-y-6">
                {updateHistory.map((update, index) => (
                  <div key={update.version} className="relative">
                    {/* 타임라인 라인 */}
                    {index < updateHistory.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-px bg-gray-200" />
                    )}
                    
                    <div className="flex gap-4">
                      {/* 버전 아이콘 */}
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        v{update.version.split('.')[0]}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        {/* 버전 정보 */}
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            v{update.version}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(update.type)}`}>
                            {getTypeLabel(update.type)}
                          </span>
                        </div>
                        
                        {/* 날짜 */}
                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                          <Clock className="w-4 h-4" />
                          <time dateTime={update.date}>
                            {new Date(update.date).toLocaleDateString('ko-KR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </time>
                        </div>
                        
                        {/* 변경사항 */}
                        <ul className="space-y-1">
                          {update.changes.map((change, changeIndex) => (
                            <li key={changeIndex} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                              <span>{change}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VersionInfo;
