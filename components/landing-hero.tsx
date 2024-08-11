"use client"

import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import Typewriter from "typewriter-effect"
import { Button } from './ui/button'

const LandingHero = () => {

    const { isSignedIn } = useAuth();

    return (
        <div className='text-white font-bold py-36 text-center space-y-5'>
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>Amazing AI tool for</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-green-600">
                    <Typewriter
                        options={{
                            strings: [
                                "Students & creatives",
                                "Chatbot",
                                "Music creation",
                                "Videos from just your ideas"
                            ],
                            autoStart: true,
                            loop: true
                        }}
                    />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-600">
                Create amazing content leveraging the powers of machine learning and artificial intelligence
            </div>
            <div className="">
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                <Button variant="secondary" className='md:text-lg p-4 md:p-6 rounded-full font-semibold'>
                    Start Creating Content
                </Button>
                </Link>
            </div>
        </div>
    )
}

export default LandingHero
