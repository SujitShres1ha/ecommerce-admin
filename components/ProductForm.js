import Layout from "@/components/Layout";
import axios from "axios";
import { PackageSearchIcon, LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ReactSortable } from "react-sortablejs";
import Image from "next/image";


export default function ProductForm({
  name: existingName,
  description: existingDescription, 
  price: existingPrice,
  images: existingImages,
  category: assignedCategory
}){
  const [name, setName] = useState(existingName || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([])
  const [category,setCategory] = useState(assignedCategory || '')
  const router = useRouter()
  console.log(categories)
  useEffect(() => {
    axios.get('/api/categories').then(res => setCategories([...res.data]))
  },[])
  const uploadFile = async (e) => {
    const files = Array.from(e.target.files)
    const formData = new FormData()
    files.map(file => formData.append("file",file))
    setIsUploading(true)
    const res = await axios.post('/api/upload',formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    if (res.data){
      setImages(prevImgs => [...prevImgs,...res.data.links])
      setIsUploading(false)
    }
  } 

  const handleSubmit = async (e) => {
    const _id = router.query.id
    e.preventDefault()
    const res = _id ? await axios.put('/api/products',{_id,name,description,price,images,category}) : await axios.post('/api/products',{name,description,price,images,category}) 
    console.log(res.data)
    router.push('/products')
  }
  return (
    <form onSubmit = {(e) => handleSubmit(e)} className="m-4 flex flex-col gap-2">
      <div>
        <div className = "flex gap-2 items-center">
          <PackageSearchIcon className="h-5"/>
          <span className="font-extrabold text-lg">Product Form</span>
        </div>
        <span className="font-thin text-sm">Fill in details for your product</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className = "flex flex-col w-52 gap-1">
          <span>Product Name</span>
          <input
            type="text"
            placeholder="Enter Product Name"
            value={name}
            className="p-1 rounded-md"
            onChange = {e => setName(e.target.value)}
          />
        </div>
        <div className=" flex flex-col gap-1">
          <span>Photos</span>
          <label className="w-24 h-24 border border-black flex items-center justify-center text-sm gap-1 rounded-md bg-slate-200 hover: cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
            </svg>
            Upload
            <input type="file" className="hidden" onChange={uploadFile} multiple/>
          </label>
          {!images?.length && <span className="font-thin text-xs">(No images uploaded)</span>}
          
        </div>
        <div className="flex gap-2 flex-grow">
          <ReactSortable list={images} setList={setImages} className="flex gap-2" animation={300} easing="ease-in-out">
            { images && images.map((link, index) =>
              (<img className="rounded-lg h-24 w-24" src={link} key={index} alt={`Image ${index}`} />))
            }
          </ReactSortable>
          { isUploading && <div className="flex items-center"><LoaderIcon className="animate-spin"/></div>}
        </div>
        <div className = "flex flex-col w-60 gap-1">
          <span>Product Category</span>
          <select className="p-2 rounded-md text-sm" onChange={e => setCategory(e.target.value)} value={category}>
            <option value="">Uncategorized (Select Category)</option>
            {categories && categories.map((category) => {
              return (<option key={category._id} value={category._id}>{category.name}</option>)
            })}
          </select>
        </div>
        <div className = "flex flex-col w-52 gap-1">
          <span>Product Description</span>
          <input
            type="text"
            placeholder="Enter Product Description"
            className="p-1 rounded-md"
            value={description}
            onChange =  {e => setDescription(e.target.value)}
          />
        </div>
        <div className = "flex flex-col w-52 gap-1">
          <span>Price</span>
          <input
            type="number"
            min = "0.00"
            placeholder="$ 0.00"
            className="p-1 rounded-md"
            value={price}
            onChange =  {e => setPrice(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-red-500 w-52 rounded-md text-white">Save</button>
      </div>
    </form>
  )
  
}