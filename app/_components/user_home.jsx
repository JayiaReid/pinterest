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


const Home_user = () => {
  const {user, isLoaded} = useUser()
  const router = useRouter()
  const [userData, setUserData] = React.useState({})
  const [pins, setPins] = React.useState([])

  const fetchPins = async ()=>{
    try {
      const response = await fetch('/api/pin',{
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if(response.ok){
        const res = await response.json()
        setPins(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const checkUser = async ()=>{
    if(user){

      const email = user.emailAddresses[0].emailAddress

      try {
        const response = await fetch(`/api/user?email=${email}`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json'
          }
        })
        // console.log(response)
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
        }else if(response.status == 200){
          const res = await response.json()
          setUserData(res.data)
          console.log('found', res.data)
        }
      } catch (error) {
        console.error('Error checking or creating user:', error)
      }
    }
  }

  useEffect(()=>{
    if (isLoaded) {
      checkUser();
      fetchPins()
    }
  }, [user, isLoaded])

  const sections = [
    { board_id: 1, name: "Art", image: "/a10.jpg"},
    { board_id: 1, name: "Aesthetic pictures", image: "/a26.jpg" },
    { board_id: 1, name: "Anime", image: "/a12.jpg" },
    { board_id: 1, name: "Vision Board", image: "/a3.jpg" },
    { board_id: 1, name: "Hobbies",image: "/a17.jpg" },
    { board_id: 1, name: "Random", image: "/a4.jpg" },
    { board_id: 1, name: "Bible", image: "/a21.jpg" },
    // would be based on public boards
  ]

  const colors = [
    "#edede9",
    "#d6ccc2",
    "#f5ebe0",
    "#e3d5ca",
    "#d5bdaf",
    "#588157",
    "#3a5a40",
  ]

  // check if user exits if not create user and navigate to the profile page
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // const pins = [
  //   { image: "/a0.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a1.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a2.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a3.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a4.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a5.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a6.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a7.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a8.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a9.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a10.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a11.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a12.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a13.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a14.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a15.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a16.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a17.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a18.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a19.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a20.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a21.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a22.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a23.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a24.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a25.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a26.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a27.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  //   { image: "/a28.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  // ]


  return (
    <div className='bg-background'>
      {/* <PinterestHeader /> */}

      <Carousel opts={{ align: "start" }} className="mx-20 mt-5 p-5 max-w-[90%]">
        <CarouselContent className=" w-[500px] flex gap-4">
          {userData.boards?.map((section, index) => (
            <CarouselItem key={index} className="basis-1/2">
              <Card className="border-none shadow-none bg-muted" style={{ backgroundColor: getRandomColor() }}>
                <CardContent className="h-[100px] flex gap-5 p-5 items-center justify-start">
                  <div className="object-cover hover:border-transparent cursor-pointer border-white border-2 rounded-xl">
                    <Link href={{pathname: `user/${userData.username}/${section.title}/more_ideas`, query: {board_id: section._id}}}><Image className="rounded-xl max-h-[70px] max-w-[70px] object-cover " src={section.cover} width={50} height={50} /></Link>
                  </div>
                  <div className="flex flex-col ">
                    <h2 className="font-light text-md">More ideas for</h2>
                    <h2 className="font-bold text-xl truncate-2-lines">{section.title}</h2>
                  </div>

                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className=" shadow-none border-none text-gray-700 text-xl cursor-pointer" />
        <CarouselNext className="shadow-none border-none text-gray-700 text-xl cursor-pointer" />
      </Carousel>

      <div className="columns-[240px] gap-4 p-4 pb-20">
        {pins.map((pin, index) => (
          <div className="p-5">
            <Pin key={index} className="rounded-2xl" pin={pin} />
            {/* <h2>Info</h2> */}
          </div>

        ))}

      </div>
      <Create state={true} username={userData.username}/>
      
    </div>
  )
}

export default Home_user