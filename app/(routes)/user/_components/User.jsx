import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const User = ({ user, followUser, thisUser }) => {

    const [following, setFollowing] = useState(false)

    const checkFollowing = async () => {

        thisUser.following?.forEach(following => {
            // console.log(follower.username,'here', user.username)
            if (following.username == user.username) {
                setFollowing(true)
            }
        })
    }

    useEffect(() => {
        if (user) {
            checkFollowing()
        }

    }, [user])

    return (
        <div className='p-5 flex items-center justify-between'>
            <Link href={`/${user?.username}`} className='flex gap-2 items-center'>
            <Avatar className="w-[60px] max-w-[60px] h-[60px]">
                  <AvatarImage
                    src={user.photo}
                    alt="profile picture"
                    className="object-cover rounded-full"
                    width={50}
                    height={50}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            <h2>{user?.firstName} {user?.lastName}</h2>
            </Link>
            {user.username!=thisUser.username && <Button onClick={() => followUser(following)} variant="muted" size={30} className={`${following ? "bg-black" : "bg-primary"} text-lg text-white p-3 rounded-3xl shadow-none`}>{following ? 'Following' : 'Follow'}</Button>}
        </div>
    )
}

export default User