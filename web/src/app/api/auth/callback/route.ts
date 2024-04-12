import { api } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const { sub } = getUser();

  const redirectTo = request.cookies.get("redirectTo")?.value;

  const registerResponse = await api.post("/register", {
    code,
  });

  const { token } = registerResponse.data;

  const redirectURL = redirectTo ?? new URL("/", request.url);

  const cookieExpiresInSeconds = 60 * 60 * 24 * 30;
  const setCookieHeader = `token=${token}; Path=/; max-age=${cookieExpiresInSeconds};\nsub=${sub}; Path=/; max-age=${cookieExpiresInSeconds};`;

  return NextResponse.redirect(redirectURL, {
    headers: {
      "Set-Cookie": setCookieHeader,
    },
  });
}
