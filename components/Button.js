import React from "react";

const Button = ({ text }) => {
    return (
        <>
            <button className="flex ml-2 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
                {text}
            </button>
        </>
    );
};

export default Button;
