"use client"
import React from 'react'
import localFont from 'next/font/local'
import Header from '../components/newproductcomponents/Header'
import Inputs from '../components/newproductcomponents/inputs'
const font = localFont({src:"../fonts/std_book.woff2"})

function Page() {

  return (
    <div className={`${font.className} pt-[5em]`}>
      <Header/>
      <Inputs/>
    </div>
  )
}

export default Page
