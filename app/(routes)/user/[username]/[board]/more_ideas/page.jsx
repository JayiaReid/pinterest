"use client"
import Pin_map from '@/app/_components/global_comps/pin_map'
import { useUser } from '@clerk/nextjs'
import { ArrowLeft, User2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
  const { isLoaded, user } = useUser()
  const [pins, setPins]=React.useState([])
  const searchParams = useSearchParams()
  const _id = searchParams.get('board_id')
  
  const fetchPins = async () => {
    try {
      const response = await fetch(`/api/more_ideas?_id=${_id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const res = await response.json()
        setPins(res.data.pins)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchPins()
  }, [user])

   
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