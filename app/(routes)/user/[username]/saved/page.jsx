"use client"
import React, { useEffect } from 'react'
import Profile_section from '../../_components/profile_section'
import Nopins from '../../_components/no_pin'
import { useUser } from '@clerk/nextjs'
import { Check, LoaderCircleIcon, SlidersHorizontalIcon } from 'lucide-react'
import Board from '../[board]/_components/Board'
import Create from '../[board]/_components/CreateBoard'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'

const page = () => {
  const [active, setActive]=React.useState(false)
  const [sorted, setSorted]=React.useState(false)
  const {user, isLoaded}=useUser()
  const [boards, setBoards]=React.useState([])
  const [username, setUsername] = React.useState('')
  const [filled, setFilled]=React.useState(false)
  const [data, setData] = React.useState({})

const fetchUserProfile = async () => {
    if (user) {
        const email = user.emailAddresses[0].emailAddress
        try {
            const response = await fetch('/api/user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({email}),
            })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const res = await response.json()
            // console.log(res.data)

            if (response.status == 200) {
              setBoards(res.data.boards)
              setUsername(res.data.username)
              setData(res.data)
            }
            setFilled(true)
        } catch (error) {

        }
    }
}

const getSortedBoards = () => {
  return sorted
    ? [...boards].sort((a, b) => a.title.localeCompare(b.title))
    : boards
}

useEffect(() => {
  if (isLoaded) {
      fetchUserProfile()
  }
}, [user, isLoaded])

  if (!isLoaded || !filled) return <div className="flex items-center justify-center absolute h-screen bg-white w-screen top-0 left-0">
  <div className='loader'></div>
</div>

  return (
    <div className='p-5'>
      <Profile_section state={true} data={data} filled={filled} refreshData={()=>fetchUserProfile()} />
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
      {filled? <div className=' grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
        {getSortedBoards().map((board, index) => (
          <Board key={index} board={board} user={username} />
        ))}
      </div>: <div className='p-5 grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
        <Skeleton className='h-[200px] w-[250px] bg-muted rounded-xl p-5'/>
        <Skeleton className='h-[200px] w-[250px] bg-muted rounded-xl p-5'/>
        <Skeleton className='h-[200px] w-[250px] bg-muted rounded-xl p-5'/>
        </div>}

      {boards.length == 0 && <Nopins state={true}/>}
    </div>
  )
}

export default page