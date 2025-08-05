"use client";

import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa6'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface BackButtonProps {
  href: string
}

const BackButton = ({ href }: BackButtonProps) => {
  const [showBackButton, setShowBackButton] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Scroll direction detection (same logic as navbar)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < 100) {
        // At top of page, hide back button (navbar is visible)
        setShowBackButton(false)
      } else {
        // Check scroll direction
        if (currentScrollY < lastScrollY) {
          // Scrolling up - hide back button (navbar will show)
          setShowBackButton(false)
        } else if (currentScrollY > lastScrollY) {
          // Scrolling down - show back button (navbar is hidden)
          setShowBackButton(true)
        }
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const buttonVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
    hidden: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  }

  return (
    <motion.div 
      className="fixed top-6 left-6 z-40"
      variants={buttonVariants}
      animate={showBackButton ? 'visible' : 'hidden'}
      initial="hidden"
    >
      <Link
        href={href}
        className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-gray-200 rounded-2xl transition-all duration-300 hover:scale-105 font-medium shadow-lg"
      >
        <FaArrowLeft className="w-4 h-4" />
        Back
      </Link>
    </motion.div>
  )
}

export default BackButton