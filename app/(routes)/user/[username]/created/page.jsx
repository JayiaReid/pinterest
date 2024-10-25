"use client"
import React from 'react'
import Profile_section from '../../_components/profile_section'
import Nopins from '../../_components/no_pin'
import { useUser } from '@clerk/nextjs'
import { LoaderCircleIcon } from 'lucide-react'
import Create from './_components/Create'

const page = () => {

    const {isLoaded}=useUser()

    if (!isLoaded) return <div className="flex items-center justify-center absolute h-screen bg-white w-screen top-0 left-0">
    <div className='loader'></div>
  </div>
  return (
    <div>
        <Profile_section/>
       <Nopins/>
       <Create state={true}/>
    </div>
  )
}

export default page