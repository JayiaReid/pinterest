import Pin from '@/app/(routes)/pins/_components/Pin'
import React from 'react'

const Pin_map = ({pins}) => {
  return (
    <div className="columns-[300px] sm:columns-[250px] xs:[175px] h-auto mt-5 p-10">
    {pins.map((pin, index) => (
      <div className="m-5">
        <Pin className="rounded-2xl" pin={pin} id={index} />
        {/* <h2>Info</h2> */}
      </div>

    ))}

  </div>
  )
}

export default Pin_map