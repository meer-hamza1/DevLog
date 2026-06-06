//ssg + dynamic routes
//ssg-> pages pehle se bane hote hain, request pe nahi bante.
import clientPromise from "@/lib/db"
import { notFound } from "next/navigation"

export const dynamicParams = true
export const revalidate = 60

export async function generateStaticParams() {
  const client = await clientPromise
  const db = client.db("devlog")
  const posts = await db.collection("posts").find({}).toArray()
  return posts.map((post) => ({ slug: post.slug }))
}

async function getPost(slug: string) {
  const client = await clientPromise
  const db = client.db("devlog")
  return db.collection("posts").findOne({ slug })
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">
        {new Date(post.createdAt).toDateString()}
      </p>
      <h1 className="text-4xl font-bold mb-6 leading-tight">{post.title}</h1>
      <div className="border-t border-gray-200 pt-8">
        <p className="text-lg leading-relaxed text-gray-800">{post.content}</p>
      </div>
    </main>
  )
}

