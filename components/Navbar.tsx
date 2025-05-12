
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { auth } from "@/auth"
import SignIn from "./Signin";
import { motion } from 'framer-motion'

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Segments", href: "/segment" },
    { label: "Campaigns", href: "/campaign" },
   
];

const Navbar = async () => {
    const session =  await auth();

    
    
    
    
  return (
    <section className="py-4 ml-6 fixed top-0 w-full z-50">
      <div className="container max-w-5xl">
        <div className="border border-white bg-transparent/5 rounded-[27px] md:rounded-full bg-slate-200 backdrop-blur">
          <div className="flex items-center justify-between p-4">
            <div className="flex-shrink-0">
                <Link href={"/"}>
                <Image
                src="/assets/logo2.svg"
                width={120}
                height={40}
                alt="logo"
                className="h-9 md:h-auto w-auto "
              />
                </Link>

              
            </div>
            
            {session ? <nav className="flex gap-6 font-medium text-gray-800">
              {navLinks.map(link => (
                <a 
                  href={link.href} 
                  key={link.label}
                  className="hover:text-gray-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav> :  <SignIn/> }
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
