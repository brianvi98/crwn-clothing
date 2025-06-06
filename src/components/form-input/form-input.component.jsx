import React from "react";
import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value && otherProps.value.length ? "shrink" : ""
          } form-input-label`}
          htmlFor=""
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
