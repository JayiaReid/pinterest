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
    { name: "Art", image: "/a10.jpg"},
    { name: "Aesthetic pictures", image: "/a26.jpg" },
    { name: "Anime", image: "/a12.jpg" },
    { name: "Vision Board", image: "/a3.jpg" },
    { name: "Hobbies",image: "/a17.jpg" },
    { name: "Random", image: "/a4.jpg" },
    { name: "Bible", image: "/a21.jpg" },
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

  const pins = [
    { image: "/a0.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a1.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a2.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a3.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a4.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a5.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a6.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a7.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a8.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a9.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a10.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a11.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a12.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a13.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a14.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a15.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a16.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
    { image: "/a17.jpg", user: "user_2nJ9SYAXcPeU6OghO7vvBRTg4Li" },
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
                    <Image className="rounded-xl h-[70px] w-[70px] object-cover " src={section.image} width={50} height={50} />
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