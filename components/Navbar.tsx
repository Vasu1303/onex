
import Link from "next/link";
import React from "react";
import { auth } from "@/auth"
import SignIn from "./Signin";

import { SignOut } from "./Signout";

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
                <Link href={"/"} className="">
                <h2 className="text-3xl text-blue-600 font-semibold pb-2">onex</h2>
                </Link>

              
            </div>
            
            {session ? (
              <div className="flex items-center  gap-6">
                <nav className="flex gap-6 font-medium text-gray-800">
                  {navLinks.map(link => (
                    <Link 
                      href={link.href} 
                      key={link.label}
                      className="hover:text-gray-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                
                <SignOut />
              </div>
            ) : <SignIn />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
