import React from "react";

const Input = ({ placeholder, name, value, className, type, onChange }) => {
  return (
    <>
      <input
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        type={type}
      />
    </>
  );
};

export default Input;
