"use client"
import Pin_map from '@/app/_components/global_comps/pin_map'
import { Card } from '@/components/ui/card'
import { useUser } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
    const { isLoaded, user } = useUser()
    const [pins, setPins] = React.useState([])
    const searchParams = useSearchParams()
    const q = searchParams.get('q')

    const fetchPins = async () => {
        try {
            const response = await fetch('/api/pin', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok) {
                const res = await response.json()
                const filteredByTitle = res.data.filter(pin => pin.title.toLowerCase().includes(q))

                setPins(filteredByTitle)

                const filteredByKeyword = res.data.filter(pin =>
                    pin.keywords && pin.keywords.some(keyword =>
                        keyword.toLowerCase().includes(q.toLowerCase())
                    )
                )
                setPins(prev => [...prev, ...filteredByKeyword])

                const filteredByUser = res.data.filter(pin=>pin.user.username.toLowerCase().includes(q))
                setPins(prev => [...prev, ...filteredByUser])
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPins()
    }, [q])

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