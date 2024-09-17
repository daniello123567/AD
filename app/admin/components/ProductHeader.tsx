"use client"
import React from 'react'
import localFont from 'next/font/local'
import supabase from '@/utils/supabase';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { UserButton } from '@clerk/nextjs';

const font = localFont({src:"../fonts/std_book.woff2"})

function ProductHeader() {
  const getProductCount = async ()=>{
    const {data} = await supabase.from("jewelries").select();
    return data?.length;
  }
  const {isPending,data} = useQuery({
    queryKey:["dataa"],
    queryFn:()=>getProductCount()
  })

  return (
    <div className={`${font.className} h-[4.375em] text-[0.9375em] px-[1em] justify-between border-b flex items-center`}>
      <div className='flex items-center gap-[1em]'>
      <p>Products</p>
      {isPending?<Skeleton width={"5em"} height={"1.95833125em"}/>:<div className='bg-[#1321441A] h-[1.95833125em] flex justify-center items-center rounded-[.5em] ml-[.7em] w-[5em] px-[0.5em]'>{data&&data}</div>}
      </div>
      <UserButton appearance={{elements:{footerAction:"hidden"}}}/>
    </div>
  )
}

export default ProductHeader
