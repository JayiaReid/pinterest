"use client"
import React, { useEffect, useState } from 'react'
import Profile_section from '../../_components/profile_section'
import Nopins from '../../_components/no_pin'
import { useUser } from '@clerk/nextjs'
import { LoaderCircleIcon } from 'lucide-react'
import Create from './_components/Create'
import { useParams } from 'next/navigation'
import Pin_map from '@/app/_components/global_comps/pin_map'

const page = () => {

  const [pins, setPins] = useState([])
  const { username } = useParams()
  const {isLoaded, user}=useUser()
  const [filled, setFilled] = useState(false)
  const [data, setData] = React.useState({})
  

  const fetchUserProfile = async () => {
    if (user) {
        const email = user.emailAddresses[0].emailAddress
        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}),
              })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const res = await response.json()
            if (response.status == 200) {
                setData(res.data)
            }
        } catch (error) {

        }
    }
}


  const fetchPins = async ()=>{
    try {
      const response = await fetch('/api/pin',{
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if(response.ok){
        const res = await response.json()
        const pins = res.data.filter(pin=> pin.user.username == username)
        setPins(pins)
        setFilled(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(isLoaded){
      fetchPins()
      fetchUserProfile()
    }
  }, [isLoaded])


    
// be able to delete pins
    if (!isLoaded) return <div className="flex items-center justify-center absolute h-screen bg-white w-screen top-0 left-0">
    <div className='loader'></div>
  </div>
  return (
    <div>
        <Profile_section filled={filled} data={data}/>
        {filled&& <div>
          {pins?.length > 0? <div>
            <Pin_map pins={pins}/>
            </div>: <Nopins/>}
        </div>}
        
        <Create state={true} username={username}/>
    </div>
  )
}

export default page