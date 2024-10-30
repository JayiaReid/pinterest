"use client"
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Root_head = () => {

  const pathname = usePathname()
  const {isLoaded} = useUser()
  
  if(pathname == '/sign-in' || pathname == '/sign-up' || !isLoaded) return <div></div>

  return (
    <div className='absolute mt-5 p-5 w-screen bg-transparent h-[56px] gap-5 flex items-center justify-between z-10'>
       <Link href={'/'}>
    <div className="bg-transparent p-3 rounded-full duration-300 cursor-pointer">
      <div className="  flex items-center gap-2 justify-center">
        <Image
          src="/logo.png"
          alt="Logo"
          layout="intrinsic"
          width={40}
          height={40}
          className="object-cover"
          // style={{ objectFit: 'contain' }}
        />
        <h2 className="text-primary font-semibold text-2xl">Pinterest</h2>
      </div>
    </div>
  </Link>
  <div className="flex gap-2">
    <Link href={'/sign-in'}><Button size={40} className="py-3 px-5 font-semibold rounded-3xl text-md ">Log in</Button></Link>
    <Link href={'/sign-up'}><Button size={40} variant="muted" className="font-semibold py-3 px-5 bg-[#E2E2E2] rounded-3xl text-md ">Sign Up</Button> </Link>
  </div>

    </div>
  )
}

export default Root_head