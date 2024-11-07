"use client"
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { CheckCheck, Group, ImageUp, LucideUpload, PlusIcon, Upload } from 'lucide-react'
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

const Create = ({board, refreshData}) => {
    const [title, setTitle] = React.useState('')
    const [same, setSame] = React.useState(false)
    const [active, setActive] = React.useState(false)

    const addSection = async () => {

        const Info = {
            title, 
            board: board._id,
            user: board.user
        }

        try {
            const response = await fetch('/api/section', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Info),
            })

            console.log(response)
            if (response.ok) {
                console.log('added')
                refreshData()
                setActive(false)
                setTitle('')
                setSame(false)
            }else if(response.status == 400){
                setSame(true)
            }
        } catch (error) {
            console.error('Error checking or creating user:', error)
        }

    }
 

    return (
        <div>
            <Dialog open={active} onOpenChange={(isOpen) => !isOpen && setActive(false) }>
                <DialogTrigger onClick={() => setActive(true)}>
                <Button variant="muted" size={30} className=" text-sm text-foreground p-5 rounded-3xl shadow-none flex flex-col gap-1"><Group className='bg-muted hover:bg-[#E2E2E2] duration-300 p-6 rounded-2xl' size={80} strokeWidth={2.5} /> <span>Add Section</span></Button>
                </DialogTrigger>
                <DialogContent className="bg-background">
                    <DialogHeader>
                        <DialogTitle><h2>Create Section</h2></DialogTitle>
                    </DialogHeader>
                    <Separator className="my-[24px]" />
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2 ">
                            <Label htmlFor="title" className="text-md text-left text-muted-foreground">
                                Title
                            </Label>
                            <Input onChange={(e) => setTitle(e.target.value)} id="title" value={title} placeHolder={`Like "Places to Go" or "Recipes to Make" `} className="shadow-none rounded-xl border-muted text-md p-5 focus:outline-muted" />
                            {same && <h2 className='text-sm text-destructive text-right'>Section with title already exists</h2>}
                        </div>
                       
                    </div>
                    <DialogFooter>
                        <Button disabled={!(title)} onClick={() => addSection()} type="submit" className="rounded-2xl mt-5">Add Section</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default Create