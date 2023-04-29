import Footer from "../components/Footer";
import Header from "../components/Header";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Elements,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [user, setUser] = useState(0);
  const [favorites, setFavorites] = useState([]);

  let btn =
    "flex ml-2 text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded";
  const onChangeHandler = async (e, Setter, values) => {
    console.log(e.target.name)
    Setter({ ...values, [e.target.name]: e.target.value });
  };
  const getAddresses = async () => {
    const response = await fetch("/api/user/addresses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    if (data.success) {
      setAddresses(data.addresses);
    }
  };
  const addToCart = (item) => {
    let items = localStorage.getItem("cart");
    if (items) {
      items = JSON.parse(items);
    } else {
      items = [];
    }
    let found = false;
    for (let i = 0; i < items.length; i++) {
      if (item.id === items[i].id) {
        items[i].qty++;
        found = true;
      }
    }
    if (!found) {
      items.push(item);
    }
    setCart(items);
    toast.success(`${item.name} ${item.color} ${item.size} added to cart`, {
      autoClose: 1500,
    });
    // toast.success
    localStorage.setItem("cart", JSON.stringify(items));
    calculateSubTotal();
  };
  const addToFavorite = (item) => {
    console.log(item)
    let items = localStorage.getItem("favorites");
    if (items) {
      items = JSON.parse(items);
    } else {
      items = [];
    }
    // if item is already in favorites
    for (let i = 0; i < items.length; i++) if (item.id === items[i].id){
      toast(`${item.name} already in favorite`);
      return;
    } 

    items.push(item);
    setFavorites(items);
    toast.success(`${item.name} added to favorite`);
    localStorage.setItem("favorites", JSON.stringify(items));
  };
  const removeFromFavorite = (id) => {
    let items = localStorage.getItem("favorites");
    if (items) {
      items = JSON.parse(items);
      let newItems = items.filter((item) => item.id !== id);
      toast.success(`item removed to cart`);
      // console.log(first)
      setFavorites(newItems);
      localStorage.setItem("favorites", JSON.stringify(newItems));
    }
  };
  const loadCart = () => {
    let items = localStorage.getItem("cart");
    if (items) {
      items = JSON.parse(items);
    } else {
      items = [];
    }
    setCart(items);
  };
  const loadFavorites = () => {
    let items = localStorage.getItem("favorites");
    if (items) {
      items = JSON.parse(items);
    } else {
      items = [];
    }
    setFavorites(items);
  };
  const removeFromCart = (id) => {
    let items = localStorage.getItem("cart");
    if (items) {
      items = JSON.parse(items);
      let newcart = [];
      for (let i = 0; i < items.length; i++) {
        const e = items[i];
        if (id !== e.id) {
          console.log(e);
          newcart.push(e);
        }
      }
      console.log(newcart);
      localStorage.setItem("cart", JSON.stringify(newcart));
      setCart(newcart);
      toast.success(`item removed from cart`);

      calculateSubTotal();
    }
  };
  const clearCart = () => {
    localStorage.removeItem("cart");
    loadCart();
    calculateSubTotal();
  };
  const calculateSubTotal = () => {
    let items = localStorage.getItem("cart");
    let total = 0;

    if (items) {
      items = JSON.parse(items);
      for (let i = 0; i < items.length; i++) {
        const element = items[i];
        total += element.qty * element.price;
      }
    }
    setSubtotal(total);
  };
  const decrQty = async (i) => {
    let items = localStorage.getItem("cart");
    if (items) {
      items = JSON.parse(items);
      if (items[i].qty <= 1) return;
      items[i].qty--;
      setCart(items);
      setSubtotal(subtotal - items[i].price);
      localStorage.setItem("cart", JSON.stringify(items));
    }
  };
  const incrQty = async (i) => {
    let items = localStorage.getItem("cart");
    if (items) {
      items = JSON.parse(items);
      items[i].qty++;
      setSubtotal(subtotal + items[i].price);
      setCart(items);
      localStorage.setItem("cart", JSON.stringify(items));
    }
  };
  const fetchUser = async (e) => {
    if(localStorage.getItem('token')){
      const response = await fetch("/api/user/account", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (data.success) {
        console.log(data)
        setUser(data.user);
        setLoading(false);
      } else {
        logoutUser();
        toast.error("some error occurred! please login again",{autoClose:1500});
      }
    }
    
  };
  const router = useRouter();
  const logoutUser = async () => {
    setUser({})
    localStorage.removeItem("token");
    router.push("/login");
  };
  const [open, setOpen] = useState(true);
  const onOpenSidenav = () => {
    console.log('here')
    setOpen(false);
  };
  useEffect(() => {
    // fetchUser();
    loadCart();
    calculateSubTotal();
    loadFavorites();
    if (localStorage.getItem("token")) fetchUser();
    
  }, []);

  // pk_test_51Mj6h1SEr7VMOboEVZUJQo5IzeYg929DQY3Ch2e34HcHQnLaQUv34zGpIJlrGHEuipYeJwT1jBOYInyJ8jwFW7Yr001sY6CokF
  return (
    <Elements stripe={loadStripe("pk_test_51Mj6h1SEr7VMOboEVZUJQo5IzeYg929DQY3Ch2e34HcHQnLaQUv34zGpIJlrGHEuipYeJwT1jBOYInyJ8jwFW7Yr001sY6CokF")}
    >
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header
        cart={cart}
        addToCart={addToCart}
        loading={loading}
        subtotal={subtotal}
        setLoading={setLoading}
        clearCart={clearCart}
        incrQty={incrQty}
        decrQty={decrQty}
        btnClasses={btn}
        removeFromCart={removeFromCart}
        loadCart={loadCart}
        onChangeHandler={onChangeHandler}
        logoutUser={logoutUser}
        calculateSubTotal={calculateSubTotal}
        open={open}
        setOpen={setOpen}
        onOpenSidenav={onOpenSidenav}
        fetchUser={fetchUser}
        user={user}

      />
      <Component
        calculateSubTotal={calculateSubTotal}
        addToCart={addToCart}
        getAddresses={getAddresses}
        setAddresses={setAddresses}
        addresses={addresses}
        user={user}
        fetchUser={fetchUser}
        setUser={setUser}
        loadCart={loadCart}
        incrQty={incrQty}
        decrQty={decrQty}
        subtotal={subtotal}
        addToFavorite={addToFavorite}
        open={open}
        setOpen={setOpen}
        onOpenSidenav={onOpenSidenav}
        favorites={favorites}
        removeFromFavorite={removeFromFavorite}
        cart={cart}
        onChangeHandler={onChangeHandler}
        removeFromCart={removeFromCart}
        loading={loading}
        setLoading={setLoading}
        clearCart={clearCart}
        btnClasses={btn}
        logoutUser={logoutUser}
        
        {...pageProps}
      />
      <Footer />
    </Elements>
  );
}
