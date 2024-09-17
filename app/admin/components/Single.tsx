"use client"
import React, {  useEffect, useState } from 'react'
import localFont from 'next/font/local'
const font = localFont({src:"../fonts/std_book.woff2"})
import { Switch } from '@chakra-ui/react'
import Image from 'next/image'
import supabase from '@/utils/supabase'
type prop = {
  imageSrcsingle:string,Details:string,Amtinstock:number,Name:string,Type:string,Price:number,Color:string,Tag:string,id:string,funcTionTorun:React.Dispatch<React.SetStateAction<boolean>>,setsingleProductInfo:React.Dispatch<React.SetStateAction<Hml>>,imageArray:string[]
}
declare global {type Hml = {
  id:string|number|undefined,
  Name:string,
  Price:number,
  Type:string,
  Tag:string,
  images:string[],
  Color:string,
  Amount_in_stock:number,
  Description:string
}}
function Single({Details,Amtinstock,imageSrcsingle,Name,Type,Price,Tag,id,funcTionTorun,setsingleProductInfo,imageArray,Color}:prop) {
  const [currentTag,setCurrentTag] = useState<string>('')
   useEffect(()=>{
     const getTag = async ()=>{
      const {data} = await supabase.from("jewelries").select().eq("id",id).single();
       setCurrentTag(data.Tag)
    };
    getTag()
   },[])
  const ToggleStock = async()=>{
    const {data} = await supabase.from("jewelries").select().eq("id",id).single();
    const currentTagx = data.Tag;
    if(currentTagx.toLowerCase()==="out-of-stock"){
      setCurrentTag('in-stock')
      await supabase.from("jewelries").update({Tag:"in-stock"}).eq("id",id);
    }else{
      setCurrentTag('out-of-stock')
      await supabase.from("jewelries").update({Tag:"out-of-stock"}).eq("id",id);
    }

  }
const activateToggle = ()=>{
  ToggleStock()
}
const handleSingle = ()=>{
 funcTionTorun(true);
 setsingleProductInfo({
  id:id,
  Name:Name,
  Price:Price,
  Type:Type,
  Tag:Tag,
  images:[...imageArray],
  Color:Color,
  Amount_in_stock:Amtinstock,
  Description:Details
 })
}
  return (
    <tr className={`${font.className} ${currentTag.toLowerCase()=="out-of-stock"&&"opacity-55"} border-b text-[0.875em]`}>
      <td className=' p-[.9em] items-center flex gap-[.4em]'>
        <div className='w-[3.36875em]  overflow-hidden bg-blue-600 rounded-[0.5em] h-[3.36875em]'>
          <Image className='w-full h-full object-cover' src={imageSrcsingle} width={500} height={500} alt='image'/>
        </div>
        <p onClick={handleSingle} className={`${font.className}`}>{Name}</p>
        </td>
      <td className={`text-[#677788]`}>{Type}</td>
      <td>
        <Switch onChange={activateToggle} defaultChecked={Tag.toLowerCase()!=="out-of-stock"}/>
      </td>
      <td>&#8358;{Price.toLocaleString()}</td>
    </tr>
  )
}

export default Single
export const revalidate = 0
