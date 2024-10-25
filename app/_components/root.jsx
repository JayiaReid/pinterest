import React from 'react'
import Top from './root_comps/top'
import Form from './root_comps/form'
import Root_head from './root_comps/root_head'

const Root_Home = () => {
  return (
    <div className="w-screen bg-black  h-screen">
      <video autoPlay muted loop className="mt-5 opacity-30 w-full h-full object-cover z-[-1]">
        <source src="https://assets.mixkit.co/videos/9145/9145-720.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute lg:flex-row md:flex-row flex-col flex items-center gap-5 justify-center top-[300px] pl-10 lg:ml-[300px] md:ml-[300px] ml-[100px] border-l-8 border-l-primary">
        <h2 className="text-white  text-9xl">Get Your</h2> <h2 className="text-primary animate-bounce text-9xl underline">Next</h2> <h2 className="text-white  text-9xl">Idea</h2>
      </div>
    </div>
  )
}

export default Root_Home