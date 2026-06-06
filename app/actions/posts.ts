"use server"

import clientPromise from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const content = formData.get("content") as string

  // Validation
  if (!title || !slug || !content) {
    return { error: "Saare fields required hain!" }
  }

  const client = await clientPromise
  const db = client.db("devlog")

  await db.collection("posts").insertOne({
    title,
    slug,
    content,
    createdAt: new Date().toISOString()
  })

  revalidatePath("/")        // homepage refresh
  revalidatePath("/admin")   // admin refresh

  return { message: "Post saved!" }
}

export async function deletePost(slug: string) {
  const client = await clientPromise
  const db = client.db("devlog")

  await db.collection("posts").deleteOne({ slug })

  revalidatePath("/")
  revalidatePath("/admin")

  return { message: "Post deleted!" }
}

export async function editPost(formData: FormData) {
  const slug = formData.get("slug") as string
  const title = formData.get("title") as string
  const content = formData.get("content") as string

  if (!title || !content) {
    return { error: "Saare fields required hain!" }
  }

  const client = await clientPromise
  const db = client.db("devlog")

  await db.collection("posts").findOneAndUpdate(
    { slug },
    { $set: { title, content } }
  )

  revalidatePath("/")
  revalidatePath("/admin")

  return { message: "Post updated!" }
}