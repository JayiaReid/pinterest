import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Section = ({section}) => {
  return (
    <Link href={`/user/${section.user}/${section.board}/${section.title}`} className='p-5 h-[250px] w-[270px] flex flex-col '>
    <div className='grid grid-cols-3  rounded-xl h-[200px] w-[250px] overflow-hidden'>
      
      {section.images.slice(0, 3).map((image, index) => (
        <div key={index} className='relative col-span-1 h-full w-full'>
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
      <h2 className='font-semibold text-lg'>{section.title}</h2>
      <h2 className='text-sm'>{section.pins} Pins</h2>
    </div>
  </Link>
  )
}

export default Section