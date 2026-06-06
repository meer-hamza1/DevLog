import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/db"
import PostForm from "@/components/PostForm"


export const dynamic = "force-dynamic"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  const client = await clientPromise
  const db = client.db("devlog")
  const posts = await db.collection("posts").find({}).toArray()

  const serializedPosts = posts.map((post) => ({
    title: post.title,
    slug: post.slug,
    createdAt: post.createdAt,
    content: post.content,
  }))

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold">
          {session?.user?.name?.[0]}
        </div>
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500 text-sm">{session?.user?.name}</p>
        </div>
      </div>
      <PostForm posts={serializedPosts} />
     
    </main>
  )
}