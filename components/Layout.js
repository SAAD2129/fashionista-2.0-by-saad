import React, { useEffect,useState } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "./navbar";

const Layout = ({ children,pathname,onOpenSidenav}) => {
  const [user,setUser] = useState({})
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
      } else {
        logoutUser();
        toast.error("some error occurred! please login again",{autoClose:1500});
      }
    }
    
  };
  useEffect(()=>{
    fetchUser()
  },[])
  return (
    <div className="">
      <style jsx global>{`
        header {
          display: none!important;
        }
        footer {
          display: none;
        }
      `}</style>
      <Sidebar />
      <main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px] p-8">
        <Navbar user={user} onOpenSidenav={onOpenSidenav} brandName={pathname} />
        {children}
      </main>
    </div>
  );
};

export default Layout;
