"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Profile_section from '../user/_components/profile_section'
import { useUser } from '@clerk/nextjs'
import Board from '../user/[username]/[board]/_components/Board'
import Nopins from '../user/_components/no_pin'
import Pin_map from '@/app/_components/global_comps/pin_map'

const page = () => {
    const { username } = useParams()
    const [boards, setBoards] = React.useState([])
    const [filled, setFilled] = React.useState(false)
    const [data, setData] = React.useState({})
    const { user, isLoaded } = useUser()
    const [state, setState]=useState(true)
    const [pins, setPins] = useState([])
    const [thisUser, setThisUser] = useState({})

    const fetchUserProfile = async () => {
        
        if (username) {
            try {
                const response2 = await fetch('/api/user', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email: user?.emailAddresses[0].emailAddress}),
                  })
                  const res2 = await response2.json()
                  console.log(res2)

                  if (res2.success) {
                    setThisUser(res2.data)
                  }

                const response = await fetch(`/api/users?username=${username}`)
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const res = await response.json()
                console.log(res.data)
                if (res.success) {
                    const filteredBoards = res.data.boards.filter(board => !board.private)
                    setBoards(filteredBoards)
                    setPins(res.pins)
                    setData(res.data)
                }
                

                
                    setFilled(true)
            } catch (error) {

            }
        }
    }

    useEffect(()=>{
        if(user){
            fetchUserProfile()
        }
    }, [username, isLoaded])

    if (!isLoaded) return <div className="flex items-center justify-center absolute h-screen bg-white w-screen top-0 left-0">
        <div className='loader'></div>
    </div>

    return (
        <div className='p-5'>
            <Profile_section state={state} setState={setState} user={{user, thisUser }} data={data} filled={filled} refreshData={()=>fetchUserProfile()}/>
            {state? <div className=' grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
        {boards.map((board, index) => (
          <Board key={index} board={board} user={username} other={true}/>
        ))}
      </div> : <div>
          {pins?.length > 0? <div>
            <Pin_map pins={pins}/>
            </div>: <Nopins/>}
        </div>}
        </div>
    )
}

export default page