// import  OpenAI  from 'openai'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import Replicate from "replicate"

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
})





export async function POST(request: Request) {
  
  try {
    const { userId } = auth(); // Assuming user authentication
    const body = await request.json()
  
    const { prompt } = body
  
    if(!prompt){
      return new NextResponse("Prompt is required", {status:400})
    }


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