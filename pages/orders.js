import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get("/api/orders")
      .then((response) => setOrders(response.data))
      .catch((error) => {
        throw error;
      });
  }, []);
  console.log(orders);
  return (
    <Layout children="orders">
      <div className="m-4 flex flex-col gap-2">
        <h1 className="font-bold text-lg text-center">ORDER HISTORY</h1>
        <table>
          <thead>
            <tr>
              <td>Date</td>
              {/* <td>ID</td> */}
              <td>Recipient</td>
              <td>Product</td>
              <td>Total Amount</td>
              <td>Status</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order._id} className="">
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  {/* <td>{order._id}</td> */}
                  <td>{order.shippingDetails.name}</td>
                  <td className="flex flex-col justify-start items-start">
                    {order.items.map((item) => (
                      <div key={item.productId}>
                        <span>
                          {item.productName} x {item.quantity}
                        </span>
                      </div>
                    ))}
                  </td>
                  <td>{order.totalPrice}</td>
                  <td>{order.paymentStatus}</td>
                  <td>
                    <Link
                      href={"/orders/" + order._id.toString()}
                      className="text-black "
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
