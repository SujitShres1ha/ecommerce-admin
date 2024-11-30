import Layout from "@/components/Layout";
import axios from "axios";
import { CircleChevronDownIcon, CopySlashIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
export default function Categories(){
  const [categoryName, setCategoryName] = useState("")
  const [parentCategory, setParentCategory] = useState(undefined)
  const [childCategories, setChildCategories] = useState([])
  const [mainCategories, setMainCategories] = useState([])
  const [expandedCategories, setExpandedCategories] = useState({})
  const [activeIcon, setActiveIcon] = useState(null)

  const saveCategory = async () => {
    const res = await axios.post('/api/categories',{name: categoryName, parent: parentCategory})
    setCategoryName("")
    fetchCategories()
  }
  const toggleCategory = (id) => {
    setExpandedCategories(prev => ({...prev, [id]:!prev[id]}))
    setActiveIcon(prev => prev === id ? null : id)
  }
  console.log(mainCategories)
  console.log(childCategories)
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
      <div className="flex gap-2 font-bold text-lg items-center">
        <CopySlashIcon/>
        <span>Product Categories</span>
      </div>
      <label>Add Category</label>
      <div className="flex gap-2 font-normal">
        <input 
          type="text" 
          placeholder="Enter Category Name" 
          className="rounded-md px-2 py-0.5 -ml-0.5"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <select className="rounded-md text-gray-500 p-2" value={parentCategory} onChange={e => setParentCategory(e.target.value)}>
          <option value={0}>Select Parent Category</option>
          {mainCategories.length > 0 && mainCategories.map((category) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
        <button onClick = {saveCategory} className="button-primary">Add</button>
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
                <td className="flex gap-2 items-center">
                  <CircleChevronDownIcon onClick={() => toggleCategory(category._id)} className={`cursor-pointer h-4 w-4 ${activeIcon === category._id ? "fill-slate-300" : ""}`}/>
                  <span>{category.name}</span>
                </td>
              </tr>
              {expandedCategories[category._id] && childCategories.map((childCategory => {
              if (childCategory.parent === category._id){
                return (<tr><td className="pl-8 text-gray-700">{childCategory.name}</td></tr>)
              }
              }))}
            </React.Fragment>
          )}
        </tbody>
      </table>}
    </div>
    
  </Layout>)
}