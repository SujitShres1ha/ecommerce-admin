import Layout from "@/components/Layout";
import axios from "axios";
import { PackageSearchIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/router";
export default function ProductForm({
  _id,
  name: existingName,
  description: existingDescription, 
  price: existingPrice}){
  const [name, setName] = useState(existingName || null);
  const [description, setDescription] = useState(existingDescription || null);
  const [price, setPrice] = useState(existingPrice || null);
  const router = useRouter();

  async function handleSubmit(e){
    e.preventDefault();
    if (_id){
      const response = await axios.put('/api/products',{_id,name,description,price})
      console.log("Response: ", response)
    }
    else{
      const response = await axios.post('/api/products', {name,description,price})
      console.log("Response: ", response)
    }
    router.push('/products');
  }

  async function uploadFile(e){
    e.preventDefault();
    const data = new FormData()
    const files = e.target?.files
    for (const file of files){
      data.append('file',file)
    }
    const res = await axios.post('/api/upload',data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(res.data);
  }
  return (
    <form onSubmit = {handleSubmit} className="m-4 flex flex-col gap-2">
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
            </svg>
            Upload
            <input type="file" className="hidden" onChange={uploadFile}/>
          </label>
          
          
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