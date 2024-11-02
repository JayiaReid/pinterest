"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const sideNav = ({page}) => {

    const router = useRouter()

  return (
    <div className='flex flex-col p-5 mt-5 gap-5'>
        <div >
            <Button onClick={() =>  router.push(`/settings/profile`)} variant="muted" className={`${page == 'profile'? " border-b-4 rounded-none border-b-black" : "hover:bg-muted hover:rounded-xl cursor-pointer"}  text-lg duration-300 px-2  py-2 font-semibold `}>Edit profile</Button>
        </div>
        {/* <div >
            <Button onClick={() =>  router.push(`/settings/account-settings`)} variant="muted" className={`${page == 'account'? " border-b-4 rounded-none border-b-black" : "hover:bg-muted hover:rounded-xl cursor-pointer"}  text-lg duration-300 px-2  py-2 font-semibold`}>Account Management</Button>
        </div> */}
    </div>
  )
}

export default sideNav