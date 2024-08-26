import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { SubMenuContext } from '../contexts/contexts' 
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/ui/accordion"


export const AccordionMenu = ({ title, to }) => {
  return (
        <AccordionContent className='px-8 hover:underline'>
          <Link to={to}> {title} </Link>
        </AccordionContent>
  )
}

export const SubMenu = () => {
  const subMenuItems = useContext(SubMenuContext)

  return (
    <>
     {subMenuItems.map((item, index) =>
        item.subMenus && item.subMenus.length > 0 ? ( // 메뉴 Data에 서브메뉴가 있을 시 아코디언 컴포넌트로 출력
          <Accordion key={index} type="single" collapsible className="flex flex-col gap-1 ">
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className="!justify-start gap-3 rounded-lg px-3 py-2 text-black dark:text-white transition-all hover:text-primary hover:bg-muted">
                <item.Icon className="h-4 w-4" />
                {item.title}  
              </AccordionTrigger>
              <div className="pl-8">
              {/* 아코디언 서브 메뉴 출력 */}
                {item.subMenus.map((el) => (
                  <AccordionMenu key={el.id} title={el.title} to={el.to} />
                ))}
              {/* 아코디언 서브 메뉴 출력 END */}
              </div>
            </AccordionItem>
          </Accordion>
        ) : (
          // 서브메뉴가 없을 시 기본 메뉴로 출력
          <Link
            key={index}
            to={item.to}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-black dark:text-white transition-all hover:text-primary hover:bg-muted hover:underline"
          >
            <item.Icon className="h-4 w-4" />
            {item.title}
          </Link>
        )
      )}
    </>
  )
}

const HeaderMenu = () => {
  return (
    <>
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            {/* 상단 브랜드 로고 --  Page Header -- */}
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <span className="bg-logo">313 DEV GRP</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {/* 좌측 메뉴 -- Right hand side menu -- */}
              <SubMenu />
            </nav>
          </div>
      </div>
    </div>
  </>
 )
}

export default HeaderMenu