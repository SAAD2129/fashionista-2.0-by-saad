import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Head from "next/head"

const Order = ({ loading, setLoading }) => {
  const router = useRouter();
  const [order, setOrder] = useState({});
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const { order_id } = router.query;
  const getOrder = async (id) => {
    // console.log(id);
    setLoading(true);
    const response = await fetch("/api/admin/order", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        token: localStorage.getItem("token"),
        order_id: id,
      },
    });
    const data = await response.json();
    if (data.success) {
      setOrder(data.order);
      setOrderStatus(data.order.order_status);
      setPaymentStatus(data.order.payment_status);
      setLoading(false);
    } else {
      toast.error(data.msg, { autoClose: 1500 });
    }
  };
  const updateOrder = async (id) => {
    setLoading(true);
    setOrder(null);
    const response = await fetch("/api/admin/order", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        token: localStorage.getItem("token"),
        order_id: router.query.order_id,
      },
      body: JSON.stringify({ order_status: orderStatus }),
    });
    const data = await response.json();
    if (data.success) {
      toast.success("order updated successfully", { autoClose: 1500 });
      setLoading(false);
      setOrder(data.order);
    } else {
      toast.error(data.msg, { autoClose: 1500 });
    }
  };
  useEffect(() => {
    console.log(order_id);
    if (order_id) {
      getOrder(order_id);
    }
  }, [router.query]);
  return (
    <Layout pathname={"order"}>
      {loading ? (
        <Loader />
      ) : (
        order && (

          <section className="text-gray-600  body-font overflow-hidden">
            <Head>
              <title>Admin - Order Page</title>
            </Head>
            <div className="container bg-white rounded-2xl sm:px-5 px-2 py-8 mx-auto my-8">
              <div className="lg:w-full mx-auto justify-between flex flex-wrap">
                <div className="lg:w-2/5 w-full bg-gray-50 rounded-lg p-4">
                  <span className="text-gray-700">Products</span>
                  <div className="flow-root">
                    <ul role="list" className="mt-2 divide-y divide-gray-200">
                      {order?.products?.map((product, i) => {
                        const { color, size, img, name, qty, _id, price } =
                          product;
                        return (
                          <li
                            key={i}
                            className="flex my-4 bg-white p-2 shadow-md rounded-sm"
                          >
                            <div className="sm:h-24 sm:w-24 w-16 h-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={img}
                                alt={name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <Link href={`/product/${_id}`}>{name}</Link>
                                  </h3>
                                  <p className="ml-4 text-sm">${price}</p>
                                </div>
                                <div className="flex items-center justify-between gap-2 mt-4">
                                  <div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {color && <span>Color {color}</span>}
                                      {size && <span> Size {size}</span>}
                                    </p>
                                  </div>
                                  <span className="text-sm text-yellow-500 hover:text-yellow-400">
                                    Qty {qty}
                                  </span>
                                </div>
                              </div>
                              <div className="flex text-sm items-center justify-between border-t my-2 border-gray-200">
                                <span>
                                  {qty} X ${price}
                                </span>
                                <span>${qty * price}</span>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 lg:px-6 p-4 mt-6 lg:mt-0 bg-gray-50  rounded-lg">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    Order id #{order_id}
                  </h2>
                  <h1 className="text-gray-900 my-4 text-2xl title-font font-medium mb-1">
                    Order by {order.ordered_by}
                  </h1>
                  <p className="leading-relaxed">
                    <span className="text-gray-600 font-semibold">
                      Will Be Delivered at
                    </span>
                    {/* {order} */}
                  </p>
                  <p className="leading-relaxed mt-2">
                    {order?.address?.street_address} {order?.address?.city}{" "}
                    {order?.address?.state} {order?.address?.zip}{" "}
                    {/* {order} */}
                  </p>
                  <p className="leading-relaxed mt-2 border-b border-gray-300 py-2 flex justify-between">
                    <span className="text-gray-600 font-semibold">
                      Payment Status{" "}
                    </span>
                    {order?.payment_status}
                  </p>
                  <p className="leading-relaxed mt-2 border-b border-gray-300 py-2 flex justify-between">
                    <span className="text-gray-600 font-semibold">
                      Order Status{" "}
                    </span>

                    {order?.order_status}
                  </p>
                  <p className="leading-relaxed mt-2 border-b border-gray-300 py-2 flex justify-between">
                    <span className="text-gray-600 font-semibold">
                      Order Total
                    </span>
                    ${order.totalprice}
                  </p>
                  <form
                    onSubmit={updateOrder}
                    className="flex flex-wrap gap-2 w-full items-center justify-between mt-6"
                  >
                    {paymentStatus !== "paid" && (
                      <div className="sm:w-1/3 w-full my-4">
                        <label htmlFor="" className="text-sm">
                          Payment Status
                        </label>
                        <select
                          value={paymentStatus}
                          onChange={(e) =>
                            setPaymentStatus(
                              e.target[e.target.selectedIndex].value
                            )
                          }
                          className="order_status mt-2 w-full rounded-3xl flex  cursor-pointer mr-auto text-white bg-yellow-400 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-500"
                        >
                          <option
                            value={"unpaid"}
                            className="flex ml-auto w-max text-white bg-yellow-400 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-500 rounded"
                          >
                            Un Paid
                          </option>
                          <option
                            value={"pending"}
                            className="flex ml-auto w-max text-white bg-yellow-400 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-500 rounded"
                          >
                            Pending
                          </option>
                          <option
                            value={"paid"}
                            className="flex ml-auto w-max text-white bg-yellow-400 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-500 rounded"
                          >
                            Paid
                          </option>
                        </select>
                      </div>
                    )}
                    <div className="sm:w-1/3 w-full my-4">
                      <label htmlFor="" className="text-sm">
                        Order Status
                      </label>
                      <select
                        value={orderStatus}
                        onChange={(e) =>
                          setOrderStatus(e.target[e.target.selectedIndex].value)
                        }
                        className="order_status mt-2 w-full rounded-3xl flex  cursor-pointer mr-auto text-white bg-yellow-400 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-500"
                      >
                        <option
                          value={"processing"}
                          className="flex ml-auto w-max text-white bg-yellow-400 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-500 rounded"
                        >
                          Processing
                        </option>
                        <option
                          value={"pending"}
                          className="flex ml-auto w-max text-white bg-yellow-400 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-500 rounded"
                        >
                          Pending
                        </option>
                        <option
                          value={"completed"}
                          className="flex ml-auto w-max text-white bg-yellow-400 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-500 rounded"
                        >
                          Completed
                        </option>
                      </select>
                    </div>

                    <input
                      type="submit"
                      value="Update"
                      className="w-full font-bold py-3 rounded-3xl cursor-pointer mx-auto text-white bg-yellow-400 border-0 px-6 focus:outline-none hover:bg-yellow-500"
                    />
                  </form>
                </div>
              </div>
            </div>
          </section>
        )
      )}
    </Layout>
  );
};

export default Order;
