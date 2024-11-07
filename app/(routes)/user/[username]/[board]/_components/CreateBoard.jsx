"use client"
import React, { useEffect } from 'react'
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
    const { user, isLoaded } = useUser()
    const [title, setTitle] = React.useState('')
    const [secret, setSecret] = React.useState(false)
    const [active, setActive] = React.useState(false)
    const [username, setUsername] = React.useState('')
    const [user_id, setUser_id] = React.useState('')
    const [same, setSame] = React.useState(false)

    // get username 
    const fetchUserProfile = async () => {
        if (user) {
            const email = user.emailAddresses[0].emailAddress
            try {
                const response = await fetch(`/api/user?email=${email}`)
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const res = await response.json()
                // console.log(res.data)
                if (res.success) {
                    setUsername(res.data.username)
                    setUser_id(res.data._id)
                }
            } catch (error) {

            }
        }
    }

    useEffect(() => {
        if (isLoaded) {
            fetchUserProfile()
        }
    }, [user, isLoaded])


    const addBoard = async () => {

        const Info = {
            title, 
            private: secret,
            user: user_id
        }

        try {
            const response = await fetch('/api/board', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Info),
            })

            // console.log(response)
            
            if (response.ok) {
                router.push(`/user/${username}/${title}`)
                setActive(false)
                setSame(false)
                setTitle('')
            }else if(response.status == 400){
                setSame(true)
            }
        } catch (error) {
            console.error('Error checking or creating user:', error)
        }

    }

    // check if user already has board by that name 

    return (
        <div>
            <Dialog open={active} onOpenChange={(isOpen) => !isOpen && setActive(false) }>
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
                            {same && <h2 className='text-sm text-destructive text-right'>Board with title already exists</h2>}
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="secret" className="rounded-lg" disabled={!(title)} checked={secret} onCheckedChange={() => setSecret(!secret)} />
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