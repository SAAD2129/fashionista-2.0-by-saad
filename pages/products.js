import Head from "next/head";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Product from "@/models/Product";
import mongoose from "mongoose";
import Card from "@/components/card";
import ReactStars from "react-rating-stars-component";
import Loader from "@/components/Loader";
import { Fragment } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { FaHeart } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";

const sortOptions = [
  { name: "Most Popular", filter: "MOST_POPULAR", current: true },
  { name: "Best Rating", filter: "RATINGS", current: false },
  { name: "Price: Low to High", filter: "PRICE_L_TO_H", current: false },
  { name: "Price: High to Low", filter: "PRICE_H_TO_L", current: false },
];

const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "yellow", label: "yellow", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Products = ({ loading, setLoading, addToFavorite }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [querySearch, setQuerySearch] = useState("");
  const [filterState, setFilterState] = useState("");
  const [categories, setCategories] = useState([]);
  const [rand, setRand] = useState(0);
  const fetchAllCategories = async () => {
    const response = await fetch(`/api/admin/category`);
    const data = await response.json();
    if (data.success) {
      setCategories(data.categories);
    }
  };
  
  const fetchAllProducts = async () => {
    setLoading(true);
    const response = await fetch(`/api/admin/products`);
    const data = await response.json();
    console.log(data);
    if (data.success) {
      setProducts(data.products);
      setFilteredProducts(data.products);
      setLoading(false);
    }
  };
  const filterQueryProducts = (e) => {
    setQuerySearch(e.target.value);
    if (e.target.value === "" || e.target.value === null) {
      setFilteredProducts(products);
      return;
    }
    setFilteredProducts(
      products.filter((product) =>
        product?.name?.toLowerCase().includes(querySearch.toLowerCase())
      )
    );
  };
  const filterProducts = (name) => {
    setLoading(true);
    setFilterState(name);
    setRand(Math.random());
    let tempProducts = products;
    if (name === "MOST_POPULAR")
      setFilteredProducts(
        tempProducts.filter((product) => product.ratings > 4.5)
      );
    else if (name === "RATINGS")
      setFilteredProducts(
        tempProducts.sort((a, b) => {
          return b.ratings - a.ratings;
        })
      );
    else if (name === "PRICE_L_TO_H")
      setFilteredProducts(
        tempProducts.sort((a, b) => {
          return a.price - b.price;
        })
      );
    else if (name === "PRICE_H_TO_L")
      setFilteredProducts(
        tempProducts.sort((a, b) => {
          return b.price - a.price;
        })
      );
    else {
      setFilteredProducts(products);
      fetchAllProducts();
    }

    setLoading(false);
  };
  const filterCategory = (category) => {
    console.log(category);
    if (category === "all") {
      setRand(Math.random());
      console.log(products);
      setFilteredProducts(products);
      console.log(filteredProducts);
      return;
    }
    setFilteredProducts(
      products.filter((product) => product.category === category)
    );
  };
  useEffect(() => {
    setLoading(true);
    fetchAllCategories();
    fetchAllProducts();
    // fetchAllCategories();
  }, []);

  return (
    <>
      <Head>
        <title>Fashionista - Products</title>
      </Head>
      {loading ? (
        <Loader />
      ) : products?.length === 0 ? (
        <div className=" h-[50vh] flex item-center justify-center" >
          <p className="text-xl text-gray-400 text-center min-h-max mt-20">
            Sorry for inconvinience items are out of stock will be available
            soon!
          </p>
        </div>
      ) : (
        <div className="w-full">
          <div className="bg-white">
            <div className="">
              {/* Mobile filter dialog */}
              <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-40 lg:hidden"
                  onClose={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                >
                  <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <div className="fixed inset-0 z-40 flex">
                    <Transition.Child
                      as={Fragment}
                      enter="transition ease-in-out duration-300 transform"
                      enterFrom="translate-x-full"
                      enterTo="translate-x-0"
                      leave="transition ease-in-out duration-300 transform"
                      leaveFrom="translate-x-0"
                      leaveTo="translate-x-full"
                    >
                      <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                        <div className="flex items-center justify-between px-4">
                          <h2 className="text-lg font-medium text-gray-900">
                            Filters
                          </h2>
                          <button
                            type="button"
                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                            onClick={() => setMobileFiltersOpen(false)}
                          >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>

                        {/* Filters */}
                        <form className="mt-4 border-t border-gray-200">
                          <h3 className="sr-only">Categories</h3>
                          <ul
                            role="list"
                            className="px-2 py-1 font-medium text-gray-900"
                          >
                            <li>
                              <button
                                onClick={() => filterCategory("all")}
                                className="transition-all hover:text-300-yellow"
                              >
                                ALL PRODUCTS
                              </button>
                            </li>
                            {categories.map((category, i) => (
                              <li key={i}>
                                <button
                                  onClick={() => filterCategory(category.name)}
                                  className="transition-all hover:text-300-yellow"
                                >
                                  {category.name.toUpperCase()}
                                </button>
                              </li>
                            ))}
                          </ul>

                          {filters.map((section) => (
                            <Disclosure
                              as="div"
                              key={section.id}
                              className="border-t border-gray-200 px-4 py-6"
                            >
                              {({ open }) => (
                                <>
                                  <h3 className="-mx-2 -my-3 flow-root">
                                    <Disclosure.Button className="flex transition-all w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                      <span className="font-medium text-gray-900">
                                        {section.name}
                                      </span>
                                      <span className="ml-6 translate-all flex items-center">
                                        {open ? (
                                          <MinusIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        ) : (
                                          <PlusIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        )}
                                      </span>
                                    </Disclosure.Button>
                                  </h3>
                                  <Disclosure.Panel className="pt-6 transition-all">
                                    <div className="space-y-6">
                                      {section.options.map(
                                        (option, optionIdx) => (
                                          <div
                                            key={option.value}
                                            className="flex items-center cursor-pointer"
                                          >
                                            <input
                                              id={`filter-mobile-${section.id}-${optionIdx}`}
                                              name={`${section.id}[]`}
                                              defaultValue={option.value}
                                              type="checkbox"
                                              defaultChecked={option.checked}
                                              className="h-4 cursor-pointer w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <label
                                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                              className="ml-3 min-w-0 flex-1 text-gray-500"
                                            >
                                              {option.label}
                                            </label>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          ))}
                        </form>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </Dialog>
              </Transition.Root>

              <main className="w-full px-4 sm:px-6 lg:px-12">
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                  <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                    Our Products
                  </h2>
                  <input
                    type="text"
                    onChange={filterQueryProducts}
                    value={querySearch}
                    placeholder="Search For Products"
                    className="w-2/4 rounded-md transition-all focus:border-gray-300 bg-white  outline-none border border-gray-200 text-sm px-2 py-2"
                  />
                  <div className="flex items-center">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                          Sort
                          <ChevronDownIcon
                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {sortOptions.map((option) => (
                              <Menu.Item key={option.name}>
                                {({ active }) => (
                                  <button
                                    // href={option.href}
                                    onClick={() =>
                                      filterProducts(option.filter)
                                    }
                                    className={classNames(
                                      option.filter === filterState
                                        ? "font-medium text-gray-900"
                                        : "text-gray-500",
                                      active ? "bg-gray-100" : "",
                                      "block w-full px-4 py-2 text-sm"
                                    )}
                                  >
                                    {option.name}
                                  </button>
                                )}
                              </Menu.Item>
                            ))}
                            <div className="border-b border-gray-600 my-2"></div>
                            <Menu.Item key={-153}>
                              {/* {({ active }) => ( */}
                              <button
                                // href={option.href}
                                onClick={() => filterProducts("")}
                                className={`text-gray-800
                                      block w-full px-4 hover:bg-gray-100 py-2 text-sm`}
                              >
                                Reset Filters
                              </button>
                              {/* )} */}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>

                    <button
                      type="button"
                      className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                    >
                      <span className="sr-only">View grid</span>
                      <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                      onClick={() => setMobileFiltersOpen(true)}
                    >
                      <span className="sr-only">Filters</span>
                      <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <section
                  aria-labelledby="products-heading"
                  className="pb-24 pt-6"
                >
                  <h2 id="products-heading" className="sr-only">
                    Products
                  </h2>

                  <div className="grid  grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    {/* Filters */}
                    <div className="hidden lg:block">
                      <h3 className="sr-only">Categories</h3>
                      <ul
                        role="list"
                        className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                      >
                        <li>
                          <button
                            onClick={() => filterCategory("all")}
                            className="transition-all hover:text-300-yellow"
                          >
                            ALL
                          </button>
                        </li>
                        {categories.map((category, i) => (
                          <li key={i}>
                            <button
                              onClick={() => filterCategory(category.name)}
                              className="transition-all hover:text-300-yellow"
                            >
                              {category.name.toUpperCase()}
                            </button>
                          </li>
                        ))}
                      </ul>

                      {/* {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-b border-gray-200 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-4">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center cursor-pointer"
                                    >
                                      <input
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                        className="ml-3 text-sm text-gray-600"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))} */}
                    </div>

                    {/* Product grid */}
                    <div className="lg:col-span-3">
                      {" "}
                      <div className="mx-auto  px-4 py-16 sm:px-6 sm:py-0  lg:px-8">
                        {filteredProducts.length === 0 ? (
                          <div className="h-96 flex items-center justify-center">
                            No Products
                          </div>
                        ) : (
                          <div
                            key={rand}
                            className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3  xl:gap-x-8"
                          >
                            {filteredProducts?.map((product) => {
                              const { discount, stock } = product;
                              return (
                                <div key={product._id}>
                                  <Card

                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                    extra={
                                      "bg-white scale-up-bottom relative shadow-md rounded-lg"
                                    }
                                  >
                                    {discount > 0 && (
                                      <span className="absolute z-20 left-0 top-0 text-sm bg-green-100/60 font-medium text-green-400  px-4 py-2">
                                        On Sale {discount}% OFF
                                      </span>
                                    )}

                                    <button
                                      type="button"
                                      className="absolute top-1 right-1 z-30 "
                                      onClick={() =>
                                        addToFavorite({
                                          id: product?._id,
                                          name: product?.name,
                                          price: product?.price,
                                          img: product?.images[0]?.secret_url,
                                        })
                                      }
                                    >
                                      <AiOutlineHeart className="h-10 w-10 hover:scale-105 transition-all p-2 text-gray-700 bg-white rounded-full " />
                                    </button>
                                    <Link
                                      href={`/product/${product._id}`}
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
                                          <Link
                                            href={`/product/${product._id}`}
                                          >
                                            {product?.name?.length > 30
                                              ? product?.name?.slice(0, 30) +
                                                "..."
                                              : product?.name}
                                          </Link>
                                        </h3>
                                      </div>

                                      <p className="text-sm rounded-md p-2 bg-yellow-50 font-medium text-gray-700">
                                        ${product.price}.00
                                      </p>
                                    </div>
                                    <p className="p-2 text-sm flex gap-2 font-medium text-gray-900 rating">
                                      {product.ratings === 0 ? (
                                        <span>Not Rated yet</span>
                                      ) : (
                                        <>
                                          <ReactStars
                                            count={5}
                                            // onChange={ratingChanged}
                                            size={24}
                                            isHalf={true}
                                            value={product.ratings}
                                            edit={false}
                                            emptyIcon={
                                              <i className="far fa-star"></i>
                                            }
                                            halfIcon={
                                              <i className="fa fa-star-half-alt"></i>
                                            }
                                            fullIcon={
                                              <i className="fa fa-star"></i>
                                            }
                                            activeColor="#ffd51e"
                                          />
                                          <span>({product.noOfReviews})</span>
                                        </>
                                      )}
                                    </p>
                                  </Card>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// export async function getServerSideProps(context) {
//   if (!mongoose.connections[0].readyState)
//     await mongoose.connect(process.env.MONGO_URI);

//   let products = await Product.find({ category: "tshirt" });
//   return {
//     props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
//   };
// }
export default Products;
