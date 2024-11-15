"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@clerk/nextjs'
import { DotIcon, Globe } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Profile_section = ({ setState, state, data, user, filled, refreshData }) => {

    // fix profile section in created page
    const router = useRouter()
    const { isLoaded } = useUser()
    const [following, setFollowing] = useState(false)
    const email = user?.emailAddresses[0].emailAddress || ''

    const checkFollowing = async () => {

        data.followers?.forEach(follower => {
            // console.log(follower.email, email)
            if (follower.email == email) {
                setFollowing(true)
            }
        })
    }

    useEffect(() => {
        if (user) {
            checkFollowing()
        }

    }, [data])

    const followUser = async () => {

        try {
            // const email = user.emailAddresses[0].emailAddress
            
            if (!following) {
                const response = await fetch('/api/users', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({op: true, email, _id: data._id}),
                })
                console.log(response)

                setFollowing(true)
                refreshData()
            }else{
                const response = await fetch('/api/users', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({op: false, email, _id: data._id}),
                })
                console.log(response)

                setFollowing(false)
                refreshData()
            }
        } catch (error) {
            console.log(error)
        }


    }

    return (
        <div className='bg-background mt-5 h-1/2'>
            {filled && data ? <div className="flex flex-col gap-5 items-center justify-center">
                <div className="w-[150px] h-[150px] flex items-center justify-center">
                    <Avatar className="w-full h-full">
                        <AvatarImage
                            src={data?.photo}
                            alt="profile picture"
                            className="object-cover rounded-full"
                            width={150}
                            height={150}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <h2 className="text-4xl font-semibold text-foreground">{data?.firstName} {data?.lastName}</h2>
                <h2 className="text-md font-extralight text-foreground flex">{data?.website && <span className='flex gap-1 font-semibold'><Globe size={20} /> <Link href={data.website}>{data.website}</Link> <DotIcon /></span>}  {data.about}</h2>
                <div className="flex items-center gap-1">
                    <Image src={'/pin_code.png'} height={15} width={15} />
                    <h2 className="text-sm text-[#767676d6]">{data?.username}</h2>
                </div>
                <h2 className="font-bold text-forground flex">{data?.followersNum} followers <DotIcon /> {data?.followingNum} following</h2>
                {user ? <div className="flex gap-2">
                    <Button onClick={() => router.push(`/`)} variant="muted" size={30} className="bg-muted text-lg text-foreground p-3 rounded-3xl shadow-none">Share</Button>
                   {data && data.email !== email && <Button onClick={() => followUser()} variant="muted" size={30} className={`${following ? "bg-black" : "bg-primary"} text-lg text-white p-3 rounded-3xl shadow-none`}>{following ? 'Following' : 'Follow'}</Button>}
                </div> : <div className="flex gap-2">
                    <Button onClick={() => router.push(`/`)} variant="muted" size={30} className="bg-muted text-lg text-foreground p-3 rounded-3xl shadow-none">Share</Button>
                    <Button onClick={() => router.push(`/settings/profile`)} variant="muted" size={30} className=" bg-muted text-lg text-foreground p-3 rounded-3xl shadow-none">Edit Profile</Button>
                </div>}
                {user ? <div className="flex gap-5 mt-5">
                    <h2 onClick={() => setState(false)} className={`${!state ? " border-b-2 border-b-black" : "hover:bg-muted hover:rounded-xl cursor-pointer"} text-lg duration-300  p-2`}>Created</h2>
                    <h2 onClick={() => setState(true)} className={`${state ? "border-b-2 border-b-black" : "hover:bg-muted hover:rounded-xl cursor-pointer"} text-lg duration-300 p-2`}>Saved</h2>
                </div> : <div className="flex gap-5 mt-5">
                    <h2 onClick={() => router.push(`/user/${data?.username}/created`)} className={`${!state ? " border-b-2 border-b-black" : "hover:bg-muted hover:rounded-xl cursor-pointer"} text-lg duration-300  p-2`}>Created</h2>
                    <h2 onClick={() => router.push(`/user/${data?.username}/saved`)} className={`${state ? "border-b-2 border-b-black" : "hover:bg-muted hover:rounded-xl cursor-pointer"} text-lg duration-300 p-2`}>Saved</h2>
                </div>}
            </div> : <div className="flex flex-col gap-5 items-center justify-center">
                <Skeleton className="w-[150px] h-[150px] bg-muted rounded-full" />

                <Skeleton className="bg-muted h-[40px] w-1/2 rounded-xl" />
                <Skeleton className="bg-muted h-[30px] w-1/2 rounded-xl" />
                <Skeleton className="bg-muted h-[25px] w-1/2 rounded-xl" />
                <Skeleton className="bg-muted h-[25px] w-1/2 rounded-xl" />
                <Skeleton className="bg-muted h-[35px] w-1/2 rounded-xl" />

            </div>}

        </div>
    )
}

export default Profile_section