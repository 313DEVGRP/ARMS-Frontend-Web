import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { SubMenuContext } from '../contexts/contexts' 
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/ui/accordion"


export const AccordionMenu = ({ title, to, isActive }) => {
  return (
    <AccordionContent className='px-8 lg:text-white dark:text-white !max-sm:text-black'>
      <Link to={to} className={`!sm:text-base ${isActive ? 'active text-blue-400 font-bold' : ''}`}> {title} </Link>
    </AccordionContent>
  )
}

export const SubMenu = () => {
  const { menuItems, activeLink } = useContext(SubMenuContext);

  return (
    <>
     {menuItems.map((item, index) => {
      const isActive = activeLink === item.to;
      const combinedClassName = `
      ${isActive ? `active bg-gray-100 !text-blue-400` : ''}
      ${item.className || ''}
      `.trim();
 
      return (
        item.subMenus && item.subMenus.length > 0 ? ( // 메뉴 Data에 서브메뉴가 있을 시 아코디언 컴포넌트로 출력
          <Accordion key={index} type="single" collapsible className="flex flex-col gap-1">
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger 
                className={`!max-sm:text-black !justify-start gap-3 rounded-lg px-3 py-2 lg:text-white dark:text-white transition-all hover:text-blue-400 hover:bg-muted ${isActive ? 'active bg-gray-100 !text-primary' : ''}`}
                >
                <item.Icon />
                {item.title}  
              </AccordionTrigger>
              <div className="pl-5 !sm:text-base">
              {/* 아코디언 서브 메뉴 출력 */}
                {item.subMenus.map((el) => (
                  <AccordionMenu 
                  key={el.id} 
                  title={el.title} 
                  to={el.to}
                  isActive={activeLink === el.to}
                  />
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
             className={`flex items-center gap-3 rounded-lg px-3 py-2 !max-sm:text-white lg:text-white dark:text-white transition-all hover:text-blue-400 hover:bg-muted ${combinedClassName}` }
             >
            <item.Icon />
            {item.title}
          </Link>
        ))
       }
       )
      }
    </>
  )
}

const HeaderMenu = () => {
  return (
    <>
      <div className="hidden bg-transparent md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex md:mb-12 lg:mb-2 h-16 items-center px-4 lg:h-[100px] lg:px-6">
            <Link to="/" className="flex lg:top-7 lg:absolute items-center gap-2 font-semibold ">
              {/* 상단 브랜드 로고 --  Page Header -- */}
              <span className="bg-logo "></span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm lg:px-4 lg:mt-0">
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