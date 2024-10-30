"use client"
import React from 'react'
import Profile_section from '../../_components/profile_section'
import Nopins from '../../_components/no_pin'
import { useUser } from '@clerk/nextjs'
import { Check, LoaderCircleIcon, SlidersHorizontalIcon } from 'lucide-react'
import Board from '../[board]/_components/Board'
import Create from '../[board]/_components/CreateBoard'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const page = () => {
  const [active, setActive]=React.useState(false)
  const [sorted, setSorted]=React.useState(false)

  const boards = [
    { user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li", public: false, cover: '/a4.jpg', images: [{ url: '/a8.jpg' }, { url: '/a5.jpg' }], title: "Travel Ideas", image: "/board1.jpg", pins: 25 },
    { user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li", public: false, cover: '/a4.jpg', images: [{ url: '/a8.jpg' }, { url: '/a5.jpg' }], title: "Art", image: "/board2.jpg", pins: 40 },
    { user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li", public: true, cover: '/a4.jpg', images: [{ url: '/a8.jpg' }, { url: '/a5.jpg' }], title: "Photography", image: "/board3.jpg", pins: 18 },
    { user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li", public: true, cover: '/a4.jpg', images: [{ url: '/a8.jpg' }, { url: '/a5.jpg' }], title: "DIY Projects", image: "/board4.jpg", pins: 10 },
    { user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li", public: false, cover: '/a4.jpg', images: [{ url: '/a8.jpg' }, { url: '/a5.jpg' }], title: "Travel Ideas", image: "/board1.jpg", pins: 25 },
    { user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li", public: false, cover: '/a4.jpg', images: [{ url: '/a8.jpg' }, { url: '/a5.jpg' }], title: "Art", image: "/board2.jpg", pins: 40 },
    { user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li", public: true, cover: '/a4.jpg', images: [{ url: '/a8.jpg' }, { url: '/a5.jpg' }], title: "Photography", image: "/board3.jpg", pins: 18 },
    { user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li", public: true, cover: '/a4.jpg', images: [{ url: '/a8.jpg' }, { url: '/a5.jpg' }], title: "DIY Projects", image: "/board4.jpg", pins: 10 },

    // Add more boards as needed
  ];

  const { isLoaded } = useUser()

  if (!isLoaded) return <div className="flex items-center justify-center absolute h-screen bg-white w-screen top-0 left-0">
  <div className='loader'></div>
</div>

  return (
    <div className='p-5'>
      <Profile_section state={true} />
      {/* filter system */}
      {/* board create */}
      <div className='flex px-5 justify-between '>
      <DropdownMenu onOpenChange={(isOpen) => !isOpen && setActive(false)}>
        <DropdownMenuTrigger onClick={()=>setActive(true)}>
          <Button variant="muted" className=" rounded-full h-[60px] w-[60px] font-bold"><SlidersHorizontalIcon size={30} strokeWidth={2.5} /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-2xl m-5 p-2">
            <DropdownMenuLabel>
              <h2 className='text-xs font-light'>Board options</h2>
            </DropdownMenuLabel>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem onClick={()=>setSorted(true)} className="rounded-xl flex justify-between p-2 w-56">
              <h2 className='font-semibold text-lg'>Sort A to Z</h2>
              {sorted && <Check size={20} strokeWidth={2.75}/>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setSorted(false)} className="rounded-xl flex justify-between p-2 w-56">
              <h2 className='font-semibold text-lg'>Custom</h2>
              {!sorted && <Check size={20} strokeWidth={2.75}/>}
            </DropdownMenuItem>
          </DropdownMenuContent>
        
      </DropdownMenu>
        
        <Create />
      </div>
      <div className=' grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
        {boards.map((board, index) => (
          <Board key={index} board={board} />
        ))}
      </div>

      {/* <Nopins state={true}/> */}
    </div>
  )
}

export default page