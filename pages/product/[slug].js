import { useRouter } from "next/router";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Head from "next/head";
import ReactStars from "react-rating-stars-component";
import { RadioGroup } from "@headlessui/react";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { AiOutlineHeart } from "react-icons/ai";
import { PaymentsOutlined } from "@mui/icons-material";
import {
  FaBox,
  FaBoxOpen,
  FaComment,
  FaCrown,
  FaStripe,
  FaTasks,
  FaTruck,
} from "react-icons/fa";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const ProductTshirt = ({
  addToCart,
  loading,
  setLoading,
  addToFavorite,
  btnClasses,
}) => {
  const [product, setProduct] = useState();
  const [mainImage, setMainImage] = useState();
  const router = useRouter();
  const { slug } = router.query;
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const setProductColorImage = (color) => {
    console.log(color);
    product.images.map((image) => {
      if (image.secret_url.includes(color)) {
        setMainImage(image.secret_url);
      }
    });
  };
  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch(`/api/admin/product`, {
      method: "GET",
      headers: {
        product_id: slug,
      },
    });
    const data = await response.json();
    if (data.success) {
      setProduct(data.product);
      setReviews(data.reviews);
      setMainImage(data.product?.images[0]?.secret_url);
      setLoading(false);
    } else {
      toast.error(data.msg);
    }
  };
  const reviewProduct = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setOpen(false);
      setComment("");
      setRating(0);
      toast.error(`you are not logged in`, { autoClose: 1500 });
      return;
    }

    setLoading(true);
    const response = await fetch(`/api/products/review`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        product_id: slug,
        token,
      },
      body: JSON.stringify({ comment: comment, rating: rating }),
    });
    const data = await response.json();
    if (data.success) {
      setLoading(false);
      toast.success("review added successfully");
      setOpen(false);
      setProduct(data.product);
      setReviews(data.reviews);
      setComment("");
      setRating(0);
    } else {
      toast.error(data.msg);
    }
  };
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  const buyNow = (item) => {
    addToCart(item);
    router.push("/checkout");
  };
  useEffect(() => {
    // console.log(product);
    setLoading(false);
    fetchProduct();
  }, [slug]);
  return (
    <>
      <Head>
        <title>Fashionista - Product</title>
      </Head>
      {loading ? (
        <Loader />
      ) : (
        product && (
          <div className="">
            <div className="pt-6">
              <nav aria-label="Breadcrumb">
                <ol
                  role="list"
                  className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
                >
                  <li>
                    <div className="flex items-center">
                      <a className="mr-2 text-sm font-medium text-gray-900">
                        {product?.category?.toUpperCase()}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                  <li className="text-sm">
                    <button
                      aria-current="page"
                      className="font-medium text-gray-500 hover:text-gray-600"
                    >
                      {product?.name?.toUpperCase()}
                    </button>
                  </li>
                </ol>
              </nav>

              {/* Image gallery */}

              <div
                className="hidden bg-red-700  bg-inherit	    
 bg-current	    
 bg-transparent	
 bg-black	    
 bg-white	    
 bg-slate-50	    
 bg-slate-100	
 bg-slate-200	
 bg-slate-300	
 bg-slate-400	
 bg-slate-500	
 bg-slate-600	
 bg-slate-700	
 bg-slate-800	
 bg-slate-900	
 bg-slate-950	
 bg-gray-50	
 bg-gray-100	
 bg-gray-200	
 bg-gray-300	
 bg-gray-400	
 bg-gray-500	
 bg-gray-600	
 bg-gray-700	
 bg-gray-800	
 bg-gray-900	
 bg-gray-950	
 bg-zinc-50	
 bg-zinc-100	
 bg-zinc-200	
 bg-zinc-300	
 bg-zinc-400	
 bg-zinc-500	
 bg-zinc-600	
 bg-zinc-700	
 bg-zinc-800	
 bg-zinc-900	
 bg-zinc-950	
 bg-neutral-50	
 bg-neutral-100	
 bg-neutral-200	
 bg-neutral-300	
 bg-neutral-400	
 bg-neutral-500	
 bg-neutral-600	
 bg-neutral-700	
 bg-neutral-800	
 bg-neutral-900	
 bg-neutral-950	
 bg-stone-50	    
 bg-stone-100	
 bg-stone-200	
 bg-stone-300	
 bg-stone-400	
 bg-stone-500	
 bg-stone-600	
 bg-stone-700	
 bg-stone-800	
 bg-stone-900	
 bg-stone-950	
 bg-red-50	    
 bg-red-100	    
 bg-red-200	    
 bg-red-300	    
 bg-red-400	    
 bg-red-500	    
 bg-red-600	    
 bg-red-700	    
 bg-red-800	    
 bg-red-900	    
 bg-red-950	    
 bg-orange-50	
 bg-orange-100	
 bg-orange-200	
 bg-orange-300	
 bg-orange-400	
 bg-orange-500	
 bg-orange-600	
 bg-orange-700	
 bg-orange-800	
 bg-orange-900	
 bg-orange-950	
 bg-amber-50	    
 bg-amber-100	
 bg-amber-200	
 bg-amber-300	
 bg-amber-400	
 bg-amber-500	
 bg-amber-600	
 bg-amber-700	
 bg-amber-800	
 bg-amber-900	
 bg-amber-950	
 bg-yellow-50	
 bg-yellow-100	
 bg-yellow-200	
 bg-yellow-300	
 bg-yellow-400	
 bg-yellow-500	
 bg-yellow-600	
 bg-yellow-700	
 bg-yellow-800	
 bg-yellow-900	
 bg-yellow-950	
 bg-lime-50	
 bg-lime-100	
 bg-lime-200	
 bg-lime-300	
 bg-lime-400	
 bg-lime-500	
 bg-lime-600	
 bg-lime-700	
 bg-lime-800	
 bg-lime-900	
 bg-lime-950	
 bg-green-50	
 bg-green-100	
 bg-green-200	
 bg-green-300	
 bg-green-400	
 bg-green-500	
 bg-green-600	
 bg-green-700	
 bg-green-800	
 bg-green-900	
 bg-green-950	
 bg-emerald-50	
 bg-emerald-100	
 bg-emerald-200	
 bg-emerald-300	
 bg-emerald-400	
 bg-emerald-500	
 bg-emerald-600	
 bg-emerald-700	
 bg-emerald-800	
 bg-emerald-900	
 bg-emerald-950	
 bg-teal-50	
 bg-teal-100	
 bg-teal-200	
 bg-teal-300	
 bg-teal-400	
 bg-teal-500	
 bg-teal-600	
 bg-teal-700	
 bg-teal-800	
 bg-teal-900	
 bg-teal-950	
 bg-cyan-50	
 bg-cyan-100	
 bg-cyan-200	
 bg-cyan-300	
 bg-cyan-400	
 bg-cyan-500	
 bg-cyan-600	
 bg-cyan-700	
 bg-cyan-800	
 bg-cyan-900	
 bg-cyan-950	
 bg-sky-50	
 bg-sky-100	
 bg-sky-200	
 bg-sky-300	
 bg-sky-400	
 bg-sky-500	
 bg-sky-600	
 bg-sky-700	
 bg-sky-800	
 bg-sky-900	
 bg-sky-950	
 bg-blue-50	
 bg-blue-100	
 bg-blue-200	
 bg-blue-300	
 bg-blue-400	
 bg-blue-500	
 bg-blue-600	
 bg-blue-700	
 bg-blue-800	
 bg-blue-900	
 bg-blue-950	
 bg-indigo-50	
 bg-indigo-100	
 bg-indigo-200	
 bg-indigo-300	
 bg-indigo-400	
 bg-indigo-500	
 bg-indigo-600	
 bg-indigo-700	
 bg-indigo-800	
 bg-indigo-900	
 bg-indigo-950	
 bg-violet-50	
 bg-violet-100	
 bg-violet-200	
 bg-violet-300	
 bg-violet-400	
 bg-violet-500	
 bg-violet-600	
 bg-violet-700	
 bg-violet-800	
 bg-violet-900	
 bg-violet-950	
 bg-purple-50	
 bg-purple-100	
 bg-purple-200	
 bg-purple-300	
 bg-purple-400	
 bg-purple-500	
 bg-purple-600	
 bg-purple-700	
 bg-purple-800	
 bg-purple-900	
 bg-purple-950	
 bg-fuchsia-50	
 bg-fuchsia-100	
 bg-fuchsia-200	
 bg-fuchsia-300	
 bg-fuchsia-400	
 bg-fuchsia-500	
 bg-fuchsia-600	
 bg-fuchsia-700	
 bg-fuchsia-800	
 bg-fuchsia-900	
 bg-fuchsia-950	
 bg-pink-50	
 bg-pink-100	
 bg-pink-200	
 bg-pink-300	
 bg-pink-400	
 bg-pink-500	
 bg-pink-600	
 bg-pink-700	
 bg-pink-800	
 bg-pink-900	
 bg-pink-950	
 bg-rose-50	
 bg-rose-100	
 bg-rose-200	
 bg-rose-300	
 bg-rose-400	
 bg-rose-500	
 bg-rose-600	
 bg-rose-700	
 bg-rose-800	
 bg-rose-900	
 bg-rose-950	
 "
              ></div>
              {/* Product info */}
              <div className="mx-auto bg-white mt-12 max-w-2xl px-4  pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                <div className="lg:col-span-2 h-[30rem] gap-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <div className="overflow-hidden h-full">
                    <img
                      className="h-full overflow-hidden cursor-pointer"
                      src={mainImage}
                      alt={product.name}
                    />
                  </div>
                  {product.images.length > 1 && (
                    <div className="flex gap-2 mt-4">
                      {product.images.map((image, i) => {
                        return (
                          <img
                            onClick={() => setMainImage(image?.secret_url)}
                            key={image?.secret_url}
                            className="w-28 cursor-pointer"
                            src={image?.secret_url}
                            alt={product.name}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Options */}
                <div className="mt-4 lg:row-span-3 lg:mt-0">
                  <h2 className="">Product information</h2>
                  <h3 className="lg:text-xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                    {product?.name?.toUpperCase()}
                  </h3>

                  {/* Reviews */}
                  <div className="mt-2">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <div className="text-sm flex gap-2 font-medium text-gray-900 rating">
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
                              emptyIcon={<i className="far fa-star"></i>}
                              halfIcon={<i className="fa fa-star-half-alt"></i>}
                              fullIcon={<i className="fa fa-star"></i>}
                              activeColor="#ffd51e"
                            />
                            <span className="text-gray-600">
                              ({product.noOfReviews}) reviews
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-8">
                    {product.stock <= 0 && (
                      <span className="text-sm bg-red-100/60 font-medium text-red-500 px-4 py-2">
                        Out Of Stock
                      </span>
                    )}
                    {product.stock > 0 && (
                      <span className="text-sm bg-green-100/60 font-medium text-green-500 px-4 py-2">
                        In Stock
                      </span>
                    )}
                    <p className="text-lg tracking-tight">
                      {product.discount > 0 && (
                        <span className="line-through text-sm text-gray-400 px-2">
                          ${product.price}
                        </span>
                      )}

                      <span className="px-6 py-3 font-bold rounded-3xl border border-gray-200 bg-white">
                        $
                        {product.discount > 0
                          ? product.price -
                            product.price * (product.discount / 100)
                          : `${product.price}.00`}
                      </span>
                    </p>
                  </div>
                  <div className="mt-10">
                    {/* Colors */}
                    {product?.colors?.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          Color
                        </h3>

                        <RadioGroup
                          onChange={setSelectedColor}
                          value={selectedColor}
                          className="mt-4"
                        >
                          <RadioGroup.Label className="sr-only">
                            {" "}
                            Choose a color{" "}
                          </RadioGroup.Label>
                          <div className="hidden bg-purple bg-black bg-red-700 bg-white bg-green-700 bg-blue-700"></div>
                          <div className="flex items-center space-x-3">
                            {product?.colors?.map((item) => {
                              // console.log(item);
                              const { color, inStock } = item;
                              return (
                                <RadioGroup.Option
                                  key={color}
                                  onClick={() => setProductColorImage(color)}
                                  value={`${color}`}
                                  className={({ active, checked }) =>
                                    classNames(
                                      "ring-gray-400",
                                      active && checked
                                        ? "ring ring-offset-1"
                                        : "",
                                      !active && checked ? "ring-2" : "",
                                      "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                    )
                                  }
                                >
                                  <RadioGroup.Label
                                    as="span"
                                    className="sr-only"
                                  >
                                    {" "}
                                    {color}{" "}
                                  </RadioGroup.Label>
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      `${
                                        color === "black" || color === "white"
                                          ? `bg-${color}`
                                          : `bg-${color}-700`
                                      }`,
                                      "h-8 w-8 rounded-full border border-black border-opacity-10"
                                    )}
                                  />
                                </RadioGroup.Option>
                              );
                            })}
                          </div>
                        </RadioGroup>
                      </div>
                    )}
                    {product?.sizes?.length > 0 && (
                      <div className="mt-10">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">
                            Size
                          </h3>
                          <a
                            href="#"
                            className="text-sm font-medium text-yellow-400 hover:text-yellow-400"
                          >
                            Size guide
                          </a>
                        </div>

                        <RadioGroup
                          value={selectedSize}
                          onChange={setSelectedSize}
                          className="mt-4"
                        >
                          <RadioGroup.Label className="sr-only">
                            {" "}
                            Choose a size{" "}
                          </RadioGroup.Label>
                          <div className="grid lg:grid-cols-6 gap-2 sm:grid-cols-8">
                            {product?.sizes?.map((item) => {
                              const { size, inStock } = item;
                              return (
                                <RadioGroup.Option
                                  key={size}
                                  value={size}
                                  disabled={!inStock}
                                  className={({ active }) =>
                                    classNames(
                                      inStock
                                        ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                        : "cursor-not-allowed bg-gray-50 text-gray-200",
                                      active ? "ring-2 ring-yellow-400" : "",
                                      "group relative flex items-center justify-center rounded-lg border lg:py-3 lg:px-2 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none  sm:flex-1 sm:py-6"
                                    )
                                  }
                                >
                                  {({ active, checked }) => (
                                    <>
                                      <RadioGroup.Label as="span">
                                        {size}
                                      </RadioGroup.Label>
                                      {inStock ? (
                                        <span
                                          className={classNames(
                                            active ? "border" : "border-2",
                                            checked
                                              ? "border-yellow-400"
                                              : "border-transparent",
                                            "pointer-events-none absolute -inset-px rounded-md"
                                          )}
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <span
                                          aria-hidden="true"
                                          className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                        >
                                          <svg
                                            className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                            viewBox="0 0 100 100"
                                            preserveAspectRatio="none"
                                            stroke="currentColor"
                                          >
                                            <line
                                              x1={0}
                                              y1={100}
                                              x2={100}
                                              y2={0}
                                              vectorEffect="non-scaling-stroke"
                                            />
                                          </svg>
                                        </span>
                                      )}
                                    </>
                                  )}
                                </RadioGroup.Option>
                              );
                            })}
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    <div className="flex justify-between items-center mt-10">
                      <button
                        type="button"
                        onClick={() =>
                          addToCart({
                            id: product?._id + product?.color + selectedSize,
                            name: product?.name,
                            price: product?.price,
                            qty: 1,
                            size: selectedSize,
                            color: selectedColor,
                            img: product?.images[0]?.secret_url,
                          })
                        }
                        className=" flex w-full items-center justify-center border rounded-3xl border-transparent bg-yellow-400 px-8 py-3 text-base font-bold text-white hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                      >
                        Add to bag
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          addToFavorite({
                            id: product?._id,
                            name: product?.name,
                            price: product?.price,
                            img: product?.images[0]?.secret_url,
                          })
                        }
                        className="p-0 border-0 inline-flex items-center justify-center text-yellow-400 ml-4"
                      >
                        <AiOutlineHeart className="h-12 w-12 hover:scale-105 transition-all p-2 text-gray-700 bg-yellow-white rounded-full " />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-10">
                      <button
                        type="button"
                        onClick={() =>
                          buyNow({
                            id: product?._id + product?.color + selectedSize,
                            name: product?.name,
                            price: product?.price,
                            qty: 1,
                            size: selectedSize,
                            color: selectedColor,
                            img: product?.images[0].secret_url,
                          })
                        }
                        className=" flex w-full items-center justify-center  rounded-3xl border border-transparent bg-yellow-400 px-8 py-3 text-base font-bold text-white hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                  <div className="mt-5 border-t py-4 border-gray-200 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-1">
                      <FaStripe className="bg-white p-1 h-6 w-6 " />
                      <span>Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaTruck className="bg-white p-1 h-6 w-6 " />
                      <span>Free Shipping</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCrown className="bg-white p-1 h-6 w-6 " />
                      <span>Premium Products</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaBoxOpen className="bg-white p-1 h-6 w-6 " />
                      <span>Safe Packing</span>
                    </div>
                  </div>
                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">
                      Description
                    </h2>
                    <div className="mt-4 space-y-6">
                      <p className="text-sm text-gray-600">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
      <div className="container mt-32 mx-auto w-3/4">
        <h2 className="text-xl text-gray-600 my-4">Product Reviews</h2>
        <div>
          {reviews?.map((review) => {
            const { username, _id, email, comment, rating, createdAt } = review;
            return (
              <div key={_id} className="my-8 flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={user?.profileImage?.secret_url}
                    alt={`${username} Profile`}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg text-gray-700">{username}</h3>
                    <p className="text-gray-500 text-sm">{comment}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{createdAt}</p>
                  <ReactStars
                    count={5}
                    size={24}
                    isHalf={true}
                    value={rating}
                    edit={false}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd51e"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8">
          <button
            onClick={() => setOpen(true)}
            className="bg-yellow-400 px-4 py-2 my-4 text-white rounded-3xl"
          >
            Add Review
          </button>
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
                          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                            <FaComment
                              className="h-6 w-6 text-green-300"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title
                              as="h3"
                              className="text-base font-semibold leading-6 text-gray-900"
                            >
                              Product Review
                            </Dialog.Title>
                            <div className="mt-2">
                              <input
                                type="text"
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                                placeholder="How was the Product?"
                                className="w-full rounded-md transition-all focus:border-gray-300 bg-white  outline-none border border-gray-200 text-sm px-2 py-2"
                              />
                              <div className="text-center">
                                <ReactStars
                                  count={5}
                                  size={24}
                                  isHalf={true}
                                  value={rating}
                                  classNames={`justify-center`}
                                  edit={true}
                                  onChange={ratingChanged}
                                  emptyIcon={<i className="far fa-star"></i>}
                                  halfIcon={
                                    <i className="fa fa-star-half-alt"></i>
                                  }
                                  fullIcon={<i className="fa fa-star"></i>}
                                  activeColor="#ffd51e"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-gray-900/10  bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          onClick={reviewProduct}
                          className="inline-flex w-full justify-center rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600 sm:ml-3 sm:w-auto"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => setOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      </div>
    </>
  );
};

export default ProductTshirt;
