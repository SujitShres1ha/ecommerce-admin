import dbConnect from "@/lib/dbConnect"
import { categoryModel } from "@/models/Category"

export default async function handle(req,res){
  await dbConnect();
  if (req.method === 'POST'){
    const {name, parent} = req.body
    const response = await categoryModel.create({name: name, parent: parent})
    return res.json(response)
  }
  if (req.method === 'GET'){
    return res.json(await categoryModel.find({}))
  }
}