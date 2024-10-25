import React from 'react'
import SideNav from '../_components/sideNav'

const page = () => {
  return (
    <div className='flex flex-row gap-10'>
     <SideNav page={"profile"}/>
     <div>
      <h2>Edit Prfile</h2>
     </div>
    </div>
  )
}

export default page