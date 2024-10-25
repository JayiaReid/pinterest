"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs'
import { ChevronDown, ChevronUp, HeartIcon, LoaderCircleIcon, MoreHorizontal, Share, Check, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import Pin from '../_components/Pin'

const Page = () => {

  const { id } = useParams()

  const router = useRouter()
  const [showComments, setShowComments] = React.useState(false)
  const [comment, setComment] = React.useState({
    user_id: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li",
    user: "Ola Ziolek",
    content: ""
  })
  const [pin, setPin] = React.useState({
    image: `/a${id}.jpg`,
    likes: 12,
    title: "Dinner Date Aesthetic",
    description: "Dinner Date Aesthetic",
    user_id: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li",
    comments: [
      { id: 1, user: "Emma", content: "Beautiful <3" }
    ]
  })

  const user = {
    Full_Name: "Ola Ziolek",
    followers: 88,
    id: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li",
  }

  const { isLoaded } = useUser()

  const addComment = () => {
    if (comment.content.trim() === "") return

    // Create a new comment object
    const newComment = {
      id: pin.comments.length + 1,
      user: comment.user,
      content: comment.content
    }

    
    setPin(prevPin => ({
      ...prevPin,
      comments: [...prevPin.comments, newComment]
    }))

    setComment({ ...comment, content: "" })
  }

  const pins = [
    { image: "/a0.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a1.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a2.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a3.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a4.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a5.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a6.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a7.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" }]

    if (!isLoaded) return <div className="flex items-center justify-center absolute h-screen bg-white w-screen top-0 left-0">
    <div className='loader'></div>
  </div>

  return (
    <div className='mt-10'>
      <div className='absolute cursor-pointer hover:bg-muted rounded-full p-2 ml-5'>
        <ArrowLeft size={30} strokeWidth={2.5} onClick={()=>router.back()}/>
      </div>
      <div className='flex mx-5 my-10 items-center w-full h-full justify-center'>
        <Card className="rounded-3xl shadow-lg border-none">
          <CardContent className="m-0 p-0 flex flex-col md:flex-row lg-flex-row xl:flex-row">
            <Image className="rounded-2xl" src={pin.image} width={500} height={400} alt="Pin" />
            <div className='p-8 flex flex-col gap-8'>
              <div className='flex items-center justify-between'>
                <div className='flex gap-5'>
                  <div className='flex gap-2'>
                    <HeartIcon className='cursor-pointer' strokeWidth={3} size={20} />
                    <h2>{pin.likes}</h2>
                  </div>
                  <Share strokeWidth={3} size={20} />
                  <MoreHorizontal strokeWidth={3} size={20} />
                </div>
                <Button size={30} className="bg-primary text-white self-end text-lg px-4 py-2 rounded-3xl shadow-none">Save</Button>
              </div>
              <h2 className='text-2xl font-semibold'>{pin.title}</h2>
              <h2>{pin.description}</h2>

              <div className='flex items-center justify-between'>
                <Link href={`/user/${user.id}/created`} className="flex items-center gap-2">
                  <Avatar className="w-[40px] max-w-[70px] h-[40px]">
                    <AvatarImage
                      src="/pp.jpeg"
                      alt="profile picture"
                      className="object-cover rounded-full"
                      width={5}
                      height={5}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-sm font-semibold">{user.Full_Name}</h2>
                    <h2 className="text-sm">{user.followers} followers</h2>
                  </div>
                </Link>
                <Button variant="outline" size={30} className=" text-foreground self-end text-lg px-4 py-2 rounded-3xl shadow-none">Follow</Button>
              </div>

              <div className='flex flex-col gap-5'>
                <div className='flex justify-between items-center'>
                  <h2 className='font-semibold'>{pin.comments.length} Comments</h2>
                  {showComments ? (
                    <ChevronUp className='cursor-pointer' strokeWidth={3} size={20} onClick={() => setShowComments(false)} />
                  ) : (
                    <ChevronDown className='cursor-pointer' strokeWidth={3} size={20} onClick={() => setShowComments(true)} />
                  )}
                </div>

                {pin.comments.length > 0 ? (
                  showComments && (
                    <div>
                      {pin.comments.map((comment) => (
                        <h2 className='my-4' key={comment.id}>
                          <span className='font-semibold'>{comment.user}</span> {comment.content}
                        </h2>
                      ))}
                    </div>
                  )
                ) : (
                  <h2 className='text-muted-foreground'>No comments yet</h2>
                )}
              </div>

              <div className='flex items-center gap-2'>
                <Input
                  value={comment.content}
                  onChange={(e) => setComment({ ...comment, content: e.target.value })}
                  placeholder="Add a comment"
                  className="w-full border-2 p-5 text-lg bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-[#767676]"
                />
               <Button variant="ouline" className="rounded-full p-1 border h-[30px]"><Check onClick={()=>addComment()} className='cursor-pointer' strokeWidth={2} size={20} /></Button> 
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <h2 className='text-center font-bold text-xl'>More to explore</h2>
        <div className="columns-[300px] sm:columns-[250px] xs:[175px] h-auto mt-5 p-10">
        {pins.map((pin, index) => (
          <div className="m-5">
            <Pin className="rounded-2xl" pin={pin} id={index} />
            {/* <h2>Info</h2> */}
          </div>

        ))}

      </div>
      </div>
    </div>
  )
}

export default Page
