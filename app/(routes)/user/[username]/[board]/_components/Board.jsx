import { Edit2, LockIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Board = ({ board }) => {
  return (
    <Link href={`/user/${board.user}/${board.title}`} className='p-5 h-[270px] w-[250px] flex flex-col '>
      <div className='grid grid-cols-3 grid-rows-2 rounded-xl h-[200px] w-[250px] overflow-hidden'>
      {!board.public && (
          <div className="absolute p-2 z-10">
            <LockIcon strokeWidth={2.75} className="text-black bg-white  p-1 rounded-full" />
          </div>
        )}
        <div className='col-span-2 row-span-2 relative'>
          <Image
            src={board.cover}
            layout="fill"
            objectFit="cover"
            // className='rounded-xl'
            alt={board.title}
          />
        </div>
        {board.images.slice(0, 2).map((image, index) => (
          <div key={index} className='relative h-full w-full'>
            <Image
              src={image.url}
              layout="fill"
              objectFit="cover"
            //   className='rounded-xl'
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className='mt-2 ml-2'>
        <h2 className='font-semibold text-lg'>{board.title}</h2>
        <h2 className='text-sm'>{board.pins} Pins</h2>
      </div>
    </Link>
  )
}

export default Board
