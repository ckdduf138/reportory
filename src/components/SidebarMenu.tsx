import React, { useState } from 'react';
import { copyReport } from '../utils/storage';

const SidebarMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = () => {
    copyReport();
  };

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

        <div className="border-t border-gray-300 mb-2 mx-3" />

        <button
          className="absolute top-4 right-4 p-1 rounded-md text-gray-800"
          onClick={() => setIsOpen(false)}
        >
          <img src={`${process.env.PUBLIC_URL}/images/home/ic-x-02.svg`} />
        </button>

        {/* 메뉴 리스트 */}
        <nav className="flex flex-col gap-2 p-2 text-gray-800">
          <NavItem label="카테고리" iconSrc={`${process.env.PUBLIC_URL}/images/home/ic-tag.svg`} onClicked={() => {}}/>
          <NavItem label="분석" iconSrc={`${process.env.PUBLIC_URL}/images/home/ic-bar-chart-square-up-01.svg`} onClicked={() => {}}/>
          <NavItem label="공유" iconSrc={`${process.env.PUBLIC_URL}/images/home/ic-export.svg`} onClicked={() => {handleExport()}}/>
          <NavItem label="도움말" iconSrc={`${process.env.PUBLIC_URL}/images/home/ic-help-circle-contained.svg`} onClicked={() => {}}/>
          <NavItem label="설정" iconSrc={`${process.env.PUBLIC_URL}/images/home/ic-settings.svg`} onClicked={() => {}}/>
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

interface NavItemProps {
  label: string;
  iconSrc: string;
  onClicked: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, iconSrc, onClicked }) => {
  const handleClick = () => {
    onClicked();
  };

  return (
    <div
      className="relative flex flex-row p-2 gap-4 items-center group"
      onClick={onClicked}
    >
      <img src={iconSrc} />
      <div>{label}</div>
      <div
        className="absolute inset-0 h-full z-[-1] rounded-lg transform scale-x-0 bg-white transition-all duration-100 ease-in-out 
        group-active:scale-x-100 group-active:opacity-100 opacity-0  group-active:filter group-active:brightness-90"
      />
    </div>
  );
};

export default SidebarMenu;