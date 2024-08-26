import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/shadcn/theme-provider'
import Layout from '@/layout/Layout'
import Dashboard from "@/pages/Dashboard"
import '@/assets/css/globals.css'
import '@/assets/css/test.css'
import { SubMenuContextProvider } from '@/contexts/contexts'
/*
SubMenuContextProvider : 헤더 서브 메뉴 전역 변수 제공
ThemeProvider : 테마 관리
Routes : URL 경로와 컴포넌트를 매핑하는 컨테이너
Route : 사용자가 접근할 url 컴포넌트
PropTypes : 타입과 형식을 따르는지 검증하는 도구
*/
export const Guide = () => {
  return <div> Guide page </div>
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark"> 
     <SubMenuContextProvider>
          <Routes>
           <Route path='/' element={<Layout />}>
              <Route index element={<Dashboard /> } />
              <Route path='guide' element={<Guide /> } />
           </Route>
          </Routes>
      </SubMenuContextProvider>
    </ThemeProvider>
  )
}

export default App
