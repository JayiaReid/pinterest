import Pin from '@/app/(routes)/pins/_components/Pin'
import React from 'react'

const Pin_map = ({pins, user}) => {
  return (
    <div className="columns-[300px] sm:columns-[250px] xs:[175px] h-auto mt-5 p-10">
    {pins?.length>0? (pins?.map((pin, index) => (
      <div className="m-5">
        <Pin className="rounded-2xl" pin={pin} id={index} user={user} />
      </div>

    ))): null} 

  </div>
  )
}

export default Pin_map