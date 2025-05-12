export default function AuthError() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Authentication Error</h1>
        <p className="text-gray-600">Please try signing in again</p>
      </div>
    </div>
  )
}