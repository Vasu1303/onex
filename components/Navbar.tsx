import Link from "next/link";
import React from "react";
import { auth } from "@/auth";
import SignIn from "./Signin";
import { SignOut } from "./Signout";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Segments", href: "/segment" },
  { label: "Campaigns", href: "/campaign" },
];

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white z-50">
      <div className="container h-full mx-auto px-4">
        <div className="h-full max-w-5xl mx-auto">
          <div className="h-full border border-white bg-transparent/5 rounded-[27px] md:rounded-full bg-slate-200 backdrop-blur">
            <div className="flex items-center justify-between p-4">
              <div className="flex-shrink-0">
                <Link href={"/"} className="">
                  <h2 className="text-3xl text-blue-600 font-semibold pb-2">
                    onex
                  </h2>
                </Link>
              </div>

              {session ? (
                <div className="flex items-center gap-6">
                  <nav className="flex gap-6 font-medium text-gray-800">
                    {navLinks.map((link) => (
                      <Link
                        href={link.href}
                        key={link.label}
                        className="hover:text-gray-600 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  
                  <div className="flex items-center gap-4">
                    <HoverCard>
                    <div className="flex items-center gap-2">
                      <HoverCardTrigger>
                      
                      <Avatar className="h-8 w-8">
                        <AvatarImage 
                          src={session.user?.image || ''} 
                          alt={session.user?.name || 'User avatar'} 
                        />
                        <AvatarFallback>
                          {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      </HoverCardTrigger>
                      <HoverCardContent>
                          <p>{session.user?.name}</p>
                      </HoverCardContent>
                      
                    </div>
                    </HoverCard>
                    
                    <SignOut />
                  </div>
                </div>
              ) : (
                <SignIn />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
