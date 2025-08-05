'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { logoQuery } from '@/sanity/lib/queries'

interface LogoData {
  _id: string
  logoImage?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  altText: string
  fallbackText: string
}

const Logo = () => {
  const [logoData, setLogoData] = useState<LogoData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const data = await client.fetch(logoQuery)
        setLogoData(data)
      } catch (error) {
        console.error('Error fetching logo:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLogo()
  }, [])

  if (loading) {
    return (
      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
        <div className="text-2xl md:text-3xl font-bold text-white">
          SM
        </div>
      </div>
    )
  }

  // If no logo data or no image, show fallback text
  if (!logoData || !logoData.logoImage) {
    return (
      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
        <div className="text-2xl md:text-3xl font-bold text-white">
          {logoData?.fallbackText || 'SM'}
        </div>
      </div>
    )
  }

  return (
    <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
      <Image
        src={logoData.logoImage.asset.url}
        alt={logoData.altText}
        width={80}
        height={80}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  )
}

export default Logo