"use client"
import React, { useEffect } from 'react'
// import Head from './home_comps/user_head'
import PinterestHeader from './home_comps/user_head'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Create from '../(routes)/user/[username]/created/_components/Create'
import Pin from '../(routes)/pins/_components/Pin'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'


const Home_user = () => {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [userData, setUserData] = React.useState({})
  const [pins, setPins] = React.useState([])
  const [filled, setFilled] = React.useState(false)

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
        setPins(res.data)
        setFilled(true)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const checkUser = async () => {
    if (user) {

      const email = user.emailAddresses[0].emailAddress

      try {
        const response = await fetch(`/api/user?email=${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (response.status === 404) {
          const userData = {
            firstName: user.firstName,
            lastName: user.lastName || 'no last name',
            email: email,
            about: "",
            website: "",
            username: user.id,
            photo: "/defaultpp.jpg",
            followersNum: 0,
            followingNum: 0,
          }

          const res = await fetch('/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          })
          // console.log(res)
          if (res.ok) {
            router.push('/settings/profile')
          }
        } else if (response.status == 200) {
          const res = await response.json()
          setUserData(res.data)
          // console.log('found', res.data)
          setFilled(true)

        }
      } catch (error) {
        console.error('Error checking or creating user:', error)
      }
    }
  }

  useEffect(() => {
    if (isLoaded) {
      checkUser();
      fetchPins();

    }
  }, [user, isLoaded])

  const colors = [
    "#edede9",
    "#d6ccc2",
    "#f5ebe0",
    "#e3d5ca",
    "#d5bdaf",
    "#588157",
    "#3a5a40",
    "5e503f",
    "c6ac8f",
    "eae0d5",
    "4a4e69"
  ]

  const getRandomColor = (index) => {
    return colors[index]
  }


  return (
    <div className='bg-background'>
      {/* <PinterestHeader /> */}

      <Carousel opts={{ align: "start" }} className="mx-20 mt-5 p-5 max-w-[90%]">
        {filled ? <CarouselContent className=" w-[500px] flex gap-4">
          {userData.boards?.map((section, index) => (
            section.pins.length > 0 ? (
              <CarouselItem key={index} className="basis-1/2">
                <Card className="border-none shadow-none bg-muted" style={{ backgroundColor: getRandomColor(index) }}>
                  <CardContent className="h-[100px] flex gap-5 p-5 items-center justify-start">
                    <div className="object-cover hover:border-transparent cursor-pointer border-white border-2 rounded-xl">
                      <Link href={{ pathname: `user/${userData.username}/${section.title}/more_ideas`, query: { board_id: section._id } }}>
                        <Image className="rounded-xl min-h-[70px] max-h-[70px] min-w-[50px] max-w-[50px] object-cover " src={section.cover !== '/blank.jpg' ? section.cover : section.pins[0].image} width={50} height={50} />
                      </Link>
                    </div>
                    <div className="flex flex-col">
                      <h2 className="font-light text-md">More ideas for</h2>
                      <h2 className="font-bold text-xl truncate-2-lines">{section.title}</h2>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ) : null
          ))}
        </CarouselContent> : <CarouselContent className=" w-[500px] flex gap-4">
          <Skeleton className="basis-1/2 h-[100px] rounded-xl bg-muted ml-5" />

        </CarouselContent>}
        <CarouselPrevious className=" shadow-none border-none text-gray-700 text-xl cursor-pointer" />
        <CarouselNext className="shadow-none border-none text-gray-700 text-xl cursor-pointer" />
      </Carousel>

      {filled ? <div className="columns-[240px] gap-4 p-4 pb-20">
        {pins.map((pin, index) => (
          <div className="p-5">
            <Pin key={index} className="rounded-2xl" pin={pin} user={userData} />
            {/* <h2>Info</h2> */}
          </div>

        ))}

      </div> : <div className=" p-4 pb-20 h-auto">
        <Skeleton className='bg-muted rounded-2xl ml-5 p-5 my-5 w-[250px] h-[300px]' />

      </div>}
      <Create state={true} username={userData.username} />

    </div>
  )
}

export default Home_user