"use client"
import Image from 'next/image'
import React from 'react'
import {motion} from "framer-motion"

const Features = () => {
  return (
    <section className='w-full  min-h-screen  '>
        <h2 className='text-5xl text-center font-semibold text-blue-600 mb-5'>Our Features</h2>
      <div className='container mx-auto px-4 py-20 bg-blue-300 rounded-3xl   '>
        <div className='flex flex-col md:flex-row items-center justify-between gap-12  '>
          <div className='flex-1 space-y-6'>
            <h1 className='text-4xl pl-3 md:text-6xl font-bold text-white '>
              Delight your most valuable customers with <span className='text-blue-600'>exclusive rewards & experiences</span> 
            </h1>
          </div>
          <div className='flex-1'>
            <motion.span  initial={{opacity:0, y:50}} animate={{opacity:1, y:0}} transition={{duration:0.5, delay:0.8}}>
                <Image 
              src="/assets/feature1.webp" 
              alt='Feature'
              width={500} 
              height={500}
              className='rounded-lg'
            />
            </motion.span>
            
          </div>
        </div>
      </div>
      <div className='container mx-auto mt-10 px-4 py-20 bg-blue-300 rounded-3xl   '>
        <div className='flex flex-col md:flex-row items-center justify-between gap-12  '>
            <div className='flex-1'>
            <motion.span  initial={{opacity:0, y:50}} animate={{opacity:1, y:0}} transition={{duration:0.5, delay:0.8}}>
                <Image 
              src="/assets/features2.webp" 
              alt='Feature'
              width={500} 
              height={500}
              className='rounded-lg'
            />
            </motion.span>
            
          </div>
          <div className='flex-1 space-y-6'>
            <h1 className='text-4xl md:text-6xl font-bold text-white '>
              Acquire & retain customers with <span className='text-blue-600'> better offers tailored  </span> to their specific behaviors
            </h1>
          </div>
          
        </div>
      </div>
      <div className='container mx-auto mt-10 px-4 py-20    '>
        <div className='flex flex-col md:flex-row items-center justify-between gap-12  '>
           
          <div className='flex-1 space-y-6'>
            <h1 className='text-4xl md:text-6xl font-bold text-black w-full text-center '>
              Acquire & retain customers with <span className='text-blue-600 block'> better offers tailored  </span> to their specific behaviors
            </h1>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default Features