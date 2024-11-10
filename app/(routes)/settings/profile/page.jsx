"use client"
import React, { useEffect, useState } from 'react'
import SideNav from '../_components/sideNav'
import { SignOutButton, UserButton, useUser } from '@clerk/nextjs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { UserProfile } from '@clerk/clerk-react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'
import { toast } from '@/hooks/use-toast'

const Page = () => {
  const { isLoaded, user } = useUser()
  const [url, setUrl]=useState('')
  const [filled, setFilled] = useState(false)
  const [same, setSame] = React.useState(false)
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    about: '',
    website: '',
    username: 'Default123',
    email: '',
    photo: '/pp.jpeg',
  })
  const [originalData, setOriginalData] = useState({
    firstName: '',
    lastName: '',
    about: '',
    website: '',
    username: '',
    email: '',
    photo: '',
  })
  const [isDataEqual, setIsDataEqual] = useState(true)

  const fetchUserProfile = async () => {
    if (user) {
      const email = user.emailAddresses[0].emailAddress
      setData((prevData) => ({ ...prevData, email }))
      setOriginalData((prevData) => ({ ...prevData, email }))

      try {
        const response = await fetch(`/api/user?email=${email}`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const res = await response.json()
        console.log(res.data)
        if (res.success) {
          setData((prevData) => ({
            ...prevData,
            firstName: res.data?.firstName || user.firstName,
            lastName: res.data?.lastName || user.lastName,
            about: res.data?.about || '',
            website: res.data?.website || '',
            username: res.data?.username || user.id,
            photo: res.data?.photo
          }))
          setOriginalData((prevData) => ({
            ...prevData,
            firstName: res.data?.firstName || user.firstName,
            lastName: res.data?.lastName || user.lastName,
            about: res.data?.about || '',
            website: res.data?.website || '',
            username: res.data?.username || user.id,
            photo: res.data?.photo
          }))
          setFilled(true)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }
  }

  // eventually will fetch their pins
  const images = [
    "https://i.pinimg.com/564x/e9/85/57/e985573758839139632063c79f2c0ba8.jpg",
    "https://i.pinimg.com/564x/46/ff/4b/46ff4b90b947ea842b8e20ae06f1a9e5.jpg",
    "https://i.pinimg.com/564x/ac/8e/8d/ac8e8d643cc5d66dbe027bbfe2a28f10.jpg",
    "https://i.pinimg.com/564x/38/78/60/387860e52aa35aab0306b2934b6d3a5d.jpg",
    // "/b1.jpg",
    "/b2.jpg",
    "/b3.jpg",
    "/b4.jpg",
    // "/b5.jpg",
    "/b6.jpg",
    "/b7.jpg",
    "/b8.jpg",
  ]


  useEffect(() => {
    fetchUserProfile()
  }, [user])

  useEffect(() => {
    setIsDataEqual(JSON.stringify(data) === JSON.stringify(originalData))
  }, [data, originalData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    const response = await fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    console.log(response)
const result = response.json()
    if (response.ok) {
      setSame(false)
      toast({
        title: "Profile updated successfully", 
        description: result.message
      })
      fetchUserProfile()
  }else if(response.status == 401){
      setSame(true)
  }else{
    toast({
        title: "Error updating profile", 
        description: result.message
      })
  }
  
  }


  if (!isLoaded) return (
    <div className="flex items-center justify-center absolute h-screen bg-white w-screen top-0 left-0">
      <div className='loader'></div>
    </div>
  )

  return (
    <div className='flex flex-row gap-10 '>
      <SideNav page={"profile"} />
      <div className='flex mt-5 flex-col p-5 gap-5 w-3/5 mb-40'>
        <h2 className='text-3xl font-bold'>Edit Profile</h2>
        <h2 className='text-lg'>Keep your personal details private. Information you add here is visible to anyone who can view your profile.</h2>
        <div className='flex gap-5 items-center'>
          <div className='flex flex-col'>
            <h2 className='text-sm'>Photo</h2>
            <Avatar className="w-24 h-full">
              <AvatarImage
                src={data.photo}
                alt="profile picture"
                className="object-cover rounded-full"
                width={30}
                height={30}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <Dialog onOpenChange={(isOpen)=>setUrl('')}>
            <DialogTrigger>
              <Button variant="muted" size={30} className="bg-muted text-lg text-foreground p-3 rounded-3xl shadow-none">Change</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <h2>Select an Image</h2>
              </DialogHeader>
              <ScrollArea className="h-[500px]">
                <div className='columns-3'>
                  {images.map((image, index)=>(
                    <Image onClick={()=>setData((prevData) => ({...prevData,photo: image,}))} src={image} key={index} height={400} width={400} className='p-2 rounded-xl cursor-pointer' />
                  ))}
                </div>
              </ScrollArea>
              <div>
                <Input value={url} className="w-full shadow-none rounded-xl border-muted-foreground text-md p-5 focus:outline-muted" placeholder={'Or Enter a URL'} onChange={(e)=>{setUrl(e.target.value);setData((prevData) => ({...prevData, photo: e.target.value}))}} />
              </div>
              
            </DialogContent>
          </Dialog>

        </div>
        <div className='flex gap-2 w-full'>
          <div className='flex flex-col gap-2 w-full'>
            <Label htmlFor="firstName" className="text-md text-left text-foreground">
              First Name
            </Label>
            <Input
              required
              name="firstName"
              onChange={handleChange}
              id="firstName"
              value={data.firstName}
              className="w-full shadow-none rounded-xl border-muted-foreground text-md p-5 focus:outline-muted"
            />
          </div>
          <div className='flex flex-col w-full gap-2'>
            <Label htmlFor="lastName" className="text-md text-left text-foreground">
              Last Name
            </Label>
            <Input
              name="lastName"
              onChange={handleChange}
              id="lastName"
              value={data.lastName}
              className="w-full shadow-none rounded-xl border-muted-foreground text-md p-5 focus:outline-muted"
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor="email" className="text-md text-left text-foreground">
            Email
          </Label>
          <Input
            id="email"
            value={data.email}
            disabled
            className="w-full shadow-none rounded-xl border-muted-foreground text-md p-5 focus:outline-muted"
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor="about" className="text-md text-left text-foreground">
            About
          </Label>
          <Textarea
            name="about"
            onChange={handleChange}
            id="about"
            value={data.about}
            placeholder={`Tell your story`}
            className="w-full shadow-none rounded-xl border-muted-foreground text-md p-5 focus:outline-muted"
          />
        </div>
        <div className='flex flex-col w-full gap-2'>
          <Label htmlFor="website" className="text-md text-left text-foreground">
            Website
          </Label>
          <Input
            name="website"
            onChange={handleChange}
            id="website"
            value={data.website}
            placeholder={`Add a link to drive traffic to your site`}
            className="w-full shadow-none rounded-xl border-muted-foreground text-md p-5 focus:outline-muted"
          />
        </div>
        <div className='flex flex-col w-full gap-2'>
          <Label htmlFor="username" className="text-md text-left text-foreground">
            Username
          </Label>
          <Input
            required
            name="username"
            onChange={handleChange}
            id="username"
            value={data.username}
            className="w-full shadow-none rounded-xl border-muted-foreground text-md p-5 focus:outline-muted"
          />
          {same?<h2 className='text-sm  text-primary'>username taken</h2> :<h2 className='text-sm text-muted-foreground'>www.pinterest.com/{data.username ? data.username : user?.username}</h2>}
        </div>
        <div className='flex flex-col font-semibold gap-5 p-2 rounded-xl'>
          <div className='flex justify-between'>
            <h2>Advanced Profile Settings:</h2>
            <SignOutButton><Button className="rounded-lg">Sign Out</Button></SignOutButton>
          </div>
          <UserProfile />
        </div>

      </div>
      <div className='fixed flex gap-2 justify-end p-5 h-2/10 border-t-2 bg-background bottom-0 w-full shadow-xl m-0'>
        <Button disabled={isDataEqual} onClick={()=>setData(originalData)} variant="muted" size={30} className="bg-muted text-lg text-foreground p-3 rounded-3xl shadow-none">Reset</Button>
        <Button disabled={isDataEqual} onClick={()=>handleSave()} size={30} className=" text-lg p-3 rounded-3xl shadow-none">Save</Button>
      </div>
    </div>
  )
}

export default Page
