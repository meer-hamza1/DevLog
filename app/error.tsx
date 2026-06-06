"use client"

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Something went wrong!</h1>
      <button
        onClick={reset}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Please try again
      </button>
    </main>
  )
}