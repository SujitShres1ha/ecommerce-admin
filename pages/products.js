import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PencilIcon, Trash2Icon } from "lucide-react";


export default function Products(){
  const [products, setProducts] = useState([]);
  const [deleteDialogBox, setDeleteDialogBox] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  useEffect(() => {
    axios.get('/api/products').then(response => {setProducts(response.data)})
  },[])
  const openDeleteBox = product => {
    setProductToDelete(product);
    setDeleteDialogBox(true);
  }
  const handleExit = () => {
    setDeleteDialogBox(false);
    setProductToDelete(null)
  }
  async function handleDelete(){
    await axios.delete('/api/products?id='+productToDelete._id)

    //
    setProducts(products.filter(product => product._id !== productToDelete._id));
    handleExit()
  }
 
  return (
    <Layout children={'products page'}>
      <div className="flex flex-col m-4 gap-4">
        <div className="">
          <Link href='/products/new' className="button-primary bg-teal-500">Add Product</Link>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <td>Product Name</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {products.map(item => 
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>
                    <Link href = {'products/edit/'+item._id} className="bg-primary-blue">
                      <PencilIcon size={15} fill="blue"/>
                      Edit
                    </Link>
                    <button onClick={() => openDeleteBox(item)} className="bg-red-500">
                      <Trash2Icon size={15} fill="red"/>
                      Delete
                    </button>  
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {deleteDialogBox && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-3 max-w-sm w-full text-center">
          <span>Are you sure you want to delete {productToDelete?.name}?</span>
          <div className="flex flex-row items-center justify-center gap-4 mt-4">
            <button onClick = {handleDelete} className="bg-primary-blue px-3 py-0.5 text-white rounded-md ">Yes</button>
            <button onClick = {handleExit} className="bg-red-500 px-3 py-0.5 text-white rounded-md ">No</button>
          </div>
        </div>
      </div>
      )}
    </Layout>
  )
}