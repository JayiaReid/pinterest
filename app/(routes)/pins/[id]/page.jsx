"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs'
import { ChevronDown, ChevronUp, HeartIcon, LoaderCircleIcon, MoreHorizontal, Share, Check, ArrowLeft, Download } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Pin from '../_components/Pin'
import Pin_map from '@/app/_components/global_comps/pin_map'
import Save from '../_components/Save'
import useDownloader from 'react-use-downloader'

const Page = () => {

  const { id } = useParams()
  const { isLoaded, user } = useUser()
  const router = useRouter()
  const [showComments, setShowComments] = React.useState(false)
  const [pin, setPin] = React.useState({})
  const [pins, setPins] = React.useState([])
  const [liked, setLiked] = React.useState(false)
  const [userData, setUser] = React.useState({})
  const [comment, setComment] = React.useState({
    user_id: "",
    user: "",
    content: ""
  })
  const { download } = useDownloader()
  const [following, setFollowing] = React.useState(false)

  const getUser = async () => {
    const email = user?.emailAddresses[0].emailAddress
    try {
      const response = await fetch(`/api/user?email=${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const res = await response.json()
        // console.log(res.data)
        return res.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  const checkFollowing = async (user) => {
    const email = user?.emailAddresses[0].emailAddress

    user.followers?.forEach(follower => {
      if (follower.email == email) {
        setFollowing(true)
      }
    })
  }

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
        const pin = res.data.filter(pin => pin._id == id)
        setPin(pin[0])
        const user = await getUser()
        setUser(user)
        const username = user.username
        const user_id = user._id

        setComment((prevData) => ({ ...prevData, username, user_id }))
        checkFollowing(user)
        setLiked(pin[0].likes.some(like => like === user_id))

        // find similar pins
        const restPins = res.data.filter(pin => pin._id != id)
        const similarPins = restPins.filter((item) =>
          item.keywords && item.keywords.some(keyword => pin[0].keywords.includes(keyword))
        ).slice(0, 20)
        setPins(similarPins)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const likePin = async () => {

    if (liked) {
      try {
        const response = await fetch('/api/pin/like', {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: pin.user._id,
            pin: id
          })
        })

        if (response.ok) {
          fetchPins();
          setLiked(false)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const response = await fetch('/api/pin/like', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: pin.user._id,
            pin: id
          })
        })

        if (response.ok) {
          fetchPins();
          setLiked(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const addComment = async () => {
    if (comment.content.trim() === "") return

    // Create a new comment object
    const newComment = {
      user: comment.user_id,
      pin: id,
      content: comment.content
    }

    try {
      const response = await fetch('/api/pin/comment', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
      })

      if (response.ok) {
        fetchPins();
      }
    } catch (error) {
      console.log(error)
    }

    setComment({ ...comment, content: "" })

  }

  const followUser = async (_id) => {

    try {
      const email = user.emailAddresses[0].emailAddress

      if (!following) {
        const response = await fetch('/api/users', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ op: true, email, _id }),
        })
        console.log(response)

        setFollowing(true)
        fetchPins()
      } else {
        const response = await fetch('/api/users', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ op: false, email, _id }),
        })
        console.log(response)

        setFollowing(false)
        fetchPins()
      }
    } catch (error) {
      console.log(error)
    }


  }

  useEffect(() => {
    if (isLoaded) {
      fetchPins()
    }
  }, [isLoaded])

  if (!isLoaded) return <div className="flex items-center justify-center absolute h-screen bg-white w-screen top-0 left-0">
    <div className='loader'></div>
  </div>

  return (
    <div className='mt-10'>
      <div className='absolute cursor-pointer hover:bg-muted rounded-full p-2 ml-5'>
        <ArrowLeft size={30} strokeWidth={2.5} onClick={() => router.back()} />
      </div>
      <div className='flex mx-5 my-10 items-center w-full h-full justify-center'>
        <Card className="rounded-3xl shadow-lg border-none">
          <CardContent className="m-0 p-0 flex flex-col md:flex-row lg-flex-row xl:flex-row">
            <Image className="rounded-2xl object-cover" src={pin?.image} width={500} height={400} alt="Pin" />
            <div className='p-8 flex flex-col gap-8'>
              <div className='flex items-center justify-between'>
                <div className='flex gap-5'>
                  <div className='flex gap-2'>
                    <HeartIcon className='cursor-pointer' onClick={() => likePin()} strokeWidth={`${pin.liked ? 0 : 3}`} size={20} fill={`${liked ? 'red' : 'transparent'}`} />
                    <h2>{pin.likes?.length}</h2>
                  </div>
                  <Share className='cursor-pointer' strokeWidth={3} size={20} />
                  <Download className='cursor-pointer' onClick={() => download(pin?.image, `${pin?.title}.jpg`)} strokeWidth={3} size={20} />
                </div>
                <Save user={userData} pin={id} />
              </div>
              <h2 className='text-2xl font-semibold'>{pin?.title}</h2>
              <h2>{pin?.description}</h2>
              {pin.link && <Link href={pin?.link} className='font-bold'>{pin?.link}</Link>}

              <div className='flex items-center justify-between'>
                <Link href={`/${pin.user?.username}/`} className="flex items-center gap-2">
                  <Avatar className="w-[40px] max-w-[70px] h-[40px]">
                    <AvatarImage
                      src={userData.photo}
                      alt="profile picture"
                      className="object-cover rounded-full"
                      width={5}
                      height={5}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-sm font-semibold">{pin.user?.firstName} {pin.user?.lastName}</h2>
                    <h2 className="text-sm">{pin.user?.followersNum} followers</h2>
                  </div>
                </Link>
                <Button onClick={()=>followUser(userData._id)} variant="outline" size={30} className=" text-foreground self-end text-lg px-4 py-2 rounded-3xl shadow-none">Follow</Button>
              </div>

              <div className='flex flex-col gap-5'>
                <div className='flex justify-between items-center'>
                  <h2 className='font-semibold'>{pin.comments?.length} Comments</h2>
                  {showComments ? (
                    <ChevronUp className='cursor-pointer' strokeWidth={3} size={20} onClick={() => setShowComments(false)} />
                  ) : (
                    <ChevronDown className='cursor-pointer' strokeWidth={3} size={20} onClick={() => setShowComments(true)} />
                  )}
                </div>

                {pin.comments?.length > 0 ? (
                  showComments && (
                    <div>
                      {pin.comments.map((comment) => (
                        <h2 className='my-4' key={comment._id}>
                          <span className='font-semibold'>{comment.user.firstName} {comment.user.lastName}</span> {comment.content}
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
                <Button variant="ouline" className="rounded-full p-1 border h-[30px]"><Check onClick={() => { addComment(); setShowComments(true) }} className='cursor-pointer' strokeWidth={2} size={20} /></Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <h2 className='text-center font-bold text-xl'>More to explore</h2>
        <Pin_map pins={pins} user={userData} />
      </div>

    </div>
  )
}

export default Page
