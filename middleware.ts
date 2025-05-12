import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "./auth"

export async function middleware(request: NextRequest) {
  const session = await auth()
  

  const protectedPaths = [
    '/segment',
    '/campaign',
  ]


  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath && !session) {
    // Redirect to sign-in page if trying to access protected route without session
    const redirectUrl = new URL('/auth/signin', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/segment/:path*',
    '/campaign/:path*',
  ]
}