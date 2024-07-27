import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

// Middleware function
export function middleware(request: NextRequest) {
  const accessToken = cookies().get("accessToken")?.value;

  const publicRoutes = ["/signin", "/signup", "/"];
  const privateRoutes = ["/dashboard"];

  if (!accessToken && privateRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (accessToken && publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Middleware config
// export const config = {
//   matcher: ["/dashboard/:path*", "/signin", "/signup", "/"],
// };
