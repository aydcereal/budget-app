import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
