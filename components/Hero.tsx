"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { auth } from '@/auth'

const Hero =  () => {
    
  return (
    <section className='rounded-lg py-24 px-18 overflow-x-clip'>
        <div className='container'>
            <div className="flex justify-center mt-2">
                
                <motion.span initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.5, delay:1.3}} >
                <div className="inline-flex py-1 px-3 mt-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full text-neutral-950 font-semibold">
                    
                        ✨ The Simplest CRM Ever

                   
                    
                </div>
                 </motion.span>
            </div>

            <h1 className="mt-6 text-4xl font-medium text-center md:text-7xl lg:text-8xl">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className='text-blue-600 block'
                >
                    10x Simpler Campaigns.
                </motion.span>
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    100x Better Retention.
                </motion.span>
            </h1>

            <motion.div 
                className='pb-10'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <p className="mt-8 text-center text-xl text-gray-500 max-w-2xl mx-auto">
                    Powerful Personalization Without the Manual Hustle  
                </p>
            </motion.div>
            <motion.span initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.8 }}>
            <div  className="flex border border-slate-600 outline-none  rounded-full  p-2 mt-8 w-full max-w-lg mx-auto ">
                <input type="email" name="" id="" placeholder="Subscribe to our news letter" className="bg-transparent outline-none px-4 min-w-0 flex-1" />

                <Button  type="submit" className="whitespace-nowrap rounded-full bg-white text-blue-600 shadow hover:bg-slate-100 " >Subscribe</Button>
            </div>
            </motion.span>
        </div>
    </section>
  )
}

export default Hero