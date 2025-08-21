import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2000); // 2초 후 리다이렉션

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 flex items-center justify-center relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-28 h-28 bg-white/10 rounded-full blur-xl"></div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="text-center z-10 px-6">
        {/* 로고 애니메이션 */}
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mx-auto w-fit">
          <img
            src="/images/favicon.svg"
            alt="Reportory Logo"
            className="w-20 h-20 filter brightness-0 invert mx-auto"
          />
        </div>

        {/* 브랜드명 */}
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          Reportory
        </h1>

        {/* 태그라인 */}
        <p className="text-xl text-white/90 mb-8 font-medium">
          하루의 기록을 쉽고 간편하게
        </p>
      </div>

      {/* 하단 장식 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/10 to-transparent"></div>
    </div>
  );
};

export default SplashScreen;
