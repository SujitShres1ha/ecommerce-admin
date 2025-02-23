import dbConnect from "@/lib/dbConnect";
import { orderModel } from "@/models/Order";
// import { IdCard } from "lucide-react";

export default async function handle(req, res) {
  await dbConnect();
  if (req.method == "GET") {
    const orders = await orderModel.find({}).sort({ createdAt: -1 });
    res.send(orders);
  }
  if (req.method == "POST") {
    const { id } = req.body;
    console.log(id);
    const order = await orderModel.find({ _id: id });
    console.log(order);

    res.send(order);
  }
}
