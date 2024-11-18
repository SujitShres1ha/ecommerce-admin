import Navbar from "@/components/Navbar";
import { signIn, useSession } from "next-auth/react";

export default function Layout({children}) {
  const {data: session} = useSession();
  
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
    <div className="bg-slate-500 min-h-screen w-screen flex gap-1">
      <Navbar/>
      <div className="w-full bg-slate-300 rounded-md mt-4">
        {children}
      </div>
    </div>
  );
}
