"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { Download, Share } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
// import Save from './Save'
import useDownloader from 'react-use-downloader'


const HoverComp = ({size, pin, user}) => {
  const {download} = useDownloader();

  return (
    <div className={`absolute w-[${size || '250'}px] rounded-2xl inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-3`}>
      <div className="flex justify-end align-bottom space-x-2">
        <Share size={30} className="bg-white p-2 rounded-full cursor-pointer" />
        <Download size={30} className="bg-white p-2 rounded-full cursor-pointer" onClick={()=>download(pin?.image, `${pin?.title}.jpg`)}/>
      </div>


    </div>
  )
}

const Pin = ({ pin, size, user }) => {
  const [show, setShow] = React.useState(false)

  return (
    <div
      className="relative"
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
    >

      <Link href={`/pins/${pin._id}`} className="flex flex-col gap-3">
        <div className={`relative w-[${size || '250'}px] `}>
          <Image className="rounded-2xl" src={pin.image} width={290} height={400} alt="Pin" />
          {show && <HoverComp size={size} pin={pin} user={user}/>}
        </div>
      </Link>
    </div>
  )
}

export default Pin
