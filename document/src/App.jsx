import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/shadcn/theme-provider'
import { SubMenuContextProvider } from '@/contexts/contexts'
import '../../reference/light-blue/documentation/css/font-awesome/css/font-awesome.min.css'
import '../../reference/light-blue/css/lib/font-awesome/font-awesome.css'
import '@/assets/css/globals.css'
import '@/assets/css/test.css'
import Layout from '@/layout/Layout'
import Dashboard from "@/pages/Dashboard"
import Installation from '@/pages/Installation'
import IntegrationStatus from '@/pages/ARMS_DashBoard/IntegrationStatus'
import ProgressStatus from '@/pages/ARMS_DashBoard/ProgressStatus'
import ProductServiceChoice from '@/pages/ARMS_ProductService/ProductServiceChoice'
import ProductServiceCheck from '@/pages/ARMS_ProductService/ProductServiceCheck'
import ProductServiceEdit from '@/pages/ARMS_ProductService/ProductServiceEdit'
import VersionControlChoice from '@/pages/ARMS_ProductService/VersionControlChoice'
import VersionControlCheck from '@/pages/ARMS_ProductService/VersionControlCheck'
import VersionControlEdit from '@/pages/ARMS_ProductService/VersionControlEdit'
/*
SubMenuContextProvider : 헤더 서브 메뉴 전역 변수 제공
ThemeProvider : 테마 관리
Routes : URL 경로와 컴포넌트를 매핑하는 컨테이너
Route : 사용자가 접근할 url 컴포넌트
PropTypes : 타입과 형식을 따르는지 검증하는 도구
*/

function App() {
  return (
    <ThemeProvider defaultTheme="dark"> 
     <SubMenuContextProvider>
          <Layout>
          <Routes>
            {/* 
              -- Sub menu & path -- 
              Route path 를 만들고 contexts/contexts.jsx 파일로 가서 서브 메뉴 링크를 수정하면 연결 됩니다.  
              To connect the path to the submenu, check 'contexts/contets.jsx' 
            */}
           {/* <Route element={<Layout />}> */}
              <Route path='/' element={<Dashboard /> } />
              <Route path='installation' element={<Installation /> } />
              <Route path='integration-status' element={<IntegrationStatus /> } />
              <Route path='progress-status' element={<ProgressStatus /> } />
              <Route path='product-service-choice' element={<ProductServiceChoice /> } />
              <Route path='product-service-check' element={<ProductServiceCheck /> } />
              <Route path='product-service-edit' element={<ProductServiceEdit /> } />
              <Route path='version-control-choice' element={<VersionControlChoice /> } />
              <Route path='version-control-check' element={<VersionControlCheck /> } />
              <Route path='version-control-edit' element={<VersionControlEdit /> } />
           {/* </Route> */}
           </Routes>
          </Layout>
      </SubMenuContextProvider>
    </ThemeProvider>
  )
}

export default App
