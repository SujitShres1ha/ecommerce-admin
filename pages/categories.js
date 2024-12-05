
import Layout from "@/components/Layout";
import axios from "axios";
import { CircleChevronDownIcon, CopySlashIcon, PencilIcon, Trash2Icon, TrashIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
export default function Categories(){
  const [category, setCategory] = useState({})
  const [parentCategory, setParentCategory] = useState(undefined)
  const [childCategories, setChildCategories] = useState([])
  const [mainCategories, setMainCategories] = useState([])
  const [expandedCategories, setExpandedCategories] = useState({})
  const [activeIcon, setActiveIcon] = useState(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [deleteDialogBox, setDeleteDialogBox] = useState(false);
  const [properties, setProperties] = useState([])

  const nameRef = useRef("")
  const ActionButtons = ({category}) => (
    <td>
      <div className="flex gap-2 text-white">
      <button onClick={() => editCategory(category)} className="bg-primary-blue inline-flex items-center px-2 py-1 gap-2 rounded-lg"><PencilIcon size={18} fill="blue"/>
            Edit</button>
      <button onClick={() => {setCategory(category); setDeleteDialogBox(true)}} className="bg-red-500 inline-flex items-center px-2 gap-2 rounded-lg"><Trash2Icon size={18} fill="red"/>
            Delete</button>
      </div>
    </td>
  )

  const handleDelete = async () => {

    const res = await axios.delete('/api/categories?id='+category._id)
    console.log("Response",res)
    fetchCategories()
    setCategory({})
    setDeleteDialogBox(false)
  }
  const editCategory = (category) => {
    setIsEditOpen(true)
    nameRef.current.focus() //focus Input
    setCategory(category)
    setParentCategory(category.parent)
    setProperties(category.properties)
   
  }
 
  const handleNameChange = (property, index, newName) => {
    setProperties(prev => {
      const props = [...prev]
      props[index].name = newName
      return props
    })
  }

  const handleValuesChange = (property, index, newValues) => {
    setProperties(prev => {
      const props = [...prev]
      props[index].values = newValues.split(',')
      return props
    })
  }

  const removeProperty = (index_num) => {
    setProperties(props => props.filter((prop, index) => index !== index_num))
  }
  const cancelEdit = () => {
    setCategory({})
    setParentCategory(0)
    setIsEditOpen(false)
    setProperties([])
  }
  const saveCategory = async () => {
    const [name, parent, _id] = [category.name, category.parent, category._id]
    console.log(name,parent,_id)
    if (category._id){
      const res = await axios.put('/api/categories',{name,parent,_id,properties})
    }else{
      const res = await axios.post('/api/categories',{name, parent: parentCategory, properties})
    }
    setCategory({})
    setParentCategory('')
    setProperties([])
    setIsEditOpen(false)
    fetchCategories()
  }
  const toggleCategory = (id) => {
    setExpandedCategories(prev => ({...prev, [id]:!prev[id]}))
    setActiveIcon(prev => prev === id ? null : id)
  }
  // console.log(mainCategories)
  // console.log(childCategories)
  const fetchCategories = async () => {
    const res = await axios.get('/api/categories')
    setMainCategories(res.data.filter((category) => !category.parent))
    setChildCategories(res.data.filter(category => category.parent))
  }
  useEffect(() => {
    fetchCategories()
  },[])
  return (
  <Layout className="">    
    <div className="m-4 flex flex-col gap-2">
      <div className="flex gap-2 font-bold text-lg">
        <CopySlashIcon/>
        <span>Product Categories</span>
      </div>
      <label>Add Category</label>
      <div className="flex gap-2 font-normal">
        <input 
          type="text" 
          ref={nameRef}
          placeholder="Enter Category Name" 
          className="rounded-md px-2 py-0.5 -ml-0.5"
          value={category?.name ? category.name : ""}
          onChange={(e) => parentCategory ? setParentCategory(e.target.value) : setCategory(prev => ({...prev, name: e.target.value}))}
        />
        <select className="rounded-md text-gray-500 p-2" value={parentCategory} onChange={e => setParentCategory(e.target.value)}>
          <option value={''}>Select Parent Category</option>
          {mainCategories.length > 0 && mainCategories.map((category) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>
      <label className="block">Product Properties</label>
      <button 
        className="button-primary text-sm bg-gray-500 w-fit"
        type="button"
        onClick = {() => setProperties(prev => [...prev, {name:'', values:''}])}
      >Add new property</button>
        {properties.length > 0 && properties.map((property, index) => (
          <div className="flex gap-2 font-extralight text-sm">
            <input type="text" value={property.name} onChange={e => handleNameChange(property,index,e.target.value)} placeholder="Enter property name" className="rounded-md px-2 py-1"/>
            <input type="text" value={property.values} onChange={e => handleValuesChange(property,index,e.target.value)} placeholder="Enter values (comma separated)" className="rounded-md px-2 py-1 w-56"/>
            <button onClick={() => removeProperty(index)} className="bg-red-600 inline-flex items-center px-1 gap-2 rounded-md text-white"><TrashIcon size={16} fill="white" strokeWidth={5}/></button>
          </div>
        ))}
        <div className="flex gap-2 mt-2 text-sm">
        <button onClick = {saveCategory} className="button-primary bg-teal-500">{isEditOpen ? 'Save' : 'Add'}</button>
        {isEditOpen && <button onClick = {cancelEdit} className="button-primary bg-orange-700">Cancel</button>}
      </div>
      {mainCategories.length > 0 && <table className="border border-black rounded-md">
        <thead>
          <tr>
            <td>Category Name</td>
          </tr>
        </thead>
        <tbody>
          {mainCategories.length && mainCategories.map(category => 
            <React.Fragment key={category._id}>
              <tr key={category._id}>
                <td>
                  <div className="inline-flex gap-2 items-center">
                    <CircleChevronDownIcon onClick={() => toggleCategory(category._id)} className={`cursor-pointer h-4 w-4 ${activeIcon === category._id ? "fill-slate-300" : ""}`}/>
                    <span>{category.name}</span>
                  </div>
                </td>
                <ActionButtons category = {category}/>          
              </tr>
              {expandedCategories[category._id] && childCategories.map((childCategory => {
              if (childCategory.parent === category._id){
                return (<tr><td className="pl-8 text-gray-700">{childCategory.name}</td><ActionButtons category={childCategory}/></tr>)
              }}))}
            </React.Fragment>
          )}
        </tbody>
      </table>}
    </div>
    {deleteDialogBox && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-3 max-w-sm w-full text-center">
          <span>Are you sure you want to delete {category?.name}?</span>
          <div className="flex flex-row items-center justify-center gap-4 mt-4">
            <button onClick = {handleDelete} className="bg-primary-blue px-3 py-0.5 text-white rounded-md ">Yes</button>
            <button onClick = {() => setDeleteDialogBox(false)} className="bg-red-500 px-3 py-0.5 text-white rounded-md ">No</button>
          </div>
        </div>
      </div>
    )}
  </Layout>
)}