import dbConnect from "@/lib/dbConnect"
import { categoryModel } from "@/models/Category"

export default async function handle(req,res){
  await dbConnect();
  if (req.method === 'PUT'){
    const {name, parent, _id, properties} = req.body
    const response = await categoryModel.updateOne({_id},{name,parent,properties})
    return res.json(response)
  }
  if (req.method === 'POST'){
    const {name, parent, properties} = req.body
    const response = await categoryModel.create({name, parent, properties})
    return res.json(response)
  }
  if (req.method === 'GET'){
    return res.json(await categoryModel.find({}))
  }
  if (req.method === 'DELETE'){
    const {id} = req.query;
    const response = await categoryModel.deleteMany({$or: [{_id: id},{parent: id}]})
    return res.json(response)
  }
}