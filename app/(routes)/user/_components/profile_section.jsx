"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { DotIcon, Globe } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Profile_section = ({ state }) => {

    const router = useRouter()
    const { user, isLoaded } = useUser()
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        about: '',
        website: '',
        username: 'Default123',
        photo: '/pp.jpeg',
        followersNum: 0,
        followingNum: 0
    })

    const fetchUserProfile = async () => {
        if (user) {
            const email = user.emailAddresses[0].emailAddress
            setData((prevData) => ({ ...prevData, email }))
            try {
                const response = await fetch(`/api/user?email=${email}`)
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const res = await response.json()

                if (res.success) {
                    setData((prevData) => ({
                        ...prevData,
                        firstName: res.data?.firstName || user.firstName,
                        lastName: res.data?.lastName || user.lastName,
                        about: res.data?.about || '',
                        website: res.data?.website || 'test',
                        username: res.data?.username || user.id,
                        photo: res.data?.photo,
                        followersNum: res.data?.followersNum || 0,
                        followingNum: res.data?.followingNum || 0
                    }))
                }
            } catch (error) {

            }
        }
    }

    useEffect(() => {
        if (isLoaded) {
            fetchUserProfile()
        }
    }, [user, isLoaded])

    return (
        <div className='bg-background mt-5 h-1/2'>
            <div className="flex flex-col gap-5 items-center justify-center">
                <div className="w-[150px] h-[150px] flex items-center justify-center">
                    <Avatar className="w-full h-full">
                        <AvatarImage
                            src={data.photo}
                            alt="profile picture"
                            className="object-cover rounded-full"
                            width={150}
                            height={150}
                        // style={{ objectFit: 'cover' }}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <h2 className="text-4xl font-semibold text-foreground">{data.firstName} {data.lastName}</h2>
                <h2 className="text-md font-extralight text-foreground flex">{data.website && <span className='flex gap-1 font-semibold'><Globe size={20} /> <Link href={data.website}>{data.website}</Link> <DotIcon /></span>}  {data.about}</h2>
                <div className="flex items-center gap-1">
                    <Image src={'/pin_code.png'} height={15} width={15} />
                    <h2 className="text-sm text-[#767676d6]">{data.username}</h2>
                </div>
                <h2 className="font-bold text-forground flex">{data.followersNum} followers <DotIcon /> {data.followingNum} following</h2>
                <div className="flex gap-2">
                    <Button onClick={() => router.push(`/`)} variant="muted" size={30} className="bg-muted text-lg text-foreground p-3 rounded-3xl shadow-none">Share</Button>
                    <Button onClick={() => router.push(`/settings/profile`)} variant="muted" size={30} className=" bg-muted text-lg text-foreground p-3 rounded-3xl shadow-none">Edit Profile</Button>
                </div>
                <div className="flex gap-5 mt-5">
                    <h2 onClick={() => router.push(`/user/${user.id}/created`)} className={`${!state ? " border-b-2 border-b-black" : "hover:bg-muted hover:rounded-xl cursor-pointer"} text-lg duration-300  p-2`}>Created</h2>
                    <h2 onClick={() => router.push(`/user/${user.id}/saved`)} className={`${state ? "border-b-2 border-b-black" : "hover:bg-muted hover:rounded-xl cursor-pointer"} text-lg duration-300 p-2`}>Saved</h2>
                </div>
            </div>

        </div>
    )
}

export default Profile_section