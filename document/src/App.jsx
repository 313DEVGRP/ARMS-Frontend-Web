import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/shadcn/theme-provider'
import Dashboard from "@/pages/Dashboard"
import '@/assets/css/globals.css'
import '@/assets/css/test.css'
/*
ThemeProvider : 테마 관리
BrowserRouter : URL 변경 시 렌더링할 컴포넌트
Routes : URL 경로와 컴포넌트를 매핑하는 컨테이너
Route : 사용자가 접근할 url 컴포넌트
PropTypes : 타입과 형식을 따르는지 검증하는 도구
*/
function App() {

  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="light">
          <Routes>
            <Route path='/' element={<Dashboard />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
