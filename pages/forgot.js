import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BiLockAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const [token, setToken] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const getResetLink = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/password/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (data.success) {
      toast.success(data.msg);
    } else {
      toast.error(data.msg);
    }
  };
  const resetPassword = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/password/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({ password }),
    });
    const data = await response.json();
    if (data.success) {
      toast.success(data.msg);
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } else {
      toast.error(data.msg);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
    const { token } = router.query;
    console.log(router);
    console.log(token);
    setToken(token);
  }, [router.query]);
  return (
    <>
      <Head>
        <title>Fashionista - Forgot Password</title>
      </Head>

      {token && token !== null ? (
        <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Reset Password
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <Link
                  href={"/login"}
                  className="font-medium text-yellow-500 hover:text-yellow-400"
                >
                  Sing in
                </Link>
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={resetPassword}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div className="my-2">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="-space-y-px rounded-md shadow-sm">
                <div className="my-2">
                  <label htmlFor="c_password" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="c_password"
                    name="c_password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="confirm password"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <small className="text-gray-400">
                both passwords should be same
              </small>
              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Forgot Password
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <Link
                  href={"/login"}
                  className="font-medium text-yellow-500 hover:text-yellow-400"
                >
                  Sing in
                </Link>
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={getResetLink}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div className="my-2">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@gmail.com"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <small className="text-gray-400">
                we'll sent a code to your email
              </small>
              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
                >
                  Get Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Forgot;
