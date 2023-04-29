// import Banner from "./components/Banner";
// import General from "./components/General";
// import Notification from "./components/Notification";
// import Project from "./components/Project";
// import Storage from "./components/Storage";
// import Upload from "./components/Upload";

import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import Card from "@/components/card";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiFilter } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
const Products = ({ loading, setLoading }) => {
  const [orders, setOrders] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productCategory, setProductCategory] = useState("ALL");
  const [querySearch, setQuerySearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const router = useRouter();
  const searchFilter = (e) => {
    console.log(e.target.value);
    setFilteredProducts(
      products?.filter((product) =>
        // product?.colors?.filter((clr) => clr?.color?.includes(e.target.value)) ||
        product?.name.toLowerCase()?.includes(e.target.value.toLowerCase())
      )
    );
    setQuerySearch(e.target.value);
  };
  const filterProducts = (category) => {
    setProductCategory(category);
    switch (category) {
      case "ALL":
        setFilteredProducts(products);
        break;
      case "IN_STOCK":
        setFilteredProducts(products?.filter((product) => product.stock > 0));
        break;
      case "OUT_OF_STOCK":
        setFilteredProducts(products?.filter((product) => product.stock <= 0));
        break;
      case "FEATURED":
        setFilteredProducts(
          products?.filter((product) => product.ratings > 4.5)
        );
        break;
      case "ON_SALE":
        setFilteredProducts(
          products?.filter((product) => product.discount > 0)
        );
        break;

      default:
        break;
    }
  };
  const [products, setProducts] = useState([]);
  const fetchAllProducts = async () => {
    setLoading(true);
    const response = await fetch("/api/admin/products");
    const data = await response.json();
    if (data.success) {
      setProducts(data.products);
      setFilteredProducts(data.products);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <Layout pathname={"Products"}>
      <Head>
        <title>Admin Products</title>
      </Head>
      {/* {products?.length === 0 ? "You haven't Added Product Yet"} */}
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* <ul className="flex ">
            <li></li>
            <li>
              <button
                onClick={() => filterProducts("IN_STOCK")}
                className={` ${
                  productCategory === "IN_STOCK"
                    ? " border-purple-400 text-purple-400 transition-all"
                    : "border-gray-300 text-gray-500"
                }  border-b-2 font-medium text-sm py-2 pr-4`}
              >
                In Stock
              </button>
            </li>
            <li>
              <button
                onClick={() => filterProducts("OUT_OF_STOCK")}
                className={` ${
                  productCategory === "OUT_OF_STOCK"
                    ? " border-purple-400 text-purple-400 transition-all"
                    : "border-gray-300 text-gray-500"
                }  border-b-2 font-medium text-sm py-2 pr-4`}
              >
                Out of Stock
              </button>
            </li>
            <li>
              <button
                onClick={() => filterProducts("FEATURED")}
                className={` ${
                  productCategory === "FEATURED"
                    ? " border-purple-400 text-purple-400 transition-all"
                    : "border-gray-300 text-gray-500"
                }  border-b-2 font-medium text-sm py-2 pr-4`}
              >
                Featured
              </button>
            </li>
            <li>
              <button
                onClick={() => filterProducts("ON_SALE")}
                className={` ${
                  productCategory === "ON_SALE"
                    ? " border-purple-400 text-purple-400 transition-all"
                    : "border-gray-300 text-gray-500"
                }  border-b-2 font-medium text-sm py-2 pr-4`}
              >
                On Sale
              </button>
            </li>
          </ul> */}
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
              <div
                onMouseEnter={() => setShowFilter(true)}
                onMouseLeave={() => setShowFilter(false)}
                className="flex relative cursor-pointer items-center gap-2 justify-center  px-3 py-1 rounded-md border border-gray-200  text-base leading-8 text-gray-700 outline-none transition-all duration-200 ease-in-out  bg-white"
              >
                {/* <button className="flex items-center"> */}
                  <BiFilter className="" />
                  <span className="">Filters</span>
                {/* </button> */}

                {showFilter && (
                  <div
                    className="absolute transition-all right-0 top-10 z-40 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                  >
                    <div className="py-1" role="none">
                      <button
                        onClick={() => filterProducts("ALL")}
                        className={` ${
                          productCategory === "ALL"
                            ? "text-gray-70 transition-all"
                            : "text-gray-700"
                        }  hover:bg-purple-50 px-4 py-2  border-b border-gray-100 text-sm w-full block`}
                      >
                        All Products
                      </button>
                      <button
                        onClick={() => filterProducts("IN_STOCK")}
                        className={` ${
                          productCategory === "IN_STOCK"
                            ? "text-gray-70 transition-all"
                            : "text-gray-700"
                        }  hover:bg-purple-50 px-4 py-2 border-b border-gray-100 text-sm w-full block`}
                      >
                        In Stock
                      </button>
                      <button
                        onClick={() => filterProducts("OUT_OF_STOCK")}
                        className={` ${
                          productCategory === "OUT_OF_STOCK"
                            ? "text-gray-70 transition-all"
                            : "text-gray-700"
                        }  hover:bg-purple-50 px-4 py-2 border-b border-gray-100 text-sm w-full block`}
                      >
                        Out of Stock
                      </button>
                      <button
                        onClick={() => filterProducts("FEATURED")}
                        className={` ${
                          productCategory === "FEATURED"
                            ? "text-gray-70 transition-all"
                            : "text-gray-700"
                        }  hover:bg-purple-50 px-4 py-2 border-b border-gray-100 text-sm w-full block`}
                      >
                        Featured
                      </button>
                      <button
                        onClick={() => filterProducts("ON_SALE")}
                        className={` ${
                          productCategory === "ON_SALE"
                            ? "text-gray-70 transition-all"
                            : "text-gray-700"
                        }  hover:bg-purple-50 px-4 py-2 text-sm w-full block`}
                      >
                        On Sale
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {filteredProducts.length <= 0 ? (
            <div className=" flex justify-center items-center h-[40vh]">
              <span>No Products</span>
            </div>
          ) : (
            <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6">
              {filteredProducts.map((product) => {
                const { _id, name, price, discount, stock } = product;
                return (
                  <div key={product._id}>
                    <Card extra={"bg-white relative shadow-md rounded-lg"}>
                      {discount > 0 && (
                        <span className="absolute z-20 left-0 top-0 text-sm bg-green-100/60 font-medium text-green-400  px-4 py-2">
                          On Sale {discount}% OFF
                        </span>
                      )}
                      {stock <= 0 && (
                        <span className="absolute z-20 right-0 top-0 text-sm bg-red-100/60 font-medium text-red-500 px-4 py-2">
                          Out Of Stock
                        </span>
                      )}

                      <Link
                        href={`/admin/products/${product._id}`}
                        className="min-h-80  rounded-lg aspect-h-1 aspect-w-1 w-full overflow-hidden  bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
                      >
                        <img
                          src={product?.images[0]?.secret_url}
                          alt={product.name}
                          className="h-full transition-all  rounded-lg hover:scale-125 w-full object-cover  object-center lg:h-full lg:w-full"
                        />
                      </Link>
                      <div className="p-2 flex items-center justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <Link href={`/admin/products/${product._id}`}>
                              {product?.name?.length > 30
                                ? product?.name?.slice(0, 30) + "..."
                                : product?.name}
                            </Link>
                          </h3>
                        </div>

                        <p className="text-sm rounded-md p-2 bg-yellow-100 font-medium text-gray-700">
                          ${product.price}.00
                        </p>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default Products;
