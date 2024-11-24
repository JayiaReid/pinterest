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
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'
import { toast } from '@/hooks/use-toast'
import { Skeleton } from '@/components/ui/skeleton'

const Page = () => {
  const { isLoaded, user } = useUser()
  const [url, setUrl] = useState('')
  const [active, setActive]=useState(false)
  const [filled, setFilled] = useState(false)
  const [same, setSame] = React.useState(false)
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    about: '',
    website: '',
    username: '',
    email: '',
    photo: '',
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
        const response = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email}),
        })
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


  const uploadImage = async (file) => {
    const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
    })
    const result = await response.json()
    setUrl(result.url)

}

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
        description: response.message
      })
      fetchUserProfile()
    } else if (response.status == 401) {
      setSame(true)
    } else {
      toast({
        title: "Error updating profile",
        description: response.message
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
      {filled && <div className='flex mt-5 flex-col p-5 gap-5 w-3/5 mb-40'>
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
              <AvatarFallback>PIN</AvatarFallback>
            </Avatar>
          </div>
          <Dialog onOpenChange={(isOpen) => {setUrl('')}}>
            <DialogTrigger asChild>
              <Button  variant="muted" size={30} className="bg-muted text-lg text-foreground p-3 rounded-3xl shadow-none">Change</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <h2>Select an Image</h2>
              </DialogHeader>
              <div>
                <Input
                  type="file"
                  id="fileInput"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      uploadImage(file)
                    }
                  }}
                  className="rounded-3xl p-2 my-5  text-center bg-muted border-2 shadow-none border-dotted"
                />
                <Button>Upload Image</Button>
              </div>
              <h2 className='font-semibold'>OR</h2>
              <div>
                
                <Input value={url} className="w-full shadow-none rounded-xl border-muted-foreground text-md p-5 focus:outline-muted" placeholder={'Or Enter a URL'} onChange={(e) => { setUrl(e.target.value)}} />
              </div>

              <DialogFooter>
                <DialogClose>
                  <Button onClick={(e)=>setData((prevData) => ({ ...prevData, photo: url })) }>Save</Button>
                </DialogClose>
              </DialogFooter>
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
          {same ? <h2 className='text-sm  text-primary'>username taken</h2> : <h2 className='text-sm text-muted-foreground'>www.pinterest.com/{data.username ? data.username : user?.username}</h2>}
        </div>
        <div className='flex flex-col font-semibold gap-5 p-2 rounded-xl'>
          <div className='flex justify-between'>
            <h2>Advanced Profile Settings:</h2>
            <SignOutButton><Button size={30} className="bg-primary self-end text-white text-lg px-4 py-2 rounded-3xl shadow-none">Sign Out</Button></SignOutButton>
          </div>
          <div className='hidden lg:block md:hidden sm:hidden xs:hidden'>
            <UserProfile />
            </div>
          
        </div>

      </div>
      }
      <div className='fixed flex gap-2 justify-end p-5 h-2/10 border-t-2 bg-background bottom-0 w-full shadow-xl m-0'>
        <Button disabled={isDataEqual} onClick={() => setData(originalData)} variant="muted" size={30} className="bg-muted text-lg text-foreground p-3 rounded-3xl shadow-none">Reset</Button>
        <Button disabled={isDataEqual} onClick={() => handleSave()} size={30} className=" text-lg p-3 rounded-3xl shadow-none">Save</Button>
      </div>
    </div>
  )
}

export default Page
