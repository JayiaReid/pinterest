"use client"
import React from 'react'
import SideNav from '../_components/sideNav'
import { SignOutButton, UserButton, useUser } from '@clerk/nextjs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { UserProfile } from '@clerk/clerk-react'

const page = () => {

  const { isLoaded, user } = useUser()
  const [firstName, setFirstName] = React.useState()
  const [lastName, setLastName] = React.useState()
  const [about, setAbout] = React.useState()
  const [website, setWebsite] = React.useState()
  const [username, setUsername] = React.useState('Default123')

  // get from api: first name, lastname, about, pronouns, website, username


  if (!isLoaded) return <div className="flex items-center justify-center absolute h-screen bg-white w-screen top-0 left-0">
    <div className='loader'></div>
  </div>

  return (
    <div className='flex flex-row gap-10 p-5'>
      <SideNav page={"profile"} />
      <div className='flex mt-5 flex-col gap-5 w-3/5 mb-10'>
        <h2 className='text-3xl font-bold'>Edit Profile</h2>
        <h2 className='text-lg'>Keep your personal details private. Information you add here is visible to anyone who can view your profile.</h2>
        <div className='flex gap-5 items-center'>
          <div className='flex flex-col'>
            <h2 className='text-sm'>Photo</h2>
            <Avatar className="w-24 h-full">
              <AvatarImage
                src="/pp.jpeg"
                alt="profile picture"
                className="object-cover rounded-full"
                width={30}
                height={30}
              // style={{ objectFit: 'cover' }}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <Button variant="muted" size={30} className="bg-muted text-lg text-foreground p-3 rounded-3xl shadow-none">Change</Button>
        </div>
        <div className='flex gap-2 w-full'>
          <div className='flex flex-col gap-2 w-full'>
            <Label htmlFor="fname" className="text-md text-left text-foreground">
              First Name
            </Label>
            <Input required onChange={(e) => setFirstName(e.target.value)} id="fname" value={firstName} className="w-full shadow-none rounded-xl border-muted-foreground text-md p-5 focus:outline-muted" />
          </div>
          <div className='flex flex-col w-full gap-2'>
            <Label htmlFor="lname" className="text-md text-left text-foreground">
              Last Name
            </Label>
            <Input onChange={(e) => setLastName(e.target.value)} id="lname" value={lastName} className="w-full shadow-none rounded-xl border-muted-foreground text-md p-5 focus:outline-muted" />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor="lname" className="text-md text-left text-foreground">
            About
          </Label>
          <Textarea onChange={(e) => setAbout(e.target.value)} id="lname" value={about} placeHolder={`Tell your story`} className="w-full shadow-none rounded-xl border-muted-foreground text-md p-5 focus:outline-muted" />
        </div>
        <div className='flex flex-col w-full gap-2'>
          <Label htmlFor="website" className="text-md text-left text-foreground">
            Website
          </Label>
          <Input onChange={(e) => setWebsite(e.target.value)} id="website" value={website} placeHolder={`Add a link to drive traffic to your site`} className="w-full shadow-none rounded-xl border-muted-foreground text-md p-5 focus:outline-muted" />
        </div>
        {/* (default username will be created on sign up) */}
        <div className='flex flex-col w-full gap-2'>
          <Label htmlFor="username" className="text-md text-left text-foreground">
            Username 
          </Label>
          <Input required onChange={(e) => setUsername(e.target.value)} id="username" value={username} className="w-full shadow-none rounded-xl border-muted-foreground text-md p-5 focus:outline-muted" />
          <h2 className='text-sm text-muted-foreground'>www.pinterest.com/{username ? username : user?.username}</h2>
        </div>
        <div className='flex flex-col font-semibold gap-5  p-2 rounded-xl'>
          <div className='flex justify-between'>
            <h2>Advanced Profile Settings: </h2>
            {/* <UserButton /> */}
            <SignOutButton><Button className="rounded-lg">Sign Out</Button></SignOutButton>
          </div>
          <UserProfile/>
        </div>
      </div>
    </div>
  )
}

export default page