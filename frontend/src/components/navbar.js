"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-7xl 
      ${scrolled ? "bg-white/70" : ""} backdrop-blur-md 
      rounded-2xl px-6 py-3 shadow-lg flex justify-between items-center transition-colors duration-300`}
    >
      <div className="flex items-center space-x-2">
        <Image
          src="/icons/smilecheck.png"
          alt="SmileCheck Logo"
          width={180}
          height={180}
        />
      </div>
      <div className="hidden md:flex space-x-10 font-medium text-black">
        <Link href="#">Features</Link>
        <Link href="#">About</Link>
        <Link href="#">How it Works</Link>
      </div>
      <Link
        href="#"
        className="bg-[#0B869F] hover:bg-cyan-800 text-white px-5 py-2 rounded-full text-md font-light transition"
      >
        Sign up/Login
      </Link>
    </nav>
  )
}


//comment