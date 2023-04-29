import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import Product from "@/models/Product";
import mongoose from "mongoose";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const ProductAdmin = ({ onChangeHandler, setLoading, loading }) => {
  const router = useRouter();
  const [product, setProduct] = useState();
  const [mainImage, setMainImage] = useState(product?.images[0]?.secret_url);
  const [productState, setProductState] = useState({
    price: product?.price,
    p_name: product?.name,
    category: product?.category,
    stock: product?.stock,
    discount: product?.discount,
    description: product?.description,
  });
  const fetchProduct = async () => {
    setLoading(true);
    const { product_id } = router.query;
    const response = await fetch(`/api/admin/product`, {
      method: "GET",
      headers: {
        product_id,
      },
    });
    const data = await response.json();
    if (data.success) {
      setProduct(data.product);
      setMainImage(data.product?.images[0]?.secret_url);
      setProductState({
        price: data?.product?.price,
        p_name: data?.product?.name,
        category: data?.product?.category,
        stock: data?.product?.stock,
        discount: data?.product?.discount,
        description: data?.product?.description,
      });
      setLoading(false);


    } else {
      toast.error(data.msg);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    const json = JSON.stringify({
      price: productState?.price,
      name: productState?.name,
      category: productState?.category,
      stock: productState?.stock,
      discount: productState?.discount,
      description: productState?.description,
    });
    const response = await fetch(`/api/admin/product`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
        product_id: product?._id,
      },
      body: json,
    });
    const data = await response.json();
    if (data.success) {
      toast.success("Product updated successfully");
      setProductState({
        price: data.product?.price,
        p_name: data.product?.name,
        category: data.product?.category,
        stock: data.product?.stock,
        discount: data.product?.discount,
        description: data.product?.description,
      });
    } else {
      toast.error(data.msg);
    }
  };
  const deleteProduct = async (e) => {
    e.preventDefault();

    const json = JSON.stringify({
      price: productState?.price,
      name: productState?.name,
      category: productState?.category,
      stock: productState?.stock,
      discount: productState?.discount,
      description: productState?.description,
    });
    const response = await fetch(`/api/admin/product`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
        product_id: product?._id,
      },
    });
    const data = await response.json();
    if (data.success) {
      toast.success(data.msg, { autoClose: 1500 });
      router.push(`/admin/products`);
    } else {
      toast.error(data.msg);
    }
  };
  useEffect(() => {
    console.log(product);
    fetchProduct();
  }, [router.query]);
  return (
    product && (
      <Layout pathname={"Product"}>
        <Head>
          <title>Admin - Edit Product</title>
        </Head>
        {loading ? (
          <Loader />
        ) : (
          <div className="min-h-screen m-12">
            <div className="grid lg:grid-cols-2 bg-white p-4">
              <form onSubmit={updateProduct}>
                <div className={`my-2 w-3/4`}>
                  <label
                    htmlFor={"p_name"}
                    className={`text-sm text-yellow-400 dark:text-white ${"ml-3 font-bold"}`}
                  >
                    Product Name
                  </label>
                  <input
                    type={"text"}
                    name="p_name"
                    id={"p_name"}
                    placeholder={"product Name"}
                    value={productState?.p_name}
                    onChange={(e) =>
                      onChangeHandler(e, setProductState, productState?.p_name)
                    }
                    className={` mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none transition-all focus:border-yellow-400  "border-gray-200 dark:!border-white/10 dark:text-white"
                `}
                  />
                </div>
                <div className={`my-2 w-3/4`}>
                  <label
                    htmlFor={"price"}
                    className={`text-sm text-yellow-400 dark:text-white ${"ml-3 font-bold"}`}
                  >
                    Product Price
                  </label>
                  <input
                    type={"number"}
                    name="price"
                    id={"price"}
                    placeholder={"product price"}
                    value={productState?.price}
                    onChange={(e) =>
                      onChangeHandler(e, setProductState, productState?.price)
                    }
                    className={` mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none transition-all focus:border-yellow-400  "border-gray-200 dark:!border-white/10 dark:text-white"
                `}
                  />
                </div>
                <div className={`my-2 w-3/4`}>
                  <label
                    htmlFor={"price"}
                    className={`text-sm text-yellow-400 dark:text-white ${"ml-3 font-bold"}`}
                  >
                    Product Stock
                  </label>
                  <input
                    type={"number"}
                    name="stock"
                    id={"stock"}
                    placeholder={"product stock"}
                    value={productState?.stock}
                    onChange={(e) =>
                      onChangeHandler(e, setProductState, productState?.stock)
                    }
                    className={` mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none transition-all focus:border-yellow-400  "border-gray-200 dark:!border-white/10 dark:text-white"
                `}
                  />
                </div>
                <div className={`my-2 w-3/4`}>
                  <label
                    htmlFor={"price"}
                    className={`text-sm text-yellow-400 dark:text-white ${"ml-3 font-bold"}`}
                  >
                    Product Discount
                  </label>
                  <input
                    type={"number"}
                    name="discount"
                    id={"discount"}
                    placeholder={"product discount"}
                    value={productState?.discount}
                    onChange={(e) =>
                      onChangeHandler(
                        e,
                        setProductState,
                        productState?.discount
                      )
                    }
                    className={` mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none transition-all focus:border-yellow-400  "border-gray-200 dark:!border-white/10 dark:text-white"
                `}
                  />
                </div>
                <div className={`my-2 w-3/4`}>
                  <label
                    htmlFor={"price"}
                    className={`text-sm text-yellow-400 dark:text-white ${"ml-3 font-bold"}`}
                  >
                    Product Discount
                  </label>
                  <textarea
                    name="description"
                    rows={5}
                    id={"description"}
                    value={productState?.description}
                    placeholder={"product description"}
                    onChange={(e) =>
                      onChangeHandler(
                        e,
                        setProductState,
                        productState?.description
                      )
                    }
                    className={` mt-2 resize-none flex  w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none transition-all focus:border-yellow-400  "border-gray-200 dark:!border-white/10 dark:text-white"
                `}
                  >
                    {productState?.description}
                  </textarea>
                </div>
                <div className={`my-2 w-3/4`}>
                  <input
                    type={"submit"}
                    value="Update"
                    className={`bg-yellow-400 hover:bg-yellow-500 mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none text-white cursor-pointer font-semibold transition-all focus:border-yellow-400  "border-gray-200 dark:!border-white/10 dark:text-white"

                `}
                  />
                </div>
              </form>
              <div>
                <div className="flex gap-2 h-2/4">
                  <div className="h-full">
                    <img
                      className="w-56 overflow-hidden cursor-pointer"
                      src={mainImage}
                      alt={product?.name}
                    />
                  </div>
                  {product?.images.length > 1 && (
                    <div className="grid grid-cols-2 gap-2 ">
                      {product?.images.map((image, i) => {
                        return (
                          <img
                            onClick={() => setMainImage(image?.secret_url)}
                            key={image?.secret_url}
                            className="w-24 cursor-pointer"
                            src={image?.secret_url}
                            alt={product?.name}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className={`mt-8 w-3/4`}>
                  <button
                    onClick={deleteProduct}
                    className={`bg-yellow-400 hover:bg-yellow-500 mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none text-white cursor-pointer font-semibold transition-all focus:border-yellow-400  "border-gray-200 dark:!border-white/10 dark:text-white"

                `}
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    )
  );
};

// export async function getServerSideProps(context) {
//   if (!mongoose.connections[0].readyState)
//     await mongoose.connect(process.env.MONGO_URI);

//   let product = await Product?.findById(context.query.product_id);
//   console.log(product);
//   return {
//     props: { product: JSON.parse(JSON.stringify(product)) }, // will be passed to the page component as props
//   };
// }

export default ProductAdmin;
