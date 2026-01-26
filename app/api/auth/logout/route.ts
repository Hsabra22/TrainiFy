import {  NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
 const cookie=cookies();
 (await cookie).delete("auth_token");
 (await cookie).delete("refresh_token");
 return NextResponse.json({message:"Logout Successfully",success:true})
}
