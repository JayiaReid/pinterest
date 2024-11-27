import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Search } from 'lucide-react'

const Root_Home = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-transparent flex items-center ">
      <Image 
        className="absolute inset-0 w-full h-full object-cover z-[-1]" width={1000} height={1000} src={"/landing.png"} 
      />

      {/* <div className="absolute inset-0 bg-black bg-opacity-50 z-[-1]" /> */}

      <div className="relative text-left text-white max-w-screen-lg ml-[70px] mt-20">
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
        <h2 className="text-[80px] md:text-[80px] lg:text-[100px] font-bold leading-snug mb-6">
          Explore.
        </h2>
        <h2 className="text-[80px] md:text-[80px] lg:text-[100px] font-bold leading-snug mb-6">
          Categorize.
        </h2>
        <h2 className="text-[80px] md:text-[80px] lg:text-[100px] font-bold leading-snug mb-6">
          Share.
        </h2>
        <div className='flex items-center w-[80%] relative mb-6'>
        <Search size={20} strokeWidth={3} className="absolute left-4 top-1/2 cursor-pointer transform -translate-y-1/2 text-gray-500" />
        <input
          readOnly
          type='text'
          placeholder="Pin it"
          className='w-full pl-12 pr-4 py-3 bg-transparent rounded-full outline-none ring-2 ring-[#767676]'
        />
      </div>
        {/* <Link href={'/sign-up'}><Button className="bg-primary self-center text-white py-5 px-6 rounded-full text-lg font-medium transition-all duration-300 hover:bg-opacity-80">
          Get Started
        </Button></Link> */}
      </div>
    </div>
  )
}

export default Root_Home
