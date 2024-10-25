"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { CheckCheck, ImageUp, LucideUpload, PlusIcon, Upload } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Checkbox } from '@/components/ui/checkbox'

const Create = () => {
    const router = useRouter()
    const { user } = useUser()
    const [title, setTitle] = React.useState('')
    const [secret, setSecret] = React.useState(false)
    const [active, setActive] = React.useState(false)


    // get boards from db

    // save pin to db
    const addBoard = async () => {
        console.log(title, secret)
        router.push(`/user/${user.id}/${title}`)
        setActive(false)
    }

    return (
        <div>
            <Dialog onOpenChange={(isOpen) => !isOpen && setActive(false)}>
                <DialogTrigger onClick={() => setActive(true)}>
                    <Button variant="muted" className=" rounded-full h-[60px] w-[60px] font-bold"><PlusIcon size={30} strokeWidth={2.5} /></Button>
                </DialogTrigger>
                <DialogContent className="bg-background">
                    <DialogHeader>
                        <DialogTitle><h2>Create Board</h2></DialogTitle>
                    </DialogHeader>
                    <Separator className="my-[24px]" />
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2 ">
                            <Label htmlFor="title" className="text-md text-left text-muted-foreground">
                                Title
                            </Label>
                            <Input onChange={(e) => setTitle(e.target.value)} id="title" value={title} placeHolder={`Like "Places to Go" or "Recipes to Make" `} className="shadow-none rounded-xl border-muted text-md p-5 focus:outline-muted" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="secret" className="rounded-lg" disabled={!(title)} checked={secret} onCheckedChange={()=>setSecret(!secret)}/>
                            <label
                                htmlFor="secret"
                                className="flex flex-col text-sm font-medium"
                            >
                                <h2 className='font-semibold'>Keep this board secret</h2>
                                <h2 className='text-muted-foreground'>So only you can view it.</h2>
                            </label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button disabled={!(title)} onClick={() => addBoard()} type="submit" className="rounded-2xl mt-5">Add Board</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default Create