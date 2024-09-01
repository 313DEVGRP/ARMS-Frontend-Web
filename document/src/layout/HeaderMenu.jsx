import { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SubMenuContext } from '../contexts/contexts' 
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/shadcn/ui/accordion"

export const AccordionMenu = ({ title, to, isActive }) => {
  return (
    <AccordionContent className='px-8 dark:text-white hover:text-data hover:bg-muted/10 rounded-sm'>
      <Link to={to} className={`${isActive ? 'active text-data font-bold' : ''}`}> {title} </Link>
    </AccordionContent>
  )
}

export const SubMenu = () => {
  const { menuItems, activeLink } = useContext(SubMenuContext)
  // const location = useLocation()

  const allItemValues = menuItems.map((_, index) => `item-${index}`); 

  return (
    <>
     {menuItems.map((item, index) => {
      const isActive = activeLink === item.to || (item.subMenus && item.subMenus.some(subItem => subItem.to === activeLink))
      const combinedClassName = `
      ${isActive ? `active !text-data` : ''}
      ${item.className || ''}
      `.trim();
 
      return (
        // 메뉴 Data에 서브메뉴가 있을 시 아코디언 컴포넌트로 출력
        item.subMenus && item.subMenus.length > 0 ? ( 
          <Accordion 
          key={index} 
          type="multiple"
          value={allItemValues}
          className="flex flex-col ">
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger
                 className={`!justify-start gap-3 rounded-lg px-3 py-2 dark:text-white transition-all hover:text-data hover:bg-muted/10 ${isActive ? 'active !text-data' : ''}`}
                >
                <item.Icon />
                    {Array.isArray(item.title) ? (
                    <>
                      {item.title[0]} <sup className='-m-2'>{item.title[1]}</sup>
                    </>
                  ) : (
                    item.title
                  )} 
              </AccordionTrigger>
           
              <div className="pl-1 last:mb-3 [&>*:first-child]:mt-1">
              {/*서브 메뉴 출력 */}
                {item.subMenus.map((el) => (
                  <AccordionMenu 
                  key={el.id} 
                  title={el.title} 
                  to={el.to}
                  isActive={activeLink === el.to}
                  className=''
                  />
                ))}
              {/* 서브 메뉴 출력 END */}
              </div>
            </AccordionItem>
          </Accordion>
        ) : (
          // 서브메뉴가 없을 시 기본 메뉴로 출력
          <Link
            key={index}
            to={item.to}
             className={`flex items-center gap-3 rounded-lg px-3 py-2 dark:text-white transition-all hover:text-data hover:bg-muted/10 ${combinedClassName}` }
             >
            {/* <item.Icon /> */}
            <i className="fa-solid fa-user"></i>
            {Array.isArray(item.title) ? (
                <>
                  {item.title[0]} <sup>{item.title[1]}</sup>
                </>
              ) : (
                item.title
              )}
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
      <div className="menu-style hidden md:block">
        <div className="flex h-full max-h-screen flex-col">
          <div className="menu-top flex">
            <Link to="/" className="link-logo items-center" >
              {/* 상단 브랜드 로고 --  Page Header -- */}
              <span className="bg-logo"></span>
            </Link>
          </div>
          <div className="menu-body flex-1">
            <nav className="grid items-start px-5 py-5 text-sm lg:px-7 lg:py-5">
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