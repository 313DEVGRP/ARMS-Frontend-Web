import { Link } from 'react-router-dom';
import { Menu } from "lucide-react"
import { Button } from "@/components/shadcn/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/shadcn/ui/sheet"
import { SubMenu } from './HeaderMenu'

const HeaderMenuComponents = () => {
    return (
        <>
        {/* 모바일 Breakpoint 좌측 사이드 메뉴  -- mobile menu & top right menu start -- */}
        <header className="flex h-14 bg-transparent items-center gap-4 px-4 lg:hidden md:hidden lg:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="group shrink-0 md:hidden bg-transparent"
            >
              <Menu className="h-5 w-5 text-white group-hover:text-black" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-sm !sm:text-sm">
              <Link
                to=""
                className="flex items-center gap-10 font-semibold"
              >
               {/* top left logo section */}
               <span className="bg-logo"></span>
              </Link>
            {/*  서브 메뉴 */}
             <SubMenu />
            {/* 서브 메뉴 */}
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </>
    )
}

export default HeaderMenuComponents