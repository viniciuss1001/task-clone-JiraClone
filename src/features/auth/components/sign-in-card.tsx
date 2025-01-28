"use client"
import {FcGoogle} from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa'

import { DottedSeparator } from "@/components/dotted-separator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export const SignInCard = () => {
    return (
        <Card className="w-full h-full p-2 md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center py-7">
                <CardTitle className="text-2xl">
                    Welcome back!
                </CardTitle>
            </CardHeader>
            <CardContent className="p-7 ">
                <form className="space-y-4">
                    <Input
                        required
                        type="email" value={""}
                        onChange={() => { }}
                        placeholder="Digite seu email."
                        disabled={false}
                    />
                    <Input
                        required
                        type="password" value={""}
                        onChange={() => { }}
                        placeholder="Digite sua senha."
                        disabled={false}
                        min={8} max={16}
                    />
                    <Button className="w-full" disabled={false} size={'lg'}>
                        Entrar
                    </Button>
                </form>
            </CardContent>
            <div className="mt-5">
                <DottedSeparator height='4px'/>
            </div>
            <CardContent>
                <Button 
                variant={'ghost'} size={'lg'} className="w-full"
                disabled={false}>
                    <FcGoogle className='mr-2 size-5'/>
                    Entre com o Google
                </Button>
                <Button 
                variant={'ghost'} size={'lg'} className="w-full"
                disabled={false}>
                    <FaGithub className='mr-2 size-5' />
                     Entre com o Github
                </Button>
            </CardContent>
        </Card>
    )
}