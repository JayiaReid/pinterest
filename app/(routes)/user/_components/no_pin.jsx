import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Nopins = ({ state }) => {

    if (state) return (
        <div className="mt-5 flex items-center justify-center flex-col gap-5">
            <h2 >Nothing to show...yet! Explore and Save pins. They will live here.</h2>
            <Link href={'/'}><Button className="rounded-3xl p-3">Explore</Button></Link>
        </div>
    )

    return (
        <div className="mt-5 flex items-center justify-center flex-col gap-5">
            <h2 >Nothing to show...yet! Pins you create will live here.</h2>
            <Link size={30} href={'/pin-creation-tool'}><Button className="rounded-3xl p-3">Create Pin</Button></Link>
        </div>
    )
}

export default Nopins