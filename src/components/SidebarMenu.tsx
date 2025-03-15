import React, { useState } from 'react';

const SidebarMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 햄버거 버튼 */}
      <button
        className="fixed top-4 left-4 p-2 z-70"
        onClick={() => setIsOpen(true)}
      >
        <img src={`${process.env.PUBLIC_URL}/images/home/ic-menu.svg`} />
      </button>

      {/* 사이드바 */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <h1 className="flex p-4 text-2xl font-bold text-center text-black">Daily Report</h1>

        <div className="border-t border-gray-300 my-4 mx-3" />

        <button
          className="absolute top-4 right-4 p-1 rounded-md text-gray-800"
          onClick={() => setIsOpen(false)}
        >
          <img src={`${process.env.PUBLIC_URL}/images/home/ic-x-02.svg`} />
        </button>

        {/* 메뉴 리스트 */}
        <nav className="flex flex-col gap-4 p-6 text-gray-800">
          <a href="#" className="hover:text-blue-500">홈</a>
          <a href="#" className="hover:text-blue-500">기능</a>
          <a href="#" className="hover:text-blue-500">설정</a>
          <a href="#" className="hover:text-blue-500">로그아웃</a>
        </nav>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-60"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default SidebarMenu;
