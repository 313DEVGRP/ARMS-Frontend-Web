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
    <AccordionContent className='px-8 hover:underline lg:text-white dark:text-white !max-sm:text-black'>
      <Link to={to} className='text-xs !sm:max-sm:text-base'> {title} </Link>
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
              <AccordionTrigger className=" !sm:text-base !max-sm:text-black !justify-start gap-3 rounded-lg px-3 py-2 lg:text-white dark:text-white transition-all hover:text-primary hover:bg-muted">
                <item.Icon className="h-4 w-4" />
                {item.title}  
              </AccordionTrigger>
              <div className="pl-5 py-1">
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
            className="flex items-center gap-3 rounded-lg px-3 py-2 !max-sm:text-white lg:text-white dark:text-white transition-all hover:text-primary hover:bg-muted hover:underline"
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
      <div className="hidden bg-transparent md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-80 items-center px-4 lg:h-[100px] lg:px-6">
            <Link to="/" className="flex !shrink-0 lg:top-7 lg:absolute items-center gap-2 font-semibold ">
              {/* 상단 브랜드 로고 --  Page Header -- */}
              <span className="bg-logo "></span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 lg:mt-0 !sm:pt-6">
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