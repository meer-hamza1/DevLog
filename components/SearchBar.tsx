"use client"

import { useState } from "react"

interface Post {
  title: string
  slug: string
  content: string
  createdAt: string
}

export default function SearchBar({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("")

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border-b border-gray-300 py-2 mb-8 outline-none text-lg placeholder-gray-300 focus:border-black transition-colors"
      />

      <div className="divide-y divide-gray-200">
        {filtered.length === 0 ? (
          <p className="text-gray-400 py-8 text-center">No posts found!</p>
        ) : (
          filtered.map((post) => (
            <div key={post.slug} className="py-8">
              <p className="text-xs text-gray-400 mb-2 uppercase tracking-widest">
                {new Date(post.createdAt).toDateString()}
              </p>
              <h2 className="text-2xl font-bold mb-3 hover:text-gray-600 transition-colors">
                <a href={`/blog/${post.slug}`}>{post.title}</a>
              </h2>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                {post.content}
              </p>
              <a href={`/blog/${post.slug}`} className="text-sm font-medium text-black hover:underline">
                Read more →
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  )
}