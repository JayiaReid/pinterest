"use client"
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import Nav from "./_components/header";
import Home_user from "./_components/user_home";
import Root_Home from "./_components/root_home";
import { LoaderCircleIcon } from "lucide-react";

export default function Home() {
  const {isSignedIn, isLoaded}=useUser()

  if (!isLoaded) return <div className="flex items-center justify-center absolute h-screen bg-white w-screen top-0 left-0">
    <div className='loader'></div>
  </div>

// note: code is a bit messy because of dummy data but all will be organized once i have implemented backend
  return (
    <div className="h-screen">
      {isSignedIn? <Home_user/> : <Root_Home/> }
    </div>
  );
}
