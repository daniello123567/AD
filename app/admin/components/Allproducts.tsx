"use client"
import React from 'react'
import supabase from '@/utils/supabase'
import Single from './Single'
import { useQuery } from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react'
import localFont from 'next/font/local'
import { useSearchParams } from 'next/navigation'
import SkeletonSearch from './Skeleton'
const font = localFont({src:"../fonts/std_bold.woff2"})
declare global {
  type product = {
Category:string;
Color:string;
Details:string;
ImagesUrl:string[],
Name:string;
Price:number;
Tag:string;
created_at?:string|number;
id:string;
Amt_in_stock:number
}
}
function Allproducts({functionForChildren,setsingleProductInfo}:{functionForChildren:React.Dispatch<React.SetStateAction<boolean>>,setsingleProductInfo:React.Dispatch<React.SetStateAction<Hml>>}) {

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query")||''

  const Fetchall = async ()=>{
    const {data} = await supabase.from('jewelries').select('*').or(`Name.ilike.%${searchQuery}%,Color.ilike.%${searchQuery}%,Details.ilike.%${searchQuery}%`);
    return data;
  }
  const {isPending,data} = useQuery({
    queryKey:["products",searchQuery],
    queryFn:()=>Fetchall(),
    staleTime:1
  });

  const Products = ()=>{
    return<>{data?.map((product:product)=>{return  <Single Details={product.Details} Amtinstock={product.Amt_in_stock} Color={product.Color} imageArray={product.ImagesUrl} setsingleProductInfo={setsingleProductInfo} funcTionTorun={functionForChildren} id={product.id} Type={product.Category} Tag={product.Tag} imageSrcsingle={product.ImagesUrl[0]} Price={product.Price} Name={product.Name} key={product.id}/>})}
</>

  }
  return (
    <ChakraProvider>
    <table className='w-[95%] px-[1em] mx-auto mt-[1em] border h-full'>
      <thead className={`${font.className} border-b h-[3em] items-center text-left text-[0.75em] text-black bg-[#F3F3F3] justify-between`}>
        <tr>
        <td>PRODUCTS</td>
        <td>TYPE</td>
        <td>IN-STOCK</td>
        <td>PRICE</td>
        </tr>
      </thead>

        {!isPending&&<tbody><Products/></tbody>}

    </table>
    {isPending&&<SkeletonSearch/>}
    </ChakraProvider>
  )
}

export default Allproducts
