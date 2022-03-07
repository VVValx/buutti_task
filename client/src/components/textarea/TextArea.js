import React from "react";

function TextArea({
  className = "form-input",
  label,
  labelClass = "form-label",
  name = "description",
  value,
  onChange,
  error,
}) {
  return (
    <div className={className}>
      <div className={labelClass}>{label}</div>
      <textarea name={name} value={value} onChange={onChange} />

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default TextArea;
