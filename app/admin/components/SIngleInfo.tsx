"use client"
import React, { useState } from 'react'
import localFont from 'next/font/local'
import Editicon from './Editicon'
import Deleteicon from './Deleteicon'
import { CloseButton, Spinner } from '@chakra-ui/react'
import Image from 'next/image'
import supabase from '@/utils/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const font = localFont({ src: '../fonts/std_book.woff2' });
const Imager = ({src}:{src:string})=>{
  return <div className="w-[4em] rounded overflow-hidden h-[4em] bg-red-600">
  <Image className='w-full h-full object-cover' src={src} width={500} height={500} alt='image'/>
</div>
}
function SingleInfo({setSingleProduct,singleProductInfo}:any) {
  const [deleting,setdeleting] = useState<boolean>(false)
  const [showConfirm,setshowConfirm] = useState<boolean>(false)
  const router = useRouter()
  const handleToggle = ()=>{
      setshowConfirm(!showConfirm)
   }
   const handleDelete = async()=>{
    setdeleting(true)
    await supabase.from('jewelries').delete().eq("id",singleProductInfo.id)
     setdeleting(false);
       router.refresh()
  }
  return (
    <div className='w-full z-[30000] h-full fixed bg-white/50 backdrop-blur-sm top-0'>
        <div className={` ${font.className} relative  w-[80%] mx-auto mt-[4em] rounded-[.7em] bg-white border min-h-[30em]`}>
          <div className='absolute flex gap-[1em] w-max bottom-[1em] z-[300000]  right-[1em]'>
            <Link href={`/admin/new?edit=${singleProductInfo.id}`} className='w-[2em] h-[2em] border p-[.3em] rounded'>
             <Editicon/>
            </Link>
            <div onClick={handleToggle} className='w-[2em] h-[2em] border p-[.3em] rounded'>
              <Deleteicon/>
            </div>
          </div>
          <div className='p-[1.5em] text-center border-b'>
            Product Info
            <CloseButton onClick={()=>setSingleProduct(false)} className='absolute right-[1em] top-[1em]'/>
          </div>
          <div className=' flex relative flex-col gap-[1em] p-[1em]'>
            <p>Name: {singleProductInfo.Name}</p>
            <p>Category: {singleProductInfo.Type}</p>
            <p>Description: {singleProductInfo.Description}</p>
            <p>Price: {singleProductInfo.Price}</p>
            <p>Current Tag: {singleProductInfo.Tag}</p>
            <p>Color: {singleProductInfo.Color}</p>
            <p>Amount left in stock: {singleProductInfo.Amount_in_stock}</p>
             <div className='flex gap-[1em] flex-wrap w-full'>
            images:
            {singleProductInfo.images.map((image:string)=>{
              return <Imager key={image} src={image}/>
            })}</div>
          </div>
     {showConfirm&&<div className='w-[80%] border fixed top-[10em] p-[1em] h-max border-red-400 rounded-[.5em] bg-white'>
      Are You Sure You Want to delete Product &apos;{singleProductInfo.Name}&apos;
     <div className='flex justify-end items-center gap-[1em]'>
     <button onClick={handleToggle} className={`${font.className} flex justify-center items-center bg-[#72E3ADCC] px-[0.75em] py-[0.5em] text-black border border-1 border-[#097C4F] rounded-[0.3125em] font-[500] text-[0.75em]`}>Cancel</button>
     <button onClick={handleDelete} className={`${font.className} flex justify-center items-center bg-[#e37272cc] px-[0.75em] py-[0.5em] text-black border border-1 border-[#7c0909] rounded-[0.3125em] font-[500] text-[0.75em]`}>{deleting?<Spinner/>: 'Proceed'}</button>

     </div>
     </div>}
        </div>
    </div>
  )
}

export default SingleInfo
