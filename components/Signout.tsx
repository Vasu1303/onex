'use client'
import { signOut } from "next-auth/react"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"

export function SignOut() {
  return (
    <div className="flex justify-center ">
      <Button
        onClick={() => signOut({ callbackUrl: '/' })}
        variant="outline"
        className="flex items-center gap-2 text-red-500 hover:text-red-600 rounded-full hover:bg-red-50"
      >
        <LogOut className="w-4 h-4" />
        
      </Button>
    </div>
  )
}