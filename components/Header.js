import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BiCart, BiUser } from "react-icons/bi";
import { FaPlus, FaMinus } from "react-icons/fa";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { MdRemoveShoppingCart } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
const Header = ({
  cart,
  subtotal,
  decrQty,
  incrQty,
  logoutUser,
  btnClasses,
  removeFromCart,
  fetchUser,
  user,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const newref = useRef();
  const [open, setOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();

  const goToCheckout = async () => {
    setOpen(false);
    router.push("/checkout");
  };
  useEffect(() => {
    if (cart?.length > 0 && router.pathname === "/") setOpen(true);

    const token = localStorage.getItem("token");
    setToken(token);
    // console.log(user);
    fetchUser();
  }, [cart, router.pathname]);

  return (
    <>
      <Transition.Root show={showNav} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setShowNav}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col  bg-white shadow-xl">
                      <div className="flex-1  px-4 py-6 sm:px-6">
                        <div className="flex mb-8 items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            <Link href="/">
                              <h2 className="text-2xl text-yellow-400 font-bold">
                                Fashionista
                              </h2>
                            </Link>
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setShowNav(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                        <ul
                          role="list"
                          className="py-1 font-medium text-gray-900"
                        >
                          <li>
                            <Link
                              href="/products"
                              className={`${
                                router.pathname === "/cancellations"
                                  ? "text-gray-70"
                                  : "text-gray-700"
                              } hover:bg-yellow-50 block px-4 py-2 text-sm`}
                              type="button"
                            >
                              Products
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/about"
                              className={`${
                                router.pathname === "/cancellations"
                                  ? "text-gray-70"
                                  : "text-gray-700"
                              } hover:bg-yellow-50 block px-4 py-2 text-sm`}
                              type="button"
                            >
                              About
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/faq"
                              className={`${
                                router.pathname === "/cancellations"
                                  ? "text-gray-70"
                                  : "text-gray-700"
                              } hover:bg-yellow-50 block px-4 py-2 text-sm`}
                              type="button"
                            >
                              Faq
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/contact"
                              className={`${
                                router.pathname === "/cancellations"
                                  ? "text-gray-70"
                                  : "text-gray-700"
                              } hover:bg-yellow-50 block px-4 py-2 text-sm`}
                              type="button"
                            >
                              Contact
                            </Link>
                          </li>
                          <li>
                            {user?.role === "admin" && (
                              <Link
                                href="/admin"
                                onClick={() => {
                                  setDropdown(false);
                                }}
                                className={`${
                                  router.pathname === "/admin"
                                    ? "text-gray-70"
                                    : "text-gray-700"
                                } hover:bg-yellow-50 block px-4 py-2 text-sm`}
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-0"
                              >
                                Dashboard
                              </Link>
                            )}
                          </li>
                          <li>
                            {!token && (
                              <Link
                                href="/login"
                                onClick={() => {
                                  setDropdown(false);
                                }}
                                className={`${
                                  router.pathname === "/login"
                                    ? "text-gray-70"
                                    : "text-gray-700"
                                } hover:bg-yellow-50 block px-4 py-2 text-sm`}
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-0"
                              >
                                Login
                              </Link>
                            )}
                          </li>
                          <li>
                            <Link
                              href="/orders"
                              onClick={() => {
                                setDropdown(false);
                              }}
                              className={`${
                                router.pathname === "/orders"
                                  ? "text-gray-70"
                                  : "text-gray-700"
                              } hover:bg-yellow-50 block px-4 py-2 text-sm`}
                              role="menuitem"
                              tabIndex="-1"
                              id="menu-item-1"
                            >
                              Orders
                            </Link>
                          </li>

                          <li>
                            <Link
                              href="/cancellations"
                              onClick={() => {
                                setDropdown(false);
                              }}
                              className={`${
                                router.pathname === "/cancellations"
                                  ? "text-gray-70"
                                  : "text-gray-700"
                              } hover:bg-yellow-50 block px-4 py-2 text-sm`}
                              role="menuitem"
                              tabIndex="-1"
                              id="menu-item-2"
                            >
                              Cancellations
                            </Link>
                          </li>
                          <li>
                            <Link
                              onClick={() => {
                                setDropdown(false);
                              }}
                              href="/favorities"
                              className={`${
                                router.pathname === "/favorities"
                                  ? "text-gray-70"
                                  : "text-gray-700"
                              } hover:bg-yellow-50 block px-4 py-2 text-sm`}
                              role="menuitem"
                              tabIndex="-1"
                              id="menu-item-5"
                            >
                              Wishlist
                            </Link>
                          </li>
                          <li>
                            {token && (
                              <div className="py-1" role="none">
                                <a
                                  className="text-gray-700 hover:bg-yellow-50 block px-4 py-2 text-sm"
                                  role="menuitem"
                                  tabIndex="-1"
                                  id="menu-item-6"
                                  onClick={() => {
                                    setDropdown(false), logoutUser();
                                  }}
                                >
                                  Logout
                                </a>
                              </div>
                            )}
                          </li>
                        </ul>
                      </div>
                      <div className="mt-auto px-4">
                        <Link
                          href="/myaccount"
                          className={`flex items-center gap-2 ${
                            router.pathname === "/orders"
                              ? "text-gray-70"
                              : "text-gray-700"
                          } hover:bg-yellow-50 block px-4 py-2`}
                        >
                          {user?.profileImage?.secret_url ? (
                            <div className="w-8 h-8 rounded-full">
                              <img
                                src={user?.profileImage?.secret_url}
                                alt={user?.username}
                                className="w-full h-full rounded-full"
                              />
                            </div>
                          ) : (
                            <BiUser className="text-2xl  hover:text-yellow-400 transition-all font-semibold text-black" />
                          )}
                          <span>Profile</span>
                        </Link>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                        {cart?.length === 0 && (
                          <div className="flex items-center flex-col justify-center h-3/4">
                            <MdRemoveShoppingCart className="h-52 w-52" />
                            <h3 className="text-2xl">Cart is Empty</h3>
                          </div>
                        )}
                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cart.map((product, i) => (
                                <li key={i} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.img}
                                      alt={product.name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <Link
                                            href={`/product/${product._id}`}
                                          >
                                            {product.name}
                                          </Link>
                                        </h3>
                                        <p className="ml-4">${product.price}</p>
                                      </div>
                                      <div className="flex items-center justify-between gap-2 mt-4">
                                        <div>
                                          <button
                                            onClick={() => decrQty(i)}
                                            role="button"
                                            type="button"
                                            className="bg-yellow-50 p-1 rounded-md"
                                          >
                                            <FaMinus className="text-yellow-400 text-sm" />
                                          </button>
                                          <span className="text-xl mx-2">
                                            {" "}
                                            {product.qty}
                                          </span>
                                          <button
                                            className="bg-yellow-50  p-1 rounded-md"
                                            role="button"
                                            type="button"
                                            onClick={() => incrQty(i)}
                                          >
                                            <FaPlus className="text-yellow-400 text-sm" />
                                          </button>
                                        </div>
                                        <div>
                                          <p className="mt-1 text-sm text-gray-500">
                                            {product?.color ? (
                                              <span>color {product.color}</span>
                                            ) : (
                                              ""
                                            )}{" "}
                                            {product?.size ? (
                                              <span>size {product.size}</span>
                                            ) : (
                                              ""
                                            )}{" "}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex">
                                        <button
                                          onClick={() =>
                                            removeFromCart(product.id)
                                          }
                                          type="button"
                                          className="font-medium text-yellow-400 hover:text-yellow-500"
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
                      </div>

                      {cart?.length !== 0 && (
                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>${subtotal}</p>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            Shipping and taxes will be calculated at checkout.
                          </p>
                          <div className="mt-6">
                            <a
                              onClick={goToCheckout}
                              className="flex items-center justify-center rounded-md border cursor-pointer border-transparent 
                                                            bg-yellow-400 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-yellow-500"
                            >
                              Checkout
                            </a>
                          </div>
                        </div>
                      )}
                      <div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            <Link
                              href={"/"}
                              type="button"
                              className="font-medium mb-4 text-yellow-400 hover:text-yellow-500"
                              onClick={() => setOpen(false)}
                            >
                              {" "}
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <header className="lg:px-44 lg:py-2 p-0 bg-white lg:shadow-md  w-full flex justify-between top-0 z-10 mx-auto body-font">
        {/* SHOPPING CART */}
        <div className="fixed top-2 cursor-pointer left-2">
          <GiHamburgerMenu
            className="text-yellow-300 text-3xl pointer lg:hidden block"
            onClick={() => setShowNav(true)}
          />
        </div>

        <div className="container  mx-auto lg:flex hidden flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            href={"/"}
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <h2 className="text-2xl text-yellow-400 font-bold">Fashionista</h2>
          </Link>
          <nav className="md:ml-4 md:py-1 md:pl-4 	flex flex-wrap items-center text-base justify-center">
            <Link
              className="mr-5 transition-all hover:text-yellow-400 font-semibold text-gray-500"
              href={"/products"}
            >
              PRODUCTS
            </Link>
            <Link
              className="mr-5 transition-all hover:text-yellow-400 font-semibold text-gray-500"
              href={"/about"}
            >
              ABOUT
            </Link>
            <Link
              className="mr-5 transition-all hover:text-yellow-400 font-semibold text-gray-500"
              href={"/contact"}
            >
              CONTACT
            </Link>
            <Link
              className="mr-5 transition-all hover:text-yellow-400 font-semibold text-gray-500"
              href={"/faq"}
            >
              FAQ
            </Link>
          </nav>
        </div>

        <div className="lg:flex hidden items-center ">
          <button onClick={() => setOpen(true)} className="mx-2">
            <BiCart className="text-2xl hover:text-yellow-400 transition-all font-semibold text-black" />
          </button>
          <button
            className="mx-2 relative"
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            {user?.profileImage?.secret_url ? (
              <div className="w-8 h-8 rounded-full">
                <img
                  src={user?.profileImage?.secret_url}
                  alt={user?.username}
                  className="w-full h-full rounded-full"
                />
              </div>
            ) : (
              <BiUser className="text-2xl  hover:text-yellow-400 transition-all font-semibold text-black" />
            )}

            {dropdown && (
              <div
                className="absolute right-0 z-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1" role="none">
                  {user?.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => {
                        setDropdown(false);
                      }}
                      className={`${
                        router.pathname === "/admin"
                          ? "text-gray-70"
                          : "text-gray-700"
                      } hover:bg-yellow-50 block px-4 py-2 text-sm`}
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      Dashboard
                    </Link>
                  )}
                  {!token && (
                    <Link
                      href="/login"
                      onClick={() => {
                        setDropdown(false);
                      }}
                      className={`${
                        router.pathname === "/login"
                          ? "text-gray-70"
                          : "text-gray-700"
                      } hover:bg-yellow-50 block px-4 py-2 text-sm`}
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      Login
                    </Link>
                  )}
                  <Link
                    href="/myaccount"
                    onClick={() => {
                      setDropdown(false);
                    }}
                    className={`${
                      router.pathname === "/myaccount"
                        ? "text-gray-70"
                        : "text-gray-700"
                    } hover:bg-yellow-50 block px-4 py-2 text-sm`}
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                  >
                    My Account
                  </Link>
                  <Link
                    href="/orders"
                    onClick={() => {
                      setDropdown(false);
                    }}
                    className={`${
                      router.pathname === "/orders"
                        ? "text-gray-70"
                        : "text-gray-700"
                    } hover:bg-yellow-50 block px-4 py-2 text-sm`}
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-1"
                  >
                    Orders
                  </Link>
                </div>
                <div className="py-1" role="none">
                  <Link
                    href="/cancellations"
                    onClick={() => {
                      setDropdown(false);
                    }}
                    className={`${
                      router.pathname === "/cancellations"
                        ? "text-gray-70"
                        : "text-gray-700"
                    } hover:bg-yellow-50 block px-4 py-2 text-sm`}
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-2"
                  >
                    Cancellations
                  </Link>
                </div>
                <div className="py-1" role="none">
                  <Link
                    onClick={() => {
                      setDropdown(false);
                    }}
                    href="/favorities"
                    className={`${
                      router.pathname === "/favorities"
                        ? "text-gray-70"
                        : "text-gray-700"
                    } hover:bg-yellow-50 block px-4 py-2 text-sm`}
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-5"
                  >
                    Wishlist
                  </Link>
                </div>
                {localStorage.getItem("token") && (
                  <div className="py-1" role="none">
                    <a
                      className="text-gray-700 hover:bg-yellow-50 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-6"
                      onClick={() => {
                        setShowNav(false), setDropdown(false), logoutUser();
                      }}
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            )}
          </button>
          {/* </div> */}
        </div>
      </header>
    </>
  );
};

export default Header;
