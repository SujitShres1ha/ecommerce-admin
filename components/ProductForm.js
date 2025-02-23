import Layout from "@/components/Layout";
import axios from "axios";
import { PackageSearchIcon, LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ReactSortable } from "react-sortablejs";



export default function ProductForm({
  name: existingName,
  description: existingDescription, 
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProps,
  stock: existingStock,
  title: existingTitle
}){
  const [name, setName] = useState(existingName || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [title, setTitle] = useState(existingTitle || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([])
  const [category,setCategory] = useState(assignedCategory || '')
  const [properties, setProperties] = useState([])
  const [productProps, setProductProps] = useState(assignedProps || {})
  const [productStock, setProductStock] = useState(existingStock || null)
  
  const router = useRouter()
  useEffect(() => {
    axios.get('/api/categories').then(res => setCategories([...res.data]))
  },[])

  useEffect(() => {
    if (categories.length > 0 && category){
      const props = []
      const catInfo = categories.find(({_id}) => _id === category)
      catInfo.properties.length > 0 && props.push(...catInfo.properties)
      if (catInfo?.parent){
        props.unshift(...categories.find(({_id}) => _id === catInfo.parent).properties)
      }
      setProperties([...props])

      //default property values
      const defaultProps = {}
      for (const prop of props){
        defaultProps[prop.name] = prop.values[0]
      }
      setProductProps(defaultProps)
    }

    
    
  },[category, categories])
  console.log(productProps)
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
  const setProductProp = (value, name) =>
  setProductProps((prevProps) => ({
    ...prevProps,
    [name]: value
  }))
  const handleSubmit = async (e) => {
    const _id = router.query.id
    e.preventDefault()
    const res = _id ? await axios.put('/api/products',{_id,name,title,description,price,images,category,properties: productProps, stock: productStock}) : await axios.post('/api/products',{name,description,price,images,category,properties: productProps, stock: productStock}) 
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
        <div className="flex gap-2 flex-wrap">
          <ReactSortable list={images} setList={setImages} className="flex flex-wrap gap-2" animation={300} easing="ease-in-out">
            { images.length && images.map((link, index) =>
              (
              <div key={index} className="h-24 w-24 bg-white shadow-sm rounded-sm border border-gray-200 overflow-hidden flex justify-center">
                <img className="object-contain" src={link} alt={`Image ${index}`} />
              </div>
              ))
            }
          </ReactSortable>
          { isUploading && <div className="flex items-center"><LoaderIcon className="animate-spin"/></div>}
        </div>
        <div className = "flex flex-col w-60 gap-1">
          <span>Product Category</span>
          <select 
            onChange={e => setCategory(e.target.value)} 
            value={category}>
            <option value="">Uncategorized (Select Category)</option>
            {categories && categories.map((category) => {
              return (<option key={category._id} value={category._id}>{category.name}</option>)
            })}
          </select>
        </div>
        {properties.length > 0 && (
          <div className = "flex flex-col w-60 gap-1">
          <span>Product Properties</span>
            {properties && properties.map((prop) => {
              return (
                <div key={prop._id} className = "flex flex-row items-center gap-2">
                <span className="w-1/4 text-sm">{prop.name[0].toUpperCase() + prop.name.substring(1)}</span>
                <select 
                  onChange={(e) => setProductProp(e.target.value,prop.name)} 
                  value={productProps[prop.name] || prop.values[0]}>
                  {prop.values.map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
                </div>)
            })}
        </div>
        )}
        <div className = "flex flex-col w-52 gap-1">
          <span>Product Title</span>
          <input
            type="text"
            placeholder="Enter Product Title"
            className=""
            value={title}
            onChange =  {e => setTitle(e.target.value)}
          />
        </div>
        <div className = "flex flex-col w-52 gap-1">
          <span>Product Description</span>
          <input
            type="text"
            placeholder="Enter Product Description"
            className=""
            value={description}
            onChange =  {e => setDescription(e.target.value)}
          />
        </div>
        <div className = "flex flex-col w-52 gap-1">
          <span>Product Stock</span>
          <input
            type="number"
            placeholder="Enter Product Stock"
            className=""
            value={productStock}
            onChange =  {e => setProductStock(e.target.value)}
          />
        </div>
        <div className = "flex flex-col w-52 gap-1">
          <span>Price</span>
          <input
            type="number"
            min = "0.00"
            placeholder="$ 0.00"
            className=""
            value={price}
            onChange =  {e => setPrice(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-red-500 w-52 rounded-md text-white">Save</button>
      </div>
    </form>
  )
  
}