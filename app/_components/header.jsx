"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import PinterestHeader from './home_comps/user_head'
import Head from './home_comps/user_head'
import Root_head from './root_comps/root_head'
import { useRouter } from 'next/navigation'

const Nav = () => {
    const {isSignedIn, isLoaded} = useUser()
    const router = useRouter()

    useEffect(()=>{
      if(isLoaded && !isSignedIn){
        router.push('/')
      }
    }, [isSignedIn, isLoaded])

  return (
    <div>
        {isSignedIn? <Head /> : <Root_head/>}
    </div>
  )
}

export default Nav