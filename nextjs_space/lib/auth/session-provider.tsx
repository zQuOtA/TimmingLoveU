
'use client'

import { SessionProvider as NextSessionProvider } from 'next-auth/react'
import { ReactNode, useEffect, useState } from 'react'

interface Props {
  children: ReactNode
}

export default function SessionProvider({ children }: Props) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <>{children}</>
  }

  return (
    <NextSessionProvider>
      {children}
    </NextSessionProvider>
  )
}
