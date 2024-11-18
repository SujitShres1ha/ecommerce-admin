import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage(){
  const [productName, setProductName] = useState(null);
  const router = useRouter()
  const {id} = router.query
  useEffect(() => {
    axios.get('/api/products?id='+id).then(response => {setProductName(response.data?.name)})
  },[id])

  const goToProducts = () => {
    router.push('/products')
  }
  async function handleDelete(){
    const response = await axios.delete('/api/products?id='+id)

    goToProducts();
  }
  return(
    <Layout>
      
    </Layout>

  )
}