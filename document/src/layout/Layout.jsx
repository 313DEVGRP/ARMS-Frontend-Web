import HeaderMenu from '@/layout/HeaderMenu'
import HeaderMenuComponents from '@/layout/HeaderMenu.component'

function Layout({ children }) {
  return (
    <>
    {/* 
      layout width by the screen size
      사이드 바 사이즈 mideum : md:grid-cols-[230px_1fr]
      large : lg:grid-cols-[230px_1fr]
     */}
    <div className="grid min-h-screen w-full md:grid-cols-[230px_1fr] lg:grid-cols-[230px_1fr]">
       <HeaderMenu />
       <div className="flex flex-col">
       <HeaderMenuComponents />
      { children }
      </div>
   </div>
   </>
  )
}

export default Layout