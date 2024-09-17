"use client"
import React, { useEffect, useState } from 'react'
import Imageicon from './Imageicon'
import SingleUpimg from './SingleUpimg';
import supabase from '@/utils/supabase';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { ButtonSpinner, Spinner } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Confirm from './Confirm';
type hml = {
  Category:string,
  Name:string,
  Price:number,
  ImagesUrl:string[],
  Tag:string,
  Amt_in_stock:number,
  Color:string,
  Details:string
}
function Inputs() {
  const [product,setProduct] = useState<hml>({
    Category:'',
    Name:'',
    Price:0,
    ImagesUrl:[''],
    Tag:'New',
    Amt_in_stock:0,
    Color:'',
    Details:''
  });
  const searchParams = useSearchParams();
  const isEdit = searchParams.get("edit");
  const getProductInfo = async ()=>{
    const {data} = await supabase.from("jewelries").select().eq("id",isEdit).single()
    if(!data)return;
    const {Category,Name,Price,ImagesUrl,Tag,Amt_in_stock,Color,Details} = data;
     setProduct({Category:Category,Name:Name,Price:Price,ImagesUrl:[...ImagesUrl],Tag:Tag,Amt_in_stock:Amt_in_stock,Color:Color,Details:Details})
  }

  useEffect(()=>{
    if(isEdit){
      getProductInfo()
    }
  },[isEdit])



  const productInfo = (e)=>{
   setProduct({...product,[e.target.name]:e.target.value});
  }
  const handleCategory = (e)=>{
    setProduct({...product,Category:e.target.innerText});
  }
  const handleColor = (e)=>{
    setProduct({...product,Color:e.target.innerText})
  }
  const openImages = ()=>{
    const galleryOpener:HTMLInputElement|null = document.querySelector('.galleryOpener');
    galleryOpener?.click();
  }
  const [optimiticfiles,setoptimisticfiles] = useState<File[]>([]);
  const [supabaseImageUrls,setUrls] = useState<string[]>([]);
  const [imageLoading,setImageloading] = useState<boolean>(false);
  const [imageCount,setImageCount] = useState<File[]>([])
  const getUrl = (nameoffile:string|undefined)=>{
    if(nameoffile){
    const {data} = supabase.storage.from('images').getPublicUrl(nameoffile);
    return data.publicUrl;
    }
  }
  const returnSupabaseUrl = async (file)=>{
    const name = `${Date.now()}-${file.name}`;
    const {data} = await supabase.storage.from('images').upload(`${name}`,file);
    const url = getUrl(data?.path);
    return url;
  }
  const handleImages = async(files)=>{
    const localUrls:File[] = [];
    const supabaseUrl:string[] = []
     for(const file of files){
       localUrls.push(file);
       setImageloading(true)
       const url = await returnSupabaseUrl(file);
       setImageloading(false)
       if(url)
       supabaseUrl.push(url)
     }
     setoptimisticfiles([...optimiticfiles,...localUrls]);
     setUrls([...supabaseImageUrls,...supabaseUrl]);
     setProduct({...product,ImagesUrl:[...supabaseUrl]})
  }
const checkHowManyFiles = (files)=>{
  const filesCount:File[] = [];
  for(const file of files){
     filesCount.push(file)
  };
  setImageCount(filesCount)
}

const Images = ()=>{
  return <>{optimiticfiles.map((imageSrc,i)=>{return <SingleUpimg key={`${imageSrc}-imagebaba${i}`} src={URL.createObjectURL(imageSrc)}/>})}
</>
}
const Skeletons = ()=>{
  return <>
  {imageCount.map((image,i)=>{return <Skeleton key={`${image.name}+${i}`} width={"4em"} height={"4em"} />})
}
  </>
}
const [productUploading,setProductUploading] = useState<boolean>(false);
const [showConfirm,setShowConfirm] = useState<boolean>(false)
const router = useRouter()
const handleInsert = async ()=>{
  const number = String(product.Price).replace(/,/g, '')
  const processedPrice = Number(number)
   if(product.Name&&product.Amt_in_stock&&product.Category&&product.Details&&product.ImagesUrl&&product.Price){
    setProductUploading(true)
   const {error} = await supabase.from("jewelries").insert({
    Name:product.Name,
    Category:product.Category,
    Price:processedPrice,
    Tag:product.Tag,
    ImagesUrl:[...supabaseImageUrls],
    Color:product.Color,
    Details:product.Details,
    Amt_in_stock:product.Amt_in_stock
   });
   setProductUploading(false);
  router.push('/admin')
   if(error){
    alert("error")
   }

   }else{
    alert("complete al fields")
   }

}
const handleUpdate = async()=>{
  setProductUploading(true)
 await supabase.from("jewelries").update({...product}).eq("id",isEdit)
 setProductUploading(false)
 router.push('/admin')
}
  return (
    <>
    <div className='w-full md:w-[60%]  md:mx-auto px-[1em]'>
      <input multiple={true} onChange={(e)=>{handleImages(e.target.files);checkHowManyFiles(e.target.files)}} accept='image/*' className='hidden galleryOpener' title='files' type='file'/>
      <p>Name:</p>
      <input value={product.Name} onChange={productInfo} name='Name' className='w-full border px-[1em] outline-none rounded-[0.375em] h-[2.375em] mt-[.7em] bg-[#F3F3F3]' title='Name' type='text'/>
      <p className='mt-[1em]'>Description:</p>
      <textarea value={product.Details} name='Details' onChange={productInfo} className='w-full border px-[1em] outline-none rounded-[0.375em] h-[4.375em] mt-[.7em] bg-[#F3F3F3]' title='description'/>
      <p className='mt-[1em]'>Price: eg 12,000. (The naira symbol will be inputted automatically)</p>
      <input value={product.Price} onChange={productInfo} name='Price' className='w-full border px-[1em] outline-none rounded-[0.375em] h-[2.375em] mt-[.7em] bg-[#F3F3F3]' title='Name' type='text'/>
  <p className='mt-[1em]'>Choose Category</p>
  <div className='flex mt-[1em] gap-[1em]'>
  <button type='button'  onClick={handleCategory} className={`flex justify-center items-center bg-[#72E3ADCC] px-[0.75em] py-[0.5em] text-black border border-1 border-[#097C4F] rounded-[0.3125em] ${product.Category.toLowerCase()=="earring" && 'bg-green-600 text-white font-[500]'} font-[500] text-[0.75em]`}>Earring</button>
  <button type='button' onClick={handleCategory} className={`flex justify-center items-center bg-[#72E3ADCC] px-[0.75em] py-[0.5em] text-black border border-1 border-[#097C4F] rounded-[0.3125em] ${product.Category.toLowerCase()=="bracelet" && 'bg-green-600 text-white font-[500]'} font-[500] text-[0.75em]`}>Bracelet</button>
  <button type='button' onClick={handleCategory}  className={`flex justify-center items-center bg-[#72E3ADCC] px-[0.75em] py-[0.5em] text-black border border-1 border-[#097C4F] rounded-[0.3125em] ${product.Category.toLowerCase()=="ring" && 'bg-green-600 text-white font-[500]'} font-[500] text-[0.75em]`}>Ring</button>
  <button type='button'  onClick={handleCategory} className={`flex justify-center items-center bg-[#72E3ADCC] px-[0.75em] py-[0.5em] text-black border border-1 border-[#097C4F] rounded-[0.3125em]  ${product.Category.toLowerCase()=="necklace" && 'bg-green-600 text-white font-[500]'}  font-[500] text-[0.75em]`}>Necklace</button>
  </div>
  <p className='mt-[1em]'>Choose a Color:</p>
  <div className='flex mt-[.7em] gap-[1em]'>
  <button type='button' onClick={handleColor}  className={`flex justify-center items-center bg-[#72E3ADCC] px-[0.75em] py-[0.5em] text-black border border-1 border-[#097C4F] rounded-[0.3125em] font-[500] ${product.Color.toLowerCase().includes("silver")&&"text-white bg-green-600 font-[500]"} text-[0.75em]`}>Silver</button>
  <button type='button' onClick={handleColor}  className={`flex justify-center items-center bg-[#72E3ADCC] px-[0.75em] py-[0.5em] text-black border border-1 border-[#097C4F] rounded-[0.3125em] font-[500] ${product.Color.toLowerCase().includes("gold")&&"text-white bg-green-600 font-[500]"} text-[0.75em]`}>Gold</button>

  </div>
  <p className='mt-[1em]'>Quantity in stock</p>
  <input value={product.Amt_in_stock} onChange={productInfo} name='Amt_in_stock' className='w-full border px-[1em] outline-none rounded-[0.375em] h-[2.375em] mt-[.7em] bg-[#F3F3F3]' title='Name' type='number'/>
   <div className='flex justify-center items-center'><p className='mt-[1em]'>Images </p> {imageLoading&&<Spinner/>}</div>
   <div className={`flex flex-wrap gap-[.7em]`}>
    {imageLoading&&<Skeletons/>}
    {!imageLoading&&<Images/>}
   </div>
   <div className='w-full h-[9em] flex justify-center items-center mt-[1em] rounded-[0.375em] bg-white'>
  <Imageicon onClickFunctorun={openImages}/>
    </div>
 <div className='w-full flex gap-[1em] items-center justify-end h-[3.625em] border-t mt-[1.5em]'>
 <button onClick={()=>setShowConfirm(true)}  type='button' className={`flex justify-center items-center bg-[#72E3ADCC] px-[0.75em] py-[0.5em] text-black border border-1 border-[#097C4F] rounded-[0.3125em] font-[500] text-[0.75em]`}>cancel</button>
 {!isEdit&&<button  onClick={handleInsert} type='button' className={`flex justify-center  items-center bg-[#72E3ADCC] px-[0.75em] py-[0.5em] text-black border border-1 border-[#097C4F] rounded-[0.3125em] w-[3.62125em] h-[2.5em]  font-[500] text-[0.75em]`}>{productUploading?<ButtonSpinner/>:'save'}</button>}
 {isEdit&&<button  onClick={handleUpdate} type='button' className={`flex justify-center  items-center bg-[#72E3ADCC] px-[0.75em] py-[0.5em] text-black border border-1 border-[#097C4F] rounded-[0.3125em] w-[3.62125em] h-[2.5em]  font-[500] text-[0.75em]`}>{productUploading?<ButtonSpinner/>:'update'}</button>}

 </div>
    </div>
    {showConfirm&&<Confirm setShowConfirm={setShowConfirm}/>}
    </>
  )
}

export default Inputs
