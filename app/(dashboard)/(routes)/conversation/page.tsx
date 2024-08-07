"use client"

import { Heading } from '@/components/heading'
import { MessageSquare } from 'lucide-react'
import React from 'react'
import * as z from "zod"
import { formSchema } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'

const ConversationPage = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          prompt: "",
        }
      });

    const isLoading = form.formState.isSubmitting
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
        <div>
            <Heading title='Conversation' description='Advanced conversation model' icon={MessageSquare} iconColor='text-violet-500' bgColor='bg-violet-500/10' />
            <div className="px-4 lg:px-8">
                <div className="">
                    <Form {...form}>
                        <form className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid gap-2' onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField name="prompt" render={({ field }) => (
                                <FormItem className='col-span-12 lg:col-span-10'>
                                    <FormControl className='m-0 p-0'>
                                        <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                            disabled={isLoading}
                                            placeholder='Start a conversation'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )} />
                            <Button className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className='space-y-4 mt-4'>
                    Message Content
                </div>
            </div>
        </div>
    )
}

export default ConversationPage
