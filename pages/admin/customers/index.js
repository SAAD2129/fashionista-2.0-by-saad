import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import Card from "@/components/card";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import ProfileCard from "@/components/ProfileCard";
const Users = ({ loading, setLoading }) => {
  const [users, setUsers] = useState([]);
  const fetchAllUsers = async () => {
    setLoading(true);
    const response = await fetch("/api/admin/users");
    const data = await response.json();
    if (data.success) {
      setUsers(data.users);
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(loading);
    fetchAllUsers();
  }, []);

  return (
    <Layout pathname={"Users"}>
      <Head>
        <title>Admin Users</title>
      </Head>
      {/* {users?.length === 0 ? "You haven't Added user Yet"} */}
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6">
          {users.map((user) => {
            const { _id, username, totalOrders,moneySpent, first_name, last_name, name } =
              user;
            return (
              <Link key={_id} href={`/admin/customers/${_id}`}>
                <ProfileCard
                  className="rounded-lg"
                  username={username}
                  img={user?.profileImage?.secret_url}
                  moneySpent={moneySpent}
                  name={`${first_name?first_name:"nan"} ${last_name?last_name:"nan"}`}
                  totalOrders={totalOrders}
                />
              </Link>
            );
          })}
        </div>
      )}
    </Layout>
  );
};
export default Users;
