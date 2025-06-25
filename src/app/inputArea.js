"use client";

const InputArea = ({ onClick, children }) => {
    return (
      <button onClick={onClick}>
        {children}
      </button>
    );
  };
  
export default InputArea;