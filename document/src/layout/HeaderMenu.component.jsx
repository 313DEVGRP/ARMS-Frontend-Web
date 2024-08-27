import { Link } from 'react-router-dom';
import { Menu, Settings } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/shadcn/ui/dropdown-menu"
import { Button } from "@/components/shadcn/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/shadcn/ui/sheet"
import { SubMenu } from './HeaderMenu'

const HeaderMenuComponents = () => {
    return (
        <>
        {/* 모바일 Breakpoint 좌측 사이드 메뉴  -- mobile menu & top right menu start -- */}
        <header className="flex h-14 bg-transparent items-center gap-4 bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                to=""
                className="flex items-center gap-2 text-lg font-semibold"
              >
               <span className="mb-16 bg-logo"></span>
              </Link>
            {/* Dynamic 서브 메뉴 */}
             <SubMenu />
            {/* 서브 메뉴 */}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="w-full flex-1">
          <form>
            <div className="relative">
             {/* -- Top Search Bar --  */}
              {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Search products..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              /> */}
            </div>
          </form>
        </div>
        {/* 상단 세팅 아이콘 메뉴 -- Top account dropdown menu -- */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full bg-transparent">
              <Settings className="h-5 w-5 text-white hover:text-black" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* 상단 세팅 아이콘 메뉴 End -- Top account dropdown menu end -- */}
      </header>
    </>
    )
}

export default HeaderMenuComponents