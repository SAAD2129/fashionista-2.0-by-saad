import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
const Checkout = ({
  subtotal,
  cart,
  removeFromCart,
  incrQty,
  decrQty,
  loadCart,
  clearCart,
  onChangeHandler,
  addresses,
  getAddresses,
  user,
  setSubtotal,
}) => {
  // remove email,name replace with token user -- PENDING
  const [selected, setSelected] = useState(-1);
  const [shippingFee, setShippingFee] = useState(cart.length * 3);
  const [accountDetails, setAccountDetails] = useState({
    card_num: "",
    card_exp: "",
    card_cvc: "",
  });
  const elements = useElements();
  const stripe = useStripe();
  const [newAddress, setNewAddress] = useState(false);
  const router = useRouter();
  const payNow = useRef(null);
  const [addressDetails, setAddressDetails] = useState({
    city: "",
    street_address: "",
    zip: "",
    state: "",
  });
  const checkOut = async (e) => {
    e.preventDefault();
    payNow.current.disabled = true;
    try {
      let allData;
      let newTotal = subtotal + shippingFee + (1 / 100) * subtotal;
      if (newAddress || addresses.length === 0) {
        allData = JSON.stringify({ addressDetails, cart, subtotal:newTotal });
      } else {
        allData = JSON.stringify({
          addressDetails: addresses[selected],
          cart,
          subtotal:newTotal,
        });
      }
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: allData,
      };
      const response = await fetch("/api/user/payment", config);
      const data = await response.json();
      const { client_secret } = data;
      if (!stripe || !elements) return;
      let tempData = JSON.parse(allData);

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user?.username,
            email: user?.email,
            address: {
              line1: tempData.addressDetails.street_address,
              state: tempData.addressDetails.state,
              postal_code: tempData.addressDetails.zip,
              country: "US",
              city: tempData.addressDetails.city,
            },
          },
        },
      });
      if (result.error) {
        payNow.current.disabled = false;
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          const response = await fetch("/api/user/order", config);
          const data = await response.json();
          if (data.success) {
            let url = `/orders/${data.order._id}`;
            toast.success("order placed successfully", { autoClose: 1000 });
            // setTimeout(() => {
            router.push(url);
            // }, 1000);
            setAddressDetails({
              email: "",
              name: "",
              city: "",
              pincode: "",

              address: "",
            });
            setSelected(-1);
            clearCart();
          } else {
            payNow.current.disabled = false;
            toast.error(data.msg);
          }
        } else {
          payNow.current.disabled = false;
          toast.error(`Error while processing the payment`);
        }
      }
    } catch (error) {
      payNow.current.disabled = false;
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      toast.error("please login to order", { autoClose: 1500 });
      return;
    }
    console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    setShippingFee(cart.length * 3);

    loadCart();
    getAddresses();
  }, []);

  return (
    <section className="text-gray-600 body-font relative">
      <Head>
        <title>Fashionista - Checkout</title>
      </Head>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl w-max mx-auto mb-4 border-b-2 text-yellow-400 border-yellow-400 p-2 uppercase chara text-2xl font-medium title-font ">
            Checkout
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Review items pay the price and you are good to go.
          </p>
        </div>

        <form className="lg:w-3/4 md:w-2/3 mx-auto" onSubmit={checkOut}>
          <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">
            Address Details
          </h1>
          {addresses && addresses.length > 0 ? (
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {addresses?.map((add, i) => {
                return (
                  <div key={i} className="flex justify-between my-2">
                    <p className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {add.street_address}, {add.city}, {add.state}, {add.zip}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(i), setNewAddress(false);
                        console.log(selected);
                      }}
                      className={`${
                        selected == i ? "bg-yellow-600" : "bg-yellow-400"
                      } rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500`}
                    >
                      {selected == i ? "Selected" : "Select"}
                    </button>
                  </div>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  setNewAddress(true), setSelected(-1);
                }}
                className={`bg-yellow-400 rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500`}
              >
                Add New
              </button>
            </dd>
          ) : (
            newAddress ||
            (addresses.length === 0 && (
              <div className="transition-all mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="street_address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="street_address"
                      id="street_address"
                      autoComplete="off"
                      placeholder="808 WILSHIRE BLVD"
                      onChange={(e) =>
                        onChangeHandler(e, setAddressDetails, addressDetails)
                      }
                      value={addressDetails.street_address}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="SANTA MONICA"
                      autoComplete="off"
                      onChange={(e) =>
                        onChangeHandler(
                          e,
                          setAddressDetails,

                          addressDetails
                        )
                      }
                      value={addressDetails.city}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="state"
                      id="state"
                      placeholder="CA"
                      autoComplete="off"
                      onChange={(e) =>
                        onChangeHandler(
                          e,
                          setAddressDetails,

                          addressDetails
                        )
                      }
                      value={addressDetails.state}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="zip"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="zip"
                      id="zip"
                      autoComplete="off"
                      placeholder="90401"
                      onChange={(e) =>
                        onChangeHandler(
                          e,
                          setAddressDetails,

                          addressDetails
                        )
                      }
                      value={addressDetails.zip}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
              </div>
            ))
          )}

          <h2 className="sm:text-2xl mt-8 text-xl font-medium title-font mb-4 text-gray-900">
            Review Items
          </h2>
          <div className=" rounded-md">
            {cart && cart.length > 0 ? (
              <>
                <ol className="cart-list h-3/4">
                  <li
                    key={-53}
                    className="my-8 flex justify-between items-center"
                  >
                    <div className="flex lg:w-1/3 items-center gap-2">
                      {" "}
                      <span className="text-xl font-semibold">Product</span>
                    </div>
                    <span className="text-xl font-semibold">Remove</span>
                    <span className="text-xl font-semibold">Quantity</span>
                  </li>
                  {cart &&
                    cart.map((item, i) => {
                      return (
                        <li
                          key={i}
                          id={i}
                          className="my-8 flex justify-between items-center"
                        >
                          <div className="flex lg:w-1/3 items-center gap-2">
                            <img
                              src={item.img}
                              alt={item.name}
                              width={40}
                              height={40}
                            />
                            <div>
                              <p className="text-xl">{item.name}</p>
                              <span>Price ${item.price}</span>
                            </div>
                          </div>
                          <FaTrash
                            onClick={() => removeFromCart(item.id)}
                            className="text-yellow-400 cursor-pointer"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => decrQty(i)}
                              role="button"
                              type="button"
                              className="bg-yellow-50 p-2 rounded-sm"
                            >
                              <FaMinus className="text-yellow-400" />
                            </button>
                            <span className="text-xl"> {item.qty}</span>
                            <button
                              className="bg-yellow-50 p-2 rounded-sm"
                              role="button"
                              type="button"
                              onClick={() => incrQty(i)}
                            >
                              <FaPlus className=" text-yellow-400" />
                            </button>
                          </div>
                        </li>
                      );
                    })}
                </ol>
                <div className="my-4 border-t-2 border-yellow-400 py-4 flex gap-2  items-center"></div>
                <p className="text-lg font-semibold">
                  Shipping Fee : ${shippingFee}
                </p>
                <p className="text-lg font-semibold">
                  Tax : ${(1 / 100) * subtotal}
                </p>
                <p className="text-2xl font-bold">
                  Subtotal : ${subtotal + shippingFee + (1 / 100) * subtotal}
                </p>
              </>
            ) : (
              <p className="text-2xl text-center">No items in Cart</p>
            )}
          </div>
          <h1 className="sm:text-2xl mt-16 text-xl font-medium title-font mb-4 text-gray-900">
            Payment Details
          </h1>
          <div className="transition-all mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              {/* <label
                htmlFor="street_address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Street address
              </label> */}
              <div className="mt-2">
                <CardNumberElement className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-3 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                <small className="text-gray-500">for testing use 4242 4242 4242 4242</small>
              </div>
              <div className="mt-2">
                <CardCvcElement className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-3 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                <small className="text-gray-500">any 3 digit number</small>
              </div>
              <div className="mt-2">
                <CardExpiryElement className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-3 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                <small className="text-gray-500">next year</small>
              </div>
            </div>
          </div>
          <div className="p-2 w-full mt-8">
            <button
              ref={payNow}
              className="flex mx-auto text-white bg-yellow-400 disabled:bg-yellow-200 disabled:cursor-not-allowed border-0 py-2 px-8 focus:outline-none hover:bg-yellow-500 cursor-pointer rounded text-lg"
            >
              Pay ${subtotal + shippingFee + (1 / 100) * subtotal}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
