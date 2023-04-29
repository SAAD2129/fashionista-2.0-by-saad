
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import Card from "@/components/card";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiFilter } from "react-icons/bi";
import { FaPencilAlt, FaSearch } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";

const Orders = ({ loading, setLoading }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orderCategory, setOrderCategory] = useState("all");
  const [querySearch, setQuerySearch] = useState("");
  const fetchAllOrders = async () => {
    setLoading(true);
    const response = await fetch("/api/admin/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    if (data.success) {
      //   console.log(data);
      setOrders(data.orders);
      setFilteredOrders(data.orders);
      setLoading(false);
    }
  };
  const searchFilter = (e) => {
    console.log(e.target.value);
    setFilteredOrders(
      orders?.filter(
        (order) =>
          order?._id?.includes(e.target.value) ||
          order?.ordered_by?.includes(e.target.value) ||
          order?.order_status?.includes(e.target.value)
      )
    );
    setQuerySearch(e.target.value);
  };
  const filterOrders = (category) => {
    setOrderCategory(category);
    if (category === "all") {
      setFilteredOrders(orders);
      return;
    }
    setFilteredOrders(
      orders?.filter((order) => order.order_status === category)
    );
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <Layout pathname={"orders"}>
      <Head>
        <title>Admin Orders</title>
      </Head>
      <ul className="flex ">
        <li>
          <button
            onClick={() => filterOrders("all")}
            className={` ${
              orderCategory === "all"
                ? " border-yellow-400 text-yellow-400 transition-all"
                : "border-gray-300 text-gray-500"
            }  border-b-2 font-medium text-sm py-2`}
          >
            All Orders
          </button>
        </li>
        <li>
          <button
            onClick={() => filterOrders("completed")}
            className={` ${
              orderCategory === "completed"
                ? " border-yellow-400 text-yellow-400 transition-all"
                : "border-gray-300 text-gray-500"
            }  border-b-2 font-medium text-sm py-2 px-4`}
          >
            Completed
          </button>
        </li>
        <li>
          <button
            onClick={() => filterOrders("pending")}
            className={` ${
              orderCategory === "pending"
                ? " border-yellow-400 text-yellow-400 transition-all"
                : "border-gray-300 text-gray-500"
            }  border-b-2 font-medium text-sm py-2 px-4`}
          >
            Pending
          </button>
        </li>
        <li>
          <button
            onClick={() => filterOrders("processing")}
            className={` ${
              orderCategory === "processing"
                ? " border-yellow-400 text-yellow-400 transition-all"
                : "border-gray-300 text-gray-500"
            }  border-b-2 font-medium text-sm py-2 px-4`}
          >
            Processing
          </button>
        </li>
        <li>
          <button
            onClick={() => filterOrders("cancelled")}
            className={` ${
              orderCategory === "cancelled"
                ? " border-yellow-400 text-yellow-400 transition-all"
                : "border-gray-300 text-gray-500"
            }  border-b-2 font-medium text-sm py-2`}
          >
            Cancelled
          </button>
        </li>
      </ul>
      <div className="flex my-4  p-4 bg-white justify-between item-center w-full items-center shadd rounded-lg">
        <div className="flex rounded-md shadow-sm w-2/4 px-2 bg-white border border-gray-200 items-center  sm:max-w-md">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            name="querySearch"
            onChange={searchFilter}
            value={querySearch}
            id="querySearch"
            autoComplete="off"
            className="w-full rounded border-0   bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out  bg-transparent "
            placeholder="Search order id , customer and order status"
          />
        </div>
        <div className="w-1/4 flex items-center justify-end gap-4">
          <button className="flex items-center gap-2 justify-center rounded-md border border-gray-200 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out  bg-white">
            <BiFilter />
            <span>Filters</span>
          </button>
          <button className="flex items-center gap-2 justify-center rounded-md border border-gray-200 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out  bg-white">
            <MdAttachFile />
            <span>Attach</span>
          </button>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : filteredOrders?.length === 0 ? (
        <div className="text-center mt-40">
          <p> No orders yet</p>
        </div>
      ) : (
        <div class="lg:w-full bg-white mx-auto overflow-auto">
          <table class="table-auto w-full text-left whitespace-no-wrap">
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
                <th class="px-4 py-3 text-center title-font tracking-wider font-medium text-gray-800 text-sm  rounded-tr rounded-br">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders?.map((order) => {
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
                    <Link href={`/admin/orders/${_id}`}>
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
                    <td class="px-4 text-right text-base py-3 text-gray-500">
                      <Link href={`/admin/orders/${_id}`}>
                        <FaPencilAlt className="mx-auto hover:text-yellow-400 transition-all cursor-pointer" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default Orders;
