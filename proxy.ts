import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 정적 파일, Next 내부 경로는 제외하고 “페이지 요청” 위주로만 Proxy 적용
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};

export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();

  const host = req.headers.get("host") ?? "";
  const hostname = host.split(":")[0]; // admin.localhost:3000 -> admin.localhost
  const subdomain = hostname.split(".")[0]; // admin.localhost -> admin

  // admin 서브도메인 => /admin으로 rewrite
  if (subdomain === "admin") {
    if (!url.pathname.startsWith("/admin")) {
      url.pathname = `/admin${url.pathname === "/" ? "" : url.pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  // apply 서브도메인 => /apply로 rewrite
  if (subdomain === "apply") {
    if (!url.pathname.startsWith("/apply")) {
      url.pathname = `/apply${url.pathname === "/" ? "" : url.pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  // 그 외(루트 도메인 등) => 그대로
  return NextResponse.next();
}
