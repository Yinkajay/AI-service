"use client"

import { Heading } from '@/components/heading'
import { Music, VideoIcon } from 'lucide-react'
import React, { useState } from 'react'
import * as z from "zod"
import { formSchema } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import axios from "axios"
import { Empty } from '@/components/empty'
import { Loader } from '@/components/loader'
import Image from 'next/image'

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

const VideoPage = () => {
    const router = useRouter()

    const [video, setVideo] = useState<string>()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        }
    });
    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {

            setVideo(undefined)
            // Send the request to your Next.js API route
            const response = await axios.post("/api/video", values);

            console.log(response)
            setVideo(response.data)
            // Reset the form
            // form.reset();
        } catch (error: any) {
            // Handle any errors that occur during the request
            console.log(error);
        } finally {
            // Refresh the router to reflect any changes
            router.refresh();
        }
    };

    return (
        <div>
            <Heading title='Video Generation' description='Make stunnning videos' icon={VideoIcon} iconColor='text-orange-7 00' bgColor='bg-orange-7 00/10' />
            <div className="px-4 lg:px-8">
                <div className="">
                    <Form {...form}>
                        <form className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid gap-2' onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField name="prompt" render={({ field }) => (
                                <FormItem className='col-span-12 lg:col-span-10'>
                                    <FormControl className='m-0 p-0'>
                                        <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                            disabled={isLoading}
                                            placeholder='Bird flying over a house'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )} />
                            <Button className='col-span-12 lg:col-span-12 w-full' disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className='space-y-4 mt-4'>
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {!video && !isLoading && (
                        <Empty label="No video created. " />
                    )}
                    {video && (
                        <video className='w-full aspect-video mt-8 rounded-lg border bg-black' controls>
                            <source src={video} />
                        </video>
                    )

                    }
                </div>
            </div>
        </div>
    )
}

export default VideoPage
