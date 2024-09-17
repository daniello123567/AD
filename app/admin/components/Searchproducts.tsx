"use client"
import React from 'react'
import localFont from 'next/font/local'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
const font = localFont({src:"../fonts/std_book.woff2"})


function Searchproducts() {
  const searchParams = useSearchParams();
  const {replace} = useRouter()
  const params = new URLSearchParams(searchParams);
  const currentPath = usePathname();
  const handleSearch = (text:string)=>{
  if(text){
   params.set("query",text);
   replace(`${currentPath}?${params}`,{scroll:false})
  }else{
    params.delete("query");
    replace(`${currentPath}?${params}`)
  }
  }
  return (
    <div className='mt-[1em] border-b pb-[.8em] flex justify-between px-[1em]'>
      <input onChange={(e)=>handleSearch(e.target.value)} className={`${font.className} py-[0.5em] outline-none text-[#574E58] text-[0.875em] px-[0.75em] border rounded-[0.3125em]`} type='text' placeholder='Search product'/>
    <Link href="/admin/new" className={`${font.className} flex justify-center items-center bg-[#72E3ADCC] px-[0.75em] py-[0.5em] text-black border border-1 border-[#097C4F] rounded-[0.3125em] font-[500] text-[0.75em]`}>&#43; New product</Link>
    </div>
  )
}

export default Searchproducts
