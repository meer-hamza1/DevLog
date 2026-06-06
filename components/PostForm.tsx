"use client"

import { useState } from "react"
import { createPost, deletePost, editPost } from "@/app/actions/posts"

interface Props {
  posts: { title: string; slug: string; content: string; createdAt: string }[]
}

export default function PostForm({ posts }: Props) {
  const [message, setMessage] = useState("")
  const [editingSlug, setEditingSlug] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    const result = await createPost(formData)
    if (result.error) setMessage(result.error)
    if (result.message) setMessage(result.message)
  }

  async function handleDelete(slug: string) {
    const result = await deletePost(slug)
    setMessage(result.message)
  }

  async function handleEdit(formData: FormData) {
    const result = await editPost(formData)
    if (result.error) setMessage(result.error)
    if (result.message) {
      setMessage(result.message)
      setEditingSlug(null)  // form band karo
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Your Posts ({posts.length})</h2>
      <div className="divide-y divide-gray-200 mb-12">
        {posts.map((post) => (
          <div key={post.slug} className="py-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-gray-400 text-xs mt-1">{new Date(post.createdAt).toDateString()}</p>
              </div>
              <div className="flex gap-3">
                <a href={`/blog/${post.slug}`} className="text-sm text-gray-500 hover:text-black">View</a>
                <button onClick={() => setEditingSlug(post.slug)} className="text-sm text-gray-500 hover:text-black">Edit</button>
                <button onClick={() => handleDelete(post.slug)} className="text-sm text-red-500 hover:text-red-700">Delete</button>
              </div>
            </div>

            {/* Edit form — sirf tab dikhao jab edit click karo */}
            {editingSlug === post.slug && (
              <form action={handleEdit} className="mt-4 flex flex-col gap-3 border p-4 rounded">
                <input type="hidden" name="slug" value={post.slug} />
                <input
                  name="title"
                  defaultValue={post.title}
                  className="w-full border-b border-gray-300 py-2 font-bold outline-none focus:border-black"
                />
                <textarea
                  name="content"
                  defaultValue={post.content}
                  className="w-full border-b border-gray-300 py-2 outline-none focus:border-black resize-none"
                  rows={5}
                />
                <div className="flex gap-3">
                  <button type="submit" className="bg-black text-white px-4 py-1 rounded-full text-sm">Save</button>
                  <button type="button" onClick={() => setEditingSlug(null)} className="text-sm text-gray-500">Cancel</button>
                </div>
              </form>
            )}
          </div>
        ))}
      </div>

      {/* New post form */}
      <div className="border-t border-gray-200 pt-10">
        <h2 className="text-xl font-bold mb-6">Write a New Post</h2>
        <form action={handleSubmit} className="flex flex-col gap-4">
          <input name="title" className="w-full border-b border-gray-300 py-2 text-xl font-bold outline-none placeholder-gray-300 focus:border-black transition-colors" placeholder="Title" />
          <input name="slug" className="w-full border-b border-gray-300 py-2 text-sm outline-none placeholder-gray-400 focus:border-black transition-colors" placeholder="slug (e.g. my-first-post)" />
          <textarea name="content" className="w-full border-b border-gray-300 py-2 text-base outline-none placeholder-gray-400 focus:border-black transition-colors resize-none" placeholder="Tell your story..." rows={8} />
          <button type="submit" className="self-start bg-black text-white px-6 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors">Publish</button>
        </form>
        {message && (
          <p className={`mt-4 text-sm ${message.includes("required") ? "text-red-500" : "text-green-600"}`}>{message}</p>
        )}
      </div>
    </div>
  )
}