import Navbar from "@/components/Navbar";
import { AlignJustifyIcon, StoreIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

export default function Layout({children}) {
  const {data: session} = useSession();
  const [navOpen, setNavOpen] = useState(false);
  
  if (!session){
    return (
      <div className="bg-slate-500 flex items-center h-screen w-screen">
        <div className="w-full text-center">
          <button onClick = {() => signIn('google')} className="bg-white p-2 rounded-lg font-bold">Sign up</button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-slate-500 h-screen flex">
      <Navbar navOpen={navOpen}/>
      <div className="w-full bg-slate-300">
        <div className="md:hidden flex p-3">
          <button onClick={() => setNavOpen(prev => !prev)}>
          <AlignJustifyIcon/>
          </button>
          {/* Logo */}
          <span className="flex grow justify-center text-gray-700 text-lg font-semibold gap-2">
            <StoreIcon/>
            EcommerceAdmin
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
