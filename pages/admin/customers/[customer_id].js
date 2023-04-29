import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import Switch from "@/components/switch";
import User from "@/models/User";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import mongoose from "mongoose";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";
import { toast } from "react-toastify";

const Customer = ({ setLoading, loading,customer }) => {
  const router = useRouter();
  // const getCustomer = async (id) => {
  //   setLoading(true);
  //   console.log(id);
  //   const res = await fetch("/api/admin/customer", {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json",
  //       token: localStorage.getItem("token"),
  //       cus_id: id,
  //     },
  //   });
  //   const data = await res.json();
  //   console.log(data);
  //   if (data.success) {
  //     setLoading(false);
  //     setCustomer(data.customer);
  //   } else {
  //     toast.error(data.msg, { autoClose: 1500 });
  //   }
  // };
  useEffect(() => {
    console.log(customer)
    // const { customer_id } = router.query;
    // if (customer_id) getCustomer(customer_id);
  }, []);
  return (
    <Layout pathname={"customer"}>
      {loading ? (
        <Loader />
      ) : (
        customer && (
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container  px-5 py-24 mx-auto">
              <div className="lg:w-4/5 rounded-2xl bg-white mx-auto flex flex-wrap">
                <div className="lg:w-full lg:px-10 mx-auto lg:py-6 mt-6 lg:mt-0">
                  <img
                    alt={customer.username}
                    className="w-52 h-52 rounded-full mx-auto object-cover object-center"
                    src={customer?.profileImage?.secret_url}
                  />
                  <div className="mt-4 flex flex-col items-center">
                    <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                      {customer.first_name} {customer.last_name}
                    </h4>
                    <p className="text-base font-normal text-gray-600">
                      @{customer.username}
                    </p>
                  </div>
                  <div className="my-2 flex items-center justify-center gap-2">
                    <Link href="/fb">
                      <FaFacebook className="text-2xl " />
                    </Link>
                    <Link href="/insta">
                      <FaInstagram className="text-2xl " />
                    </Link>
                    <Link href="/google">
                      <FaGoogle className="text-2xl " />
                    </Link>
                  </div>
                  <div className="mt-6 mb-3 flex gap-4 justify-evenly md:!gap-4">
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-xl font-bold text-navy-700 dark:text-white">
                        ${customer.moneySpent}
                      </p>
                      <p className="text-sm font-normal text-gray-600">
                        Money Spent
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-xl font-bold text-navy-700 dark:text-white">
                        {customer.totalOrders}
                      </p>
                      <p className="text-sm font-normal text-gray-600">
                        Total Orders
                      </p>
                    </div>
                  </div>
                  <div className="my-12 overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-base font-semibold leading-6 text-gray-900">
                        Customer Information
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Personal details and Addresses.
                      </p>
                    </div>
                    <div className="border-t border-gray-200">
                      <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Full name
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {customer.first_name} {customer.last_name}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Name
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {customer?.username}
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Email address
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {customer?.email}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Phone
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {customer?.phone ? customer.phone : "Not given"}
                          </dd>
                        </div>
                        {/* <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Addresses
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {addresses?.length === 0 ? (
                              <span className="text-sm">Not Given</span>
                            ) : (
                              addresses?.map((add, i) => {
                                return (
                                  <div
                                    key={i}
                                    className="my-2 flex justify-between"
                                  >
                                    <p className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      {add.street_address}, {add.city},{" "}
                                      {add.state}, {add.zip}
                                    </p>
                                    <FaTrash
                                      onClick={() => {
                                        deleteAddress(add._id);
                                      }}
                                      className="text-purple-600"
                                    />
                                  </div>
                                );
                              })
                            )}
                          </dd>
                        </div> */}
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Account Registered
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {customer?.createdAt?.toString()}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Email Notifications
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <Switch
                              checked={customer.email_notifications}
                              color="purple"
                            />
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                  {/* <div className="flex mt-8">
                    <span className="title-font font-medium text-2xl text-gray-900">
                      $58.00
                    </span>
                    <button className="flex ml-auto text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded">
                      Delete customer
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </section>
        )
      )}
    </Layout>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState)
    await mongoose.connect(process.env.MONGO_URI);

  let customer = await User.findById(context.query.customer_id);
  return {
    props: { customer: JSON.parse(JSON.stringify(customer)) }, // will be passed to the page component as props
  };
}
export default Customer;
