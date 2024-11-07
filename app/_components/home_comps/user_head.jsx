"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown, Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUser } from '@clerk/nextjs'
import Create from '@/app/(routes)/user/[username]/created/_components/Create'


const Head = () => {
  const [search, setSearch] = React.useState('')
  const pathname = usePathname()
  const searchParams = useSearchParams()

  React.useEffect(() => {
    if (pathname == '/search') {
      setSearch(searchParams.get('q'))
    }else{
      setSearch('')
    }
  }, [pathname])


  const router = useRouter()
  // for now user.name
  const {user, isLoaded}=useUser()

  const [username, setUsername] = React.useState('')
  const [photo, setPhoto] = React.useState('')

const fetchUserProfile = async () => {
    if (user) {
        const email = user.emailAddresses[0].emailAddress
        try {
            const response = await fetch(`/api/user?email=${email}`)
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const res = await response.json()

            if (res.success) {
                setUsername(res.data.username)
                setPhoto(res.data.photo)
            }
        } catch (error) {

        }
    }
}

useEffect(() => {
  if (isLoaded) {
      fetchUserProfile()
  }
}, [user, isLoaded])

  React.useEffect(() => {
    // console.log(router.pathname)
  }, [])

  const handleSearchEnter = (e) => {
    if (e.key === 'Enter' && search) {
      router.push(`/search?q=${encodeURIComponent(search)}`)
    }
  }

  const handleSearchClick = () => {
    if (search) {
      router.push(`/search?q=${encodeURIComponent(search)}`)
    }
  }

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
        <Create username={username}/>
      </div>
      {/* <h2 className={`${state == "Home" ? "bg-muted" : "bg-transparent"} rounded-lg font-bold`} checked={state == "Home"} onClick={() => router.push(item.link)}>Home</h2> */}

      <div className='flex items-center w-[80%] relative'>
        <Search size={20} onClick={() => handleSearchClick()} strokeWidth={3} className="absolute left-4 top-1/2 cursor-pointer transform -translate-y-1/2 text-gray-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => handleSearchEnter(e)}
          type='text'
          placeholder="Search"
          className='w-full pl-12 pr-4 py-3 bg-muted rounded-full focus:outline-none focus:ring-2 focus:ring-[#767676]'
        />
      </div>
      <div className="hover:bg-muted bg-transparent p-3 rounded-full duration-300 cursor-pointer">
        <Link href={username? `/user/${username}/saved`: '/settings/profile'} className=" w-[40px] max-w-[70px] h-[40px] flex items-center justify-center">
          <Avatar className="w-full h-full">
            <AvatarImage
              src={photo}
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
