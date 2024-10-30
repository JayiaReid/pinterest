
"use client"
import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import Pin from '@/app/(routes)/pins/_components/Pin'
import { SquareStack } from 'lucide-react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'

const ItemType = 'PIN'

const DraggablePin = ({ pin, index, movePin }) => {
    const [, ref] = useDrag({
        type: ItemType,
        item: { index },
    })

    const [, drop] = useDrop({
        accept: ItemType,
        hover(item) {
            if (item.index !== index) {
                movePin(item.index, index)
                item.index = index
            }
        },
    })

    return (
        <div ref={(node) => ref(drop(node))}>
            <Image src={pin.image} width={250} height={400} className='p-2 rounded-2xl object-cover'/>
        </div>
    )
}

const Reorganize = ({ pins, onReorder }) => {
    const [open, setOpen] = useState(false)
    const [localPins, setLocalPins] = useState(pins)

    const movePin = (fromIndex, toIndex) => {
        const updatedPins = Array.from(localPins)
        const movedPin = updatedPins[fromIndex]
        updatedPins.splice(fromIndex, 1)
        updatedPins.splice(toIndex, 0, movedPin)
        setLocalPins(updatedPins)
        console.log(updatedPins)
    }

    const handleSave = () => {
        onReorder(localPins)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="muted" size={30} className="text-sm text-foreground p-5 rounded-3xl flex flex-col gap-1">
                    <SquareStack className='bg-muted p-6 hover:bg-[#E2E2E2] duration-300 rounded-2xl' size={80} strokeWidth={2.5} />
                    <span>Organize</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[1500px] h-3/4">
                <DialogTitle>Reorganize Pins</DialogTitle>
                <DndProvider backend={HTML5Backend}>
                    <ScrollArea className="">
                        <div className='columns-2'>
                            {localPins.map((pin, index) => (
                            <DraggablePin key={index} index={index} pin={pin} movePin={movePin} />
                        ))}
                        </div>
                    </ScrollArea>
                </DndProvider>
                <div className="flex justify-end mt-4">
                    <Button variant="outline" onClick={() => setOpen(false)} className="mr-2">Cancel</Button>
                    <Button onClick={()=>handleSave()}>Save Order</Button>
                </div>
                <DialogClose />
            </DialogContent>
        </Dialog>
    )
}

export default Reorganize
