"use client"
import Pin from '@/app/(routes)/pins/_components/Pin'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useUser } from '@clerk/nextjs'
import { Edit2, LoaderCircleIcon, MoreHorizontal, SlidersHorizontalIcon, Sparkles, SquareStack } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import Section from './[section]/_components/Section'
import Edit from './_components/Edit'
import Reorganize from './_components/reorganize'

const page = () => {
  const [edit, setEdit] = React.useState(false)
  const [size, setSize] = React.useState(200)

  const board = { id: 1, user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li", public: true, cover: '/a4.jpg', images: [{ url: '/a8.jpg' }, { url: '/a5.jpg' }], title: "Photography", image: "/board3.jpg", pins: 18, description: "testing", secret: true, Pins:[
    { id: 1, image: "/a0.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { id: 2, image: "/a1.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { id: 3, image: "/a2.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { id: 4, image: "/a3.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { id: 5, image: "/a4.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { id: 6, image: "/a5.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { id: 7, image: "/a6.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { id: 8, image: "/a7.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" }
  ] }

  const sections = [
    { user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li", board: "photography", images: [{ url: '/a7.jpg' }, { url: '/a2.jpg' }, { url: '/a4.jpg' }], title: "Travel Ideas", image: "/board1.jpg", pins: 25 },
    { user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li", board: "photography", images: [{ url: '/a7.jpg' }, { url: '/a2.jpg' }, { url: '/a4.jpg' }], title: "Art", image: "/board2.jpg", pins: 40 },
    { user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li", board: "photography", images: [{ url: '/a7.jpg' }, { url: '/a2.jpg' }, { url: '/a4.jpg' }], title: "Photography", image: "/board3.jpg", pins: 18 },
    // { user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li", board: "photography", images: [{ url: '/a7.jpg' }, { url: '/a2.jpg' }, { url: '/a4.jpg' }], title: "DIY Projects", image: "/board4.jpg", pins: 10 },
    // { user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li", board: "photography", images: [{ url: '/a7.jpg' }, { url: '/a2.jpg' }, { url: '/a4.jpg' }], title: "Travel Ideas", image: "/board1.jpg", pins: 25 },
    // { user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li", board: "photography", images: [{ url: '/a7.jpg' }, { url: '/a2.jpg' }, { url: '/a4.jpg' }], title: "Art", image: "/board2.jpg", pins: 40 },
    // { user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li", board: "photography", images: [{ url: '/a7.jpg' }, { url: '/a2.jpg' }, { url: '/a4.jpg' }], title: "Photography", image: "/board3.jpg", pins: 18 },
    // { user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li", board: "photography", images: [{ url: '/a7.jpg' }, { url: '/a2.jpg' }, { url: '/a4.jpg' }], title: "DIY Projects", image: "/board4.jpg", pins: 10 },

    // Add more boards as needed
  ]

  
  const handleReorder = (newPins) => {
    board.Pins = newPins
    console.log(newPins, board.Pins)
  }

  const { isLoaded } = useUser()
  const router = useRouter()


  if (!isLoaded) return <div className="flex items-center justify-center absolute h-screen bg-white w-screen top-0 left-0">
    <div className='loader'></div>
  </div>

  return (
    <div className='flex flex-col items-center mt-10 gap-5'>
      <div className='flex gap-2 items-center'>
        <h2 className="text-4xl font-semibold text-foreground">{board.title}</h2>
        
        <Edit board={board} type={"board"}/>
      </div>
      <div className="flex">
        <Button variant="muted" size={30} onClick={()=>router.push( `/user/${board.user}/${board.title}/more_ideas?board_id=${board.id}`)} className=" text-sm text-foreground p-5 rounded-3xl shadow-none flex flex-col gap-1"><Sparkles className='bg-muted hover:bg-[#E2E2E2] duration-300 p-6 rounded-2xl' size={80} strokeWidth={2.5} /> <span>More Ideas</span></Button>
        <Reorganize pins={board.Pins} onReorder={handleReorder} />
      </div>
      <div className='w-full p-5'>
        <div className='flex p-5 justify-between items-center'>
          <h2 className='font-semibold text-lg'>{board.pins} Pins</h2>
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
        <div
          // style={{ columnWidth: size ? `${size}px` : '250px' }}
          className=" grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {sections.map((section, index) => (
            <div className="p-5">
              <Section section={section} key={index} className="rounded-2xl" />
            </div>

          ))}

        </div>
        <div
          style={{ columnWidth: size ? `${size}px` : '250px' }}
          className={`${size ? "gap-2 p-2" : "gap-4 p-4"}`}>
          {board.Pins.map((pin) => (
            <div className="p-5">
              <Pin size={size} key={pin.id} className="rounded-2xl" pin={pin} id={pin.id} />
              {/* <h2>Info</h2> */}
            </div>

          ))}

        </div>
      </div>

    </div>
  )
}

export default page