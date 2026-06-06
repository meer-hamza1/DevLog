import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Post } from "@/lib/models/post"
import SearchBar from "@/components/SearchBar"

export const dynamic = "force-dynamic"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const res = await fetch("http://localhost:3000/api/posts")
  const data = await res.json()

  return (
  <main className="max-w-3xl mx-auto px-6 py-12">
    {session && (
      <p className="text-sm text-gray-500 mb-8">
        Welcome back, {session.user?.name}! 👋
      </p>
    )}
    <h1 className="text-4xl font-bold mb-8 tracking-tight">Latest Posts</h1>
    <SearchBar posts={data.posts} />
    
  </main>
)
}