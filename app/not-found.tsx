export default function NotFound() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-32 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-gray-500 mb-8">This page doesn't exist.</p>
      <a href="/" className="text-sm underline hover:text-gray-600">
        ← Back to home
      </a>
    </main>
  )
}