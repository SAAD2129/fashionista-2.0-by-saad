import React, { useEffect, useState, Fragment, useRef } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import mongoose from "mongoose";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { FaTrash, FaTrashAlt } from "react-icons/fa";
import Head from "next/head";
import Loader from "@/components/Loader";
const MyAccount = ({
  onChangeHandler,
  loading,
  setLoading,
  user,
  setUser,
  fetchUser,
  addresses,
  getAddresses,
}) => {
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const cancelButtonRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [uploadedImgData, setUploadedImgData] = useState(null);

  const [passwords, setPasswords] = useState({
    oPassword: "",
    cPassword: "",
    nPassword: "",
  });
  const [accountDetails, setAccountDetails] = useState({
    first_name: "",
    last_name: "",
    username: "",
    phone: "",
    city: "",
    street_address: "",
    zip: "",
    state: "",
  });
  const deleteAccount = async () => {
    setLoading(true);
    const response = await fetch("/api/user/account", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    if (data.success) {
      setUser({});
      toast.success(data.msg);
      setLoading(false);
      localStorage.removeItem("token");
      router.push("/signup");
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    const {
      first_name,
      last_name,
      username,
      phone,
      city,
      street_address,
      zip,
      state,
    } = accountDetails;
    const response = await fetch("/api/user/account", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        first_name,
        last_name,
        username,
        phone,
        city,
        street_address,
        zip,
        state,
      }),
    });
    const data = await response.json();
    if (data.success) {
      setLoading(false);
      setUser(data.user);
      toast.success(data.msg);
      getAddresses();
      setAccountDetails({
        first_name: "",
        last_name: "",
        username: "",
        phone: "",
        city: "",
        street_address: "",
        zip: "",
        state: "",
      });
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    const { oPassword, cPassword, nPassword } = passwords;
    if (nPassword !== cPassword) toast.error("both passwords should match");
    const response = await fetch("/api/user/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        oPassword,
        nPassword,
      }),
    });
    const data = await response.json();
    if (data.success) {
      toast.success(`${data.msg} Please login again`, { autoClose: 1500 });
      setTimeout(() => {
        localStorage.removeItem("token");
        router.push("/login");
      }, 1000);
      setPasswords({
        oPassword: "",
        cPassword: "",
        nPassword: "",
      });
    } else {
      toast.error(data.msg);
    }
  };
  const router = useRouter();
  // pending
  const deleteAddress = async (id) => {};

  const avatarChange = async (e) => {
    console.log(e.target.files);
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setOpenProfile(true);
    }
  };

  const uploadProfile = async () => {
    const data = new FormData();
    data.append("file", avatar);
    data.append("upload_preset", "FashionistaAvatars");
    data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const res = await response.json();
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

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    }
    fetchUser();
    if (user) {
      console.log(user);
      setLoading(false);
      setAccountDetails({ last_name: user?.last_name });
      setAccountDetails({ first_name: user?.first_name });
      setAccountDetails({ username: user?.username });
      setAccountDetails({ phone: user?.phone });
    }
    console.log(user);
    getAddresses();
  }, []);

  return (
    <div className={"mx-6"}>
      <Head>
        <title>My Account</title>
      </Head>
      {loading ? (
        <Loader />
      ) : (
        user && (
          <div className="container min-h-screen sm:mx-14 md:mx-auto md:w-3/4 lg:mx-auto lg:my-14 lg:w-2/4 ">
            <div className="my-12 overflow-hidden bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  User Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Personal details and Addresses.
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {user.first_name} {user.last_name}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      User Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {user?.username}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {user?.email}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {user?.phone ? user.phone : "Not given"}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Money Spent
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      ${user?.moneySpent}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Addresses
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {addresses?.length === 0 ? (
                        <span className="text-sm">Not Given</span>
                      ) : (
                        addresses?.map((add, i) => {
                          return (
                            <div key={i} className="my-2 flex justify-between">
                              <p className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {add.street_address}, {add.city}, {add.state},{" "}
                                {add.zip}
                              </p>
                              <FaTrash
                                onClick={() => {
                                  deleteAddress(add._id);
                                }}
                                className="text-yellow-500"
                              />
                            </div>
                          );
                        })
                      )}
                    </dd>
                  </div>
            
                </dl>
              </div>
            </div>
            <form className="mt-12" onSubmit={updateProfile}>
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  {user?.profileImage?.secret_url ? (
                    <img
                      src={user?.profileImage?.secret_url}
                      alt={user?.username}
                      className="h-44 w-44 rounded-full text-gray-300"
                      aria-hidden="true"
                    />
                  ) : (
                    <UserCircleIcon
                      className="h-44 w-44 text-gray-300"
                      aria-hidden="true"
                    />
                  )}
                  <label
                    htmlFor="avatar"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-yellow-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-yellow-400 focus-within:ring-offset-2 hover:text-yellow-500"
                  >
                    <span
                      type="button"
                      // onClick={() => setOpenProfile(true)}
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Change
                    </span>{" "}
                    <input
                      hidden
                      type="file"
                      id="avatar"
                      name="avatar"
                      accept="image/*"
                      onChange={avatarChange}
                      className=""
                    />
                  </label>
                </div>
              </div>
            </form>
            <form className="mt-12" onSubmit={updateProfile}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Profile
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Username
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus:ring-inset focus:ring-yellow-400 sm:max-w-md">
                          <input
                            type="text"
                            name="username"
                            id="username"
                            autoComplete="username"
                            onChange={(e) =>
                              onChangeHandler(
                                e,
                                setAccountDetails,
                                accountDetails
                              )
                            }
                            value={accountDetails.username}
                            className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200"
                            placeholder="janesmith"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus:ring-inset focus:ring-yellow-400 sm:max-w-md">
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            autoComplete="phone"
                            onChange={(e) =>
                              onChangeHandler(
                                e,
                                setAccountDetails,
                                accountDetails
                              )
                            }
                            value={accountDetails.phone}
                            className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200"
                            placeholder="03253275624"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-4">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive orders.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="first_name"
                          id="first_name"
                          autoComplete="first_name"
                          onChange={(e) =>
                            onChangeHandler(
                              e,
                              setAccountDetails,
                              accountDetails
                            )
                          }
                          value={accountDetails.first_name}
                          placeholder="Jane"
                          className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="last_name"
                          placeholder="Smith"
                          id="first_name"
                          onChange={(e) =>
                            onChangeHandler(
                              e,
                              setAccountDetails,
                              accountDetails
                            )
                          }
                          value={accountDetails.last_name}
                          autoComplete="first_name"
                          className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="name@example.com"
                          autoComplete="email"
                          value={user.email}
                          readOnly
                          className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200"
                        />
                        <small className="text-gray-400">
                          Email can not be changed
                        </small>
                      </div>
                    </div>

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
                          autoComplete="street_address"
                          placeholder="808 WILSHIRE BLVD"
                          onChange={(e) =>
                            onChangeHandler(
                              e,
                              setAccountDetails,
                              accountDetails
                            )
                          }
                          value={accountDetails.street_address}
                          className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200"
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
                          autoComplete="address-level2"
                          onChange={(e) =>
                            onChangeHandler(
                              e,
                              setAccountDetails,
                              accountDetails
                            )
                          }
                          value={accountDetails.city}
                          className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200"
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
                          autoComplete="address-level1"
                          onChange={(e) =>
                            onChangeHandler(
                              e,
                              setAccountDetails,
                              accountDetails
                            )
                          }
                          value={accountDetails.state}
                          className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200"
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
                          autoComplete="postal-code"
                          placeholder="90401"
                          onChange={(e) =>
                            onChangeHandler(
                              e,
                              setAccountDetails,
                              accountDetails
                            )
                          }
                          value={accountDetails.zip}
                          className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end sm:col-span-3">
                    <button
                      type="submit"
                      className="rounded-md mt-4 bg-yellow-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
                    >
                      Save
                    </button>
                  </div>
                </div>

                {/*<div className="border-b border-gray-900/10 pb-12">*/}
                {/*  <h2 className="text-base font-semibold leading-7 text-gray-900">*/}
                {/*    Notifications*/}
                {/*  </h2>*/}
                {/*  <p className="mt-1 text-sm leading-6 text-gray-600">*/}
                {/*    We'll always let you know about important changes, but you*/}
                {/*    pick what else you want to hear about.*/}
                {/*  </p>*/}

                {/*  <div className="mt-10 space-y-10">*/}
                {/*    <fieldset>*/}
                {/*      <legend className="text-sm font-semibold leading-6 text-gray-900">*/}
                {/*        Choose*/}
                {/*      </legend>*/}
                {/*      <div className="mt-6 space-y-6">*/}
                {/*        <div className="flex items-center gap-x-3">*/}
                {/*          <input*/}
                {/*            id="push-email"*/}
                {/*            name="push-notifications"*/}
                {/*            type="radio"*/}
                {/*            className="h-4 w-4 border-gray-300 text-yellow-400 focus:ring-yellow-400"*/}
                {/*          />*/}
                {/*          <label*/}
                {/*            htmlFor="push-email"*/}
                {/*            className="block text-sm font-medium leading-6 text-gray-900"*/}
                {/*          >*/}
                {/*            Email*/}
                {/*          </label>*/}
                {/*        </div>*/}
                {/*        /!* PENDING *!/*/}
                {/*        <div className="flex items-center gap-x-3">*/}
                {/*          <input*/}
                {/*            id="push-email"*/}
                {/*            name="push-notifications"*/}
                {/*            type="radio"*/}
                {/*            className="h-4 w-4 border-gray-300 text-yellow-400 focus:ring-yellow-400"*/}
                {/*          />*/}
                {/*          <label*/}
                {/*            htmlFor="push-email"*/}
                {/*            className="block text-sm font-medium leading-6 text-gray-900"*/}
                {/*          >*/}
                {/*            Message*/}
                {/*          </label>*/}
                {/*        </div>*/}
                {/*        <div className="flex items-center gap-x-3">*/}
                {/*          <input*/}
                {/*            id="push-nothing"*/}
                {/*            name="push-notifications"*/}
                {/*            type="radio"*/}
                {/*            className="h-4 w-4 border-gray-300 text-yellow-400 focus:ring-yellow-400"*/}
                {/*          />*/}
                {/*          <label*/}
                {/*            htmlFor="push-nothing"*/}
                {/*            className="block text-sm font-medium leading-6 text-gray-900"*/}
                {/*          >*/}
                {/*            No notifications*/}
                {/*          </label>*/}
                {/*        </div>*/}
                {/*      </div>*/}
                {/*    </fieldset>*/}
                {/*    <div className="mt-14 flex items-center justify-end">*/}
                {/*      <div className="flex items-center justify-end gap-x-6">*/}
                {/*        <button*/}
                {/*          type="reset"*/}
                {/*          className="text-sm font-semibold leading-6 text-gray-900"*/}
                {/*        >*/}
                {/*          Reset*/}
                {/*        </button>*/}
                {/*        <button*/}
                {/*          type="submit"*/}
                {/*          className="rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"*/}
                {/*        >*/}
                {/*          Update*/}
                {/*        </button>*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
            </form>
            <h2 className="mt-10 text-base font-semibold leading-7 text-gray-900">
              Change Password
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive orders.
            </p>
            <form
              onSubmit={changePassword}
              className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
            >
              <div className="sm:col-span-3">
                <label
                  htmlFor="oPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Old Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="oPassword"
                    id="oPassword"
                    autoComplete="oPassword"
                    onChange={(e) =>
                      onChangeHandler(e, setPasswords, passwords)
                    }
                    value={passwords.oPassword}
                    placeholder="mypassword"
                    className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="nPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="nPassword"
                    placeholder="mypassword"
                    id="nPassword"
                    onChange={(e) =>
                      onChangeHandler(e, setPasswords, passwords)
                    }
                    value={passwords.nPassword}
                    autoComplete="first_name"
                    className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200"
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="cPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="cPassword"
                    id="cPassword"
                    autoComplete="street_address"
                    placeholder="yournewpassword"
                    onChange={(e) =>
                      onChangeHandler(e, setPasswords, passwords)
                    }
                    value={passwords.cPassword}
                    className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200"
                  />
                </div>
              </div>
              <div className="sm:col-span-3 mb-10 items-center">
                <Link
                  href={"/forgot"}
                  className="font-medium text-sm text-yellow-400 hover:text-yellow-500"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="flex justify-end items-center sm:col-span-3">
                <button
                  type="submit"
                  className="rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
                >
                  Update
                </button>
              </div>
            </form>
            <div className="mt-18 mb-4 flex items-center justify-between">
              <button
                type="button"
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                onClick={() => setOpen(true)}
              >
                Delete Account
              </button>
            </div>
          </div>
        )
      )}
      {/* MODAL TO DELETE THE ACCOUNT */}
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
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Delete Account
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete account? once your
                            account is deleted your funds will be lost process
                            can not be undone
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-900/10  bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 sm:ml-3 sm:w-auto"
                      onClick={() => deleteAccount()}
                    >
                      Delete
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
      <Transition.Root show={openProfile} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpenProfile}
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
                    <div className="w-3/4 mx-auto text-center">
                      <img
                        src={avatarPreview}
                        alt="Avatar"
                        className="w-56 h-56 mx-auto rounded-full"
                      />
                    </div>
                  </div>
                  <div className="border-t border-gray-900/10  bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 sm:ml-3 sm:w-auto"
                      onClick={uploadProfile}
                    >
                      Upload
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpenProfile(false)}
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
  );
};
export default MyAccount;
