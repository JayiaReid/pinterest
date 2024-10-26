"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'
import PinterestHeader from './home_comps/user_head'
import Head from './home_comps/user_head'
import Root_head from './root_comps/root_head'

const Nav = () => {
    // const {isSignedIn} = useUser()

  return (
    <div>
        {/* {isSignedIn? <Head /> : <Root_head/>} */}
        <Head/>
    </div>
  )
}

export default Nav