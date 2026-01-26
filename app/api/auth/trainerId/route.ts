import { supabase } from "@/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { fullName } = await req.json();

    if (!fullName) {
      return NextResponse.json(
        { error: "Full name is required" },
        { status: 400 }
      );
    }

    const { data: trainer, error } = await supabase
      .from("profiles")
      .select("user_id")
      .eq("fullName", fullName)
      .single();

    if (error || !trainer) {
      return NextResponse.json(
        { error: "Trainer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user_id: trainer.user_id });
  } catch (err) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}
