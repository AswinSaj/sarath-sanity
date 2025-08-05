import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { links } from './data'

interface NavLinksProps {
  setIsActive: (active: boolean) => void
}

const perspective = {
  initial: {
    opacity: 0,
    rotateX: 90,
    translateY: '80px',
    translateX: '-20px',
  },
  animate: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    translateY: '0px',
    translateX: '0px',
    transition: {
      duration: 0.65,
      delay: 0.5 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1] as const,
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as const },
  },
}

const NavLinks = ({ setIsActive }: NavLinksProps) => {
  return (
    <div className="h-full w-full px-6 md:px-10 py-8 md:py-12 flex flex-col justify-center items-center box-border">
      <div className="flex flex-col gap-3 md:gap-4 items-center">
        {links.map((link, i) => {
          return (
            <div key={i} className="[perspective:120px] [perspective-origin:bottom]">
              <motion.div
                variants={perspective}
                custom={i}
                initial='initial'
                animate='animate'
                exit='exit'
                className="block text-center"
              >
                <Link 
                  href={link.href} 
                  onClick={() => setIsActive(false)}
                  className="text-black no-underline text-xl md:text-2xl lg:text-3xl transition-all duration-500 hover:text-gray-600 block"
                >
                  {link.title}
                </Link>
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default NavLinks