// import  OpenAI  from 'openai'
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
    const userPrompt = requestBody.prompt;

    const instruction = "You are a code generator. You must answer only in markdown code snippet. Use code comments for explanations. Try to give explanations after the code where necessary";


    const prompt = `${instruction}\n\n${userPrompt}`

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // console.log(text)
    // const htmlContent = marked(text)
    console.log(text)

    return NextResponse.json({ text });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}


// export async function POST(request: Request) {
//   const { userId } = auth(); // Assuming user authentication

//   try {
//     const requestBody = await request.json();
//     const prompt = requestBody.prompt;

//     // Create a request for generating content using Google Generative AI
//     const result = await model.generate({
//       prompt: {
//         text: prompt,
//       },
//     });

//     // Extract the generated content
//     const generatedText = result.data.generations[0].text;

//     // Return the generated content as a JSON response
//     return NextResponse.json({ text: generatedText });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
//   }
// }

// async function run() {
//     // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = "Write a story about a magic backpack."

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     console.log(text);
// }

// run();


// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// })

// export async function POST(
//     req: Request
// ) {
//     try {
//         const { userId } = auth()
//         const body = await req.json()
//         const { messages } = body

//         if (!userId) {
//             return new NextResponse("Unauthorized", { status: 401 })
//         }

//         // if(!configuration.apiKey){
//         //     return new NextResponse("OpenAI api key not registered")
//         // }

//         if(!messages){
//             return new NextResponse("Messages are required")
//         }

//         const response = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages
//         })

//         return NextResponse.json(response.choices[0].message)

//     } catch (error) {
//         console.log("CONVERSATION ERROR", error)
//         return new NextResponse("Internal error", { status: 500 })
//     }
// }