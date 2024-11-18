import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProduct(){
  const [productDetails, setProductDetails] = useState(null);
  const router = useRouter()
  const {id} = router.query;

  useEffect(() => {
    if (id){
      axios.get('/api/products?id='+id).then((response) => {setProductDetails(response.data)} )
    }
    
  },[])
  return (
    productDetails &&
    <Layout>
      <ProductForm {...productDetails}/>
    </Layout>
    
  )
}