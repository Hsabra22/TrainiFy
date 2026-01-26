import { supabase } from "@/supabaseClient";
import { jwtVerify, SignJWT} from "jose";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError || !signInData.user) {
    return NextResponse.json({ error: signInError?.message }, { status: 401 });
  }

  const user_id = signInData.user.id;

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("role, fullName")
    .eq("user_id", user_id)
    .single();

  if (profileError || !profileData) {
    return NextResponse.json({ error: "User data not found" }, { status: 500 });
  }

  const payload = { id: user_id, email: signInData.user.email, role: profileData.role, fullName: profileData.fullName };

  let token: string, refreshToken: string;
  try {
    token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("20m")
      .sign(new TextEncoder().encode(process.env.JWT_KEY));

    refreshToken = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("360d")
      .sign(new TextEncoder().encode(process.env.JWT_REFRESH_KEY));
  } catch (jwtError) {
    return NextResponse.json({ error: "Token generation failed" }, { status: 500 });
  }

  const response = NextResponse.json({
    user: {
      user_id,
      email: signInData.user.email,
      role: profileData.role,
      fullName: profileData.fullName,
    },
  });

  response.cookies.set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + 20 * 60 * 1000),
  });

  response.cookies.set({
    name: "refresh_token",
    value: refreshToken,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + 360 * 24 * 60 * 60 * 1000),
  });

  return response;
}

export async function GET(req: NextRequest) {
  const token=req.cookies.get("refresh_token")?.value;
  if(!token){
    return NextResponse.json({error:"Auth missing"},{status:401});
  }
  const {payload}=await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_REFRESH_KEY!)
  );
  const user_id=payload.id as string;
  const {data,error}=await supabase
    .from("profiles")
    .select("role,username,email,image_url,fullName,phone")
    .eq("user_id", user_id)
    .single();
    if(error){
        return NextResponse.json({error:error.message},{status:500});
    }
    const email=payload.email as string;
  return NextResponse.json({data:data,email:email, message: "Signin route is active" }, { status: 200 });
}