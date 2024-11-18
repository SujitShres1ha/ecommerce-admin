import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { PackageSearchIcon } from "lucide-react";
import { useRouter } from "next/router";
import {useState} from "react"
export default function AddProduct(){
  return (
    <Layout>
      <ProductForm/>
    </Layout>
    
  )
}