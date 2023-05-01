import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BiLockAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Login = () => {
  const [creds, setCreds] = useState({ email: "", password: "" });
  const router = useRouter();
  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = creds;
    // ${process.env.HOST}
    const response = await fetch(`/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.success) {
      toast.success(data.msg, { autoClose: 1000 });
      localStorage.setItem("token", data.token);
      setCreds({ email: "", password: "" });
      if (data.user.role === "admin") {
        // setTimeout(() => {
          router.push("/admin");
        // }, 1000);
      } else {
        // setTimeout(() => {
          router.push("/products");
        // }, 1000);
      }
    } else {
      toast.error(data.msg);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
      return;
    }
  }, []);
  return (
    <>
      <Head>
        <title>Fashionista - Login</title>
      </Head>
      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to Fashionista
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                href={"/signup"}
                className="font-medium text-yellow-400 hover:text-yellow-500"
              >
                Sing up
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={loginUser}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="my-2">
                <label htmlFor="email" className="sr-only">
                  Email address or username
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={creds.email}
                  onChange={onChange}
                  placeholder="email or username"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                  value={creds.password}
                  onChange={onChange}
                  placeholder="Password"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  href={"/forgot"}
                  className="font-medium text-yellow-400 hover:text-yellow-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-white hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <BiLockAlt
                    className="h-5 w-5 text-white-500"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
