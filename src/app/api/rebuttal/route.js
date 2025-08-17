import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { topic, side, depth } = await req.json();

    const prompt = `
You are debating the topic: "${topic}".
Provide a ${side} counterargument (Round ${depth}) in 2–3 paragraphs.
Also list 2–3 credible sources (with URLs).
Return your response in JSON:
{
  "body": ["paragraph1", "paragraph2", ...],
  "sources": ["url1", "url2"]
}`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful debate assistant." },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
    });

    const text = completion.choices[0].message.content;
    const data = JSON.parse(text);

    // (optional) Save history in localStorage/db here if needed
    return NextResponse.json(data);
  } catch (error) {
    console.error("Rebuttal API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch rebuttal" },
      { status: 500 }
    );
  }
}

// How it works
// Reads topic, side, depth from the request body.

// Prompts ChatGPT to return structured JSON with:

// body: array of rebuttal paragraphs

// sources: array of URLs

// Returns that JSON to your getRebuttal function.

// Your ArgumentThread now renders rebuttals → alternates Pro ↔ Con automatically.
