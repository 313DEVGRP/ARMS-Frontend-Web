import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App';
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* -- React-Router-dom -- BrowserRouter : URL 변경 시 렌더링할 컴포넌트 */}
   <BrowserRouter basename="/document/dist">
      <App />
    </BrowserRouter>
  </StrictMode>,
)
