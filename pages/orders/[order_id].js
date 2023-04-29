import React, { useEffect, useState, Fragment, useRef } from "react";
import Product from "@/models/Product";
import Order from "@/models/Order";
import mongoose from "mongoose";
import { useRouter } from "next/router";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import Head from "next/head";
const MyOrder = ({ order_, loading, setLoading }) => {
  const [order, setOrder] = useState(order_);
  const [showProducts, setShowProducts] = useState(true);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const { payment_status, order_status, ordered_by, email, _id, totalprice } =
    order;

  const cancelOrder = async () => {
    setOpen(false);
    // console.log('canceling')
    const response = await fetch("/api/user/order", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ ORDER_ID: order._id }),
    });

    const data = await response.json();
    if (data.success) {
      toast.success(data.msg);
      setOrder(data.order);
    } else {
      toast.error(data.msg);
    }
  };
  useEffect(() => {
    if (order) {
      setLoading(false);
    }
  }, [showProducts]);
  return (
    <>
      <Head><title>Fashionista - Order Page</title></Head>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Cancel Order
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to cancel order once your
                            order is cancelled it can not be delivered and it
                            is not refundable?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 sm:ml-3 sm:w-auto"
                      onClick={() => cancelOrder()}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Decline
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <section className="text-gray-600  body-font overflow-hidden min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 bg-white p-4 w-full mx-auto">
            <div className="lg:w-full  lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                CODESWEAR
              </h2>
              <h1 className="text-gray-900 my-6 rounded-2xl text-2xl title-font font-medium mb-4">
                Order Id #{order?._id}
              </h1>
              <div className="flex mb-4">
                <a
                  onClick={() => setShowProducts(true)}
                  // href={`/orders/${order?._id}`}
                  className={`flex-grow cursor-pointer transition-all text-xl  border-b-2 font-bold
                            ${
                              showProducts
                                ? "text-yellow-400 border-yellow-400 font-bold "
                                : ""
                            }  py-2 text-lg px-1`}
                >
                  Products
                </a>
                <a
                  onClick={() => setShowProducts(false)}
                  // href={`/orders/${order?._id}?details=true`}
                  className={`flex-grow text-xl ${
                    !showProducts ? "text-yellow-400 border-yellow-400 " : ""
                  } font-bold cursor-pointer transition-all border-b-2 border-gray-300 py-2 px-1`}
                >
                  Details
                </a>
              </div>
              {/* <p className="leading-relaxed mb-4">
                            Fam locavore kickstarter distillery. Mixtape
                            chillwave tumeric sriracha taximy chia microdosing
                            tilde DIY. XOXO fam inxigo juiceramps cornhole raw
                            denim forage brooklyn. Everyday carry +1 seitan
                            poutine tumeric. Gastropub blue bottle austin
                            listicle pour-over, neutra jean.
                        </p> */}
              {showProducts && (
                <div className={`main_orders transition-all`}>
                  <div className="flex border-b mb-8 border-gray-200 py-2">
                    <span className="text-gray-900 text-xl  w-3/6">
                      Products
                    </span>
                    <span className="ml-auto text-xl  text-gray-900 w-1/4">
                      Quantity
                    </span>
                    <span className="ml-auto text-xl  text-gray-900">
                      Sub Total
                    </span>
                  </div>
                  {loading ? (
                    <Loader />
                  ) : (
                    showProducts &&
                    order?.products?.map((product) => {
                      const { _id, name, size, qty, price, color,img } = product;
                      return (
                        <div
                          key={_id}
                          className="flex  border-b mb-6 items-center border-gray-200 py-2"
                        >
                          <p className="text-gray-500 w-2/4">
                            <div className="flex gap-2">
                              <img src={img} alt={name} className="w-20" />
                              <div>
                                <span className="text-lg text-gray-600">
                                  {name}
                                </span>
                                <p>
                                  {size && <span>size : {size}</span>}
                                  {color && <span> , Color : {color}</span>}
                                </p>
                              </div>
                            </div>
                          </p>
                          <span className="mx-auto text-gray-900 text-center">
                            {qty}
                          </span>
                          <span className="ml-auto text-gray-900">
                            {qty} X ${price} = ${qty * price}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
              {loading ? (
                <Loader />
              ) : (
                !showProducts && (
                  <div className={`main_orders 3/4 transition-all`}>
                    <div className="flex border-b mb-8 border-gray-200 py-2">
                      <span className="text-xl text-gray-900 w-1/5">
                        User Email
                      </span>
                      <span className="text-xl text-gray-900 w-1/5">
                        User Name
                      </span>
                      <span className="text-xl text-gray-900 w-1/5">
                        Order Status
                      </span>
                      <span className="text-xl text-gray-900 w-1/5">
                        Payment Status
                      </span>
                      <span className="text-xl text-gray-900 w-1/5">
                        Total Price
                      </span>
                    </div>
                    {
                      // return (
                      <div
                        key={_id}
                        className="flex  border-b mb-6 border-gray-200 py-2"
                      >
                        <span className=" text-gray-900 w-1/5">{email}</span>
                        <span className="ml- text-gray-900 w-1/5">
                          {ordered_by}
                        </span>
                        <span className="ml- text-gray-900 w-1/5">
                          {order_status}
                        </span>
                        <span className="ml- text-gray-900 w-1/5">
                          {payment_status}
                        </span>
                        <span className="font-medium text-gray-900 w-1/5">
                          ${totalprice}
                        </span>
                      </div>
                      // );
                    }
                  </div>
                )
              )}

              <div className="flex">
                {order_status === "pending" || order_status === "processing" ? (
                  <button
                    onClick={() => setOpen(true)}
                    className="w-1/4 m-auto text-white text-center bg-yellow-400 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-500 rounded"
                  >
                    Cancel Order
                  </button>
                ) : (
                  ""
                )}

                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                <svg
                                    fill="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                </svg>
                            </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState)
    await mongoose.connect(process.env.MONGO_URI);
  let id = context.query.order_id;
  console.log(id);
  let order_ = await Order.findById(id);
  return {
    props: { order_: JSON.parse(JSON.stringify(order_)) }, // will be passed to the page component as props
  };
}

export default MyOrder;
