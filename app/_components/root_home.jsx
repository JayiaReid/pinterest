import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Root_Home = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-transparent flex items-center justify-center">
      <Image 
        className="absolute inset-0 w-full h-full object-cover z-[-1]" width={900} height={900} src={"/landing.jpg"} 
      />

      <div className="absolute inset-0 bg-black bg-opacity-50 z-[-1]" />

      <div className="relative text-center text-white max-w-screen-lg mx-auto px-4">
      {/* <div className="  flex items-center mb-5 gap-2 justify-center">
        <Image
          src="/logo.png"
          alt="Logo"
          layout="intrinsic"
          width={40}
          height={40}
          className="object-cover"
        />
        <h2 className="text-primary font-semibold text-2xl">Pinterest</h2>
      </div> */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-snug mb-6">
          Your Next Idea Starts Here
        </h2>
        <p className="text-lg md:text-xl font-semibold mb-8 px-4">
          Explore Ideas. Share Ideas. Categorize Ideas. Everything Inspiration.
        </p>
        <Link href={'/sign-up'}><Button className="bg-primary text-white py-5 px-6 rounded-full text-lg font-medium transition-all duration-300 hover:bg-opacity-80">
          Get Started
        </Button></Link>
      </div>
    </div>
  )
}

export default Root_Home
