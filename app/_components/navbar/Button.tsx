import React from 'react'
import { motion } from 'framer-motion'
import { FaBars, FaXmark } from 'react-icons/fa6'

interface ButtonProps {
  isActive: boolean
  setIsActive: (active: boolean) => void
}

const Button = ({ isActive, setIsActive }: ButtonProps) => {
  return (
    <div 
      onClick={() => setIsActive(!isActive)} 
      className="select-none w-[50px] h-[50px] sm:w-[50px] sm:h-[50px] xs:w-[40px] xs:h-[40px] rounded-2xl absolute top-0 right-0 overflow-hidden cursor-pointer focus:outline-none"
    >
      <motion.div
        animate={{ y: isActive ? '-100%' : '0%' }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        className="relative h-full w-full z-[1]"
      >
        <div className="w-full h-full bg-white text-black text-lg flex items-center justify-center">
          <FaBars />
        </div>
        <div className="w-full h-full bg-black text-white text-lg flex items-center justify-center">
          <FaXmark />
        </div>
      </motion.div>
    </div>
  )
}

export default Button