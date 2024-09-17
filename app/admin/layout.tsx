import React from 'react'
import localFont from 'next/font/local'
import { Metadata } from 'next'
const font = localFont({src:"./fonts/std_book.woff2"})
export const metadata:Metadata={
  title:"ADMIN| NUBE",
  icons:"/lock.svg"
}
function RootLayout({children}:{children:React.ReactNode}) {
  return (
      <div className={`bg-[#F8F8F8] ${font.className} min-h-screen`}>
      {children}
      </div>

  )
}

export default RootLayout
