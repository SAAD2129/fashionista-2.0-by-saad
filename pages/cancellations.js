import Loader from "@/components/Loader";
import Link from "next/link";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Cancellations = ({ loading, setLoading }) => {
  const [orders, setOrders] = useState([]);
  const router = useRouter();
  const fetchAllOrders = async () => {
    setLoading(true);
    const response = await fetch("/api/user/cancelledorders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    if (data.success) {
      setLoading(false);
      setOrders(data.orders);
    } else {
      toast.error(data.msg, { autoClose: 1000 });
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    }

    if (orders) {
      setLoading(false);
    }
    fetchAllOrders();
    console.log(orders);
  }, []);
  return (
    <section className="text-gray-600 body-font">
      <Head>
        <title>Fashionista - My Cancellations</title>
      </Head>
      {}
      {loading ? (
        <Loader />
      ) : orders?.length === 0 ? (
        <div className="flex justify-center items-center h-[50vh]">
          <div className="text-center">
            <h2 className="font-bold text-2xl">
              You haven't Cancelled any orders
            </h2>
          </div>
        </div>
      ) : (
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
              YOUR CANCELLATIONS
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              order cancellations decrease your account trust
            </p>
          </div>
          <div class="lg:w-3/4  mx-auto overflow-auto p-4">
            <table class="table-auto bg-white rounded-xl   w-full text-left whitespace-no-wrap">
              <thead className="border-b border-gray-200">
                <tr>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-800 text-sm  rounded-tl rounded-bl">
                    #Order Id
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-800 text-sm ">
                    Customer
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-800 text-sm ">
                    Products
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-800 text-sm ">
                    Delivery Date
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-800 text-sm ">
                    Amount
                  </th>
                  <th class="px-4 py-3 text-center title-font tracking-wider font-medium text-gray-800 text-sm ">
                    Order Status
                  </th>
                  <th class="px-4 py-3 text-center title-font tracking-wider font-medium text-gray-800 text-sm  rounded-tr rounded-br">
                    Payment Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => {
                  // console.log(order);
                  const {
                    _id,
                    ordered_by,
                    products,
                    order_status,
                    payment_status,
                    totalprice,
                  } = order;
                  return (
                    <tr key={_id}>
                      <Link href={`/orders/${_id}`}>
                        <td class="px-4 py-3 text-gray-500 text-base">
                          #{_id.slice(0, 10)}..
                        </td>
                      </Link>

                      <td class="px-4 text-base py-3 text-gray-900">
                        {ordered_by}
                      </td>
                      <td class="px-4 text-base py-3 text-gray-500">
                        {products?.map((product) => {
                          return <span>{product.name}</span>;
                        })}
                      </td>
                      <td class="px-4 text-base py-3 text-gray-500">
                        {Date.UTC}
                      </td>
                      <td class="px-4 text-base py-3 text-gray-500 text-center">
                        <span className="text-sm text-gray-700">$</span>
                        {totalprice}
                      </td>
                      <td class="px-4 text-center text-base py-3 text-gray-500">
                        {" "}
                        {order?.order_status === "completed" && (
                          <span className="p-1 text-sm bg-green-100/60 font-semibold text-green-500 rounded-md px-4 py-1">
                            completed
                          </span>
                        )}
                        {order?.order_status === "pending" && (
                          <span className="p-1 text-sm bg-yellow-100/60 font-semibold text-yellow-500 rounded-md px-4 py-1">
                            Pending
                          </span>
                        )}
                        {order?.order_status === "processing" && (
                          <span className="p-1 text-sm bg-blue-100/60 font-semibold text-blue-500 rounded-md px-4 py-1">
                            Processing
                          </span>
                        )}
                        {order?.order_status === "cancelled" && (
                          <span className="p-1 text-sm bg-red-100/60 font-semibold text-red-500 rounded-md px-4 py-1">
                            Cancelled
                          </span>
                        )}
                      </td>
                      <td class="px-4 py-3 text-center">
                        {" "}
                        {order?.payment_status === "paid" && (
                          <span className="p-1 text-sm bg-green-100/60 font-semibold text-green-500 rounded-md px-4 py-1">
                            Paid
                          </span>
                        )}
                        {order?.payment_status === "pending" && (
                          <span className="p-1 text-sm bg-yellow-100/60 font-semibold text-yellow-500 rounded-md px-4 py-1">
                            Pending
                          </span>
                        )}
                        {order?.payment_status === "unpaid" && (
                          <span className="p-1 text-sm bg-red-100/60 font-semibold text-red-500 rounded-md px-4 py-1">
                            unpaid
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div class="flex pl-4 mt-4 lg:w-2/3 w-full ml-auto">
              <Link
                href="/products"
                class="flex ml-auto text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cancellations;
