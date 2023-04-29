import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import Card from "@/components/card";
import Processing from "@/components/icons/Processing";
import Widget from "@/components/widget/Widget";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaCheck, FaDollarSign, FaTasks, FaUser } from "react-icons/fa";
import { FcProcess } from "react-icons/fc";
import { GiCancel } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard, MdPendingActions } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const Index = ({ setLoading, loading }) => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [pending, setPending] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [cancelledOrders, setCancelledOrders] = useState(0);
  const [processingOrders, setProcessingOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);

  const getStatics = async () => {
    setLoading(true);
    const response = await fetch("/api/admin/statics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    if (data.success) {
      console.log(data);
      setSales(data.sales);
      setPendingOrders(data.pendingOrders);
      setCompletedOrders(data.completedOrders);
      setPendingOrders(data.pendingOrders);
      setProcessingOrders(data.processingOrders);
      setCancelledOrders(data.cancelledOrders);
      setPendingOrders(data.pendingOrders);
      setPending(data.pendingAmount);
      setEarnings(data.earnings);
      setTotalOrders(data.totalOrders);
      setTotalAdmins(data.admins);
      setTotalCustomers(data.customers);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStatics();
  }, []);
  return (
    <Layout pathname={router.pathname.slice(1)}>
      <Head>
        <title>Admin E - Commerce</title>
      </Head>
      {loading ? (
        <Loader />
      ) : (
        !loading && (
          <Card className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
            <Widget
              icon={<FaDollarSign className="h-7 w-7" />}
              title={"Earnings"}
              subtitle={`$${earnings}`}
            />
            <Widget
              icon={<FaDollarSign className="h-6 w-6" />}
              title={"Pending"}
              subtitle={`$${pending}`}
            />
            <Widget
              icon={<FaDollarSign className="h-7 w-7" />}
              title={"Sales"}
              subtitle={`$${sales}`}
            />
            <Widget
              icon={<FaUser className="h-7 w-7" />}
              title={"Customers"}
              subtitle={`${totalCustomers}`}
            />
            <Widget
              icon={<RiAdminFill className="h-7 w-7" />}
              title={"Admins"}
              subtitle={`${totalAdmins}`}
            />
            <Widget
              icon={<MdPendingActions className="h-7 w-7" />}
              title={"Pending Orders"}
              subtitle={`${pendingOrders}`}
            />


            <Widget

              icon={<Processing className="h-7 text-yellow-400 w-7" />}
              title={"Processing Orders"}
              subtitle={`${processingOrders}`}
              
            />
            <Widget

              icon={<FaCheck className="h-7  w-7" />}
              title={"Completed Orders"}
              subtitle={`${completedOrders}`}
              
            />
            <Widget
              icon={<GiCancel className="h-7 w-7" />}
              title={"Cancelled Orders"}
              subtitle={`${cancelledOrders}`}
            />
            <Widget
              icon={<FaTasks className="h-6 w-6" />}
              title={"Total Orders"}
              subtitle={`${totalOrders}`}
            />
          </Card>
        )
      )}
    </Layout>
  );
};

export default Index;
