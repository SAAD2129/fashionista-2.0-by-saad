/* eslint-disable */

import { HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import Link from "next/link";
// import Links
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdAdd,
  MdShoppingBasket,
} from "react-icons/md";
import {
  RxDashboard
} from "react-icons/rx";

import { useRouter } from "next/router";
import { BsBoxes } from "react-icons/bs";

const Sidebar = () => {
    const [open,setOpen] = useState(false)

  const [pathname, setPathname] = useState("");
  const router = useRouter();
  useEffect(() => {
    setPathname(router.pathname);
  }, [router.query]);
  const onClose = (e) => {
    setOpen(false);
  };

  return (
    <div
      className={`sm:none w-80 duration-175 linear dark:!bg-navy-800 fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:text-white md:!z-50 lg:!z-50 xl:!z-0  ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >

      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={()=>onClose()}
      >
        <HiX />
      </span>
     {!open && <span
        className="fixed top-2 -right-28 cursor-pointer "
        onClick={()=>setOpen(true)}
      >
        <CgMenuGridO className="font-bold text-3xl text-yellow-400"/>
      </span>} 

      <div className={`mx-auto mt-[50px] flex items-center`}>
        <p className="text-2xl">
          Admin
          <span className="font-bold text-yellow-400"> Fashionista</span>
        </p>
      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <li className="my-6">
          {/* <Link href={"/admin/products"}></Link> */}
          <Link href={"/admin"}>
            <div className="relative mb-4 flex items-center hover:cursor-pointer">
              <div className="my-[3px] flex cursor-pointer items-center px-8">
                <span
                  className={`text-gray-400  dark:text-white ${
                    "/admin" === pathname ? "font-bold text-yellow-400" : ""
                  }`}
                >
                  <RxDashboard className="h-6 w-6" />
                </span>
                <p
                  className={`leading-1 text-navy-700 ml-4 flex ${
                    "/admin" === pathname ? "font-semibold text-gray-700" : "text-gray-400"
                  } dark:text-white`}
                >
                  Dashboard
                </p>
              </div>
              <div
                className={`absolute right-0 top-px h-9 w-1 rounded-lg ${
                  "/admin" === pathname ? "bg-yellow-400" : "bg-transparent"
                } dark:bg-yellow-400`}
              ></div>
            </div>
          </Link>
        </li>
        <li className="my-6">
          {/* <Link href={"/admin/products"}></Link> */}
          <Link href={"/admin/orders"}>
            <div className="relative mb-3 flex items-center hover:cursor-pointer">
              <div className="my-[3px] flex cursor-pointer items-center px-8">
                <span
                  className={`text-gray-400  dark:text-white ${
                    "/admin/orders" === pathname ? "font-bold text-yellow-400" : ""
                  }`}
                >
                  <MdOutlineShoppingCart className="h-6 w-6" />
                </span>
                <p
                  className={`leading-1 text-navy-700 ml-4 flex ${
                    "/admin/orders" === pathname ? "font-semibold text-gray-700" : "text-gray-400"
                  } dark:text-white `}
                >
                  Orders
                </p>
              </div>
              <div
                className={`absolute right-0 top-px h-9 w-1 rounded-lg ${
                  "/admin/orders" === pathname
                    ? "bg-yellow-400"
                    : "bg-transparent"
                } dark:bg-yellow-400`}
              ></div>
            </div>
          </Link>
        </li>
        <li className="my-6">
          {/* <Link href={"/admin/products"}></Link> */}
          <Link href={"/admin/customers"}>
            <div className="relative mb-3 flex items-center hover:cursor-pointer">
              <div className="my-[3px] flex cursor-pointer items-center px-8">
                <span
                  className={`text-gray-400  dark:text-white ${
                    "/admin/customers" === pathname ?"font-bold text-yellow-400" : ""
                  }`}
                >
                  <MdPerson className="h-6 w-6" />
                </span>
                <p
                  className={`leading-1 text-navy-700 ml-4 flex ${
                    "/admin/customers" === pathname ? "font-semibold text-gray-700" : "text-gray-400"
                  } dark:text-white`}
                >
                  Customers
                </p>
              </div>
              <div
                className={`absolute right-0 top-px h-9 w-1 rounded-lg ${
                  "/admin/customers" === pathname
                    ? "bg-yellow-400"
                    : "bg-transparent"
                } dark:bg-yellow-400`}
              ></div>
            </div>
          </Link>
        </li>
        <li className="my-6">
          {/* <Link href={"/admin/products"}></Link> */}
          <Link href={"/admin/products"}>
            <div className="relative mb-3 flex items-center hover:cursor-pointer">
              <div className="my-[3px] flex cursor-pointer items-center px-8">
                <span
                  className={`text-gray-400  dark:text-white ${
                    "/admin/products" === pathname ? "font-bold text-yellow-400" : ""
                  }`}
                >
                  {/* <MdShoppingBasket className="h-6 w-6" /> */}
                  <BsBoxes className="h-6 w-6" />
                </span>
                <p
                  className={`leading-1 text-navy-700 ml-4 flex ${
                    "/admin/products" === pathname ? "font-semibold text-gray-700" : "text-gray-400"
                  } dark:text-white`}
                >
                  Products
                </p>
              </div>
              <div
                className={`absolute right-0 top-px h-9 w-1 rounded-lg ${
                  "/admin/products" === pathname
                    ? "bg-yellow-400"
                    : "bg-transparent"
                }  dark:bg-yellow-400`}
              ></div>
            </div>
          </Link>
        </li>
        <li className="my-6">
          {/* <Link href={"/admin/products"}></Link> */}
          <Link href={"/admin/addproduct"}>
            <div className="relative mb-3 flex items-center hover:cursor-pointer">
              <div className="my-[3px] flex cursor-pointer items-center px-8">
                <span
                  className={`text-gray-400  dark:text-white ${
                    "/admin/addproduct" === pathname ? "font-bold text-yellow-400" : ""
                  }`}
                >
                  <MdAdd className="h-6 w-6" />
                </span>
                <p
                  className={`leading-1 text-navy-700 ml-4 flex ${
                    "/admin/addproduct" === pathname ?"font-bold text-gray-800" : "text-gray-400"
                  } dark:text-white`}
                >
                  Add Product
                </p>
              </div>
              <div
                className={`absolute right-0 top-px h-9 w-1 rounded-lg ${
                  "/admin/addproduct" === pathname
                    ? "bg-yellow-400"
                    : "bg-transparent"
                } dark:bg-yellow-400`}
              ></div>
            </div>
          </Link>
        </li>
        {/* <MdBarChart className="h-6 w-6" /> */}

        {/* <MdLock className="h-6 w-6" /> */}
      </ul>
      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
