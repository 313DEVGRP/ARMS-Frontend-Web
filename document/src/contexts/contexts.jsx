import { createContext, useEffect, useState, useCallback } from "react"
import {
    MonitorDown,
    Gauge,
    Boxes,
    PackagePlus,
    Info,
    ListChecks,
    ChartLine,
    Handshake,
  } from "lucide-react"
import { useLocation } from 'react-router-dom';

export function useActiveLink() {
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();

  useEffect(() => {
      setActiveLink(location.pathname);
  }, [location]);

  const handleSetActiveLink = useCallback((path) => {
      setActiveLink(path);
  }, []);

  return { activeLink, handleSetActiveLink };
}

export const SubMenuContext = createContext();

export const SubMenuContextProvider = ({children}) => {
  const { activeLink, handleSetActiveLink  } = useActiveLink();

  const value = [
    {
      to: "/",
      title: "Why ARMS?",
      Icon: ()=> (<Info />),
    }, 
    {
      to: "/installation",
      title: "ARMS Installation",
      Icon: ()=> (<PackagePlus />),
    }, 
    {
      to: "#",
      title: "ARMS Dashboard",
      Icon: ()=> (<Gauge />),
      subMenus: [
        { id: 1, to: '/integration-status', title: 'Integration Status' },
        { id: 2, to: '/progress-status', title: 'Progress Status' },
      ]
    },
    {
      to: "#",
      title: ["ARMS Product", "Service"],
      Icon: ()=> (<MonitorDown />),
      subMenus: [
        { id: 1, to: '/product-service-choice', title: '서비스 선택' },
        { id: 2, to: '/product-service-check', title: '서비스 산출물 조회' },
        { id: 3, to: '/product-service-edit', title: '서비스 산출물 편집/삭제' },
        { id: 4, to: '/version-control-choice', title: '서비스 선택' },
        { id: 5, to: '/version-control-check', title: '서비스 버전 조회' },
        { id: 6, to: '/version-control-edit', title: '서비스 버전 편집/삭제' },
      ]
    },
    {
      to: "#",
      title: ["ALM", "Jira, github, etc."],
      Icon: ()=> (<Boxes />),
      subMenus: [
        { id: 1, to: '#', title: 'ALM 서버 조회' },
        { id: 2, to: '#', title: 'ALM 서버 편집/삭제' },
        { id: 3, to: '#', title: 'ALM 서버 선택' },
        { id: 4, to: '#', title: '연결된 Jira 조회' },
        { id: 5, to: '#', title: '제품 조회/선택' },
        { id: 6, to: '#', title: '제품 버전 조회' },
        { id: 7, to: '#', title: 'ALM 프로젝트 list' },
      ]
    },
    {
      to: "#",
      title: "Requirement",
      Icon: ()=> (<ListChecks />),
      subMenus: [
        { id: 1, to: '#', title: '요구 사항 조회' },
        { id: 2, to: '#', title: '요구 사항 내용' },
        { id: 3, to: '#', title: '제품 버전 선택' },
        { id: 4, to: '#', title: 'Issue list' },
        { id: 5, to: '#', title: '간트 차트' },
        { id: 6, to: '#', title: '칸반 보드' },
      ]
    },
    {
      to: "#",
      title: "Analysis",
      Icon: ()=> (<ChartLine />),
      subMenus: [
        { id: 2, to: '#', title: '진행 현황' },
        { id: 1, to: '#', title: 'Time 분석' },
        { id: 3, to: '#', title: 'Scope 분석' },
        { id: 4, to: '#', title: '범위별 차트' },
        { id: 5, to: '#', title: 'Resource 분석' },
        { id: 6, to: '#', title: '작업자 현황' },
        { id: 7, to: '#', title: 'Cost 분석' },
        { id: 8, to: '#', title: '프로젝트 비용 산정' },
      ]
    },
    {
      to: "#",
      title: "Community",
      Icon: ()=> (<Handshake />),
      subMenus: [
        { id: 1, to: '#', title: '공지사항' },
        { id: 2, to: '#', title: '업데이트 노트' },
        { id: 3, to: '#', title: '사용자 매뉴얼' },
        { id: 4, to: '#', title: '문의 답변' },
        { id: 5, to: '#', title: '관리 도구' },
        { id: 6, to: '#', title: '라이선스' },
      ]
    },
  ];

  return (
    <SubMenuContext.Provider value={{ menuItems: value, activeLink, handleSetActiveLink }}>
      {children}
    </SubMenuContext.Provider>
  );
};
