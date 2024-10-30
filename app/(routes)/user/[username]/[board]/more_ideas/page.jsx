"use client"
import Pin_map from '@/app/_components/global_comps/pin_map'
import { useUser } from '@clerk/nextjs'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {

    const pins = [
        { image: "/a0.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        { image: "/a1.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        { image: "/a2.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        { image: "/a3.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        { image: "/a4.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        { image: "/a5.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        { image: "/a6.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        { image: "/a7.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" }]

    const { isLoaded } = useUser()
  const router = useRouter()


  if (!isLoaded) return <div className="flex items-center justify-center absolute h-screen bg-white w-screen top-0 left-0">
    <div className='loader'></div>
  </div>

  return (
    <div className='mt-10 p-5'>
        <div className='absolute cursor-pointer hover:bg-muted rounded-full p-2 ml-5'>
        <ArrowLeft size={30} strokeWidth={2.5} onClick={()=>router.back()}/>
      </div>
      <h2 className='text-3xl font-bold text-center'>More Ideas</h2>
    <Pin_map pins={pins}/>
    </div>
  )
}

export default page