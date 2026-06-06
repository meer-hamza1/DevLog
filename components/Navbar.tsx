import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function Navbar() {
  const session = await getServerSession(authOptions)

  return (
    <nav className="border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 bg-white z-10">
      <a href="/" className="text-2xl font-bold tracking-tight">DevLog</a>
      <div className="flex items-center gap-6">
        {session ? (
          <>
            <a href="/admin" className="text-sm text-gray-600 hover:text-black">Write</a>
            <a href="/api/auth/signout" className="text-sm text-gray-600 hover:text-black">Sign out</a>
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">
              {session.user?.name?.[0]}
            </div>
          </>
        ) : (
          <a href="/api/auth/signin" className="text-sm bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800">
            Sign in with GitHub
          </a>
        )}
      </div>
    </nav>
  )
}