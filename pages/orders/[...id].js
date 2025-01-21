import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Order() {
  const [order, setOrder] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    axios
      .post("/api/orders", { id })
      .then((res) => setOrder(...res.data))
      .catch((error) => {
        throw error;
      });
  }, []);
  console.log(order);

  return (
    <Layout>
      <div className="flex flex-col m-4 gap-4">
        <div>
          <h1 className="font-bold underline text-lg">Order Details</h1>
          <p>Order ID: {order._id}</p>
          <p>Name: {order?.shippingDetails?.name}</p>
          <p>Email: {order?.shippingDetails?.email}</p>
          <p>Date: {Date(order?.createdAt).toString()}</p>
          <p>Total: ${order.totalPrice}</p>
          <p>Payment Status: {order.paymentStatus}</p>
        </div>
        <table>
          <thead>
            <tr>
              <td>Item Name</td>
              <td>Quantity</td>
              <td>Unit Price</td>
              <td>Subtotal</td>
            </tr>
          </thead>
          <tbody>
            {order?.items?.map((item) => {
              return (
                <tr>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${item.price * item.quantity}</td>
                  {/* <td>item.name</td>
                  <td>item.name</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Order;
