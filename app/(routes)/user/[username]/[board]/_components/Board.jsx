import { Edit2, LockIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'

const Board = ({ board, user }) => {

  const [pins, setPins] = React.useState(0)

  useEffect(() => {
    let numOfPins = board.pins?.length

    board.sections?.forEach(section => {
      if (section.pins.length > 0) {
        numOfPins += section.pins.length
      }
    })

    setPins(numOfPins)
  }, [board])


  return (
    <Link href={`/user/${user}/${board.title}`} className='p-5 max-h-[350px] w-[250px] flex flex-col '>
      <div className='grid grid-cols-3 grid-rows-2 rounded-xl h-[200px] w-[250px] overflow-hidden'>
        {board.private && (
          <div className="absolute p-2 z-10">
            <LockIcon strokeWidth={2.75} className="text-black bg-white  p-1 rounded-full" />
          </div>
        )}
        <div className='col-span-2 row-span-2 h-full relative'>
          <Image
            src={board.cover}
            layout="fill"
            objectFit="cover"
            alt={board.title}
          />
        </div>
        <div className='relative border-l-2 border-b-2 border-background h-full w-full'>
          <Image
            src={board.images[0]}
            layout="fill"
            objectFit="cover"
            //   className='rounded-xl'
            alt={`Image 1`}
          />
        </div>
        <div className='relative border-l-2 border-background h-full w-full'>
          <Image
            src={board.images[1]}
            layout="fill"
            objectFit="cover"
            //   className='rounded-xl'
            alt={`Image 1`}
          />
        </div>
      </div>
      <div className='mt-2 ml-2'>
        <h2 className='font-semibold text-lg'>{board.title}</h2>
        <h2 className='text-sm'>{pins} Pins</h2>
      </div>
    </Link>
  )
}

export default Board
