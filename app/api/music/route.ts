// import { auth } from '@clerk/nextjs/server'
// import { NextResponse } from 'next/server'
// import Replicate from "replicate"

// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN_PAID
// })



// export async function POST(request: Request) {

//   try {
//     const { userId } = auth(); // Assuming user authentication
//     const body = await request.json()

//     const { prompt } = body
//     console.log(prompt)
//     // const input = {
//     //   prompt_b: prompt
//     // }
//     const input = {
//       alpha: 0,
//       prompt_a: prompt,
//       denoising: 1,
//       seed_image_id: "vibes",
//       num_inference_steps: 100
//     }

//     if (!prompt) {
//       return new NextResponse("Prompt is required", { status: 400 })
//     }

//     const output = await replicate.run("riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05", { input });


//     return NextResponse.json({ output });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
//   }
// }


import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import Replicate from "replicate"

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN_PAID
})



export async function POST(request: Request) {

  try {
    const { userId } = auth(); // Assuming user authentication
    const body = await request.json()

    const { prompt } = body
    console.log(prompt)
    // const input = {
    //   prompt_b: prompt
    // }
    const input = {
      prompt: prompt,
      model_version: "stereo-large",
      output_format: "mp3",
      normalization_strategy: "peak"
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 })
    }

    const output = await replicate.run("meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb", { input });


    return NextResponse.json({ output });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}


