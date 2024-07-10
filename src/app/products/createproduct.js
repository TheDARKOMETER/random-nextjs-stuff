'use client'

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import AddIcon from '@mui/icons-material/Add';


export default function CreateProduct() {
   const [productName, setProductName] = useState('')
   const [thumbnail, setThumbnail] = useState('')
   const [productPrice, setProductPrice] = useState(0)
   const [stockQuantity, setStockQuantity] = useState(0)
   const [image, setImage] = useState()
   const [isCreating, setIsCreating] = useState(false)
   const [isValidDimension, setIsValidDimension] = useState(false)
   const creationRef = useRef()


   const create = async () => {
      const formData = new FormData()
      formData.append('productName', productName)
      formData.append('thumbnail', thumbnail)
      formData.append('productPrice', productPrice)
      formData.append('stockQuantity', stockQuantity)

      await fetch(process.env.API_PRODUCTS_COLLECTION_URL, {
         method: 'POST',
         body: formData
      })

   }

   useEffect(() => {

      const handleOutsideClick = (e) => {
         if (creationRef.current && !creationRef.current.contains(e.target)) {
            setIsCreating(false)
         }
      }

      if (isCreating) {
         document.addEventListener('mousedown', handleOutsideClick)
      }

      return () => {
         document.removeEventListener('mousedown', handleOutsideClick)
      }
   }, [isCreating])



   const createMenu = (
      <div className="w-screen h-screen fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
         <form ref={creationRef} onSubmit={create} className="bg-white flex flex-col w-64 gap-y-2 border border-black rounded-lg p-2">
            <h3 className="text-lg font-semibold text-center">Create a New Product</h3>
            <input type="text" className="border border-black" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
            <img src={image} />
            <input type="file" className="border border-black" onChange={(e) => {
               console.log(URL.createObjectURL(e.target.files[0]))
               console.log(e.target.files[0])
               setThumbnail(e.target.files[0])
            }
            } />
            <input type="number" className="border border-black" value={productPrice} placeholder="Product Price" onChange={(e) => setProductPrice(e.target.value)} />
            <input type="number" className="border border-black" value={stockQuantity} placeholder="Stock Quantity" onChange={(e) => setStockQuantity(e.target.value)} />
            <button disabled={!(isValidDimension && (productName !== ''))} type="submit" className="bg-black text-white">Create Product</button>
         </form>
      </div>

   )


   const toggleCreateMenu = () => {
      setIsCreating(!isCreating)
   }


   useEffect(() => {
      thumbnail && setImage(URL.createObjectURL(thumbnail))
   }, [thumbnail])

   useEffect(() => {
      if (image) {

         var varimg = new Image()
         varimg.onload = () => {
            if (varimg.width === 512 && varimg.height === 512) {
               setIsValidDimension(true)
            } else {
               setIsValidDimension(false)
            }
         }
         varimg.src = image

      }
   }, [image])

   return (
      <div className="items-center flex flex-col justify-center w-48 border border-gray-500 rounded-md">
         <button onClick={toggleCreateMenu}>
            <div className="transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 z-10 drop-shadow-2xl flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-3 mr-3">
               <span className="text-white"><AddIcon fontSize="large" /></span>
            </div>
         </button>
         <p className="text-sm text-gray-500">Add a Product</p>
         {isCreating && createMenu}
      </div>

   )
}

