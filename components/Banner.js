import React from "react";
import styles from "@/styles/Home.module.css";
import { FaTruckMoving } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiServiceFill } from "react-icons/ri";
import Link from "next/link";
import "@/styles/Home.module.css";
const Banner = () => {
  return (
    <>
      <div className={styles.cover__img}></div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-4">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Categories
            </h1>
            <div className="grid grid-cols-3 gap-4 justify-center">
              <div className="relative">
                <img
                  src="/images/new/4.jpg"
                  className="rounded-xl w-3/4 mx-auto"
                  alt=""
                />
              </div>
              <div className="relative">
                <img
                  src="/images/new/3.jpg"
                  className="rounded-xl w-3/4 mx-auto"
                  alt=""
                />
              </div>
              <div className="relative">
                <img
                  src="/images/new/5.jpg"
                  className="rounded-xl w-3/4 mx-auto"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto">
          <div className="grid grid-cols-2 gap-4 justify-center">
            <div className="relative">
              <img
                src="/images/new/1.jpg"
                className="rounded-xl w-3/4 mx-auto"
                alt=""
              />
            </div>
            <div className="relative">
              <img
                src="/images/new/2.jpg"
                className="rounded-xl w-3/4 mx-auto"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Our Features
            </h1>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-yellow-400 inline-flex"></div>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 justify-center  sm:-m-4  -mb-10 -mt-4 md:space-y-0 space-y-6">
            <div className="p-4 bg-white rounded-2xl md:w-1/4 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-400 mb-5 flex-shrink-0">
                <FaTruckMoving className="text-3xl" />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Best Delivery
                </h2>
                <p className="leading-relaxed text-base">
                  We Deliver products over all in the world where it is needed
                  in best shipping prices. and best timings and we have one day
                  delivery option depending on the location
                </p>
                <a className="mt-3 text-yellow-400 inline-flex items-center">
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="p-4 bg-white rounded-2xl md:w-1/4 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-400 mb-5 flex-shrink-0">
                <GiTakeMyMoney className="text-3xl" />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Money Back
                </h2>
                <p className="leading-relaxed text-base">
                  We Guarantee our product is the best so if it is not as it was
                  defined then we will return your money 100%. So don't worry
                  about the quality it is the best.
                </p>
                <a className="mt-3 text-yellow-400 inline-flex items-center">
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="p-4 bg-white rounded-2xl md:w-1/4 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-400 mb-5 flex-shrink-0">
                <RiServiceFill className="text-3xl" />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Service
                </h2>
                <p className="leading-relaxed text-base">
                  We give best of us we try to make customer feel valued so we
                  deliver premium tshirts, hoodies and mugs and all in best
                  prices and we accept payments all over.
                </p>
                <a className="mt-3 text-yellow-400 inline-flex items-center">
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <button className="flex mx-auto mt-16 text-white bg-yellow-400 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-500 rounded text-lg">
            <Link href="/products">SHOP</Link>
          </button>
        </div>
      </section>
    </>
  );
};

export default Banner;
