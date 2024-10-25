"use client"
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUser } from '@clerk/nextjs'
import Create from '@/app/(routes)/user/[username]/created/_components/Create'


const Head = () => {
  const [state, setState] = React.useState('')

  const router = useRouter()
  // for now user.name
  const { user } = useUser()
  const username = user.id

  React.useEffect(()=>{
    // console.log(router.pathname)
  },[])

  const sections = [
    { name: "Home", link: "/" },
    { name: "Create", link: "/pin-creation-tool" },
  ]

  return (
    <div className='mt-5 p-5 w-screen bg-background h-[56px] gap-5 flex items-center'>
      <Link href={'/'}>
        <div className="hover:bg-muted bg-transparent p-3 rounded-full duration-300 cursor-pointer">
          <div className=" w-[40px] max-w-[70px] h-[40px] flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Logo"
              layout="intrinsic"
              width={30}
              height={30}
              className="object-cover"
            // style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </Link>
      <div className="flex gap-2 items-center">
        <Link href={'/'}><h2 className='cursor-pointer text-foreground text-lg p-3 font-bold  hover:bg-muted rounded-full flex gap-1 items-center'>Home</h2></Link>
        <Create />
      </div>
      {/* <h2 className={`${state == "Home" ? "bg-muted" : "bg-transparent"} rounded-lg font-bold`} checked={state == "Home"} onClick={() => router.push(item.link)}>Home</h2> */}

      <div className='flex items-center w-[80%] relative'>
        <Search size={20} strokeWidth={3} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type='text'
          placeholder="Search"
          className='w-full pl-12 pr-4 py-3 bg-muted rounded-full focus:outline-none focus:ring-2 focus:ring-[#767676]'
        />
      </div>
      <div className="hover:bg-muted bg-transparent p-3 rounded-full duration-300 cursor-pointer">
        <Link href={`/user/${username}/saved`} className=" w-[40px] max-w-[70px] h-[40px] flex items-center justify-center">
          <Avatar className="w-full h-full">
            <AvatarImage
              src="/pp.jpeg"
              alt="profile picture"
              className="object-cover rounded-full"
              width={30}
              height={30}
            // style={{ objectFit: 'cover' }}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
      </div>

    </div>
  )
}

export default Head
