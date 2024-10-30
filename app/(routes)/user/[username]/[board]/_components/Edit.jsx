import { CheckCheck, ImageUp, MoreHorizontal, PlusIcon } from 'lucide-react'
import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import Pin_map from '@/app/_components/global_comps/pin_map'

const Edit = ({ board, type }) => {

    const [active, setActive] = React.useState(false)
    const [image, setImage] = React.useState('/landing.jpg')
    const [title, setTitle] = React.useState(board.title)
    const [description, setDescription] = React.useState(board.description)
    const [secret, setSecret] = React.useState(board.secret)
    const [isDialogOpen, setIsDialogOpen] = React.useState(false) //for select cover dialog

    const deleteBoard = async () => {
        // delete board
    }

    const updateBoard = async () => {
        // update board
    }

    return (
        <div>
            <Dialog onOpenChange={(isOpen) => !isOpen && setActive(false)}>
                <DialogTrigger><MoreHorizontal size={30} strokeWidth={2.5} className={`${active ? "bg-foreground text-background" : "bg-muted text-foreground"} rounded-full p-2`} /></DialogTrigger>
                <DialogContent>
                    <ScrollArea className={`${type == "section" ? 'auto' : 'h-[500px]'}`}>
                        <DialogHeader>
                            <DialogTitle><h2 className='text-center'>Edit your {type}</h2></DialogTitle>
                            <div className="flex flex-col gap-6 py-5 px-3">
                                <div className="flex flex-col gap-2 ">
                                    <Label htmlFor="title" className="text-left text-muted-foreground">
                                        Title
                                    </Label>
                                    <Input onChange={(e) => setTitle(e.target.value)} id="title" value={title} placeHolder="Add a title" className="shadow-none rounded-xl border-muted focus:outline-muted" />
                                </div>
                                {type == "board" && <div className="flex flex-col gap-6">
                                    <div>
                                        <h2 className='text-sm'>Board cover</h2>
                                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                            <DialogTrigger>
                                                <label
                                                    htmlFor="cover"
                                                    className={`${image ? 'rounded-3xl w-60 h-60 shadow-none cursor-pointer' : "rounded-3xl w-60 p-20 bg-muted border-2 shadow-none border-dotted flex justify-center items-center cursor-pointer"}`}
                                                >
                                                    {image ?
                                                        <div className="flex w-full h-full gap-2">
                                                            <Image src={image} height={200} width={200} className='object-cover rounded-xl' />
                                                        </div>
                                                        : <div className="flex gap-2">
                                                            <PlusIcon size={30} strokeWidth={2.75} />
                                                        </div>}
                                                </label>
                                            </DialogTrigger>
                                            <DialogContent className="w-[500px] h-3/4">
                                                <ScrollArea >
                                                    <h2>Change board cover</h2>
                                                    <div className='columns-3'>
                                                        {board.Pins.map((pin)=>(
                                                    <Image onClick={()=>{setImage(pin.image); setIsDialogOpen(false)}} src={pin.image} width={290} height={400} className='p-2 rounded-2xl'/>
                                                ))}
                                                    </div>
                                                
                                                </ScrollArea>
                                                
                                            </DialogContent>
                                        </Dialog>

                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="description" className="text-left text-muted-foreground">
                                            Description
                                        </Label>
                                        <Textarea onChange={(e) => setDescription(e.target.value)} id="description" value={description} placeHolder="Add a detailed description" className="shadow-none rounded-xl border-muted focus:outline-muted" />
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
                                    <div>
                                    </div></div>}
                                    <div>
                                        <h2 className='text-sm'>Action</h2>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <h2 className='text-lg font-semibold cursor-pointer mt-2'>Delete {type}</h2>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete your
                                                        {type}.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => deleteBoard()}>Continue</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                        <h2 className='text-md font-medium text-muted-foreground'>{type} will be permanently deleted</h2>
                                    </div>

                                

                            </div>
                        </DialogHeader>
                    </ScrollArea>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={!(title)} onClick={() => updateBoard()} type="submit" className="rounded-2xl mt-5">Done</Button>
                        </DialogClose>

                    </DialogFooter>
                </DialogContent>

            </Dialog>

        </div>
    )
}

export default Edit