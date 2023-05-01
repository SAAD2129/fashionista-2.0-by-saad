import React, { useEffect, useRef, useState } from "react";
import Card from "components/card";
import { MdFileUpload } from "react-icons/md";
import Switch from "components/switch";
import Layout from "@/components/Layout";
import { toast } from "react-toastify";
import Category from "@/models/Category";
import mongoose from "mongoose";
import Head from "next/head";

const AddProduct = ({ categories }) => {
  const newref = useRef();
  const onClickRef = () => {
    newref.current.click();
  };
  const [state, setState] = useState("");

  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0]?.name);
  const [stock, setStock] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [productImages, setProductImages] = useState("");
  const [productPreview, setProductPreview] = useState("");

  const [productColors, setProductColors] = useState({
    black: false,
    white: false,
    blue: false,
    green: false,
    red: false,
  });
  const [productSizes, setProductSizes] = useState({
    S: false,
    M: false,
    L: false,
    XL: false,
    XXL: false,
    XXXL: false,
  });
  const resetStates = () => {
    setProductColors({
      black: false,
      white: false,
      blue: false,
      green: false,
      red: false,
    });
    setName("");
    setDiscount("");
    setStock("");
    setDescription("");
    setPrice("");
    setProductSizes({
      S: false,
      M: false,
      L: false,
      XL: false,
      XXL: false,
      XXXL: false,
    });
  };
  const [key, setKey] = useState(-1);

  const onChangeProducts = async (e) => {
    if (e.target.id === "category") {
      setCategory(e.target[e.target.selectedIndex].value);
      return;
    }
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "discount") {
      setDiscount(e.target.value);
    } else if (e.target.name === "stock") {
      setStock(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    } else if (e.target.name === "price") {
      setPrice(e.target.value);
    }
    // setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const onChangeColors = async (e) => {
    setProductColors({ ...productColors, [e.target.id]: e.target.value });
    if (e.target.value === "on") {
      setProductColors({ ...productColors, [e.target.id]: true });
    }
  };
  const onChangeSizes = async (e) => {
    setProductSizes({ ...productSizes, [e.target.id]: e.target.value });
    if (e.target.value === "on") {
      setProductSizes({ ...productSizes, [e.target.id]: true });
    }
  };
  const addProduct = async (e) => {
    e.preventDefault();
    // console.log(product);
    // make a post request using fetch
    let colors = [];
    for (const key in productColors) {
      const e = productColors[key];
      let obj = { color: "", inStock: false };
      if (e) {
        obj.color = key;
        obj.inStock = e;
        colors.push(obj);
      }
    }
    let sizes = [];
    for (const key in productSizes) {
      const e = productSizes[key];
      let obj = { size: "", inStock: false };
      if (e) {
        obj.size = key;
        obj.inStock = e;
        sizes.push(obj);
      }
    }
    let jsonData = JSON.stringify({
      name,
      category,
      description,
      stock,
      price,
      discount,
      colors,
      sizes,
      images: productPreview,
    });
    console.log(jsonData);
    const response = await fetch("/api/admin/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });
    // if(data.success)
    const data = await response.json();
    if (data.success) {
      toast.success(data.msg);
      resetStates();
    } else {
      toast.error(data.msg);
    }
  };
  const productImageChanger = async (e) => {
    console.log(e.target.files);
    if (e.target.name === "images") {
      const files = e.target.files;
      setProductImages(files);
      console.log(files.length);
      let temp = [];
      for (let i = 0; i < files.length; i++) {
        const data = new FormData();
        data.append("file", files[i]);
        data.append("upload_preset", "FashionistaProducts");
        data.append(
          "cloud_name",
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        );
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );
        const res = await response.json();
        temp.push({ secret_url: res.secure_url, public_id: res.public_id });
      }
      setKey(Math.random())
      setProductPreview(temp);
    }
  };

  const uploadProfile = async () => {
    if (res.secure_url && res.public_id) {
      const { secure_url, public_id } = res;
      const response = await fetch("/api/user/profile", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ secure_url, public_id }),
      });
      const backendRes = await response.json();
      if (backendRes.success) {
        toast.success(backendRes.msg, { autoClose: 1500 });
        fetchUser();
        setOpenProfile(false);
      } else {
        toast.error(backendRes.msg, { autoClose: 1500 });
      }
    }
  };
  useEffect(() => {}, []);
  return (
    <Layout pathname={"Add Product"}>
      <Head>
        <title>Admin - Add Product</title>
      </Head>
      {console.log(productPreview)}
      <form
        onSubmit={addProduct}
        className="!z-5 relative mx-auto  mt-8  flex md:flex-row flex-col w-full sm:w-3/4 gap-5  rounded-[20px] bg-white bg-clip-border p-[16px] shadow-3xl shadow-shadow-500 dark:!bg-yellow-400 dark:text-white dark:shadow-none "
      >
        <Card
          extra={
            "md:w-2/4 w-full  h-full p-[16px] dark:!bg-yellow-400 dark:text-white dark:shadow-none "
          }
        >
          {/* label, id, extra, type, placeholder, variant, state, disabled */}
          <div className={`my-2 w-full`}>
            <label
              htmlFor={"name"}
              className={`text-sm text-yellow-500 dark:text-white ${"ml-3 font-bold"}`}
            >
              Name
            </label>
            <input
              type={"text"}
              name="name"
              id="name"
              placeholder={"product name"}
              value={name}
              onChange={onChangeProducts}
              className={` mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none transition-all focus:border-yellow-400 ${
                state === "error"
                  ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                  : state === "success"
                  ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                  : "border-gray-200 dark:!border-white/10 dark:text-white"
              }`}
            />
          </div>
          <div className={``}>
            <label
              htmlFor={"category"}
              className={`text-sm text-yellow-500 dark:text-white ${"ml-3 font-bold"}`}
            >
              Category
            </label>
            <select
              id={"category"}
              onChange={onChangeProducts}
              value={category}
              className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none transition-all focus:border-yellow-400 ${"border-gray-200 dark:!border-white/10 dark:text-white"}`}
            >
              {categories?.map((category) => {
                const { name } = category;
                return (
                  <option
                    value={name.toLowerCase()}
                    className={`"border-gray-200 dark:text-white" mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none transition-all focus:border-yellow-400 dark:!border-white/10 dark:!bg-yellow-400
              `}
                  >
                    {name.toUpperCase()}
                  </option>
                );
              })}
            </select>

            {/* {children} */}
          </div>
          <div className={`my-2 w-full`}>
            <label
              htmlFor={"price"}
              className={`text-sm text-yellow-500 dark:text-white ${"ml-3 font-bold"}`}
            >
              Price
            </label>
            <input
              type={"number"}
              name="price"
              id={"price"}
              placeholder={"product price"}
              value={price}
              onChange={onChangeProducts}
              className={` mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none transition-all focus:border-yellow-400 ${
                state === "error"
                  ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                  : state === "success"
                  ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                  : "border-gray-200 dark:!border-white/10 dark:text-white"
              }`}
            />
          </div>{" "}
          <div className={`my-2 w-full`}>
            <label
              htmlFor={"stock"}
              className={`text-sm text-yellow-500 dark:text-white ${"ml-3 font-bold"}`}
            >
              Stock
            </label>
            <input
              type={"number"}
              name="stock"
              id={"stock"}
              placeholder={"product stock"}
              value={stock}
              onChange={onChangeProducts}
              className={` mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none transition-all focus:border-yellow-400 ${
                state === "error"
                  ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                  : state === "success"
                  ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                  : "border-gray-200 dark:!border-white/10 dark:text-white"
              }`}
            />
          </div>{" "}
          <div className={`my-2 w-full`}>
            <label
              htmlFor={"discount"}
              className={`text-sm text-yellow-500 dark:text-white ${"ml-3 font-bold"}`}
            >
              Discount
            </label>
            <input
              type={"text"}
              name="discount"
              id={"discount"}
              placeholder={"product discount"}
              onChange={onChangeProducts}
              value={discount}
              className={` mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none transition-all focus:border-yellow-400 ${
                state === "error"
                  ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                  : state === "success"
                  ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                  : "border-gray-200 dark:!border-white/10 dark:text-white"
              }`}
            />
          </div>{" "}
          <div className={`my-2 w-full`}>
            <label
              htmlFor={"description"}
              className={`text-sm text-yellow-500 dark:text-white ${"ml-3 font-bold"}`}
            >
              Description
            </label>
            <textarea
              name="description"
              id={"description"}
              placeholder={"product description"}
              onChange={onChangeProducts}
              value={description}
              rows="4"
              className={`mt-2 flex w-full resize-none items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none transition-all focus:border-yellow-400 ${
                state === "error"
                  ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                  : state === "success"
                  ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                  : "border-gray-200 dark:!border-white/10 dark:text-white"
              }`}
            ></textarea>
          </div>
          <div className={`my-2 w-full`}>
            <input
              type={"submit"}
              value={"Add Product"}
              className={`dark:text-white" cursor-pointer mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-yellow-400  p-3 text-sm font-bold text-white outline-none transition-all  focus:border-yellow-400 dark:!border-white/10
            `}
            />
          </div>
        </Card>
        <Card extra={"w-2/4 h-full p-[16px] "}>
          {/* label, id, extra, type, placeholder, variant, state, disabled */}
          {productPreview?.length === 0 ? (
            <>
              <label
                htmlFor={"images"}
                className={`ml-3 mb-4 mt-2 text-sm font-bold text-yellow-500 dark:text-white`}
              >
                Select Images
              </label>
              <input
                type={"file"}
                onChange={productImageChanger}
                multiple
                accept="image/*"
                ref={newref}
                hidden
                id="images"
                name="images"
              />
              <div className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-yellow-500 2xl:col-span-6">
                <button
                  onClick={onClickRef}
                  type="button"
                  className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-yellow-500 lg:pb-0"
                >
                  <MdFileUpload className="text-[80px] text-yellow-400 dark:text-white" />
                  <h4 className="text-xl font-bold text-yellow-400 dark:text-white">
                    Upload Files
                  </h4>
                  <p className="mt-2 text-sm font-medium text-gray-600">
                    PNG, JPG files are allowed
                  </p>
                </button>
              </div>
            </>
          ) : (
            <div>
              <div className="flex gap-2 h-2/4">
                <div className=" h-full">
                  <img
                    className="w-72 overflow-hidden cursor-pointer"
                    src={productPreview[0]?.secret_url}
                    alt="product main image"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 ">
                  {productPreview?.map((item, i) => {
                    const { secret_url } = item;
                    return (
                      <img
                        key={secret_url}
                        className="w-24 cursor-pointer"
                        src={secret_url}
                        alt="product images"
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* <SwitchField/> */}
          {/* <p className="mt-4">Select In stock colors</p>
          <div className="my-1 flex justify-between">
            <span className="text-gray-600">Black</span>
            <Switch onChange={onChangeColors} id="black" color="yellow" />
          </div>
          <div className="my-1 flex justify-between">
            <span className="text-gray-600">Red</span>
            <Switch onChange={onChangeColors} id="red" color="yellow" />
          </div>
          <div className="my-1 flex justify-between">
            <span className="text-gray-600">White</span>
            <Switch onChange={onChangeColors} id="white" color="yellow" />
          </div>
          <div className="my-1 flex justify-between">
            <span className="text-gray-600">Green</span>
            <Switch onChange={onChangeColors} id="green" color="yellow" />
          </div>
          <div className="my-1 flex justify-between">
            <span className="text-gray-600">Blue</span>
            <Switch onChange={onChangeColors} id="blue" color="yellow" />
          </div>
          <p className="mt-4">Select In stock Sizes</p>
          <div className="my-1 flex justify-between">
            <span className="text-gray-600">S</span>
            <Switch onChange={onChangeSizes} id="S" color="yellow" />
          </div>
          <div className="my-1 flex justify-between">
            <span className="text-gray-600">M</span>
            <Switch onChange={onChangeSizes} id="M" color="yellow" />
          </div>
          <div className="my-1 flex justify-between">
            <span className="text-gray-600">L</span>
            <Switch onChange={onChangeSizes} id="L" color="yellow" />
          </div>
          <div className="my-1 flex justify-between">
            <span className="text-gray-600">XL</span>
            <Switch onChange={onChangeSizes} id="XL" color="yellow" />
          </div>
          <div className="my-1 flex justify-between">
            <span className="text-gray-600">XXL</span>
            <Switch onChange={onChangeSizes} id="XXL" color="yellow" />
          </div>
          <div className="my-1 flex justify-between">
            <span className="text-gray-600">XXXL</span>
            <Switch onChange={onChangeSizes} id="XXXL" color="yellow" />
          </div> */}
        </Card>
      </form>
    </Layout>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState)
    await mongoose.connect(process.env.MONGO_URI);

  let categories = await Category.find();
  console.log(categories);
  return {
    props: { categories: JSON.parse(JSON.stringify(categories)) }, // will be passed to the page component as props
  };
}

export default AddProduct;
