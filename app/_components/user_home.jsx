import React from 'react'
// import Head from './home_comps/user_head'
import PinterestHeader from './home_comps/user_head'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Create from '../(routes)/user/[username]/created/_components/Create'
import Pin from '../(routes)/pins/_components/Pin'


const Home_user = () => {

  const sections = [
    { name: "Art" },
    { name: "Aesthetic pictures" },
    { name: "Anime" },
    { name: "Sneakers" },
    { name: "Art" },
    { name: "Aesthetic pictures" },
    { name: "Anime" },
    { name: "Sneakers" },
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

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const images = [
    { url: "/a0.jpg" },
    { url: "/a1.jpg" },
    { url: "/a2.jpg" },
    { url: "/a3.jpg" },
    { url: "/a4.jpg" },
    { url: "/a5.jpg" },
    { url: "/a6.jpg" },
    { url: "/a7.jpg" },
    { url: "/a0.jpg" },
    { url: "/a1.jpg" },
    { url: "/a2.jpg" },
    { url: "/a3.jpg" },
    { url: "/a4.jpg" },
    { url: "/a5.jpg" },
    { url: "/a6.jpg" },
    { url: "/a7.jpg" },
  ]

  const pins = [
    { image: "/a0.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a1.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a2.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a3.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a4.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a5.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a6.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a7.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a0.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a1.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a2.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a3.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a4.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a5.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a6.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a7.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a8.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
  ]


  return (
    <div>
      {/* <PinterestHeader /> */}

      <Carousel opts={{ align: "start" }} className="mx-20 mt-5 p-5 max-w-[90%]">
        <CarouselContent className=" w-[500px] flex gap-4">
          {sections.map((section, index) => (
            <CarouselItem key={index} className="basis-1/2">
              <Card className="border-none shadow-none bg-muted" style={{ backgroundColor: getRandomColor() }}>
                <CardContent className="h-[100px] flex gap-5 p-5 items-center justify-start">
                  <div className="object-cover border-white border-2 rounded-xl">
                    <Image className="rounded-xl h-[70px] w-[70px] object-cover " src={`/a${index}.jpg`} width={50} height={50} />
                  </div>
                  <div className="flex flex-col ">
                    <h2 className="font-light text-md">More ideas for</h2>
                    <h2 className="font-bold text-xl">{section.name}</h2>
                  </div>

                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className=" shadow-none border-none text-gray-700 text-xl cursor-pointer" />
        <CarouselNext className="shadow-none border-none text-gray-700 text-xl cursor-pointer" />
      </Carousel>

      <div className="columns-[240px] gap-4 p-4 ">
        {pins.map((pin, index) => (
          <div className="p-5">
            <Pin key={index} className="rounded-2xl" pin={pin} id={index} />
            {/* <h2>Info</h2> */}
          </div>

        ))}

      </div>
      <Create state={true}/>
      
    </div>
  )
}

export default Home_user