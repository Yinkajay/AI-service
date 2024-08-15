// import { auth } from '@clerk/nextjs/server'
// import { NextResponse } from 'next/server'
// import Replicate from "replicate"

// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN_PAID
// })



// export async function POST(req: Request) {
//   try {
//     const { userId } = auth();
//     const body = await req.json();
//     const { prompt } = body;

//     if (!userId) return new NextResponse("UnAuthorized", { status: 401 });

//     if (!prompt) return new NextResponse("Prompt is Required", { status: 400 });


//     const input = {
//       prompt,
//       num_frames: 50
//     };

//     const output = await replicate.run("cjwbw/damo-text-to-video:1e205ea73084bd17a0a3b43396e49ba0d6bc2e754e9283b2df49fad2dcf95755", { input });

//     console.log(output)


//     return NextResponse.json(output);
//   } catch (error) {
//     console.error("[VIDEO_ERROR]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import Replicate from "replicate"

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN_PAID
})



export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) return new NextResponse("UnAuthorized", { status: 401 });

    if (!prompt) return new NextResponse("Prompt is Required", { status: 400 });


    const input = {
      prompt,
      video_length: 8
    };

    const output = await replicate.run("cjwbw/text2video-zero:e671ffe4e976c0ec813f15a9836ebcfd08857ac2669af6917e3c2549307f9fae", { input });

    console.log(output)


    return NextResponse.json(output);
  } catch (error) {
    console.error("[VIDEO_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}





