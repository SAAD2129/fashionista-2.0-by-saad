import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/Banner";
import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/card";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const fetchFeaturedProducts = async () => {
    const res = await fetch("/api/products/featured");
    const data = await res.json();
    console.log(data);
    if (data.success) {
      setFeaturedProducts(data.featured);
    }
  };
  useEffect(() => {
    fetchFeaturedProducts();
  }, []);
  return (
    <>
      <Head>
        <title>Fashionista - Fashion Starts Here</title>
        <meta
          name="description"
          content="foodistan the best place to taste The Best Variety of Food"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>
      <main className={styles.main}>
        <Banner />
      </main>
    </>
  );
}
