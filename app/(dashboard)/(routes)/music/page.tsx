"use client"

import { Heading } from '@/components/heading'
import { Music } from 'lucide-react'
import React, { useState } from 'react'
import * as z from "zod"
import { formSchema } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Empty } from '@/components/empty'
import { Loader } from '@/components/loader'
import axios from 'axios'

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

const MusicPage = () => {
    const router = useRouter()
    const [music, setMusic] = useState<string>()
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

            setMusic(undefined)
            // Send the request to your Next.js API route
            const response = await axios.post("/api/music", values);

            console.log(response)
            // Update the state with the new messages
            setMusic(response.data.output)
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
            <Heading title='Music Generation' description='Create beautiful audio' icon={Music} iconColor='text-emerald-500' bgColor='bg-emerald-500/10' />
            <div className="px-4 lg:px-8">
                <div className="">
                    <Form {...form}>
                        <form className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid gap-2' onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField name="prompt" render={({ field }) => (
                                <FormItem className='col-span-12 lg:col-span-10'>
                                    <FormControl className='m-0 p-0'>
                                        <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                            disabled={isLoading}
                                            placeholder='Play fur elise...'
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
                    {!music && !isLoading && (
                        <Empty label="No music yet. " />
                    )}
                    {music && (
                        <audio controls className='w-full mt-8'>
                            <source src={music} />
                        </audio>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MusicPage
