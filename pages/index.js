import { signIn, useSession, signOut } from "next-auth/react";

export default function Home() {
  const {data: session} = useSession();
  console.log(session)
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
    <div className="bg-slate-500 flex items-center h-screen w-screen">
      <div className="w-full text-center">
        Logged in as {session.user.email}
      </div>
    </div>
  );
}
