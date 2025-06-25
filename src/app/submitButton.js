"use client";

const handleClick = () => {
    console.log("Button clicked!");
  };


const SubmitButton = ({ children }) => {
    return (
      <button onClick={handleClick} class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
        {children}
      </button>
    );
  };
  
export default SubmitButton;