import React from "react";

function Input({
  type = "text",
  error,
  className = "form-input",
  label,
  labelClass = "form-label",
  ...rest
}) {
  return (
    <div className={className}>
      {label && <div className={labelClass}>{label}</div>}
      <input type={type} {...rest} />

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Input;
