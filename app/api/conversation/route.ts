import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { marked } from 'marked'


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })


export async function POST(request: Request) {
  const { userId } = auth(); // Assuming user authentication

  try {
    const requestBody = await request.json();
    const prompt = requestBody.prompt;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text)
    const htmlContent = marked(text)
    console.log(htmlContent)

    return NextResponse.json({ htmlContent });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
