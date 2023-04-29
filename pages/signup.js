import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Singup = () => {
  const [signupcreds, setSignupcreds] = useState({
    username: "",
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setSignupcreds({ ...signupcreds, [e.target.name]: e.target.value });
  };
  const createAccount = async (e) => {
    e.preventDefault();
    const { email, password, username } = signupcreds;
    console.log(JSON.stringify(signupcreds));
    const response = await fetch(`/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, username }),
    });
    const data = await response.json();
    if (data.success) {
      toast.success(data.msg, { autoClose: 1000 });
      setSignupcreds({
        username: "",
        email: "",
        password: "",
      });
      localStorage.setItem("token", data.token);
      router.push("/myaccount");
    } else {
      toast.error(data.msg);
    }
  };
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);
  return (
    <>
      <Head>
        <title>Fashionista - Singup</title>
      </Head>
      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign up to Fashionista
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                href={"/login"}
                className="font-medium text-yellow-400 hover:text-yellow-500"
              >
                Sing in
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-12" onSubmit={createAccount}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className=" rounded-md shadow-sm">
              <div className="my-2">
                <label htmlFor="username" className="sr-only">
                  Full Name
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={onChange}
                  value={signupcreds.username}
                  placeholder="your name"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="my-2">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={onChange}
                  value={signupcreds.email}
                  placeholder="email@gmail.com"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="my-2">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={onChange}
                  value={signupcreds.password}
                  placeholder="password"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-white hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Singup;
