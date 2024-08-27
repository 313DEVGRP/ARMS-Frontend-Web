import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App';
import { BrowserRouter } from 'react-router-dom'

// 빌드시 env 설정에 따라 Dev 와 Prod 베이스 URL 설정 
const baseName = import.meta.env.DEV ? "/" : import.meta.env.VITE_ASSET_URL + "/document/dist";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* -- React-Router-dom -- BrowserRouter : URL 변경 시 렌더링할 컴포넌트 */}
   <BrowserRouter basename={baseName}> 
   {/* <BrowserRouter basename="/document/dist"> */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
