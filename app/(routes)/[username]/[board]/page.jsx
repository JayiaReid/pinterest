"use client"
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import Section from '../../user/[username]/[board]/[section]/_components/Section'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import Pin from '../../pins/_components/Pin'
import { SlidersHorizontalIcon } from 'lucide-react'

const page = () => {
  const [pins, setPins] = React.useState(0)
  const [size, setSize] = React.useState(200)
  const searchParams = useSearchParams()
  const board = searchParams.get('board') ? JSON.parse(decodeURIComponent(searchParams.get('board'))) : null
  const {username} = useParams()

  useEffect(() => {
    let numOfPins = board.pins.length

    board.sections.forEach(section => {
      if (section.pins.length > 0) {
        numOfPins += section.pins.length
      }
    })

    setPins(numOfPins)
  }, [board])

  return (
    <div className='flex flex-col items-center mt-10 gap-5'>
      <div>
        <h2 className="text-4xl font-semibold text-foreground">{board?.title}</h2>
      </div>
      <h2 className='text-muted-foreground text-sm'>{board.description}</h2>
      <div className='w-full p-5'>
        <div className='flex p-5 justify-between items-center'>
          <h2 className='font-semibold text-lg'>{pins} Pins</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="muted" className=" rounded-full h-[60px] w-[60px] font-bold"><SlidersHorizontalIcon size={30} strokeWidth={2.5} /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-2xl p-2">
              <DropdownMenuLabel>
                <h2 className='text-xs font-light'>View options</h2>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className={`rounded-lg p-2 ${size ? null : "bg-muted"}`} onClick={() => setSize(null)}>
                <h2 className='font-medium text-medium'>Default</h2>
              </DropdownMenuItem>
              <DropdownMenuItem className={`rounded-lg p-2 ${size ? "bg-muted" : null}`} onClick={() => setSize(200)}>
                <h2 className='font-medium text-medium'>Compact</h2>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
        <div
          className=" grid grid-cols-2 xs:grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {board.sections?.map((section, index) => (
            <div className="p-5">
              <Section section={section} username={username} board={board} key={index} other={true} className="rounded-2xl" />
            </div>

          ))}

        </div>
        {board.pins && <div
          style={{ columnWidth: size ? `${size}px` : '250px' }}
          className={`${size ? "gap-2 p-2" : "gap-4 p-4"}`}>

          {board.pins.map((pin) => (
            <div className="p-5">
              <Pin size={size} key={pin.id} className="rounded-2xl" pin={pin} id={pin.id} />
            </div>

          ))}

        </div>}
      </div>
    </div>
  )
}

export default page