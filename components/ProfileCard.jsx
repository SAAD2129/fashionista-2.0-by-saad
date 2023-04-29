import React from "react";
import Card from "./card";

const ProfileCard = ({
  username,
  moneySpent,
  name,
  totalOrders,
  img,
  
}) => {
  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover rounded-lg"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url("/assets/img/profile/banner.png")` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img
            className="h-full w-full rounded-full"
            src={img}
            alt={`${username} profile`}
          />
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {name}
        </h4>
        <p className="text-base font-normal text-gray-600">@{username}</p>
      </div>

      {/* Post followers */}
      <div className="mt-6 mb-3 flex gap-4 justify-between md:!gap-4">
        {/* <div className="flex flex-col items-center justify-center">
          <p className="text-xl font-bold text-navy-700 dark:text-white">17</p>
          <p className="text-sm font-normal text-gray-600">Posts</p>
        </div> */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl font-bold text-navy-700 dark:text-white">
            ${moneySpent}
          </p>
          <p className="text-sm font-normal text-gray-600">Money Spent</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl font-bold text-navy-700 dark:text-white">
            {totalOrders}
          </p>
          <p className="text-sm font-normal text-gray-600">Total Orders</p>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
