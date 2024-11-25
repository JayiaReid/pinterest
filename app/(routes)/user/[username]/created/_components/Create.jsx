"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { CheckCheck, ImageUp, PlusIcon } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from '@/hooks/use-toast'

const Create = ({ _id, refresh, state, username, pretitle, prelink, predesc, prekeywords, preimage }) => {
    const router = useRouter()
    const { user } = useUser()
    const [title, setTitle] = React.useState(pretitle || '')
    const [description, setDescription] = React.useState(predesc || '')
    const [link, setLink] = React.useState(prelink || '')
    const [keywords, setKeywords] = React.useState(prekeywords || [])
    const [files, setFiles] = React.useState(preimage || null)
    // const [blobUrl, setBlobUrl] = React.useState(null)
    const [active, setActive] = React.useState(false)

    // Save pin to db
    const editPin = async () => {

        if (user && title && _id) {
            
            const pinData = {

                _id,
                title,
                description,
                keywords,
                link,
            }
            try {
                const response = await fetch('/api/pin', {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(pinData),
                })

                // console.log(response)
                if (response.ok) {
                    await refresh()
                    setActive(false)
                    toast({
                        title: "Pin updated successfully",
                        description: "success!"
                    })
                }
            } catch (error) {
                console.error('Error:', error)
            }
        }else{
            toast({
                title: "Error",
                description: "missing required fields"
            })
        }
    }

    const deletePin = async ()=>{
        if(_id){
            try {
                const response = await fetch('/api/pin', {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({_id}),
                })
                if (response.ok) {
                    await refresh()
                    setActive(false)
                    toast({
                        title: "Pin deleted successfully",
                        description: "success!"
                    })
                }

            } catch (error) {
                console.error('Error:', error)
            }
        }
    }

    const addPin = async () => {

        if (user) {
            const response = await fetch(`/api/upload?filename=${files.name}`, {
                method: 'POST',
                body: files,
            })
            const result = await response.json()

            const pinData = {

                email: user?.emailAddresses[0].emailAddress,
                image: result.url,
                title,
                description,
                keywords,
                link,
            }

            try {
                const response = await fetch('/api/pin', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(pinData),
                })

                // console.log(response)
                if (response.ok) {
                    // console.log('success')
                    router.push(`/user/${username}/created`)
                    setActive(false)
                    toast({
                        title: "Pin created successfully",
                        description: `${title} can now be viewed by others on your profile`
                    })
                }
            } catch (error) {
                console.error('Error:', error)
            }
        } else {
            console.log('no user')
        }

    }

    return (
        <div className={`${state ? "fixed bottom-0 right-0 m-10" : null}`}>
            <Dialog onOpenChange={(isOpen) => !isOpen && setActive(false)}>
                <DialogTrigger onClick={() => setActive(true)}>
                    {state ? (
                        <Button
                            variant="muted"
                            className="shadow-lg border bg-white rounded-full h-[60px] w-[60px] font-bold"
                        >
                            <PlusIcon size={60} />
                        </Button>
                    ) : preimage ? (
                        <Image className="rounded-2xl relative" src={preimage} width={290} height={400} />
                    ) : (
                        <h2
                            className={`${active ? "border-b-2 rounded-none border-foreground" : ""
                                } text-foreground text-lg p-3 font-bold hover:bg-muted rounded-full flex gap-1 items-center`}
                        >
                            Create
                        </h2>
                    )}
                </DialogTrigger>

                <DialogContent className="bg-background">
                    <ScrollArea className="h-[500px]">
                        <DialogHeader>
                            <DialogTitle><h2>Create Pin</h2></DialogTitle>
                            <DialogDescription>
                                Upload an image or video. We recommend using high-quality .jpg files less than 20 MB or .mp4 files less than 200 MB
                            </DialogDescription>
                        </DialogHeader>
                        <Separator className="my-[24px]" />
                        <div className="flex flex-col gap-6">
                            {preimage ? <Image className="rounded-2xl relative" src={preimage} width={290} height={400} /> : <div>
                                <input
                                    type="file"
                                    id="fileInput"
                                    multiple
                                    onChange={(e) => setFiles(e.target.files[0])}
                                    className="rounded-3xl p-20 hidden bg-muted border-2 shadow-none border-dotted"
                                />
                                <label
                                    htmlFor="fileInput"
                                    className="rounded-3xl p-20 bg-muted border-2 shadow-none border-dotted flex justify-center items-center cursor-pointer"
                                >
                                    {files ? (
                                        <div className="flex gap-2">
                                            <CheckCheck />
                                            <span className="ml-2">Image Uploaded</span>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <ImageUp />
                                            <span className="ml-2">Upload a file</span>
                                        </div>
                                    )}
                                </label>
                            </div>}
                            <Separator />
                            <div className="flex flex-col gap-2 ">
                                <Label htmlFor="title" className="text-left text-muted-foreground">
                                    Title
                                </Label>
                                <Input
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    disabled={!files}
                                    id="title"
                                    value={title}
                                    placeholder="Add a title"
                                    className="shadow-none rounded-xl border-muted focus:outline-muted"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="description" className="text-left text-muted-foreground">
                                    Description
                                </Label>
                                <Textarea
                                    onChange={(e) => setDescription(e.target.value)}
                                    disabled={!files}
                                    id="description"
                                    value={description}
                                    placeholder="Add a detailed description"
                                    className="shadow-none rounded-xl border-muted focus:outline-muted"
                                />
                            </div>
                            <div className="flex flex-col gap-2 ">
                                <Label htmlFor="link" className="text-left text-muted-foreground">
                                    Link
                                </Label>
                                <Input
                                    onChange={(e) => setLink(e.target.value)}
                                    disabled={!files}
                                    id="link"
                                    value={link}
                                    placeholder="Add a link"
                                    className="rounded-xl border-muted shadow-none focus:outline-muted"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="keywords" className="text-left text-muted-foreground">
                                    Keyword(s)
                                </Label>
                                <Input
                                    disabled={!files}
                                    className="shadow-none rounded-xl border-muted focus:outline-muted"
                                    type="text"
                                    placeholder="Type a keyword and press Enter"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && e.target.value) {
                                            setKeywords((prev) => [...prev, e.target.value.trim()]);
                                            e.target.value = "";
                                            e.preventDefault();
                                        }
                                    }}
                                />
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {keywords.map((keyword, index) => (
                                        <span key={index} className="bg-muted text-muted-foreground px-3 py-1 rounded-full">
                                            {keyword}
                                            <Button
                                                onClick={() => setKeywords((prev) => prev.filter((kw) => kw !== keyword))}
                                                className="ml-2 text-white h-[5px] w-[2px]"
                                            >
                                                &times;
                                            </Button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                        <DialogFooter className='mt-5'>
                            <DialogClose>
                            {_id &&<Button
                                    size={30}
                                    disabled={!title || !files}
                                    variant="muted"
                                    onClick={() => deletePin()}
                                    type="submit"
                                    className="bg-none border-2 border-muted text-foreground mr-2 text-lg px-4 py-2 rounded-3xl shadow-none"
                                >
                                    Delete pin
                                </Button>}
                                {preimage?<Button
                                    size={30}
                                    disabled={!title || !files}
                                    onClick={() => editPin()}
                                    type="submit"
                                    className="bg-primary self-end text-white text-lg px-4 py-2 rounded-3xl shadow-none"
                                >
                                    Edit pin
                                </Button> :<Button
                                    size={30}
                                    disabled={!title || !files}
                                    onClick={() => addPin()}
                                    type="submit"
                                    className="bg-primary self-end text-white text-lg px-4 py-2 rounded-3xl shadow-none"
                                >
                                    Add pin
                                </Button>}
                                
                            </DialogClose>
                        </DialogFooter>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Create
