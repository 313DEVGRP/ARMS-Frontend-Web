import HeaderMenu from '@/layout/HeaderMenu'
import HeaderMenuComponents from '@/layout/HeaderMenu.component'
import { Outlet } from 'react-router-dom'

function Layout({ children }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <HeaderMenu />
      <div className="flex flex-col">
      <HeaderMenuComponents />
      {/* <Outlet /> */}
      { children }
      </div>
   </div>
  )
}

export default Layout