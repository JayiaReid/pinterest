"use client"
import Pin from '@/app/(routes)/pins/_components/Pin'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useUser } from '@clerk/nextjs'
import { Edit2, LoaderCircleIcon, MoreHorizontal, SlidersHorizontalIcon, Sparkles, SquareStack } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import Section from './[section]/_components/Section'
import Edit from './_components/Edit'
import Reorganize from './_components/reorganize'
import Create from './[section]/_components/CreateSection'

const page = () => {
  const [edit, setEdit] = React.useState(false)
  const [size, setSize] = React.useState(200)
  const [data, setData] = React.useState({})
  const {user, isLoaded} = useUser()
  const search = useParams()
  const username = search.username
  const board = search.board
  const [pins, setPins]=React.useState(0)

  const fetchData = async ()=>{
    if (user) {
      const email = user.emailAddresses[0].emailAddress
      try {
          const response = await fetch(`/api/board?email=${email}&title=${board}`)
          if (!response.ok) {
              throw new Error('Network response was not ok')
          }
          const res = await response.json()
          console.log(res.data)

          if (res.success) {
            setData(res.data)

            let numOfPins = res.data.pins.length

            res.data.sections.forEach(section => {
              if(section.pins.length>0){
                numOfPins += section.pins.length
              }
            })

            setPins(numOfPins)


          }


      } catch (error) {

      }
  }
  }

  useEffect(()=>{
    if(isLoaded){
      fetchData()
    }
  }, [user, isLoaded])

  
  const handleReorder = (newPins) => {
    data.pins = newPins
    console.log(newPins, data.pins)
  }

  // const { isLoaded } = useUser()
  const router = useRouter()


  if (!isLoaded) return <div className="flex items-center justify-center absolute h-screen bg-white w-screen top-0 left-0">
    <div className='loader'></div>
  </div>

  return (
    <div className='flex flex-col items-center mt-10 gap-5'>
      <div className='flex gap-2 items-center'>
        <h2 className="text-4xl font-semibold text-foreground">{data?.title}</h2>
        
        
        {data && <Edit board={data} type={"board"} username={username}/>}
      </div>
      <h2 className='text-muted-foreground text-sm'>{data?.description}</h2>
      <div className="flex">
        <Button variant="muted" size={30} onClick={()=>router.push( `/user/${username}/${board}/more_ideas?board_id=${data.id}`)} className=" text-sm text-foreground p-5 rounded-3xl shadow-none flex flex-col gap-1"><Sparkles className='bg-muted hover:bg-[#E2E2E2] duration-300 p-6 rounded-2xl' size={80} strokeWidth={2.5} /> <span>More Ideas</span></Button>
        {data.pins && <Reorganize pins={data.pins} onReorder={handleReorder} />}
        {data && <Create board={data} refreshData={()=>fetchData()}/>}
      </div>
      <div className='w-full p-5'>
        <div className='flex p-5 justify-between items-center'>
          <h2 className='font-semibold text-lg'>{pins} Pins</h2>
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
          {data.sections?.map((section, index) => (
            <div className="p-5">
              <Section section={section} username={username} board={data} key={index} className="rounded-2xl" />
            </div>

          ))}

        </div>
        {data.pins && <div
          style={{ columnWidth: size ? `${size}px` : '250px' }}
          className={`${size ? "gap-2 p-2" : "gap-4 p-4"}`}>
          
          {data.pins.map((pin) => (
            <div className="p-5">
              <Pin size={size} key={pin.id} className="rounded-2xl" pin={pin} id={pin.id} />
              {/* <h2>Info</h2> */}
            </div>

          ))}

        </div>}
      </div>

    </div>
  )
}

export default page