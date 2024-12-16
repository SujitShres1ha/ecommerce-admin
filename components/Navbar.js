import Link from "next/link";
import { ShoppingBagIcon, LayoutDashboardIcon, StoreIcon, LayoutListIcon, ListIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

export default function Navbar({navOpen}){
  const inactiveLink = ' flex gap-3 p-1 m-2';
  const activeLink = inactiveLink + ' text-blue-500 outline-solid outline-white bg-white rounded-md';
  const router = useRouter();
  const {pathname} = router;

  return(
    <aside className={` bg-slate-200 flex flex-col font-mono font-bold gap-2
     default-text fixed w-full h-full ${navOpen ? 'left-0' : '-left-full'} md:static md:w-auto transition-all`}>
      <Link href = '/' className=" flex gap-2 p-0.5 mx-2 mt-4 mb-2 "> 
        <StoreIcon/>
        <span>
          EcommerceAdmin
        </span>
      </Link>
      <nav className=" flex flex-col ">
        <Link href = '/' className={ pathname === '/' ? activeLink : inactiveLink }>
          <LayoutDashboardIcon fill={ pathname === '/' ? "#3B82F6" : ""} fillOpacity={1} strokeWidth={1.5}/>
          <span>
            Dashboard
          </span>
        </Link>
        <Link href = '/categories' className={ pathname.includes('/categories') ? activeLink : inactiveLink }>
          <ListIcon fill={ pathname === '/categories' ? "#3B82F6" : ""} fillOpacity={1} strokeWidth={1.5}/>
          <span>
            Categories
          </span>
        </Link>
        <Link href = '/products' className={ pathname.includes('/products') ? activeLink : inactiveLink }>
          <LayoutListIcon fill={ pathname.includes('/products') ? "#3B82F6" : ""} fillOpacity={1} strokeWidth={1.5}/>
          <span>
            Products
          </span>
        </Link>
        <Link href = '/orders' className={ pathname.includes('/orders') ? activeLink : inactiveLink }>
          <ShoppingBagIcon fill={ pathname.includes('/orders') ? "#3B82F6" : ""} fillOpacity = {0.5} strokeWidth={1.5}/>
          <span>
            Orders
          </span>
        </Link>
        <button className={inactiveLink} onClick={() => {router.push('/'); signOut();}}>
          <LogOutIcon strokeWidth={2.5}/>
          <span>
            Logout
          </span>
        </button>
      </nav>
    </aside>
  )
}