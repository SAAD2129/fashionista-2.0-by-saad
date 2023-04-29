import Card from "@/components/card";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const Favorites = ({ favorites, removeFromFavorite }) => {
    return (
        <Card className="container bg-white w-3/4 mx-auto shadow-lg my-12 p-8 rounded-2xl">
            <Head><title>Your Wishlist</title></Head>
            <h2 className=" text-2xl text-yellow-400 text-center">Your Wishlist</h2>
            <div className="mt-8">
                {!favorites ||
                    (favorites?.length === 0 && (
                        <div className="min-h-[50vh] flex items-center justify-center">
                            <h2 className="text-2xl font-bold text-yellow-400">
                                No Items in Wishlist
                            </h2>
                        </div>
                    ))}
                <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {favorites?.map((product, i) => (
                            <li key={product._id} className="flex py-6 bg-yellow-50 px-4">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-xl font-semibold text-gray-900">
                                            <h3>
                                                <Link
                                                    href={`/product/${product.id}`}
                                                >
                                                    {product.name}
                                                </Link>
                                            </h3>
                                            <p className="ml-4">
                                                ${product.price}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <div className="flex">
                                            <button
                                                onClick={() =>
                                                    removeFromFavorite(
                                                        product.id
                                                    )
                                                }
                                                type="button"
                                                className="font-medium text-yellow-500 hover:text-yellow-400"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Card>
    );
};

export default Favorites;
