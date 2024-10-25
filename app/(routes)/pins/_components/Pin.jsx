"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { MoreHorizontal, Share } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HoverComp = ({size}) => {
  return (
    <div className={`absolute w-[${size || '250'}px] rounded-2xl inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-3`}>
      <Button size={30} className="bg-primary text-white self-end text-lg px-4 py-2 rounded-3xl shadow-none">Save</Button>
      <div className="flex justify-end space-x-2">
        <Share size={30} className="bg-white p-2 rounded-full cursor-pointer" />
        <MoreHorizontal size={30} className="bg-white p-2 rounded-full cursor-pointer" />
      </div>


    </div>
  )
}

const Pin = ({ pin, id, size }) => {
  const [show, setShow] = React.useState(false)

  const { user } = useUser()
  const username = user?.id
  const userName = user?.fullName

  return (
    <div
      className="relative"
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
    >

      <Link href={`/pins/${id}`} className="flex flex-col gap-3">
        <div className={`relative w-[${size || '250'}px]`}>
          <Image className="rounded-2xl" src={pin.image} width={290} height={400} alt="Pin" />
          {show && <HoverComp size={size}/>}
        </div>
        {/* <Link href={`/user/${username}/created`} className="flex items-center gap-2">
          <Avatar className="w-[30px] max-w-[70px] h-[30px]">
            <AvatarImage
              src="/pp.jpeg"
              alt="profile picture"
              className="object-cover rounded-full"
              width={5}
              height={5}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="hover:underline">{userName}</h2>
        </Link> */}
      </Link>
    </div>
  )
}

export default Pin
