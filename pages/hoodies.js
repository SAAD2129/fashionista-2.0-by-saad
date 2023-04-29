import Head from "next/head";
import React from "react";
import Link from "next/link";
import Product from "@/models/Product";
import mongoose from "mongoose";

const Hoodies = ({ products }) => {
    return (
        <>
            <Head>
                <title>Codeswear - Hoodies</title>
            </Head>

            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Hoodies
                    </h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <div key={product._id} className="group relative">
                                <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={"/hoodie.jpg"}
                                        alt={"tshirt"}
                                        className="h-full w-full object-contain object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <Link
                                                href={`/product/${product._id}`}
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className="absolute inset-0"
                                                />
                                                {product.name}
                                            </Link>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {product.color}
                                        </p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">
                                        ${product.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState)
        await mongoose.connect(process.env.MONGO_URI);

    let products = await Product.find({ category: "hoodie" });
    return {
        props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
    };
}
export default Hoodies;
