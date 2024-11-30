import dbConnect from "@/lib/dbConnect";
import { productModel } from "@/models/Product";

export default async function handle(req,res){
  await dbConnect();
  if (req.method === 'POST'){
    const {name, description, price, images} = req.body;
    const product = await productModel.create({name, description, price, images})
    return res.json(product);
  }

  if (req.method === 'GET'){
    if (req.query.id){
      return res.json(await productModel.findById(req.query.id))
    }
    return res.json(await productModel.find());
  }

  if (req.method === 'PUT'){
    const {_id,name,description,price,images} = req.body;
    console.log(_id);
    const updatedProduct = await productModel.updateOne({_id},{name,description,price,images});
    if (updatedProduct){
      return res.json(true)
    }
    return res.json(false)
    
  }

  if (req.method === 'DELETE'){
    if (req.query.id){
      await productModel.deleteOne({_id: req.query.id})
      return res.json(true)
    }
    return res.json(false)
  }



}