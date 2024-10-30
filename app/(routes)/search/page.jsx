"use client"
import Pin_map from '@/app/_components/global_comps/pin_map'
import { Card } from '@/components/ui/card'
import { useUser } from '@clerk/nextjs'
import React from 'react'

const page = () => {
    const pins = [
        { image: "/a0.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        { image: "/a1.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        { image: "/a2.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        { image: "/a3.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        // { image: "/a4.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        // { image: "/a5.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        // { image: "/a6.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        // { image: "/a7.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        // { image: "/a8.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        // { image: "/a9.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        // { image: "/a10.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        // { image: "/a11.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        // { image: "/a12.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        // { image: "/a13.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        // { image: "/a14.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        // { image: "/a15.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        // { image: "/a16.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        // { image: "/a17.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        { image: "/a18.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        { image: "/a19.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        { image: "/a20.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        { image: "/a21.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        { image: "/a22.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        { image: "/a23.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        { image: "/a24.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        { image: "/a25.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        { image: "/a26.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        { image: "/a27.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
        { image: "/a28.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    ]

    const { isLoaded } = useUser()

    if (!isLoaded) return <div className="flex items-center justify-center absolute h-screen bg-white w-screen top-0 left-0">
        <div className='loader'></div>
    </div>

    return (
        <div>
            <Pin_map pins={pins} />
        </div>
    )
}

export default page