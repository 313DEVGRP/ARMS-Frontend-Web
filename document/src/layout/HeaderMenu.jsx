import { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SubMenuContext } from '../contexts/contexts' 
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/shadcn/ui/accordion"

export const AccordionMenu = ({ title, to, isActive }) => {
  return (
    <AccordionContent className='px-8 dark:text-white'>
      <Link to={to} className={`!sm:text-base ${isActive ? 'active text-blue-400 font-bold' : ''}`}> {title} </Link>
    </AccordionContent>
  )
}

export const SubMenu = () => {
  const { menuItems, activeLink } = useContext(SubMenuContext)
  const [openItems, setOpenItems] = useState([])
  const location = useLocation()

  useEffect(() => {
    const newOpenItems = menuItems
      .map((item, index) => {
        if (item.subMenus && (item.subMenus.some(subItem => subItem.to === location.pathname) || openItems.includes(`item-${index}`))) {
          return `item-${index}`;
        }
        return null;
      })
      .filter(Boolean);
    setOpenItems(newOpenItems);
  }, [location, menuItems]);

  const handleAccordionChange = (value) => {
    setOpenItems(value);
  };

  return (
    <>
     {menuItems.map((item, index) => {
      const isActive = activeLink === item.to || (item.subMenus && item.subMenus.some(subItem => subItem.to === activeLink))
      const combinedClassName = `
      ${isActive ? `active !text-blue-400` : ''}
      ${item.className || ''}
      `.trim();
 
      return (
        // 메뉴 Data에 서브메뉴가 있을 시 아코디언 컴포넌트로 출력
        item.subMenus && item.subMenus.length > 0 ? ( 
          <Accordion 
          key={index} 
          type="multiple" 
          value={openItems}
          onValueChange={handleAccordionChange}
          // collapsible 
          className="flex flex-col gap-1">
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger
                 className={`!justify-start gap-3 rounded-lg px-3 py-2 dark:text-white transition-all hover:text-blue-400 hover:bg-muted ${isActive ? 'active !text-blue-400 data-[state=open]:animate-accordion-down' : ''}`}
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
              <div className="pl-1 !sm:text-sm">
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
             className={`flex items-center gap-3 rounded-lg px-3 py-2 dark:text-white transition-all hover:text-blue-400 hover:bg-muted ${combinedClassName}` }
             >
            <item.Icon />
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
            <Link to="/" className="link-logo items-center">
              {/* 상단 브랜드 로고 --  Page Header -- */}
              <span className="bg-logo"></span>
            </Link>
          </div>
          <div className="menu-body flex-1">
            <nav className="grid items-start px-2 text-sm lg:px-4">
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