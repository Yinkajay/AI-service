"use client"

import { Heading } from '@/components/heading'
import { Code, User } from 'lucide-react'
import React, { useState } from 'react'
import * as z from "zod"
import { formSchema } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'
import axios from "axios"
import { Empty } from '@/components/empty'
import { Loader } from '@/components/loader'
import { cn } from '@/lib/utils'
import { UserAvatar } from '@/components/user-avatar'
import { BotAvatar } from '@/components/bot-avatar'
import ReactMarkdown from 'react-markdown'

// import { UserAvatar } from "@/components/user-avatar";
// import { BotAvatar } from "@/components/bot-avatar";

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

const ConversationPage = () => {
    const router = useRouter()

    const [messages, setMessages] = useState<Message[]>([])
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
            // Prepare the prompt for the API call
            const prompt = values.prompt;

            // Send the request to your Next.js API route
            const response = await axios.post("/api/code", { prompt });
            console.log(response)
            // Extract the generated text from the response
            const generatedText = response.data.text;

            console.log(response.data.text)
            // Create new message objects for the user input and the AI's response
            const userMessage: Message = {
                role: "user",
                content: prompt,
            };
            const aiMessage: Message = {
                role: "assistant",
                content: generatedText,
            };

            // Update the state with the new messages
            setMessages((current) => [...current, userMessage, aiMessage]);

            // Reset the form
            form.reset();
        } catch (error: any) {
            // Handle any errors that occur during the request
            console.log(error);
        } finally {
            // Refresh the router to reflect any changes
            router.refresh();
        }
    };

    const copyToClipboard = (content: string) => {
        navigator.clipboard.writeText(content);
      };

    // const onSubmit = async (values: z.infer<typeof formSchema>) => {
    //     console.log(values)
    //     try {
    //         const userMessage = {
    //             role: "user",
    //             content: values.prompt
    //         }
    //         const newMessages = [...messages, userMessage]

    //         const response = await axios.post("/api/conversation", { messages: newMessages })

    //         setMessages((current) => [...current, userMessage, response.data])

    //         form.reset()
    //     } catch (error: any) {
    //         // TODO: Open Pro Model
    //         console.log(error)
    //     } finally {
    //         router.refresh()
    //     }
    // }

    return (
        <div>
            <Heading title='Code generation' description='Get code support' icon={Code} iconColor='text-green-500' bgColor='bg-green-500/10' />
            <div className="px-4 lg:px-8">
                <div className="">
                    <Form {...form}>
                        <form className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid gap-2' onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField name="prompt" render={({ field }) => (
                                <FormItem className='col-span-12 lg:col-span-10'>
                                    <FormControl className='m-0 p-0'>
                                        <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                            disabled={isLoading}
                                            placeholder='Form component using Vue'
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
                    {messages.length === 0 && !isLoading && (
                        <Empty label="No conversation started. " />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message, index) => (
                            <div className={cn("p-8  w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white border" : "bg-muted")} key={index}>
                                <strong className=''>{message.role === 'user' ? <UserAvatar /> : 'AI:'}</strong>

                                {/* <span className='text-sm' dangerouslySetInnerHTML={{ __html: message.content }} /> */}
                                <ReactMarkdown components={
                                    {
                                        pre: ({ node, ...props }) => (
                                            <div className='overflow-auto w-full my-2 bg-black text-white p-2 rounded-lg'>
                                                <pre {...props} />
                                            </div>
                                        ),
                                        code: ({ node, ...props }) => (
                                            <code className='bg-black/10 rounded-lg p-1' {...props} />
                                        )
                                    }} className='text-sm overflow-hidden leading-7'>
                                    {message.content}
                                </ReactMarkdown>
                                {message.role === 'assistant' && (
                                    <Button
                                        className="ml-2"
                                        onClick={() => copyToClipboard(message.content)}
                                    >
                                        Copy
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ConversationPage
