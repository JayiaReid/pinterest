"use client"
import Pin from '@/app/(routes)/pins/_components/Pin'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUser } from '@clerk/nextjs'
import { Edit2, LoaderCircleIcon, MoreHorizontal, SlidersHorizontalIcon, Sparkles, SquareStack } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
  const [edit, setEdit] = React.useState(false)
  const [size, setSize] = React.useState(200)
 

  const section = { user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li", board: "photography", cover: '/a4.jpg', images: [{ url: '/a8.jpg' }, { url: '/a5.jpg' }], title: "Photography", image: "/board3.jpg", pins: 18 }
 const [name, setName] = React.useState(section.board)
  const pins = [
    { image: "/a0.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a1.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a2.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a3.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a4.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a5.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a6.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a7.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" }
  ]

  const { isLoaded } = useUser()

  if (!isLoaded) return <div className="flex items-center justify-center absolute h-screen bg-white w-screen top-0 left-0">
    <div className='loader'></div>
  </div>

  return (
    <div className='flex flex-col items-center mt-10 gap-5'>
      <div className='flex flex-col gap-2 items-center'>
        <h2 className="text-2xl font-semibold text-muted-foreground">{section.board}</h2>
        <div className='flex gap-2 items-center'>
          <h2 className="text-4xl font-semibold text-foreground">{section.title}</h2>
        {/* <DropdownMenu>
          <DropdownMenuTrigger ><MoreHorizontal size={30} strokeWidth={2.5} onClick={() => setEdit(!edit)} className={`${edit ? "bg-foreground text-background" : "bg-muted text-foreground"} rounded-full p-2`} /></DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-2xl p-2">
            <DropdownMenuLabel>
              <h2 className='text-xs font-light'>section options</h2>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-lg p-2">
            <h2 className='font-medium text-medium'>Edit Section</h2>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
        </div>
        

      </div>
      <div className="flex">
        <Button variant="muted" size={30} className=" text-sm text-foreground p-5 rounded-3xl shadow-none flex flex-col gap-1"><Sparkles className='bg-muted hover:bg-[#E2E2E2] duration-300 p-6 rounded-2xl' size={80} strokeWidth={2.5} /> <span>More Ideas</span></Button>
        <Button variant="muted" size={30} className=" text-sm text-foreground p-5 rounded-3xl shadow-none flex flex-col gap-1"><SquareStack className='bg-muted p-6 hover:bg-[#E2E2E2] duration-300 rounded-2xl' size={80} strokeWidth={2.5} /> <span>Organize</span></Button>
      </div>
      <div className='w-full p-5'>
        <div className='flex p-5 justify-between items-center'>
          <h2 className='font-semibold text-lg'>{section.pins} Pins</h2>
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
          {pins.map((pin, index) => (
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