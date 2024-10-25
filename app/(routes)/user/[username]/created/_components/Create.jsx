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

const Create = ({state}) => {
    const router = useRouter()
    const { user } = useUser()
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [link, setLink] = React.useState('')
    const [board, setBoard] = React.useState('')
    const [tags, setTags] = React.useState([])
    const [files, setFile] = React.useState(null)
    const [active, setActive]=React.useState(false)

    const [boards, setBoards] = React.useState([
        { id: 1, name: "Art" },
        { id: 2, name: "Aesthetic Pics" },
        { id: 3, name: "Music" },
    ])

    // get boards from db

    // save pin to db
    const addPin = async () => {
        console.log(title, description, link, board, files)
        router.push(`/user/${user.id}/created`)
        setActive(false)
    }

    return (
        <div className={`${state? "fixed bottom-0 right-0 m-10" : null}`}>
            <Dialog onOpenChange={(isOpen) => !isOpen && setActive(false)}>
                <DialogTrigger onClick={()=>setActive(true)}>
                    {state?<Button variant="muted" className="shadow-lg border bg-white rounded-full h-[60px] w-[60px] font-bold"><PlusIcon size={60} /></Button> : <h2 className={`${active? "border-b-2 rounded-none border-foreground" : ""} text-foreground text-lg p-3 font-bold hover:bg-muted rounded-full flex gap-1 items-center`}>Create</h2>}
                </DialogTrigger>
                <DialogContent className="bg-background">
                    <ScrollArea className="h-[500px]">
                    <DialogHeader>
                        <DialogTitle><h2>Create Pin</h2></DialogTitle>
                        <DialogDescription>
                            Upload an image or video. We recommend using high quality .jpg files less than 20 MB or .mp4 files less than 200 MB
                        </DialogDescription>
                    </DialogHeader>
                    <Separator className="my-[24px]" />
                    <div className="flex flex-col gap-6">
                        <div>
                            <Input type="file" id="fileInput" multiple onChange={(e) => setFile(e.target.files)} className="rounded-3xl p-20 hidden bg-muted border-2 shadow-none border-dotted" />
                            <label
                                htmlFor="fileInput"
                                className="rounded-3xl p-20 bg-muted border-2 shadow-none border-dotted flex justify-center items-center cursor-pointer"
                            >
                                {files ? 
                                    <div className="flex gap-2">
                                    <CheckCheck />
                                    <span className="ml-2">Image Uploaded</span>
                                </div>
                                : <div className="flex gap-2">
                                    <ImageUp />
                                    <span className="ml-2">Upload a file</span>
                                </div>}
                            </label>
                        </div>
                        <Separator/>
                        <div className="flex flex-col gap-2 ">
                            <Label htmlFor="title" className="text-left text-muted-foreground">
                                Title
                            </Label>
                            <Input onChange={(e) => setTitle(e.target.value)} disabled={!(files)} id="title" value={title} placeHolder="Add a title" className="shadow-none rounded-xl border-muted focus:outline-muted" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="description" className="text-left text-muted-foreground">
                                Description
                            </Label>
                            <Textarea onChange={(e) => setDescription(e.target.value)} disabled={!(files)} id="description" value={description} placeHolder="Add a detailed description" className="shadow-none rounded-xl border-muted focus:outline-muted" />
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <Label htmlFor="link" className="text-left text-muted-foreground">
                                Link
                            </Label>
                            <Input onChange={(e) => setLink(e.target.value)} disabled={!(files)} id="link" value={link} placeHolder="Add a link" className="rounded-xl border-muted shadow-none focus:outline-muted" />
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <Label htmlFor="link" className="text-left text-muted-foreground">
                                Board
                            </Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Input disabled={!(files)} className="shadow-none rounded-xl border-muted focus:outline-muted" type="text" readonly value={board} placeHolder="Choose a board" />
                                </DropdownMenuTrigger>
                                {files && <DropdownMenuContent className="">
                                    <DropdownMenuLabel>Choose a board to upload to (optional)</DropdownMenuLabel>
                                    <Separator />
                                    <DropdownMenuRadioGroup value={board} onValueChange={setBoard}>
                                        {boards.map((board, index) => (
                                            <DropdownMenuRadioItem key={index} value={board.id}>{board.name}</DropdownMenuRadioItem>
                                        ))}
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>}
                            </DropdownMenu>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button disabled={!(title || description || link || files )} onClick={() => addPin()} type="submit" className="rounded-2xl mt-5">Add pin</Button>
                    </DialogFooter>
                    </ScrollArea>
                    

                </DialogContent>
            </Dialog>

        </div>
    )
}

export default Create