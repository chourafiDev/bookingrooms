import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const Button = ({ className, onClick, type, text, disabled, loading }) => {
  return (
    <>
      <button
        className={className}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {loading ? (
          <PulseLoader color="#ffffff" loading={loading} size={8} />
        ) : (
          text
        )}
      </button>
    </>
  );
};

export default Button;
