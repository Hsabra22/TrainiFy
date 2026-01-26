import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("refresh_token")?.value;
    if (!token) throw new Error("UNAUTHORIZED");

  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_REFRESH_KEY!)
  );
  const user_id= payload.id as string;
    return NextResponse.json( {user_id} );
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}
