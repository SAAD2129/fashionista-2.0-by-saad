import React from "react";

const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center min-h-screen min-w-full text-center">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
