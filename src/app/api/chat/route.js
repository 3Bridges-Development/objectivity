import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });


export async function POST(request) {
  const body = await request.json();
  // console.log("Received messages:", JSON.stringify(messages, null, 2));
  console.log("body", body, body.messages)
  const prompt = body.messages;
  console.log("prompt", prompt)

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: prompt
    });

    const responseText = completion.choices[0].message.content;
    return new Response(JSON.stringify({ response: responseText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error from OpenAI:', error);
    return new Response(JSON.stringify({ error: 'Something went wrong.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}