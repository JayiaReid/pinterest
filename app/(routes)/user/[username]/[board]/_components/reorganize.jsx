
"use client"
import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import Pin from '@/app/(routes)/pins/_components/Pin'
import { SlidersHorizontal, SquareStack, Trash } from 'lucide-react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'

const ItemType = 'PIN'

// gosh darn freaking useless

const DraggablePin = ({ pin, index, movePin, setSelected }) => {
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

    const [select, setSelect] = useState(false)

    return (
        <div ref={(node) => ref(drop(node))}>
            {/* <SlidersHorizontal/> */}
            <Image onClick={() => {
                if (!select) {
                    setSelected((prev) => [...prev, pin])
                    // setLocalPins(prev => prev.filter(selectedPin => selectedPin !== pin))
                } else {
                    setSelected(prev => prev.filter(selectedPin => selectedPin !== pin))
                    // setLocalPins((prev) => [...prev, pin])
                }
                setSelect(!select);

            }} src={pin.image} width={250} height={400} className={`${select ? 'border-primary border-2' : ''} p-2 rounded-2xl cursor-pointer object-cover`} />
        </div>
    )
}

const Reorganize = ({ pins, setPins, onReorder, _id }) => {
    const [open, setOpen] = useState(false)
    const [localPins, setLocalPins] = useState(pins)
    const [selected, setSelected] = useState([])

    const onDelete = async () =>{
        const arr = localPins.filter(pin=>!selected.includes(pin))
        setPins(arr)
        setLocalPins(arr)
        onReorder(arr)
        setSelected([])
    }

    const movePin = (fromIndex, toIndex) => {
        const updatedPins = Array.from(localPins)
        const movedPin = updatedPins[fromIndex]
        updatedPins.splice(fromIndex, 1)
        updatedPins.splice(toIndex, 0, movedPin)
        setLocalPins(updatedPins)
        setPins(updatedPins)
        onReorder(updatedPins)
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
                <DialogTitle>Reorganize Pins (select or drag)</DialogTitle>
                <DndProvider backend={HTML5Backend}>
                    <ScrollArea className="">
                        <div className='columns-2'>
                            {localPins.map((pin, index) => (
                                <DraggablePin key={index} index={index} pin={pin} movePin={movePin} setSelected={setSelected}  />
                            ))}
                        </div>
                        
                    </ScrollArea>
                </DndProvider>
                <div className="flex justify-end mt-4">
                    {selected.length > 0 && <Button onClick={() => onDelete()} className="mr-2">Delete {selected.length} Pins</Button>}
                    <Button variant="outline" onClick={() => {setOpen(false); setSelected([])}} className="mr-2">Done</Button>
                    {/* <Button onClick={() => handleSave()}>Save Order</Button> */}
                </div>
                <DialogClose />
            </DialogContent>
        </Dialog>
    )
}

export default Reorganize
