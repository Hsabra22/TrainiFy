import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a professional fitness and nutrition coach. Respond in clean JSON only. Return Same response always same as the request instructors",
        },
        {
          role: "user",
          content: `User data: ${JSON.stringify(prompt, null, 2)}\n\nPlease generate the plan as JSON with name PlanType .`,
        },
      ],
    });

    return NextResponse.json({
      result: completion.choices[0].message.content
    });
  } catch (error: any) {
    console.error("Groq error:", error);
    return NextResponse.json(
      { error: "Error generating AI content" },
      { status: 500 }
    );
  }
}
