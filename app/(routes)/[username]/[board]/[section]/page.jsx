"use client"
import { useUser } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { SlidersHorizontalIcon } from 'lucide-react'
import Pin from '@/app/(routes)/pins/_components/Pin'


const page = () => {
    const [size, setSize] = React.useState(200)
  const searchParams = useSearchParams()
  const section = searchParams.get('section') ? JSON.parse(decodeURIComponent(searchParams.get('section'))) : null
  const board = searchParams.get('board') ? JSON.parse(decodeURIComponent(searchParams.get('board'))):null

  const { isLoaded } = useUser()

  if (!isLoaded) return <div className="flex items-center justify-center absolute h-screen bg-white w-screen top-0 left-0">
    <div className='loader'></div>
  </div>

  return (
    <div className='flex flex-col items-center mt-10 gap-5'>
        <div className='flex flex-col gap-2 items-center'>
        <h2 className="text-2xl font-semibold text-muted-foreground">{board?.title}</h2>
        <div className='flex gap-2 items-center'>
          <h2 className="text-4xl font-semibold text-foreground">{section.title}</h2>
        </div>
      </div>
      <div className='w-full p-5'>
        <div className='flex p-5 justify-between items-center'>
          <h2 className='font-semibold text-lg'>{section.pins?.length} Pins</h2>
          <DropdownMenu>
            <DropdownMenuTrigger>
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
        <div>

        </div>
        <div
          style={{ columnWidth: size ? `${size}px` : '250px' }}
          className={`${size ? "gap-2 p-2" : "gap-4 p-4"}`}>
          {section.pins?.map((pin, index) => (
            <div className="p-5">
              <Pin size={size} key={index} className="rounded-2xl" pin={pin} id={index} />
              {/* <h2>Info</h2> */}
            </div>

          ))}

        </div>
      </div>

    </div>
  )
}

export default page