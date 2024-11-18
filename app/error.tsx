'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-50 p-6 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-2xl font-semibold text-red-800 mb-4">Something went wrong!</h2>
        <p className="text-red-600 mb-6">
          {error.message || 'An unexpected error occurred. Please try again later.'}
        </p>
        <button
          onClick={reset}
          className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
