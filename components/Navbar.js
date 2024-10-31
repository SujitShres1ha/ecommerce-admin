import Link from "next/link";
import { ShoppingBagIcon, LayoutDashboardIcon, StoreIcon, LayoutListIcon } from "lucide-react";
import { useRouter } from "next/router";

export default function Navbar(){
  const inactiveLink = ' flex gap-3 p-1 m-2';
  const activeLink = inactiveLink + ' bg-red-200 text-red-500 rounded-lg';
  const router = useRouter();
  const {pathname} = router;

  return(
    <aside className=" bg-slate-200 flex flex-col font-mono font-bold gap-2">
      <Link href = '/' className=" flex gap-2 p-0.5 mx-2 mt-4 mb-2 ">
        <StoreIcon/>
        <span>
          EcommerceAdmin
        </span>
      </Link>
      <nav className=" flex flex-col">
        <Link href = '/' className={ pathname === '/' ? activeLink : inactiveLink }>
          <LayoutDashboardIcon/>
          <span>
            Dashboard
          </span>
        </Link>
        <Link href = '/orders' className={ pathname.includes('/orders') ? activeLink : inactiveLink }>
          <ShoppingBagIcon/>
          <span>
            Orders
          </span>
        </Link>
        <Link href = '/products' className={ pathname.includes('/products') ? activeLink : inactiveLink }>
          <LayoutListIcon/>
          <span>
            Products
          </span>
        </Link>
      </nav>
    </aside>
  )
}